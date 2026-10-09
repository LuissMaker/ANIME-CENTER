use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};
use tauri::{AppHandle, Manager};

const GITHUB_REPO: &str = "LuissMaker/ANIME-CENTER";

#[derive(Debug, Deserialize)]
struct GithubAsset {
  name: String,
  browser_download_url: String,
}

#[derive(Debug, Deserialize)]
struct GithubRelease {
  tag_name: String,
  name: Option<String>,
  body: Option<String>,
  html_url: String,
  assets: Vec<GithubAsset>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct UpdateInfo {
  current_version: String,
  latest_version: String,
  available: bool,
  release_name: String,
  notes: String,
  release_url: String,
  installer_found: bool,
}

async fn latest_release() -> Result<GithubRelease, String> {
  let url = format!("https://api.github.com/repos/{GITHUB_REPO}/releases/latest");
  let client = reqwest::Client::builder()
    .user_agent("Mokost-Anime-Center-Updater")
    .build()
    .map_err(|e| format!("No pude iniciar el cliente de actualizaciones: {e}"))?;

  let response = client.get(url).send().await
    .map_err(|e| format!("No pude conectar con GitHub: {e}"))?;

  if !response.status().is_success() {
    return Err(format!("GitHub respondió con {}. Verifica que exista al menos un Release público.", response.status()));
  }

  response.json::<GithubRelease>().await
    .map_err(|e| format!("No pude leer la información del Release: {e}"))
}

fn normalized_version(raw: &str) -> Result<semver::Version, String> {
  semver::Version::parse(raw.trim().trim_start_matches('v'))
    .map_err(|e| format!("Versión no válida ({raw}): {e}"))
}

fn installer_asset<'a>(release: &'a GithubRelease) -> Option<&'a GithubAsset> {
  release.assets.iter().find(|a| {
    let n = a.name.to_ascii_lowercase();
    n.ends_with(".exe") && (n.contains("setup") || n.contains("installer"))
  }).or_else(|| release.assets.iter().find(|a| a.name.to_ascii_lowercase().ends_with(".exe")))
}

#[tauri::command]
async fn check_for_update(app: AppHandle) -> Result<UpdateInfo, String> {
  let current = app.package_info().version.to_string();
  let release = latest_release().await?;
  let latest = release.tag_name.trim().trim_start_matches('v').to_string();
  let available = normalized_version(&latest)? > normalized_version(&current)?;

  Ok(UpdateInfo {
    current_version: current,
    latest_version: latest,
    available,
    release_name: release.name.unwrap_or_else(|| release.tag_name.clone()),
    notes: release.body.unwrap_or_default(),
    release_url: release.html_url,
    installer_found: installer_asset(&release).is_some(),
  })
}

#[cfg(target_os = "windows")]
fn safe_asset_name(name: &str) -> String {
  name.chars()
    .map(|c| if c.is_ascii_alphanumeric() || matches!(c, '.' | '-' | '_') { c } else { '_' })
    .collect()
}

#[tauri::command]
async fn download_and_install_update(app: AppHandle) -> Result<(), String> {
  #[cfg(not(target_os = "windows"))]
  {
    let _ = app;
    return Err("La instalación automática está preparada para Windows.".into());
  }

  #[cfg(target_os = "windows")]
  {
    let release = latest_release().await?;
    let current = app.package_info().version.to_string();
    let latest = release.tag_name.trim().trim_start_matches('v').to_string();
    if normalized_version(&latest)? <= normalized_version(&current)? {
      return Err("Ya tienes la versión más reciente.".into());
    }

    let asset = installer_asset(&release)
      .ok_or_else(|| "El Release más reciente no contiene un instalador .exe. Sube el archivo NSIS generado por Tauri.".to_string())?;

    let expected_prefix = format!("https://github.com/{GITHUB_REPO}/releases/download/");
    if !asset.browser_download_url.starts_with(&expected_prefix) {
      return Err("GitHub devolvió una URL de descarga inesperada.".into());
    }

    let client = reqwest::Client::builder()
      .user_agent("Mokost-Anime-Center-Updater")
      .build()
      .map_err(|e| format!("No pude iniciar la descarga: {e}"))?;
    let response = client.get(&asset.browser_download_url).send().await
      .map_err(|e| format!("No pude descargar la actualización: {e}"))?;
    if !response.status().is_success() {
      return Err(format!("La descarga falló con {}.", response.status()));
    }
    let bytes = response.bytes().await
      .map_err(|e| format!("No pude leer el instalador descargado: {e}"))?;

    let update_dir: PathBuf = std::env::temp_dir().join("MokostAnimeCenterUpdate");
    fs::create_dir_all(&update_dir)
      .map_err(|e| format!("No pude preparar la carpeta temporal: {e}"))?;
    let installer = update_dir.join(safe_asset_name(&asset.name));
    fs::write(&installer, &bytes)
      .map_err(|e| format!("No pude guardar el instalador: {e}"))?;

    let script = update_dir.join("install_update.cmd");
    let installer_str = installer.to_string_lossy().replace('"', "");
    let current_exe = std::env::current_exe()
      .map_err(|e| format!("No pude localizar el ejecutable actual: {e}"))?;
    let current_exe_str = current_exe.to_string_lossy().replace('"', "");
    let script_body = format!(
      "@echo off\r\n\
       timeout /t 2 /nobreak >nul\r\n\
       start /wait \"\" \"{}\" /S\r\n\
       del /f /q \"{}\" >nul 2>&1\r\n\
       start \"\" \"{}\" >nul 2>&1\r\n\
       del /f /q \"%~f0\" >nul 2>&1\r\n",
      installer_str, installer_str, current_exe_str
    );
    fs::write(&script, script_body)
      .map_err(|e| format!("No pude preparar el instalador automático: {e}"))?;

    std::process::Command::new("cmd")
      .arg("/C")
      .arg("start")
      .arg("")
      .arg("/min")
      .arg("cmd")
      .arg("/C")
      .arg(&script)
      .spawn()
      .map_err(|e| format!("No pude iniciar el instalador: {e}"))?;

    app.exit(0);
    Ok(())
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_notification::init())
    .invoke_handler(tauri::generate_handler![check_for_update, download_and_install_update])
    .setup(|app| {
      if let Some(window) = app.get_webview_window("main") {
        let _ = window.center();
        let _ = window.show();
        let _ = window.set_focus();
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running Mokost Anime Center");
}
