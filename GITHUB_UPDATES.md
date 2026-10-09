# Mokost Anime Center · Actualizaciones por GitHub Releases

## Repositorio esperado

El updater de v0.6.3 apunta a:

`LuissMaker/ANIME-CENTER`

## Primera publicación

1. Sube TODO el contenido de la app como raíz del repositorio.
2. Haz commit y push.
3. Crea y sube el tag `v0.6.3`.
4. GitHub Actions ejecutará `.github/workflows/release.yml`.
5. El workflow compilará el instalador NSIS de Windows y lo adjuntará a un GitHub Release.

## Cómo publicar una actualización futura

Ejemplo para v0.6.4:

1. Cambia la versión en:
   - `src-tauri/Cargo.toml`
   - `src-tauri/tauri.conf.json`
   - `APP_VERSION` en `dist/app.js`
2. Haz commit y push.
3. Publica el tag `v0.6.4`.

La app instalada consultará `releases/latest`, detectará una versión superior, descargará el instalador .exe y lanzará la actualización.

## Requisito importante

El Release más reciente debe contener un instalador .exe NSIS. El updater prioriza archivos cuyo nombre contenga `setup` o `installer`.
