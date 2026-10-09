(() => {
  'use strict';

  const STORAGE_KEY = 'mokost.anime.center.v01';
  const APP_VERSION = '0.6.3';
  const DAY_NAMES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const DAY_SHORT = ['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'];
  const PRIORITY_LABELS = { high:'Alta', normal:'Normal', low:'Baja' };
  const LEGACY_DEMO_NAMES = new Set(['Serie Aurora','Círculo Carmesí','Niebla de Medianoche','Distrito 07']);
  const HOVER_DELAY = 300;
  const HOVER_HIDE_DELAY = 180;
  const EVENT_TYPES = { event:'Evento', announcement:'Anuncio', personal:'Personal' };
  const LINK_PRESETS = { erai:{name:'Erai Raws',icon:'./assets/erai-raws.svg'}, tioanime:{name:'TioAnime',icon:'./assets/tioanime.svg'}, other:{name:'Otros',icon:'./assets/otros.svg'} };
  const REMINDER_PRESETS = [{minutes:10080,label:'1 semana antes'},{minutes:4320,label:'3 días antes'},{minutes:1440,label:'1 día antes'},{minutes:0,label:'El mismo día'}];
  const SOURCE_SVGS = {"erai":"<svg fill=\"currentColor\" viewBox=\"-5.5 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><title>kudakurage</title><path d=\"M19.156 9.25l0.156 0.25c0.531 1.031 1.313 2.469 0.688 4.094-0.219 0.563-0.688 0.969-1.125 1.313-0.188 0.156-0.375 0.313-0.531 0.469 0.406 1.563 1.063 2.813 1.906 3.656 0.063 0.063 0.188 0.156 0.313 0.25 0.375 0.219 0.875 0.563 0.75 1.188 0 0.063-0.063 0.125-0.156 0.125-0.719 0-1.344-0.438-2.063-1.344-0.625-0.906-1.219-2.031-1.688-3.531-0.156 0.063-0.344 0.094-0.531 0.156-0.094 0-0.219 0.031-0.313 0.063 0.125 0.75 0.25 1.438 0.344 2.188 0.188 1.625 0.375 3.156 1.125 4.344 0.094 0.156 0.219 0.281 0.344 0.438 0.313 0.313 0.656 0.719 0.406 1.344-0.031 0.063-0.063 0.094-0.094 0.094-0.063 0.031-0.094 0-0.125 0-1.875-1.031-2.219-3.563-2.531-6.031-0.094-0.75-0.188-1.531-0.313-2.25-0.125 0-0.219 0.031-0.344 0.031-0.344 0.063-0.75 0.125-1.125 0.125 0.094 2.094 0.344 4.125 0.563 5.938 0.031 0.5 0.094 1.031 0.156 1.5 0.031 0.25 0.125 0.656 0.25 1.094v0.063c0 0.031 0.031 0.094 0.031 0.156 0.094 0.219 0.281 0.563 0.125 0.844-0.063 0.094-0.188 0.188-0.313 0.25h-0.156c-0.625 0-0.781-1.188-0.844-1.938l-0.031-0.188c-0.063-0.531-0.156-1.156-0.219-1.719-0.25-1.906-0.5-3.875-0.594-5.906-0.406 0.063-0.875 0.094-1.281 0.125-0.281 0-0.625 0.031-0.938 0.031 0.563 1.406 0.344 3.188 0.156 4.875-0.219 1.875-0.406 3.688 0.313 4.969 0.094 0.156 0.219 0.25 0.375 0.375 0.281 0.219 0.625 0.5 0.375 1.188-0.031 0.094-0.125 0.125-0.188 0.094-2.25-0.75-1.969-3.531-1.719-6.219 0.156-1.719 0.313-3.5-0.156-4.781-0.031-0.188-0.031-0.313 0.031-0.406-0.406 0.031-0.844 0.063-1.313 0.063-0.25 1.125-0.469 2.344-0.656 3.688-0.063 0.375-0.125 0.781-0.188 1.156-0.25 1.75-0.531 3.563-0.5 5.594 0.031 0.156 0.063 0.344 0.094 0.5 0.094 0.406 0.156 0.906-0.313 1.188-0.031 0.031-0.063 0.031-0.094 0.031h-0.031c-0.563-0.063-0.531-0.875-0.531-1.313v-0.156c0-2.313 0.406-4.688 0.75-7.031 0.188-1.25 0.344-2.406 0.469-3.563-0.281-0.031-0.688-0.031-1 0.031-0.156 0-0.313 0.031-0.438 0.031-0.25 2.438-0.875 4.75-1.875 7-0.031 0.125-0.094 0.25-0.125 0.375-0.219 0.563-0.5 1.25-1.125 1.5-0.063 0-0.156 0-0.188-0.094-0.344-0.563 0.063-1.156 0.344-1.594 0.125-0.156 0.219-0.344 0.281-0.469 0.938-1.969 1.5-4.25 1.75-6.75-0.156-0.063-0.469-0.063-0.594-0.063-0.094 0-0.219 0.031-0.313 0.031h-0.406c-0.125 2.125-0.875 4-2.156 5.313-0.406 0.438-0.875 0.875-1.344 0.813-0.063 0-0.125-0.031-0.156-0.063-0.125-0.188-0.156-0.406-0.125-0.563 0.094-0.25 0.375-0.406 0.625-0.531 0.094-0.063 0.219-0.125 0.281-0.188 1.125-1.188 1.844-2.906 1.969-4.781 0-0.031-0.125-0.031-0.219 0h-0.281c-0.031-0.031-0.063-0.031-0.094-0.063-0.188-0.156-0.344-0.281-0.531-0.438-1-0.813-1.938-1.563-2.125-3.188-0.188-1.719 0.406-2.969 0.938-4.156 0.094-0.156 0.156-0.344 0.25-0.5 0.75-1.656 1.688-2.938 2.781-3.719 1.375-0.969 3.156-1.469 5.188-1.469 1.156 0 2.375 0.188 3.563 0.531 2.813 0.813 4.844 2.563 6.406 5.531zM17.969 14.5c1.281-0.75 1.563-2.406 0.656-4.063-1.281-2.406-2.906-4.281-4.375-5.125-0.969-0.531-3.281-1.188-5.031-1.188-0.188 0-0.375 0.031-0.531 0.031-2.719 0.25-4.688 1.344-5.969 3.313-0.344 0.594-1.563 2.656-1.719 4.25-0.125 1.281 0.094 2.188 0.688 2.875 0.813 0.875 2.219 1.281 4.469 1.281 1.156 0 2.375-0.125 3.563-0.219 0.625-0.063 1.25-0.125 1.813-0.156 0.344-0.031 0.719-0.063 1.094-0.063 2.031-0.094 4.094-0.188 5.344-0.938zM14.281 9.219c-0.063 0.094-0.156 0.188-0.25 0.219-0.031 0.031-0.125 0.063-0.156 0.063h-0.125s-0.063-0.031-0.094-0.031c-0.156-0.063-0.313-0.188-0.375-0.344-0.031 0-0.031 0-0.063-0.031-0.031-0.125-0.031-0.25-0.031-0.375 0-0.219 0.063-0.406 0.156-0.531 0.063-0.125 0.156-0.188 0.281-0.219 0.031-0.031 0.063-0.063 0.094-0.063h0.125c0.031 0 0.063 0 0.094 0.031 0.188 0.063 0.344 0.156 0.438 0.313 0 0.031 0 0.031 0.031 0.031 0.031 0.125 0.063 0.25 0.031 0.375 0 0.188-0.031 0.406-0.156 0.563zM6.25 9.969c-0.375 0-0.688-0.219-0.75-0.563-0.031-0.219 0-0.469 0.125-0.625 0.25-0.281 0.781-0.281 1.031 0 0.125 0.125 0.25 0.406 0.188 0.844 0 0 0 0.031-0.031 0.063-0.156 0.188-0.344 0.281-0.563 0.281zM16.5 11.281c0.031 0.031 0.031 0.063 0.031 0.094-0.094 0.438-0.531 0.938-1 0.938-0.156 0-0.313-0.031-0.406-0.125-0.063-0.031-0.094-0.094-0.063-0.156-0.188 0.156-0.375 0.281-0.594 0.375h-0.063c-0.063 0-0.125-0.031-0.156-0.094 0 0 0-0.031-0.031-0.031-0.063-0.031-0.125-0.094-0.094-0.188 0.063-0.5 0.5-0.906 0.969-0.906h0.219c0.031 0.031 0.125 0.063 0.125 0.094 0.031 0.031 0.031 0.094 0 0.125 0 0.063-0.031 0.094-0.063 0.156 0.281-0.281 0.688-0.438 1.031-0.375 0.031 0.031 0.063 0.031 0.094 0.094zM17.469 11.406c0.063 0.031 0.094 0.094 0.094 0.125 0 0.156-0.031 0.313-0.125 0.406-0.125 0.125-0.313 0.219-0.5 0.219s-0.406-0.094-0.5-0.188c-0.031-0.031-0.031-0.094-0.031-0.125 0-0.281 0.313-0.531 0.688-0.531 0.156 0 0.281 0.031 0.375 0.094zM3.25 12.969v-0.063l-0.031-0.031c-0.031 0-0.063-0.031-0.094-0.063-0.031-0.063-0.031-0.094-0.031-0.125 0.094-0.406 0.531-0.813 0.938-0.813 0.063 0 0.125 0 0.156 0.031 0.094 0 0.156 0.094 0.125 0.188-0.063 0.469-0.375 0.813-0.844 0.938h-0.031c-0.063 0-0.156-0.031-0.188-0.063zM5.75 12v0.125c-0.188 0.375-0.438 0.844-0.969 1.031-0.031 0.031-0.031 0.031-0.063 0.031-0.063 0-0.156-0.031-0.188-0.094v-0.063c-0.063 0-0.094-0.031-0.125-0.063 0-0.031-0.031-0.125 0-0.156 0.125-0.469 0.5-0.938 1-0.938 0.063 0 0.156 0 0.219 0.031 0.063 0 0.094 0.031 0.125 0.094zM6.813 12.031c0.063 0 0.094 0 0.125 0.031 0.031 0.063 0.063 0.094 0.031 0.156-0.063 0.594-0.531 0.844-0.875 1-0.031 0.031-0.063 0.031-0.063 0.031-0.063 0-0.125-0.031-0.156-0.063-0.156-0.188-0.188-0.406-0.094-0.594 0.156-0.344 0.656-0.563 1.031-0.563zM12.25 12.469c0.125 0 0.25 0.031 0.375 0.125 0.063 0.031 0.125 0.094 0.094 0.156-0.156 0.969-1.375 1.375-2.438 1.375-1.156 0-2-0.469-2.188-1.25 0-0.031 0-0.125 0.063-0.156 0.125-0.094 0.281-0.156 0.438-0.156 0.219 0 0.469 0.156 0.625 0.313 0.125 0.094 0.25 0.219 0.375 0.25 0.469 0.156 1 0.125 1.531-0.063 0.156-0.063 0.313-0.188 0.438-0.281 0.219-0.156 0.438-0.313 0.688-0.313z\"></path></svg>","tioanime":"<svg fill=\"currentColor\" version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t viewBox=\"0 0 55.421 55.421\"\n\t xml:space=\"preserve\"><g><g><path d=\"M27.74,23.503c5.283,0,9.583-4.299,9.583-9.583s-4.301-9.583-9.583-9.583c-5.284,0-9.584,4.299-9.584,9.583\n\t\t\tS22.457,23.503,27.74,23.503z M27.74,6.337c4.183,0,7.583,3.401,7.583,7.583s-3.4,7.583-7.583,7.583\n\t\t\tc-4.182,0-7.584-3.401-7.584-7.583S23.559,6.337,27.74,6.337z\"/><path d=\"M27.74,19.011c2.808,0,5.092-2.284,5.092-5.091s-2.284-5.091-5.092-5.091c-2.807,0-5.091,2.284-5.091,5.091\n\t\t\tS24.935,19.011,27.74,19.011z M29.854,13.248c0,0.463-0.377,0.84-0.841,0.84c-0.463,0-0.842-0.377-0.842-0.84\n\t\t\ts0.379-0.839,0.842-0.839C29.477,12.409,29.854,12.785,29.854,13.248z M27.5,10.854c-0.795,0.504-1.327,1.385-1.327,2.394\n\t\t\tc0,1.565,1.274,2.84,2.84,2.84c0.397,0,0.775-0.083,1.118-0.231c-0.566,0.699-1.422,1.155-2.391,1.155\n\t\t\tc-1.704,0-3.092-1.387-3.092-3.091C24.648,12.298,25.91,10.98,27.5,10.854z\"/><path d=\"M3.376,55.421h48.667c0.335,0,0.646-0.168,0.833-0.444c0.188-0.279,0.221-0.636,0.089-0.939\n\t\t\tc-0.062-0.145-5.979-14.457-4.063-31.073c0.019-0.136-0.004-0.271-0.053-0.396c0.032-0.445,0.062-0.915,0.062-1.399\n\t\t\tc0-4.537-1.448-8.735-3.891-12.185l4.188-4.186l0.938,0.94c0.194,0.195,0.451,0.293,0.707,0.293s0.514-0.098,0.707-0.293\n\t\t\tc0.393-0.391,0.393-1.023,0-1.414l-3.562-3.56c-0.393-0.391-1.022-0.391-1.414,0c-0.393,0.391-0.393,1.023,0,1.414l1.205,1.205\n\t\t\tL43.78,7.394C39.894,2.876,34.151,0,27.739,0c-6.307,0-11.963,2.788-15.843,7.165L8.806,4.074L9.5,3.38\n\t\t\tc0.391-0.391,0.391-1.023,0-1.414c-0.391-0.391-1.023-0.391-1.414,0L5.001,5.049c-0.391,0.391-0.391,1.023,0,1.414\n\t\t\tc0.195,0.195,0.451,0.293,0.707,0.293S6.22,6.658,6.416,6.463l0.975-0.975l3.244,3.244c-2.542,3.481-4.06,7.744-4.059,12.353\n\t\t\tc-0.813,9.836-2.724,29.39-4.131,32.974c-0.121,0.309-0.082,0.653,0.104,0.93C2.735,55.259,3.045,55.421,3.376,55.421z\n\t\t\t M8.573,21.165c0-10.568,8.599-19.167,19.167-19.167c10.568,0,19.167,8.599,19.167,19.167c0,0.549-0.039,1.098-0.081,1.609\n\t\t\tc-0.013,0.117,0.008,0.232,0.046,0.343c-1.536,14.138,2.256,26.285,3.715,30.304H4.716C6.493,46.189,8.48,22.33,8.573,21.165z\"/><path d=\"M37.489,27.67c-0.553,0-1,0.447-1,1c0,0.713-0.577,1.291-1.291,1.291c-0.713,0-1.293-0.578-1.293-1.291\n\t\t\tc0-0.553-0.445-1-1-1c-0.553,0-1,0.447-1,1c0,0.713-0.577,1.291-1.291,1.291c-0.713,0-1.291-0.578-1.291-1.291\n\t\t\tc0-0.553-0.446-1-1-1s-1,0.447-1,1c0,0.713-0.579,1.291-1.292,1.291c-0.712,0-1.291-0.578-1.291-1.291c0-0.553-0.447-1-1-1\n\t\t\tc-0.553,0-1,0.447-1,1c0,0.713-0.579,1.291-1.292,1.291c-0.713,0-1.292-0.578-1.292-1.291c0-0.553-0.447-1-1-1\n\t\t\tc-0.553,0-1,0.447-1,1v5.541c0,1.814,1.477,3.291,3.292,3.291c0.891,0,1.699-0.357,2.292-0.936c0.593,0.576,1.4,0.936,2.291,0.936\n\t\t\tc0.893,0,1.699-0.357,2.292-0.936c0.594,0.576,1.398,0.936,2.291,0.936s1.697-0.357,2.291-0.936\n\t\t\tc0.595,0.576,1.4,0.936,2.293,0.936c1.814,0,3.291-1.477,3.291-3.291V28.67C38.489,28.118,38.044,27.67,37.489,27.67z\n\t\t\t M35.198,35.503c-0.713,0-1.293-0.578-1.293-1.291c0-0.553-0.445-1-1-1c-0.553,0-1,0.447-1,1c0,0.713-0.577,1.291-1.291,1.291\n\t\t\tc-0.713,0-1.291-0.578-1.291-1.291c0-0.553-0.446-1-1-1s-1,0.447-1,1c0,0.713-0.579,1.291-1.292,1.291\n\t\t\tc-0.712,0-1.291-0.578-1.291-1.291c0-0.553-0.447-1-1-1c-0.553,0-1,0.447-1,1c0,0.713-0.579,1.291-1.292,1.291\n\t\t\tc-0.713,0-1.292-0.578-1.292-1.291v-2.515c0.397,0.171,0.833,0.265,1.292,0.265c0.891,0,1.699-0.356,2.292-0.937\n\t\t\tc0.593,0.578,1.4,0.937,2.291,0.937c0.893,0,1.699-0.356,2.292-0.937c0.594,0.576,1.398,0.937,2.291,0.937\n\t\t\ts1.697-0.356,2.291-0.937c0.595,0.578,1.4,0.937,2.293,0.937c0.459,0,0.896-0.094,1.291-0.265v2.515\n\t\t\tC36.489,34.925,35.912,35.503,35.198,35.503z\"/><path d=\"M32.905,43.337h-8.362c-0.553,0-1,0.447-1,1c0,0.556,0.447,1,1,1h8.362c0.555,0,1-0.444,1-1\n\t\t\tC33.905,43.784,33.46,43.337,32.905,43.337z\"/><path d=\"M43.96,16.42c-0.555,0-1,0.447-1,1v14.021c0,0.554,0.445,1,1,1c0.553,0,1-0.446,1-1V17.42\n\t\t\tC44.96,16.868,44.513,16.42,43.96,16.42z\"/></g></g></svg>","other":"<svg viewBox=\"0 0 192 192\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h192v192H0z\" style=\"fill:none\"/><path d=\"M96 28c37.5 0 68 30.5 68 68s-30.5 68-68 68-68-30.5-68-68 30.5-68 68-68m0-12c-44.18 0-80 35.82-80 80s35.82 80 80 80 80-35.82 80-80-35.82-80-80-80Z\"/><path d=\"M65.79 122.67c3.66 13.61 16.07 23.16 30.14 23.19 14.13.03 26.61-9.53 30.28-23.19H65.78Z\" style=\"stroke:currentColor;stroke-linejoin:round;stroke-width:12px;fill:none\"/></svg>","none":"<svg fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" \n\t viewBox=\"0 0 100 100\" xml:space=\"preserve\"><g><path d=\"M50,22c-16.6,0-30,12.5-30,28c0,5,1.4,9.6,3.8,13.7c0.3,0.5,0.4,1.1,0.2,1.6l-2.8,8.9c-0.5,1.6,1,3,2.6,2.5\n\t\tl8.8-3.1c0.6-0.2,1.2-0.1,1.7,0.2c4.6,2.7,10,4.2,15.8,4.2c16.6,0,30-12.5,30-28C80,34.5,66.6,22,50,22z M53,67c0,1.1-0.9,2-2,2h-2\n\t\tc-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V67z M53.8,54.3c-0.4,0.1-0.8,0.5-0.8,1v1.6c0,1.1-0.9,2.1-2,2.1h-2\n\t\tc-1.1,0-2-1-2-2.1v-1.6c0-3,2-5.7,4.9-6.7c1.1-0.4,2.1-0.9,2.7-1.8c3.4-4.5,0-9.7-4.5-9.8c-1.6-0.1-3.2,0.6-4.4,1.7\n\t\tc-0.8,0.8-1.4,1.8-1.6,2.8c-0.2,0.9-1,1.6-1.9,1.6h-2.1c-1.2,0-2.2-1.2-2-2.4c0.5-2.4,1.6-4.6,3.4-6.3c2.3-2.3,5.4-3.5,8.7-3.4\n\t\tc6.3,0.2,11.5,5.4,11.7,11.7C62.1,47.9,58.9,52.6,53.8,54.3z\"/></g></svg>"};
  const root = document.getElementById('app');
  let hoverTimer = null;
  let hoverCard = null;
  let hoverHideTimer = null;

  const initialData = loadData();
  const state = {
    page: 'home',
    modal: null,
    selectedAnimeId: null,
    selectedEventId: null,
    search: '',
    priorityFilter: 'all',
    libraryView: initialData.settings?.libraryView || 'square',
    calendarMonth: isoDate(new Date(now().getFullYear(), now().getMonth(), 1)),
    calendarFilter: initialData.settings?.calendarFilter || 'all',
    uiScale: Number(initialData.settings?.uiScale || 1.25),
    reminderCenterOpen: false,
    animeDraft: null,
    convertingEventId: null,
    data: initialData
  };

  function isoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }

  function parseLocalDate(s) {
    const [y,m,d] = s.split('-').map(Number);
    return new Date(y, m-1, d, 0, 0, 0, 0);
  }

  function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate()+n);
    return d;
  }

  function mondayOf(date) {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    const day = d.getDay();
    d.setDate(d.getDate() - ((day + 6) % 7));
    return d;
  }

  function monthStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  }

  function addMonths(date, n) {
    return new Date(date.getFullYear(), date.getMonth() + n, 1, 0, 0, 0, 0);
  }

  function fmtMonthYear(d) {
    return capitalize(new Intl.DateTimeFormat('es-MX', { month:'long', year:'numeric' }).format(d));
  }

  function dateTime(dateStr, timeStr) {
    const d = parseLocalDate(dateStr);
    const [h,m] = (timeStr || '00:00').split(':').map(Number);
    d.setHours(h,m,0,0);
    return d;
  }

  function now() { return new Date(); }

  function fmtLongDate(d) {
    return new Intl.DateTimeFormat('es-MX', { weekday:'long', day:'numeric', month:'long' }).format(d);
  }

  function fmtShortDate(d) {
    return new Intl.DateTimeFormat('es-MX', { day:'2-digit', month:'short' }).format(d).replace('.','');
  }

  function fmtTime(t) { return t || '00:00'; }

  function uid() { return crypto?.randomUUID?.() || `id_${Date.now()}_${Math.random().toString(36).slice(2)}`; }

  function escapeHtml(str='') {
    return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function paletteFor(text='') {
    let h = 0;
    for (let i=0;i<text.length;i++) h = (h*31 + text.charCodeAt(i)) % 360;
    const h2 = (h + 42) % 360;
    return [`hsl(${h} 42% 34%)`, `hsl(${h2} 45% 19%)`];
  }

  function initials(name='?') {
    return name.split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase() || '?';
  }

  function normalizeSearchText(value='') {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  }

  function extractJapaneseName(base={}) {
    let japaneseName=String(base.japaneseName || base.originalTitle || '').trim();
    let notes=String(base.notes || '');
    if (!japaneseName && notes) {
      const lines=notes.split(/\r?\n/);
      const index=lines.findIndex(line=>/^\s*Nombre\s+en\s+japon[eé]s\s*:/i.test(line));
      if (index>=0) {
        const candidate=lines[index].replace(/^\s*Nombre\s+en\s+japon[eé]s\s*:\s*/i,'').trim();
        if (candidate) {
          japaneseName=candidate;
          lines.splice(index,1);
          notes=lines.join('\n').trim();
        }
      }
    }
    return {japaneseName,notes};
  }

  function defaultData() {
    return { animes:[], events:[], settings:{ firstRun:true, schemaVersion:8, libraryView:'square', calendarFilter:'all', uiScale:1.25, decorativeBackground:true, autoUpdate:true, dismissedReminders:[], notifiedReminders:[] } };
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.animes)) {
          const migrated = migrateData(parsed);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          return migrated;
        }
      }
    } catch (e) { console.warn('No se pudo leer la base local', e); }
    const d = defaultData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    return d;
  }

  function migrateData(data) {
    const previousSettings = data.settings || {};
    const migrated = {
      ...data,
      settings:{
        ...previousSettings,
        schemaVersion:8,
        libraryView:previousSettings.libraryView || 'square',
        calendarFilter:previousSettings.calendarFilter || 'all',
        uiScale:Number(previousSettings.uiScale || 1.25),
        decorativeBackground:previousSettings.decorativeBackground !== false,
        autoUpdate:previousSettings.autoUpdate !== false,
        dismissedReminders:Array.isArray(previousSettings.dismissedReminders)?previousSettings.dismissedReminders:[],
        notifiedReminders:Array.isArray(previousSettings.notifiedReminders)?previousSettings.notifiedReminders:[]
      }
    };
    migrated.animes = (data.animes || [])
      .filter(a => !isLegacyDemoAnime(a))
      .map(a => sanitizeAnime(migrateAnime(a)));
    migrated.events = (data.events || []).map(migrateEvent).filter(Boolean);
    return migrated;
  }

  function isLegacyDemoAnime(a) {
    const note = String(a?.notes || '').trim();
    return LEGACY_DEMO_NAMES.has(String(a?.name || '').trim()) && note.startsWith('Serie de demostración');
  }

  function episodeTimestampFor(anime, number) {
    const anchorDate = parseLocalDate(anime.anchorDate || anime.startDate || isoDate(now()));
    const anchorEpisode = Number(anime.anchorEpisode || anime.startEpisode || 1);
    const date = addDays(anchorDate, (Number(number) - anchorEpisode) * 7);
    return dateTime(isoDate(date), anime.time || '00:00').getTime();
  }

  function sanitizeReviewedList(anime, reviewed) {
    const total = Math.max(1, Number(anime.totalEpisodes || 1));
    const nowTs = now().getTime();
    return [...new Set((Array.isArray(reviewed) ? reviewed : []).map(Number))]
      .filter(n => Number.isInteger(n) && n >= 1 && n <= total && episodeTimestampFor(anime, n) <= nowTs)
      .sort((a,b)=>a-b);
  }

  function sanitizeAnime(anime) {
    return { ...anime, reviewed:sanitizeReviewedList(anime, anime.reviewed) };
  }

  function migrateAnime(a) {
    let base;
    if (a.anchorDate && Number.isFinite(Number(a.anchorEpisode))) {
      base = { ...a, anchorEpisode:Number(a.anchorEpisode), totalEpisodes:Number(a.totalEpisodes || 12), reviewed:Array.isArray(a.reviewed)?a.reviewed.map(Number):[] };
    } else {
      const legacyDate = a.startDate || isoDate(now());
      const legacyStart = Number(a.startEpisode || 1);
      const reviewed = Array.isArray(a.reviewed) ? a.reviewed.map(Number).filter(Number.isFinite) : [];
      let anchorEpisode = legacyStart;
      let anchorDate = legacyDate;
      const legacyTs = dateTime(legacyDate, a.time || '00:00').getTime();
      const reviewedSet = new Set(reviewed);
      let contiguous = legacyStart - 1;
      for (let n=legacyStart; reviewedSet.has(n); n++) contiguous=n;
      if (legacyTs > now().getTime() && contiguous >= legacyStart) anchorEpisode = contiguous + 1;
      base = { ...a, anchorDate, anchorEpisode, totalEpisodes:Number(a.totalEpisodes || 12), reviewed };
    }
    const titleData=extractJapaneseName(base);
    return {
      ...base,
      japaneseName:titleData.japaneseName,
      notes:titleData.notes,
      preRelease:Boolean(base.preRelease),
      watchLinks:normalizeLinks(base.watchLinks || []),
      reminders:normalizeReminderConfig(base.reminders, true)
    };
  }

  function migrateEvent(ev) {
    if (!ev || !ev.title || !ev.date) return null;
    return {
      id:ev.id || uid(),
      title:String(ev.title),
      date:String(ev.date),
      time:String(ev.time || '18:00'),
      allDay:Boolean(ev.allDay),
      type:EVENT_TYPES[ev.type] ? ev.type : 'event',
      notes:String(ev.notes || ''),
      links:normalizeLinks(ev.links || []),
      imageUrl:String(ev.imageUrl || ''),
      reminders:normalizeReminderConfig(ev.reminders, false),
      createdAt:Number(ev.createdAt || Date.now())
    };
  }

  function normalizeLinks(links) {
    return (Array.isArray(links) ? links : []).map(link=>{
      const name=String(link?.name || '').trim();
      let source=String(link?.source || '').trim();
      if (!source) {
        const lower=name.toLowerCase();
        source=lower.includes('erai')?'erai':lower.includes('tio')?'tioanime':'other';
      }
      if (!LINK_PRESETS[source]) source='other';
      return {
        id:link?.id || uid(),
        name,
        url:String(link?.url || '').trim(),
        note:String(link?.note || '').trim(),
        source
      };
    }).filter(link=>link.url);
  }

  function normalizeReminderConfig(value, anime=false) {
    const raw=value && typeof value==='object' ? value : {};
    const offsets=Array.isArray(raw.offsets)?raw.offsets.map(Number).filter(n=>Number.isFinite(n)&&n>=0):[];
    return {
      enabled:Boolean(raw.enabled),
      premiere:anime ? (raw.premiere !== false) : false,
      episodes:anime ? (raw.episodes !== false) : false,
      offsets:[...new Set(offsets)].sort((a,b)=>b-a)
    };
  }

  function reminderOffsetsFromForm(f, prefix) {
    const out=[];
    for (const preset of REMINDER_PRESETS) if (f.get(`${prefix}Reminder_${preset.minutes}`)==='on') out.push(preset.minutes);
    const custom=Number(f.get(`${prefix}ReminderCustomDays`) || 0);
    if (Number.isFinite(custom) && custom>0) out.push(Math.round(custom*1440));
    return [...new Set(out)].sort((a,b)=>b-a);
  }

  function reminderConfigFromForm(f,prefix,anime=false) {
    const offsets=reminderOffsetsFromForm(f,prefix);
    return {enabled:offsets.length>0,premiere:anime?f.get(`${prefix}ReminderPremiere`)==='on':false,episodes:anime?f.get(`${prefix}ReminderEpisodes`)==='on':false,offsets};
  }

  function reminderLabel(minutes) {
    if (minutes===0) return 'El mismo día';
    if (minutes%10080===0) { const n=minutes/10080; return `${n} semana${n===1?'':'s'} antes`; }
    if (minutes%1440===0) { const n=minutes/1440; return `${n} día${n===1?'':'s'} antes`; }
    if (minutes%60===0) { const n=minutes/60; return `${n} hora${n===1?'':'s'} antes`; }
    return `${minutes} min antes`;
  }

  function reminderEditor(config,prefix,anime=false) {
    const c=normalizeReminderConfig(config,anime);
    const presets=REMINDER_PRESETS.map(r=>`<label class="reminder-chip"><input type="checkbox" name="${prefix}Reminder_${r.minutes}" ${c.offsets.includes(r.minutes)?'checked':''}><span>${r.label}</span></label>`).join('');
    const custom=c.offsets.find(x=>!REMINDER_PRESETS.some(p=>p.minutes===x));
    return `<div class="form-section full reminder-section"><div class="form-section-head"><div><strong>Recordatorios</strong><span>Te avisaremos al llegar cada anticipación configurada.</span></div></div>${anime?`<div class="reminder-targets"><label><input type="checkbox" name="${prefix}ReminderPremiere" ${c.premiere?'checked':''}> Estreno de la serie</label><label><input type="checkbox" name="${prefix}ReminderEpisodes" ${c.episodes?'checked':''}> Cada episodio</label></div>`:''}<div class="reminder-presets">${presets}</div><div class="reminder-custom"><span>Personalizado</span><input name="${prefix}ReminderCustomDays" type="number" min="1" max="365" step="1" value="${custom?Math.round(custom/1440):''}" placeholder="Días"><small>días antes</small></div><div class="field-hint">Si Mokost estaba cerrado cuando tocaba un aviso, aparecerá como pendiente la próxima vez que abras la app.</div></div>`;
  }

  function reminderBaseTimestampForEvent(ev) {
    return dateTime(ev.date, ev.allDay ? '09:00' : (ev.time || '18:00')).getTime();
  }

  function reminderOccurrences() {
    const out=[];
    for (const anime of state.data.animes) {
      const cfg=normalizeReminderConfig(anime.reminders,true);
      if (!cfg.enabled || !cfg.offsets.length) continue;
      for (const ep of episodesFor(anime)) {
        const isPremiere=Boolean(anime.preRelease && ep.number===1);
        if (isPremiere ? !cfg.premiere : !cfg.episodes) continue;
        if (anime.preRelease && episodeTimestampFor(anime,1)>now().getTime() && ep.number>1) continue;
        for (const offset of cfg.offsets) {
          const target=ep.timestamp;
          out.push({key:`anime:${anime.id}:${ep.number}:${offset}:${target}`,kind:isPremiere?'premiere':'episode',animeId:anime.id,title:anime.name,subtitle:isPremiere?'Estreno de la serie':`Episodio ${ep.number}`,target,due:target-offset*60000,offset});
        }
      }
    }
    for (const ev of state.data.events||[]) {
      const cfg=normalizeReminderConfig(ev.reminders,false);
      if (!cfg.enabled || !cfg.offsets.length) continue;
      const target=reminderBaseTimestampForEvent(ev);
      for (const offset of cfg.offsets) out.push({key:`event:${ev.id}:${offset}:${target}`,kind:'event',eventId:ev.id,title:ev.title,subtitle:EVENT_TYPES[ev.type]||'Evento',target,due:target-offset*60000,offset});
    }
    return out;
  }

  function activeReminders() {
    const current=now().getTime();
    const dismissed=new Set(state.data.settings?.dismissedReminders||[]);
    return reminderOccurrences().filter(r=>r.due<=current && r.target>=current-86400000 && !dismissed.has(r.key)).sort((a,b)=>a.due-b.due);
  }

  async function sendNativeReminder(r) {
    const body=`${r.subtitle} · ${reminderLabel(r.offset)}`;
    try {
      const api=window.__TAURI__?.notification;
      if (api?.isPermissionGranted && api?.sendNotification) {
        let ok=await api.isPermissionGranted();
        if (!ok && api.requestPermission) ok=(await api.requestPermission())==='granted';
        if (ok) { api.sendNotification({title:`Mokost · ${r.title}`,body}); return; }
      }
      if ('Notification' in window) {
        if (Notification.permission==='default') await Notification.requestPermission();
        if (Notification.permission==='granted') new Notification(`Mokost · ${r.title}`,{body});
      }
    } catch (err) { console.warn('No se pudo enviar la notificación',err); }
  }

  function checkReminders() {
    const active=activeReminders();
    const notified=new Set(state.data.settings?.notifiedReminders||[]);
    const fresh=active.filter(r=>!notified.has(r.key));
    if (fresh.length) {
      state.data.settings.notifiedReminders=[...notified,...fresh.map(r=>r.key)].slice(-1500);
      saveData();
      fresh.slice(0,3).forEach(sendNativeReminder);
      if (!state.modal) render();
    }
  }

  function dismissReminder(key) {
    const set=new Set(state.data.settings?.dismissedReminders||[]); set.add(key);
    state.data.settings.dismissedReminders=[...set].slice(-1500); saveData(); render();
  }

  function reminderCenterModal() {
    const items=activeReminders();
    return `<div class="modal-backdrop" data-close-reminders><div class="modal reminder-modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div class="modal-title">Recordatorios</div><button class="icon-btn" data-close-reminders>×</button></div><div class="modal-body"><div class="reminder-center-list">${items.length?items.map(r=>`<div class="reminder-center-item"><div class="reminder-bell">◉</div><div><strong>${escapeHtml(r.title)}</strong><span>${escapeHtml(r.subtitle)} · ${escapeHtml(reminderLabel(r.offset))}</span><small>${escapeHtml(compactDateLabel(isoDate(new Date(r.target))))} · ${new Intl.DateTimeFormat('es-MX',{hour:'2-digit',minute:'2-digit'}).format(new Date(r.target))}</small></div><button class="btn compact" data-open-reminder="${escapeHtml(r.key)}">Ver</button><button class="icon-btn" data-dismiss-reminder="${escapeHtml(r.key)}" title="Descartar">×</button></div>`).join(''):`<div class="empty"><strong>Todo al día</strong>No tienes recordatorios pendientes.</div>`}</div></div><div class="modal-actions"><div></div><button class="btn primary" data-close-reminders>Cerrar</button></div></div></div>`;
  }

  function normalizeHttpUrl(raw) {
    let value=String(raw || '').trim();
    if (!value) return '';
    if (!/^https?:\/\//i.test(value)) value=`https://${value}`;
    try {
      const u=new URL(value);
      if (!['http:','https:'].includes(u.protocol)) return '';
      return u.href;
    } catch (_) { return ''; }
  }

  function linksFromForm(f, prefix='watch') {
    const names=f.getAll(`${prefix}Name`);
    const urls=f.getAll(`${prefix}Url`);
    const notes=f.getAll(`${prefix}Note`);
    const out=[];
    for (let i=0;i<Math.max(names.length,urls.length);i++) {
      const raw=String(urls[i] || '').trim();
      if (!raw) continue;
      const url=normalizeHttpUrl(raw);
      if (!url) throw new Error(`URL_INVALID:${raw}`);
      let name=String(names[i] || '').trim();
      if (!name) { try { name=new URL(url).hostname.replace(/^www\./,''); } catch (_) { name='Enlace'; } }
      const sources=f.getAll(`${prefix}Source`);
      let source=String(sources[i] || 'other'); if(!LINK_PRESETS[source])source='other';
      out.push({id:uid(),name,url,note:String(notes[i] || '').trim(),source});
    }
    return out;
  }

  function animePhase(anime) {
    const nowTs=now().getTime();
    const premiereTs=episodeTimestampFor(anime,1);
    if (anime.preRelease && premiereTs > nowTs) {
      return isoDate(new Date(premiereTs))===isoDate(now()) ? 'premiere-today' : 'pre-release';
    }
    const lastTs=episodeTimestampFor(anime,Math.max(1,Number(anime.totalEpisodes||1)));
    if (nowTs >= lastTs) return 'finished';
    return 'airing';
  }

  function animePhaseLabel(anime) {
    const phase=animePhase(anime);
    if (phase==='pre-release') return 'Próximo estreno';
    if (phase==='premiere-today') return 'Estreno hoy';
    if (phase==='finished') return 'Finalizado';
    return 'En emisión';
  }

  function isBeforePremiere(anime) {
    const phase=animePhase(anime);
    return phase==='pre-release' || phase==='premiere-today';
  }

  function premiereEpisode(anime) {
    return episodesFor(anime).find(ep=>ep.number===1) || null;
  }

  function eventTimestamp(ev) {
    return dateTime(ev.date, ev.allDay ? '00:00' : (ev.time || '00:00')).getTime();
  }

  function agendaEntries() {
    const entries=[];
    for (const anime of state.data.animes) {
      const premiereTs=episodeTimestampFor(anime,1);
      for (const ep of episodesFor(anime)) {
        if (anime.preRelease && premiereTs > now().getTime() && ep.number > 1) continue;
        entries.push({
          kind:(anime.preRelease && ep.number===1) ? 'premiere' : 'episode',
          animeId:anime.id,
          anime,
          episode:ep,
          date:ep.date,
          time:ep.time,
          timestamp:ep.timestamp
        });
      }
    }
    for (const ev of state.data.events || []) {
      entries.push({kind:'event',event:ev,date:ev.date,time:ev.allDay?'':ev.time,timestamp:eventTimestamp(ev)});
    }
    return entries.sort((a,b)=>a.timestamp-b.timestamp);
  }

  function filterAgendaEntries(entries) {
    if (state.calendarFilter==='all') return entries;
    const kind=state.calendarFilter==='episodes'?'episode':state.calendarFilter==='premieres'?'premiere':'event';
    return entries.filter(x=>x.kind===kind);
  }

  function agendaFilterBar() {
    const items=[['all','Todos'],['episodes','Episodios'],['premieres','Estrenos'],['events','Eventos']];
    return `<div class="agenda-filterbar">${items.map(([id,label])=>`<button class="agenda-filter ${state.calendarFilter===id?'active':''}" data-calendar-filter="${id}">${label}</button>`).join('')}</div>`;
  }

  function compactDateLabel(dateStr) {
    return capitalize(new Intl.DateTimeFormat('es-MX',{weekday:'short',day:'numeric',month:'short'}).format(parseLocalDate(dateStr)).replace('.',''));
  }

  function countdownFull(ts) {
    const diff=ts-now().getTime();
    if (diff<=0) return 'Hoy';
    const days=Math.ceil(diff/86400000);
    if (days===1) return 'Mañana';
    return `En ${days} días`;
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  }

  function episodesFor(anime) {
    const anchorDate = parseLocalDate(anime.anchorDate || anime.startDate || isoDate(now()));
    const anchorEpisode = Number(anime.anchorEpisode || anime.startEpisode || 1);
    const total = Math.max(1, Number(anime.totalEpisodes || 1));
    const out = [];
    for (let number=1; number<=total; number++) {
      const date = addDays(anchorDate, (number-anchorEpisode)*7);
      out.push({
        animeId:anime.id,
        animeName:anime.name,
        anime,
        number,
        index:number-1,
        date:isoDate(date),
        time:anime.time,
        reviewed:(anime.reviewed || []).includes(number),
        timestamp:dateTime(isoDate(date), anime.time).getTime()
      });
    }
    return out;
  }

  function allEpisodes() {
    return state.data.animes.flatMap(episodesFor).sort((a,b)=>a.timestamp-b.timestamp);
  }

  function statusFor(ep) {
    // El tiempo manda: un episodio futuro nunca puede mostrarse como revisado.
    if (ep.timestamp > now().getTime()) return 'upcoming';
    if (ep.reviewed) return 'reviewed';
    return 'available';
  }

  function animeStats(anime) {
    const eps = episodesFor(anime);
    const stats = { total:eps.length, reviewed:0, available:0, upcoming:0, emitted:0, remaining:0, reviewedPercent:0, nextAvailable:null, nextScheduled:null };
    for (const ep of eps) {
      const st = statusFor(ep);
      stats[st] += 1;
      if (st !== 'upcoming') stats.emitted += 1;
      if (!stats.nextAvailable && st === 'available') stats.nextAvailable = ep;
      if (!stats.nextScheduled && st === 'upcoming') stats.nextScheduled = ep;
    }
    stats.remaining = Math.max(0, stats.total - stats.reviewed);
    stats.reviewedPercent = stats.total ? Math.round((stats.reviewed / stats.total) * 100) : 0;
    return stats;
  }

  function nextEpisode(anime) {
    const stats = animeStats(anime);
    if (stats.nextAvailable) return stats.nextAvailable;
    if (stats.nextScheduled) return stats.nextScheduled;
    const eps = episodesFor(anime);
    return eps[eps.length-1] || null;
  }

  function nextScheduledEpisode(anime) {
    const eps = episodesFor(anime);
    return eps.find(ep => ep.timestamp > now().getTime()) || null;
  }

  function statusLabel(ep) {
    const st = statusFor(ep);
    if (st==='reviewed') return 'Revisado';
    if (st==='available') return 'Disponible';
    return 'Próximo';
  }

  function statusDescription(st) {
    if (st==='available') return 'Ya se estrenó y sigue pendiente de revisar.';
    if (st==='reviewed') return 'Ya lo atendiste o revisaste.';
    return 'Todavía no llega su fecha y hora de estreno.';
  }

  function progress(anime) {
    return animeStats(anime).reviewedPercent;
  }

  function releaseRow(ep) {
    const a = ep.anime;
    const [pa,pb] = paletteFor(a.name);
    const status = statusFor(ep);
    const label = status === 'upcoming' ? countdownLabel(ep.timestamp) : statusLabel(ep);
    const action = status === 'upcoming'
      ? `<button class="icon-btn disabled" title="Aún no se estrena" disabled>○</button>`
      : `<button class="icon-btn" title="${status==='reviewed'?'Marcar como pendiente':'Marcar como revisado'}" data-toggle-reviewed="${a.id}|${ep.number}">${status==='reviewed'?'↺':'✓'}</button>`;
    return `<div class="release-row" data-open-anime="${a.id}" data-hover-anime="${a.id}" data-hover-episode="${ep.number}">
      <div class="time">${escapeHtml(fmtTime(ep.time))}</div>
      <div style="display:flex;align-items:center;gap:12px;min-width:0">
        <div class="poster-mini" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl ? `<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">` : escapeHtml(initials(a.name))}</div>
        <div style="min-width:0"><div class="release-name">${escapeHtml(a.name)}</div><div class="release-episode">Episodio ${ep.number}</div></div>
      </div>
      <span class="pill ${status}" title="${escapeHtml(statusDescription(status))}">${escapeHtml(label)}</span>
      ${action}
    </div>`;
  }

  function countdownLabel(ts) {
    const diff = ts - now().getTime();
    if (diff <= 0) return 'Disponible';
    const mins = Math.floor(diff/60000);
    if (mins < 60) return `En ${Math.max(1,mins)} min`;
    const hours = Math.floor(mins/60);
    if (hours < 24) return `En ${hours} h`;
    const days = Math.ceil(hours/24);
    return `En ${days} d`;
  }

  function homePage() {
    const todayIso = isoDate(now());
    const tomorrowIso = isoDate(addDays(now(),1));
    const entries = agendaEntries();
    const todayEntries = entries.filter(x=>x.date===todayIso);
    const tomorrowEntries = entries.filter(x=>x.date===tomorrowIso);
    const eps = allEpisodes();
    const available = eps.filter(ep=>statusFor(ep)==='available').length;
    const weekEnd=addDays(now(),7).getTime();
    const next7 = entries.filter(x=>x.timestamp >= parseLocalDate(todayIso).getTime() && x.timestamp < weekEnd).length;
    const reviewedWeek = eps.filter(ep=>ep.reviewed && ep.timestamp >= mondayOf(now()).getTime() && ep.timestamp < addDays(mondayOf(now()),7).getTime()).length;
    const upcomingSeries = state.data.animes.filter(a=>isBeforePremiere(a)).sort((a,b)=>episodeTimestampFor(a,1)-episodeTimestampFor(b,1)).slice(0,6);
    const upcomingEvents = (state.data.events || []).filter(ev=>eventTimestamp(ev)>=parseLocalDate(todayIso).getTime()).sort((a,b)=>eventTimestamp(a)-eventTimestamp(b)).slice(0,6);
    return `
      ${header('Inicio', capitalize(fmtLongDate(now())), 'Tu agenda de estrenos, eventos y próximas temporadas.')}
      <div class="grid stats">
        ${stat('Agenda hoy', todayEntries.length, 'elementos programados')}
        ${stat('Disponibles', available, 'episodios pendientes')}
        ${stat('Próximos 7 días', next7, 'episodios, estrenos y eventos')}
        ${stat('Revisados', reviewedWeek, 'esta semana')}
      </div>
      <div class="status-guide">
        <span><b class="status-dot upcoming"></b><strong>Próximo</strong> aún no se estrena</span>
        <span><b class="status-dot available"></b><strong>Disponible</strong> ya salió y está pendiente</span>
        <span><b class="status-dot reviewed"></b><strong>Revisado</strong> ya lo atendiste</span>
        <span><b class="status-dot event"></b><strong>Evento</strong> fecha especial de tu agenda</span>
      </div>
      <section class="section">
        <div class="section-head"><div><div class="section-title">Hoy</div><div class="section-meta">Todo lo que ocurre hoy.</div></div></div>
        <div class="release-list">${todayEntries.length ? sortAgenda(todayEntries).map(homeAgendaRow).join('') : empty('Día libre','No hay episodios, estrenos ni eventos programados hoy.')}</div>
      </section>
      <section class="section">
        <div class="section-head"><div><div class="section-title">Mañana</div><div class="section-meta">Lo siguiente en tu agenda.</div></div></div>
        <div class="release-list">${tomorrowEntries.length ? sortAgenda(tomorrowEntries).map(homeAgendaRow).join('') : empty('Sin agenda mañana','No tienes elementos programados para mañana.')}</div>
      </section>
      ${(upcomingSeries.length || upcomingEvents.length) ? `<div class="home-future-grid">
        <section class="section future-panel"><div class="section-head"><div><div class="section-title">Próximos estrenos de series</div><div class="section-meta">Anime con fecha de debut confirmada.</div></div></div><div class="future-list">${upcomingSeries.length?upcomingSeries.map(premiereMiniRow).join(''):empty('Sin estrenos próximos','Marca una serie como “Aún no se estrena”.')}</div></section>
        <section class="section future-panel"><div class="section-head"><div><div class="section-title">Próximos eventos</div><div class="section-meta">Fechas especiales que no son episodios.</div></div></div><div class="future-list">${upcomingEvents.length?upcomingEvents.map(eventMiniRow).join(''):empty('Sin eventos próximos','Agrega un evento desde el botón “+ Evento”.')}</div></section>
      </div>` : ''}`;
  }

  function sortAgenda(entries) {
    const rank={high:0,normal:1,low:2};
    return [...entries].sort((a,b)=>{
      if (a.kind==='event' && b.kind!=='event') return 1;
      if (b.kind==='event' && a.kind!=='event') return -1;
      const pa=a.anime ? (rank[a.anime.priority]??1) : 1;
      const pb=b.anime ? (rank[b.anime.priority]??1) : 1;
      return pa-pb || a.timestamp-b.timestamp;
    });
  }

  function homeAgendaRow(entry) {
    if (entry.kind==='event') return eventReleaseRow(entry.event);
    // El debut conserva su identidad de “estreno” en Mes/Semana, pero una vez llega la hora
    // Inicio lo trata como EP1 disponible para que el cambio de estado sea evidente.
    if (entry.kind==='premiere' && entry.timestamp > now().getTime()) return premiereReleaseRow(entry.episode);
    return releaseRow(entry.episode);
  }

  function premiereReleaseRow(ep) {
    const a=ep.anime; const [pa,pb]=paletteFor(a.name);
    return `<div class="release-row premiere-row" data-open-anime="${a.id}" data-hover-anime="${a.id}" data-hover-episode="1"><div class="time">${fmtTime(ep.time)}</div><div style="display:flex;align-items:center;gap:12px;min-width:0"><div class="poster-mini" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl?`<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">`:escapeHtml(initials(a.name))}</div><div style="min-width:0"><div class="release-name">${escapeHtml(a.name)}</div><div class="release-episode">Estreno de la serie</div></div></div><span class="pill premiere">★ Estreno</span><span class="release-countdown">${escapeHtml(countdownFull(ep.timestamp))}</span></div>`;
  }

  function eventReleaseRow(ev) {
    return `<div class="release-row event-row" data-open-event="${ev.id}" data-hover-event="${ev.id}"><div class="time">${ev.allDay?'Todo el día':fmtTime(ev.time)}</div><div class="event-row-main"><div class="event-mark">${ev.imageUrl?`<img src="${escapeHtml(ev.imageUrl)}" onerror="this.remove()">`:'◇'}</div><div><div class="release-name">${escapeHtml(ev.title)}</div><div class="release-episode">${escapeHtml(EVENT_TYPES[ev.type] || 'Evento')}</div></div></div><span class="pill event">Evento</span><span></span></div>`;
  }

  function premiereMiniRow(a) {
    const ep=premiereEpisode(a); if (!ep) return '';
    const [pa,pb]=paletteFor(a.name);
    return `<div class="future-item" data-open-anime="${a.id}" data-hover-anime="${a.id}" data-hover-episode="1"><div class="future-thumb" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl?`<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">`:escapeHtml(initials(a.name).slice(0,1))}</div><div><strong>${escapeHtml(a.name)}</strong><span>${compactDateLabel(ep.date)} · ${fmtTime(ep.time)}</span></div><b>${escapeHtml(countdownFull(ep.timestamp))}</b></div>`;
  }

  function eventMiniRow(ev) {
    return `<div class="future-item event-future" data-open-event="${ev.id}" data-hover-event="${ev.id}"><div class="future-thumb event-icon">${ev.imageUrl?`<img src="${escapeHtml(ev.imageUrl)}" onerror="this.remove()">`:'◇'}</div><div><strong>${escapeHtml(ev.title)}</strong><span>${compactDateLabel(ev.date)}${ev.allDay?' · Todo el día':` · ${fmtTime(ev.time)}`}</span></div><b>${escapeHtml(countdownFull(eventTimestamp(ev)))}</b></div>`;
  }

  function sortPriority(eps) {
    const rank = {high:0,normal:1,low:2};
    return [...eps].sort((a,b)=>(rank[a.anime.priority]??1)-(rank[b.anime.priority]??1) || a.timestamp-b.timestamp);
  }

  function stat(label,value,note) {
    return `<div class="stat"><div class="stat-label">${label}</div><div class="stat-value">${value}</div><div class="stat-note">${note}</div></div>`;
  }

  function empty(title,copy) {
    return `<div class="empty"><strong>${title}</strong>${copy}</div>`;
  }

  function weekPage() {
    const start = mondayOf(now());
    const end = addDays(start,6);
    const entries = filterAgendaEntries(agendaEntries());
    let cols = '';
    for (let i=0;i<7;i++) {
      const d = addDays(start,i);
      const key = isoDate(d);
      const dayEntries = sortAgenda(entries.filter(x=>x.date===key));
      const countBadge = dayEntries.length >= 2 ? `<span class="day-count">${agendaCountLabel(dayEntries)}</span>` : '';
      cols += `<div class="day-column ${key===isoDate(now())?'today':''}"><div class="day-head"><div><span class="day-name">${DAY_SHORT[d.getDay()]}</span>${countBadge}</div><span class="day-num">${d.getDate()}</span></div><div class="week-items">${dayEntries.map(weekAgendaCard).join('') || `<div class="week-empty">Sin elementos</div>`}</div></div>`;
    }
    return `${header('Semana', `${fmtShortDate(start)} — ${fmtShortDate(end)}`, 'Episodios, estrenos de series y eventos de la semana actual.')}${agendaFilterBar()}<div class="week-grid">${cols}</div>`;
  }

  function agendaCountLabel(entries) {
    const eps=entries.filter(x=>x.kind==='episode').length;
    const premieres=entries.filter(x=>x.kind==='premiere').length;
    const events=entries.filter(x=>x.kind==='event').length;
    const parts=[];
    if (eps) parts.push(`${eps} ep${eps===1?'':'s'}`);
    if (premieres) parts.push(`${premieres} estreno${premieres===1?'':'s'}`);
    if (events) parts.push(`${events} evento${events===1?'':'s'}`);
    return parts.join(' · ');
  }

  function weekAgendaCard(entry) {
    if (entry.kind==='event') return weekEventCard(entry.event);
    if (entry.kind==='premiere') return weekPremiereCard(entry.episode);
    return weekReleaseCard(entry.episode);
  }

  function weekReleaseCard(ep) {
    const a = ep.anime;
    const [pa,pb] = paletteFor(a.name);
    const st = statusFor(ep);
    const label = st==='reviewed' ? 'Revisado' : st==='available' ? 'Disponible' : 'Próximo';
    return `<div class="week-item" data-open-anime="${ep.animeId}" data-hover-anime="${ep.animeId}" data-hover-episode="${ep.number}"><div class="week-thumb" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl ? `<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">` : escapeHtml(initials(a.name).slice(0,1))}</div><div class="week-copy"><div class="week-time">${fmtTime(ep.time)}</div><div class="week-title">${escapeHtml(ep.animeName)}</div><div class="week-ep">EP ${ep.number} · ${label}</div></div></div>`;
  }

  function weekPremiereCard(ep) {
    const a=ep.anime; const [pa,pb]=paletteFor(a.name);
    return `<div class="week-item week-premiere" data-open-anime="${a.id}" data-hover-anime="${a.id}" data-hover-episode="1"><div class="week-thumb" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl?`<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">`:escapeHtml(initials(a.name).slice(0,1))}</div><div class="week-copy"><div class="week-time">${fmtTime(ep.time)}</div><div class="week-title">${escapeHtml(a.name)}</div><div class="week-ep premiere-text">★ Estreno de la serie</div></div></div>`;
  }

  function weekEventCard(ev) {
    return `<div class="week-item week-event" data-open-event="${ev.id}" data-hover-event="${ev.id}"><div class="week-thumb event-icon">${ev.imageUrl?`<img src="${escapeHtml(ev.imageUrl)}" onerror="this.remove()">`:'◇'}</div><div class="week-copy"><div class="week-time">${ev.allDay?'Todo el día':fmtTime(ev.time)}</div><div class="week-title">${escapeHtml(ev.title)}</div><div class="week-ep event-text">${escapeHtml(EVENT_TYPES[ev.type] || 'Evento')}</div></div></div>`;
  }

  function monthPage() {
    const cursor = monthStart(parseLocalDate(state.calendarMonth));
    const gridStart = mondayOf(cursor);
    const entries = filterAgendaEntries(agendaEntries());
    let cells = '';
    for (let i=0;i<42;i++) {
      const d = addDays(gridStart,i);
      const key = isoDate(d);
      const dayEntries = sortAgenda(entries.filter(x=>x.date===key));
      const inMonth = d.getMonth()===cursor.getMonth();
      const isToday = key===isoDate(now());
      const visible = dayEntries.slice(0,3);
      const more = dayEntries.length-visible.length;
      cells += `<div class="month-cell ${inMonth?'':'outside'} ${isToday?'today':''}"><div class="month-cell-head"><span class="month-day-num">${d.getDate()}</span>${dayEntries.length>=2?`<span class="month-count">${agendaCountLabel(dayEntries)}</span>`:''}</div><div class="month-releases">${visible.map(monthAgendaEntry).join('')}${more>0?`<div class="month-more">+${more} más</div>`:''}</div></div>`;
    }
    return `${monthHeader(cursor)}${agendaFilterBar()}<div class="month-calendar"><div class="month-weekdays">${['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'].map(x=>`<div>${x}</div>`).join('')}</div><div class="month-grid">${cells}</div></div>`;
  }

  function monthAgendaEntry(entry) {
    if (entry.kind==='event') return monthEvent(entry.event);
    if (entry.kind==='premiere') return monthPremiere(entry.episode);
    return monthRelease(entry.episode);
  }

  function monthHeader(cursor) {
    return `<div class="topbar month-topbar"><div><div class="eyebrow">Calendario</div><h1>${escapeHtml(fmtMonthYear(cursor))}</h1><div class="subtitle">Tu mes completo: episodios, estrenos y eventos.</div></div><div class="toolbar month-toolbar"><button class="btn" data-month-nav="today">Hoy</button><button class="icon-btn month-nav" data-month-nav="prev" title="Mes anterior">‹</button><button class="icon-btn month-nav" data-month-nav="next" title="Mes siguiente">›</button><button class="btn" data-add-event>+ Evento</button><button class="btn primary" data-add-anime>+ Anime</button></div></div>`;
  }

  function monthRelease(ep) {
    const a = ep.anime;
    const [pa,pb] = paletteFor(a.name);
    const st = statusFor(ep);
    return `<div class="month-release ${st}" data-open-anime="${ep.animeId}" data-hover-anime="${ep.animeId}" data-hover-episode="${ep.number}"><div class="month-thumb" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl ? `<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">` : escapeHtml(initials(a.name).slice(0,1))}</div><div class="month-release-copy"><strong>${escapeHtml(a.name)}</strong><span>EP ${ep.number} · ${fmtTime(ep.time)}</span></div></div>`;
  }

  function monthPremiere(ep) {
    const a=ep.anime; const [pa,pb]=paletteFor(a.name);
    return `<div class="month-release premiere" data-open-anime="${a.id}" data-hover-anime="${a.id}" data-hover-episode="1"><div class="month-thumb" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl?`<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">`:escapeHtml(initials(a.name).slice(0,1))}</div><div class="month-release-copy"><strong>${escapeHtml(a.name)}</strong><span>★ ESTRENO · ${fmtTime(ep.time)}</span></div></div>`;
  }

  function monthEvent(ev) {
    return `<div class="month-release event" data-open-event="${ev.id}" data-hover-event="${ev.id}"><div class="month-thumb event-icon">${ev.imageUrl?`<img src="${escapeHtml(ev.imageUrl)}" onerror="this.remove()">`:'◇'}</div><div class="month-release-copy"><strong>${escapeHtml(ev.title)}</strong><span>${escapeHtml(EVENT_TYPES[ev.type] || 'Evento')}${ev.allDay?'':` · ${fmtTime(ev.time)}`}</span></div></div>`;
  }

  function animePage() {
    const term = normalizeSearchText(state.search);
    const list = state.data.animes.filter(a => {
      const nameMatch=normalizeSearchText(a.name).includes(term);
      const japaneseMatch=normalizeSearchText(a.japaneseName).includes(term);
      return (!term || nameMatch || japaneseMatch) && (state.priorityFilter==='all' || a.priority===state.priorityFilter);
    });
    const viewLabels = {square:'Cuadrado', poster:'Portada', list:'Lista'};
    return `${header('Animes','Biblioteca','Series que alimentan automáticamente tu calendario.')}
      <div class="catalog-controls">
        <input class="search" id="animeSearch" placeholder="Buscar por nombre o japonés…" value="${escapeHtml(state.search)}">
        <select class="select" id="priorityFilter"><option value="all">Todas las prioridades</option><option value="high" ${state.priorityFilter==='high'?'selected':''}>Alta</option><option value="normal" ${state.priorityFilter==='normal'?'selected':''}>Normal</option><option value="low" ${state.priorityFilter==='low'?'selected':''}>Baja</option></select>
        <button class="btn primary" data-add-anime>+ Agregar</button>
      </div>
      <div class="library-viewbar">
        <div><strong>Vista</strong><span>${viewLabels[state.libraryView] || 'Cuadrado'}</span></div>
        <div class="view-switch" role="group" aria-label="Modo de vista de la biblioteca">
          <button class="view-option ${state.libraryView==='square'?'active':''}" data-library-view="square" title="Miniaturas cuadradas"><span class="view-glyph">▦</span> Cuadrado</button>
          <button class="view-option ${state.libraryView==='poster'?'active':''}" data-library-view="poster" title="Portadas verticales completas"><span class="view-glyph">▯</span> Portada</button>
          <button class="view-option ${state.libraryView==='list'?'active':''}" data-library-view="list" title="Lista compacta"><span class="view-glyph">☷</span> Lista</button>
        </div>
      </div>
      <div class="anime-library view-${state.libraryView}"><div class="anime-grid">${list.length ? list.map(animeCard).join('') : empty('No encontré resultados','Prueba otro filtro o agrega una serie nueva.')}</div></div>`;
  }

  function animeCard(a) {
    const [pa,pb] = paletteFor(a.name);
    const phase=animePhase(a);
    const beforePremiere=isBeforePremiere(a);
    const n = nextEpisode(a);
    let focusText='Sin episodios';
    let scheduleDay='—';
    let nextDate='—';
    if (beforePremiere) {
      const premiere=premiereEpisode(a);
      focusText=premiere ? `${phase==='premiere-today'?'Estreno hoy':'Estreno'}: ${compactDateLabel(premiere.date)}` : 'Próximo estreno';
      scheduleDay=animePhaseLabel(a);
      nextDate=premiere ? countdownFull(premiere.timestamp) : '—';
    } else if (n) {
      const st=statusFor(n);
      focusText=st==='available'?`Disponible: EP ${n.number}`:st==='upcoming'?`Próximo: EP ${n.number}`:'Al día';
      scheduleDay=DAY_NAMES[parseLocalDate(a.anchorDate || a.startDate).getDay()];
      const nextScheduled=nextScheduledEpisode(a);
      nextDate=nextScheduled?capitalize(new Intl.DateTimeFormat('es-MX',{day:'numeric',month:'short'}).format(parseLocalDate(nextScheduled.date)).replace('.','')):'—';
    }
    const phaseBadge=phase==='pre-release'?'★ Próximo estreno':phase==='premiere-today'?'★ Estreno hoy':phase==='finished'?'✓ Finalizado':'● En emisión';
    const searchTerm=normalizeSearchText(state.search);
    const japaneseSearchMatch=Boolean(searchTerm && a.japaneseName && normalizeSearchText(a.japaneseName).includes(searchTerm) && !normalizeSearchText(a.name).includes(searchTerm));
    return `<article class="anime-card phase-${phase}" data-open-anime="${a.id}" data-hover-anime="${a.id}" style="--poster-a:${pa};--poster-b:${pb}"><div class="card-hero">${a.coverUrl?`<img class="card-cover" src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">`:''}<span class="priority-badge lifecycle-badge ${phase}">${phaseBadge}</span><div class="card-letter">${escapeHtml(initials(a.name).slice(0,1))}</div></div><div class="card-body"><div class="card-title-row"><div class="card-title">${escapeHtml(a.name)}</div><span class="card-episode-count">${a.totalEpisodes} eps · ${escapeHtml(PRIORITY_LABELS[a.priority]||'Normal')}</span></div>${japaneseSearchMatch?`<div class="card-alt-title">${escapeHtml(a.japaneseName)}</div>`:''}<div class="card-line card-schedule"><span>${escapeHtml(scheduleDay)} · ${fmtTime(a.time)}</span><span>${escapeHtml(nextDate)}</span></div><div class="card-line card-focus"><span>${escapeHtml(focusText)}</span><span>${progress(a)}%</span></div><div class="card-progress"><span style="width:${progress(a)}%"></span></div></div></article>`;
  }

  function hoverCardHtml(anime, episodeNumber=null) {
    const stats = animeStats(anime);
    const [pa,pb] = paletteFor(anime.name);
    const phase=animePhase(anime);
    const beforePremiere=isBeforePremiere(anime);
    const hovered = episodeNumber ? episodesFor(anime).find(ep=>ep.number===Number(episodeNumber)) : null;
    const next = stats.nextAvailable || stats.nextScheduled;
    let focus = 'Temporada completada';
    if (beforePremiere) {
      const premiere=premiereEpisode(anime);
      focus=premiere?`${animePhaseLabel(anime)} · ${compactDateLabel(premiere.date)} · ${fmtTime(premiere.time)} · ${countdownFull(premiere.timestamp)}`:'Estreno próximo';
    } else if (next) {
      focus=statusFor(next)==='available'?`Pendiente: EP ${next.number} · ya disponible`:`Próximo: EP ${next.number} · ${compactDateLabel(next.date)} · ${fmtTime(next.time)}`;
    }
    const hoveredLine = hovered ? `<div class="hover-episode"><span>${anime.preRelease && hovered.number===1?'ESTRENO':`EP ${String(hovered.number).padStart(2,'0')}`}</span><strong class="hover-status ${statusFor(hovered)}">${anime.preRelease && hovered.number===1 && hovered.timestamp>now().getTime()?animePhaseLabel(anime):statusLabel(hovered)}</strong></div>` : '';
    return `<div class="hover-card-inner"><div class="hover-head"><div class="hover-cover" style="--poster-a:${pa};--poster-b:${pb}">${anime.coverUrl?`<img src="${escapeHtml(anime.coverUrl)}" onerror="this.remove()">`:escapeHtml(initials(anime.name).slice(0,1))}</div><div class="hover-head-copy"><strong>${escapeHtml(anime.name)}</strong>${anime.japaneseName?`<span class="hover-japanese">${escapeHtml(anime.japaneseName)}</span>`:''}<span class="hover-phase">${escapeHtml(animePhaseLabel(anime))} · ${fmtTime(anime.time)}</span></div></div>${hoveredLine}<div class="hover-progress"><span style="width:${stats.reviewedPercent}%"></span></div><div class="hover-progress-label"><span>${stats.reviewed} / ${stats.total} revisados</span><strong>${stats.reviewedPercent}%</strong></div><div class="hover-stats"><div><strong>${stats.emitted}</strong><span>emitidos</span></div><div><strong>${stats.available}</strong><span>pendientes</span></div><div><strong>${stats.upcoming}</strong><span>por estrenar</span></div></div><div class="hover-next">${escapeHtml(focus)}</div>${watchLinksHtml(anime.watchLinks,'hover',anime.id)}</div>`;
  }

  function sourceIconHtml(source='other', extraClass='') {
    const key=SOURCE_SVGS[source] ? source : 'other';
    return `<span class="source-icon source-svg source-${key} ${extraClass}">${SOURCE_SVGS[key]}</span>`;
  }

  function watchLinksHtml(links, mode='detail', animeId='') {
    const safe=normalizeLinks(links);
    const rows=safe.map(link=>`<button type="button" class="watch-link" data-open-url="${escapeHtml(link.url)}">${sourceIconHtml(link.source||'other')}<span class="watch-copy"><strong>${escapeHtml(link.name)}</strong>${link.note?`<small>${escapeHtml(link.note)}</small>`:''}</span><b>↗</b></button>`).join('');
    const emptyState=`<div class="watch-empty">${sourceIconHtml('none','empty-source-icon')}<strong>No hay enlaces configurados</strong><span>Puedes agregarlos cuando tengas la ruta de esta serie.</span>${animeId?`<button type="button" class="btn compact" data-edit-watch="${escapeHtml(animeId)}">+ Agregar enlaces</button>`:''}</div>`;
    if (mode==='hover') return `<div class="hover-watch"><div class="hover-watch-title">Dónde ver</div>${safe.length?rows:emptyState}</div>`;
    return `<div class="watch-wrap"><span class="watch-trigger">Dónde ver</span><div class="watch-popover"><div class="watch-popover-title">Dónde ver</div>${safe.length?rows:emptyState}</div></div>`;
  }

  function clearHoverTimer() {
    if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
  }

  function clearHoverHideTimer() {
    if (hoverHideTimer) { clearTimeout(hoverHideTimer); hoverHideTimer=null; }
  }

  function removeHoverCard() {
    clearHoverTimer(); clearHoverHideTimer();
    hoverCard?.remove(); hoverCard=null;
  }

  function hideHoverCard(immediate=false) {
    clearHoverTimer();
    if (immediate) return removeHoverCard();
    clearHoverHideTimer();
    hoverHideTimer=setTimeout(removeHoverCard,HOVER_HIDE_DELAY);
  }

  function showHoverCard(owner) {
    const anime = state.data.animes.find(a=>a.id===owner.dataset.hoverAnime);
    if (!anime || !document.body.contains(owner)) return;
    removeHoverCard();
    const card = document.createElement('div');
    card.className = 'anime-hover-card interactive';
    card.innerHTML = hoverCardHtml(anime, owner.dataset.hoverEpisode || null);
    document.body.appendChild(card); hoverCard=card;
    positionHoverCard(owner,card);
    card.addEventListener('mouseenter',clearHoverHideTimer);
    card.addEventListener('mouseleave',()=>hideHoverCard(false));
    card.addEventListener('click',e=>{const btn=e.target.closest('[data-open-url]');if(btn){e.preventDefault();e.stopPropagation();openExternal(btn.dataset.openUrl);return;}const edit=e.target.closest('[data-edit-watch]');if(edit){e.preventDefault();e.stopPropagation();hideHoverCard(true);state.selectedAnimeId=edit.dataset.editWatch;state.modal='form';render();}});
    requestAnimationFrame(()=>card.classList.add('visible'));
  }

  function showEventHoverCard(owner) {
    const ev=(state.data.events || []).find(x=>x.id===owner.dataset.hoverEvent);
    if (!ev || !document.body.contains(owner)) return;
    removeHoverCard();
    const card=document.createElement('div');
    card.className='anime-hover-card interactive event-hover';
    card.innerHTML=eventHoverCardHtml(ev);
    document.body.appendChild(card); hoverCard=card;
    positionHoverCard(owner,card);
    card.addEventListener('mouseenter',clearHoverHideTimer);
    card.addEventListener('mouseleave',()=>hideHoverCard(false));
    card.addEventListener('click',e=>{const btn=e.target.closest('[data-open-url]');if(btn){e.preventDefault();e.stopPropagation();openExternal(btn.dataset.openUrl);}});
    requestAnimationFrame(()=>card.classList.add('visible'));
  }

  function positionHoverCard(owner,card) {
    const rect=owner.getBoundingClientRect();
    const pad=14, gap=12;
    card.style.maxHeight=`calc(100vh - ${pad*2}px)`;
    card.style.maxWidth=`calc(100vw - ${pad*2}px)`;
    const cardRect=card.getBoundingClientRect();
    const vw=window.innerWidth, vh=window.innerHeight;
    const spaces={right:vw-rect.right-pad,left:rect.left-pad,bottom:vh-rect.bottom-pad,top:rect.top-pad};
    const fits={right:spaces.right>=cardRect.width+gap,left:spaces.left>=cardRect.width+gap,bottom:spaces.bottom>=cardRect.height+gap,top:spaces.top>=cardRect.height+gap};
    let side=fits.right?'right':fits.left?'left':fits.bottom?'bottom':fits.top?'top':Object.entries(spaces).sort((a,b)=>b[1]-a[1])[0][0];
    let left,top;
    if(side==='right'){left=rect.right+gap;top=rect.top+rect.height/2-cardRect.height/2;}
    else if(side==='left'){left=rect.left-cardRect.width-gap;top=rect.top+rect.height/2-cardRect.height/2;}
    else if(side==='bottom'){left=rect.left+rect.width/2-cardRect.width/2;top=rect.bottom+gap;}
    else {left=rect.left+rect.width/2-cardRect.width/2;top=rect.top-cardRect.height-gap;}
    left=Math.max(pad,Math.min(left,vw-cardRect.width-pad));
    top=Math.max(pad,Math.min(top,vh-cardRect.height-pad));
    card.dataset.placement=side;
    card.style.left=`${Math.round(left)}px`;
    card.style.top=`${Math.round(top)}px`;
  }

  function eventHoverCardHtml(ev) {
    const when=`${compactDateLabel(ev.date)}${ev.allDay?' · Todo el día':` · ${fmtTime(ev.time)}`}`;
    return `<div class="hover-card-inner"><div class="event-hover-head"><div class="event-big-mark">${ev.imageUrl?`<img src="${escapeHtml(ev.imageUrl)}" onerror="this.remove()">`:'◇'}</div><div><strong>${escapeHtml(ev.title)}</strong><span>${escapeHtml(EVENT_TYPES[ev.type] || 'Evento')}</span></div></div><div class="hover-episode"><span>${escapeHtml(when)}</span><strong class="hover-status upcoming">${escapeHtml(countdownFull(eventTimestamp(ev)))}</strong></div>${ev.notes?`<div class="event-hover-notes">${escapeHtml(ev.notes)}</div>`:''}${eventLinksHtml(ev.links,'hover')}</div>`;
  }

  function eventLinksHtml(links,mode='detail') {
    const safe=normalizeLinks(links); if(!safe.length) return '';
    const rows=safe.map(link=>`<button type="button" class="watch-link" data-open-url="${escapeHtml(link.url)}"><span><strong>${escapeHtml(link.name)}</strong>${link.note?`<small>${escapeHtml(link.note)}</small>`:''}</span><b>↗</b></button>`).join('');
    return mode==='hover'?`<div class="hover-watch"><div class="hover-watch-title">Enlaces</div>${rows}</div>`:`<div class="event-links-detail"><div class="hover-watch-title">Enlaces</div>${rows}</div>`;
  }

  async function openExternal(raw) {
    const url=normalizeHttpUrl(raw); if(!url){toast('Enlace no válido');return;}
    try {
      if (window.__TAURI__?.opener?.openUrl) await window.__TAURI__.opener.openUrl(url);
      else window.open(url,'_blank','noopener,noreferrer');
    } catch (err) { console.error(err); window.open(url,'_blank','noopener,noreferrer'); }
  }

  function bindHoverCards() {
    document.querySelectorAll('[data-hover-anime]').forEach(el=>{
      el.addEventListener('mouseenter',()=>{clearHoverHideTimer();clearHoverTimer();hoverTimer=setTimeout(()=>showHoverCard(el),HOVER_DELAY);});
      el.addEventListener('mouseleave',()=>hideHoverCard(false));
      el.addEventListener('mousedown',e=>{if(!e.target.closest('[data-open-url]'))hideHoverCard(true);});
    });
    document.querySelectorAll('[data-hover-event]').forEach(el=>{
      el.addEventListener('mouseenter',()=>{clearHoverHideTimer();clearHoverTimer();hoverTimer=setTimeout(()=>showEventHoverCard(el),HOVER_DELAY);});
      el.addEventListener('mouseleave',()=>hideHoverCard(false));
      el.addEventListener('mousedown',e=>{if(!e.target.closest('[data-open-url]'))hideHoverCard(true);});
    });
  }

  const updateState = { checking:false, available:false, latestVersion:'', message:'No se ha comprobado todavía.', installerFound:false };
  let automaticUpdatePromptShown = false;

  function updateStatusText() {
    if (updateState.checking) return 'Buscando una versión nueva en GitHub…';
    if (updateState.available) return `Nueva versión disponible: v${escapeHtml(updateState.latestVersion)}${updateState.installerFound?' · lista para instalar':' · falta el instalador en el Release'}`;
    return escapeHtml(updateState.message || 'No se ha comprobado todavía.');
  }

  async function invokeDesktop(command,args={}) {
    const invoke=window.__TAURI__?.core?.invoke;
    if (!invoke) throw new Error('Las actualizaciones solo funcionan en la aplicación instalada de Windows.');
    return invoke(command,args);
  }

  async function checkForUpdates({silent=false,allowPrompt=false}={}) {
    if (updateState.checking) return;
    if (!window.__TAURI__?.core?.invoke) {
      if (!silent) toast('La búsqueda de actualizaciones funciona en la app instalada');
      return;
    }
    updateState.checking=true;
    if (state.page==='settings') render();
    try {
      const info=await invokeDesktop('check_for_update');
      updateState.checking=false;
      updateState.available=Boolean(info.available);
      updateState.latestVersion=String(info.latestVersion||'');
      updateState.installerFound=Boolean(info.installerFound);
      updateState.message=info.available ? `Hay una versión nueva: v${info.latestVersion}.` : `Estás al día · v${info.currentVersion}.`;
      if (state.page==='settings') render();
      if (info.available) {
        if (!silent) toast(`Nueva versión disponible: v${info.latestVersion}`);
        if (allowPrompt && !automaticUpdatePromptShown) {
          automaticUpdatePromptShown=true;
          const canInstall=Boolean(info.installerFound);
          const message=canInstall
            ? `Mokost Anime Center v${info.latestVersion} está disponible.\n\n¿Quieres descargarla e instalarla ahora? La aplicación se cerrará durante la actualización.`
            : `Mokost Anime Center v${info.latestVersion} está disponible, pero el Release todavía no contiene un instalador .exe.`;
          if (canInstall && confirm(message)) await installLatestUpdate();
          else if (!canInstall) toast('La versión nueva aún no tiene instalador');
        }
      } else if (!silent) toast('Ya tienes la versión más reciente');
    } catch(err) {
      console.error(err);
      updateState.checking=false;
      updateState.available=false;
      updateState.message=String(err?.message||err||'No se pudo buscar actualizaciones.');
      if (state.page==='settings') render();
      if (!silent) toast('No pude comprobar actualizaciones');
    }
  }

  async function installLatestUpdate() {
    if (!updateState.available) return;
    try {
      const btn=document.getElementById('installUpdate');
      if (btn){btn.disabled=true;btn.textContent='Descargando…';}
      toast('Descargando actualización…');
      await invokeDesktop('download_and_install_update');
    } catch(err) {
      console.error(err);
      alert(`No pude instalar la actualización.\n\n${String(err?.message||err)}`);
      if (state.page==='settings') render();
    }
  }

  function toggleAutoUpdate() {
    state.data.settings={...(state.data.settings||{}),autoUpdate:state.data.settings?.autoUpdate===false,libraryView:state.libraryView,calendarFilter:state.calendarFilter,uiScale:state.uiScale,schemaVersion:8};
    saveData(); render();
  }

  function settingsPage() {
    const scales=[.9,1,1.1,1.25,1.4];
    return `${header('Ajustes','Datos, apariencia y recordatorios','Configura la escala de Mokost y protege tu agenda.')}
      <div class="settings-card"><h3>Tamaño de interfaz</h3><p>Escala real de la interfaz. 125% es el valor recomendado por legibilidad.</p><div class="scale-picker">${scales.map(v=>`<button class="scale-option ${Math.abs(state.uiScale-v)<.01?'active':''}" data-ui-scale="${v}">${Math.round(v*100)}%</button>`).join('')}</div></div>
      <div class="settings-card background-settings-card"><div><h3>Fondo decorativo</h3><p>Patrón otaku discreto detrás del contenido. Puedes ocultarlo si prefieres una vista totalmente limpia.</p></div><button class="background-toggle ${state.data.settings?.decorativeBackground!==false?'active':''}" data-toggle-decorative-background>${state.data.settings?.decorativeBackground!==false?'Activado':'Desactivado'}</button></div>
      <div class="settings-card"><h3>Recordatorios</h3><p>Mokost conserva tus avisos y muestra los pendientes al volver a abrirlo. En la versión Tauri instalada también puede usar notificaciones nativas de Windows mientras la aplicación está en ejecución.</p><div class="settings-actions"><button class="btn" data-open-reminders>Ver recordatorios pendientes ${activeReminders().length?`(${activeReminders().length})`:''}</button></div></div>
      <div class="settings-card update-settings-card"><div><h3>Actualizaciones</h3><p>Versión instalada: <strong>v${APP_VERSION}</strong>. Mokost puede revisar GitHub Releases al iniciar y avisarte cuando exista una versión nueva.</p><div class="update-status" id="updateStatus">${updateStatusText()}</div></div><div class="settings-actions"><button class="btn" id="checkUpdates" ${updateState.checking?'disabled':''}>${updateState.checking?'Buscando…':'Buscar actualizaciones'}</button>${updateState.available?'<button class="btn primary" id="installUpdate">Descargar e instalar v'+escapeHtml(updateState.latestVersion)+'</button>':''}<button class="background-toggle ${state.data.settings?.autoUpdate!==false?'active':''}" data-toggle-auto-update>${state.data.settings?.autoUpdate!==false?'Auto: activado':'Auto: desactivado'}</button></div></div>
      <div class="settings-card"><h3>Respaldo de tu agenda</h3><p>Exporta series, estados, “Dónde ver”, eventos, imágenes, recordatorios y preferencias a JSON.</p><div class="settings-actions"><button class="btn" id="exportData">Exportar respaldo</button><label class="btn" style="cursor:pointer">Importar respaldo<input id="importData" type="file" accept="application/json,.json" hidden></label></div></div>
      <div class="settings-card"><h3>Tu biblioteca y eventos</h3><p>Las instalaciones nuevas comienzan vacías. Borrar la agenda elimina series y eventos locales.</p><div class="settings-actions"><button class="btn danger" id="clearData">Borrar toda la agenda</button></div></div>
      <div class="settings-card"><h3>Qué significa cada estado</h3><p><strong>Próximo</strong>: aún no llega el episodio. <strong>Disponible</strong>: ya se estrenó y sigue pendiente. <strong>Revisado</strong>: tú ya lo atendiste. <strong>Estreno</strong>: debut de una serie que registraste antes de comenzar. <strong>Evento</strong>: una fecha independiente de los episodios.</p></div>
      <div class="settings-card"><h3>Dónde ver</h3><p>“Dónde ver” permanece visible incluso si aún no configuraste ninguna fuente. Los presets Erai Raws, TioAnime y Otros agilizan el registro.</p></div>
      <div class="settings-card"><h3>Almacenamiento</h3><p>Todo se guarda localmente. Los enlaces se abren en tu navegador predeterminado cuando ejecutas la versión Tauri.</p></div>`;
  }

  function capitalize(s) { return s ? s[0].toUpperCase()+s.slice(1) : s; }

  function header(eyebrow,title,subtitle) {
    return `<div class="topbar"><div><div class="eyebrow">${escapeHtml(eyebrow)}</div><h1>${escapeHtml(title)}</h1><div class="subtitle">${escapeHtml(subtitle)}</div></div><div class="toolbar"><button class="btn" data-add-event>+ Evento</button><button class="btn primary" data-add-anime>+ Anime</button></div></div>`;
  }

  function shell(content) {
    const nav = [['home','⌂','Inicio'],['week','▤','Semana'],['month','▦','Mes'],['anime','◫','Animes'],['settings','⚙','Ajustes']].map(([id,icon,label])=>`<button class="nav-button ${state.page===id?'active':''}" data-page="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join('');
    const pending=activeReminders().length;
    return `<div class="app-shell ${state.data.settings?.decorativeBackground!==false?'decorative-bg':''}"><aside class="sidebar"><div class="brand"><div class="brand-mark">M</div><div class="brand-copy"><strong>Mokost</strong><span>Anime Center</span></div></div><nav class="nav">${nav}</nav><button class="reminder-nav ${pending?'has-alerts':''}" data-open-reminders><span>◉</span> Recordatorios${pending?`<b>${pending}</b>`:''}</button><div class="sidebar-spacer"></div><button class="add-main" data-add-anime>＋ Agregar anime</button><button class="add-event-side" data-add-event>＋ Agregar evento</button><div class="version">v0.6.3 · updates</div></aside><main class="main"><div class="content">${content}</div></main></div>${renderModal()}${state.reminderCenterOpen?reminderCenterModal():''}`;
  }

  function renderModal() {
    if (!state.modal) return '';
    if (state.modal === 'form') return animeFormModal();
    if (state.modal === 'detail') return animeDetailModal();
    if (state.modal === 'event-form') return eventFormModal();
    if (state.modal === 'event-detail') return eventDetailModal();
    if (state.modal === 'convert-event') return convertEventModal();
    return '';
  }

  function animeFormModal() {
    const a = state.selectedAnimeId ? state.data.animes.find(x=>x.id===state.selectedAnimeId) : null;
    const draft=!a && state.animeDraft ? state.animeDraft : null;
    const scheduled = a ? nextScheduledEpisode(a) : null;
    const base = a || draft || {name:'',japaneseName:'',anchorDate:isoDate(now()),time:'10:00',totalEpisodes:12,anchorEpisode:1,priority:'normal',notes:'',coverUrl:'',preRelease:false,watchLinks:[],reminders:normalizeReminderConfig(null,true)};
    const isPre=Boolean(base.preRelease && (!a || isBeforePremiere(base)));
    const formEpisode = isPre ? 1 : (scheduled ? scheduled.number : Number(base.anchorEpisode || 1));
    const formDate = isPre ? (base.anchorDate || isoDate(now())) : (scheduled ? scheduled.date : (base.anchorDate || base.startDate || isoDate(now())));
    return `<div class="modal-backdrop" data-close-modal><div class="modal wide-modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div class="modal-title">${a?'Editar anime':draft?'Convertir evento en anime':'Agregar anime'}</div><button class="icon-btn" data-close-modal>×</button></div><form id="animeForm"><div class="modal-body"><div class="form-grid">
      ${draft?`<div class="conversion-banner full"><strong>Datos reutilizados del evento</strong><span>Revisa la ficha antes de guardarla. El evento original solo se elimina al confirmar.</span></div>`:''}
      <div class="field full"><label>Nombre</label><input name="name" required maxlength="120" value="${escapeHtml(base.name)}" placeholder="Ej. Smoking Behind the Supermarket"></div>
      <div class="field full"><label>Nombre en japonés</label><input name="japaneseName" maxlength="160" value="${escapeHtml(base.japaneseName || '')}" placeholder="Ej. Super no Ura de Yani Suu Futari"><div class="field-hint">También se usa para buscar la serie en Biblioteca.</div></div>
      <div class="field full"><label>Situación de la serie</label><div class="segmented-form"><label><input type="radio" name="releaseMode" value="airing" ${!isPre?'checked':''}><span>En emisión / ya empezó</span></label><label><input type="radio" name="releaseMode" value="upcoming" ${isPre?'checked':''}><span>Aún no se estrena</span></label></div><div class="field-hint">Usa “Aún no se estrena” cuando ya exista una fecha confirmada para el primer episodio.</div></div>
      <div class="field"><label id="anchorEpisodeLabel">${isPre?'Primer episodio':'Próximo episodio a estrenarse'}</label><input id="anchorEpisodeInput" name="anchorEpisode" type="number" min="1" max="999" required value="${formEpisode}" ${isPre?'readonly':''}><div class="field-hint" id="anchorEpisodeHint">${isPre?'El estreno de una serie comienza en EP1.':'Ej.: si mañana sale el capítulo 7, escribe 7.'}</div></div>
      <div class="field"><label id="anchorDateLabel">${isPre?'Fecha de estreno de la serie':'Fecha del próximo estreno'}</label><input name="anchorDate" type="date" required value="${escapeHtml(formDate)}"><div class="field-hint">${isPre?'El calendario la mostrará como ★ Estreno.':'Los demás capítulos se calculan cada 7 días.'}</div></div>
      <div class="field"><label>Hora habitual</label><input name="time" type="time" required value="${escapeHtml(base.time)}"></div>
      <div class="field"><label>Total de episodios de la temporada</label><input name="totalEpisodes" type="number" min="1" max="999" required value="${base.totalEpisodes}"></div>
      <div class="field"><label>Prioridad</label><select name="priority"><option value="high" ${base.priority==='high'?'selected':''}>Alta</option><option value="normal" ${base.priority==='normal'?'selected':''}>Normal</option><option value="low" ${base.priority==='low'?'selected':''}>Baja</option></select></div>
      <div class="field cover-field"><label>Portada desde tu PC</label><input name="coverFile" type="file" accept="image/png,image/jpeg,image/webp,image/gif"><div class="field-hint">Se optimiza automáticamente.</div></div>
      <div class="field cover-field"><label>O usa una URL</label><input name="coverUrl" value="${base.coverUrl && !String(base.coverUrl).startsWith('data:') ? escapeHtml(base.coverUrl) : ''}" placeholder="https://…"></div>
      ${base.coverUrl ? `<div class="cover-current full"><div class="cover-current-thumb"><img src="${escapeHtml(base.coverUrl)}" onerror="this.parentElement.innerHTML='Sin vista previa'"></div><div><strong>Portada actual</strong><small>Se conservará si no seleccionas otra.</small><label><input name="removeCover" type="checkbox"> Quitar portada</label></div></div>` : ''}
      <label class="check-field full" id="previousReviewedField"><input name="markPreviousReviewed" type="checkbox" ${a||draft?'':'checked'} ${isPre?'disabled':''}><span><strong>Dar por revisados los episodios anteriores</strong><small>Útil al registrar una serie que ya comenzó.</small></span></label>
      ${reminderEditor(base.reminders,'anime',true)}
      <div class="form-section full"><div class="form-section-head"><div><strong>Dónde ver</strong><span>Usa un preset y pega la URL particular de esta serie.</span></div><button class="btn compact" type="button" data-toggle-link-presets="watch">+ Agregar enlace</button></div><div class="link-preset-panel" id="watchPresetPanel">${Object.entries(LINK_PRESETS).map(([id,p])=>`<button type="button" class="link-preset" data-link-preset="${id}">${sourceIconHtml(id)}<strong>${escapeHtml(p.name)}</strong></button>`).join('')}</div><div id="watchLinksEditor" class="link-editor">${(base.watchLinks||[]).map(link=>linkEditorRow(link,'watch')).join('')}</div></div>
      <div class="field full"><label>Notas</label><textarea name="notes" placeholder="Información útil para tu trabajo…">${escapeHtml(base.notes || '')}</textarea></div>
    </div></div><div class="modal-actions"><div>${a?'<button class="btn danger" type="button" id="deleteAnime">Eliminar</button>':''}</div><div class="actions-right"><button class="btn ghost" type="button" data-close-modal>Cancelar</button><button class="btn primary" type="submit">${a?'Guardar cambios':draft?'Convertir y guardar':'Agregar serie'}</button></div></div></form></div></div>`;
  }

  function linkEditorRow(link={},prefix='watch') {
    const source=LINK_PRESETS[link.source]?link.source:'other';
    return `<div class="link-editor-row"><input type="hidden" name="${prefix}Source" value="${escapeHtml(source)}"><div class="link-source-preview">${sourceIconHtml(source)}<small>${escapeHtml(LINK_PRESETS[source]?.name||'Otros')}</small></div><div class="field"><label>Nombre</label><input name="${prefix}Name" value="${escapeHtml(link.name||'')}" placeholder="Nombre visible"></div><div class="field link-url-field"><label>URL</label><input name="${prefix}Url" value="${escapeHtml(link.url||'')}" placeholder="https://…"></div><div class="field link-note-field"><label>Detalle opcional</label><input name="${prefix}Note" value="${escapeHtml(link.note||'')}" placeholder="1080p, subtitulado…"></div><button class="icon-btn remove-link" type="button" data-remove-link title="Eliminar enlace">×</button></div>`;
  }

  function animeDetailModal() {
    const a = state.data.animes.find(x=>x.id===state.selectedAnimeId); if (!a) return '';
    const [pa,pb]=paletteFor(a.name), eps=episodesFor(a), phase=animePhase(a);
    const rows=eps.map(ep=>{const st=statusFor(ep);const isPremiere=a.preRelease&&ep.number===1;const firstUpcoming=eps.find(x=>statusFor(x)==='upcoming');const isCurrent=st==='available'||(st==='upcoming'&&ep===firstUpcoming);let action='';if(st==='upcoming')action=`<span class="pill ${isPremiere?'premiere':'upcoming'}" title="${escapeHtml(statusDescription(st))}">${isPremiere?`★ ${animePhaseLabel(a)}`:'○ Próximo'}</span>`;else if(st==='available')action=`<button class="btn status-action available" data-toggle-reviewed="${a.id}|${ep.number}">✓ Marcar revisado</button>`;else action=`<button class="btn status-action reviewed" data-toggle-reviewed="${a.id}|${ep.number}">↺ Revisado</button>`;return `<div class="episode-row ${isCurrent?'current':''}"><div class="ep-num">${isPremiere?'★ EP 01':`EP ${String(ep.number).padStart(2,'0')}`}</div><div class="ep-date">${compactDateLabel(ep.date)}</div><div class="ep-time">${fmtTime(ep.time)}</div>${action}</div>`;}).join('');
    const beforePremiere=isBeforePremiere(a);
    const next=beforePremiere?premiereEpisode(a):nextScheduledEpisode(a);
    const nextText=beforePremiere&&next?`${animePhaseLabel(a)}: ${compactDateLabel(next.date)} · ${fmtTime(next.time)} · ${countdownFull(next.timestamp)}`:next?`Próximo estreno: EP ${next.number} · ${compactDateLabel(next.date)} · ${fmtTime(next.time)}`:'Sin próximos estrenos programados';
    const schedule=`${DAY_NAMES[parseLocalDate(a.anchorDate||a.startDate).getDay()]} · ${fmtTime(a.time)}`;
    const meta=`${animePhaseLabel(a)} · ${schedule} · ${a.totalEpisodes} episodios · Prioridad ${PRIORITY_LABELS[a.priority]}`;
    return `<div class="modal-backdrop" data-close-modal><div class="modal anime-detail-modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><button class="icon-btn modal-corner-close" data-close-modal aria-label="Cerrar">×</button><div class="modal-body"><div class="detail-header"><div class="poster" style="--poster-a:${pa};--poster-b:${pb}">${a.coverUrl?`<img src="${escapeHtml(a.coverUrl)}" onerror="this.remove()">`:escapeHtml(initials(a.name))}</div><div class="detail-copy"><div class="detail-title">${escapeHtml(a.name)}</div>${a.japaneseName?`<div class="detail-japanese"><span>Nombre en japonés</span>${escapeHtml(a.japaneseName)}</div>`:''}<div class="detail-meta">${escapeHtml(meta)}</div><div class="detail-next">${escapeHtml(nextText)}</div>${watchLinksHtml(a.watchLinks,'detail',a.id)}${a.notes?`<div class="detail-meta detail-notes">${escapeHtml(a.notes)}</div>`:''}</div></div><div class="detail-status-help"><span class="pill upcoming">Próximo</span> aún no sale <span class="pill available">Disponible</span> pendiente <span class="pill reviewed">Revisado</span> atendido ${a.preRelease?'<span class="pill premiere">★ Estreno</span> debut de la serie':''}</div><div class="episode-table">${rows}</div></div><div class="modal-actions"><div></div><div class="actions-right"><button class="btn" id="editAnime">Editar</button><button class="btn primary" data-close-modal>Cerrar</button></div></div></div></div>`;
  }

  function eventFormModal() {
    const ev=state.selectedEventId?(state.data.events||[]).find(x=>x.id===state.selectedEventId):null;
    const base=ev||{title:'',date:isoDate(now()),time:'18:00',allDay:false,type:'event',notes:'',links:[],imageUrl:'',reminders:normalizeReminderConfig(null,false)};
    return `<div class="modal-backdrop" data-close-modal><div class="modal event-modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div class="modal-title">${ev?'Editar evento':'Agregar evento'}</div><button class="icon-btn" data-close-modal>×</button></div><form id="eventForm"><div class="modal-body"><div class="form-grid"><div class="field full"><label>Título</label><input name="title" required maxlength="120" value="${escapeHtml(base.title)}" placeholder="Evangelion Event"></div><div class="field"><label>Fecha</label><input name="date" type="date" required value="${escapeHtml(base.date)}"></div><div class="field"><label>Hora</label><input id="eventTime" name="time" type="time" value="${escapeHtml(base.time)}" ${base.allDay?'disabled':''}></div><label class="check-field full compact-check"><input id="eventAllDay" name="allDay" type="checkbox" ${base.allDay?'checked':''}><span><strong>Evento de todo el día</strong><small>No mostrará una hora concreta en el calendario.</small></span></label><div class="field"><label>Tipo</label><select name="type">${Object.entries(EVENT_TYPES).map(([id,label])=>`<option value="${id}" ${base.type===id?'selected':''}>${label}</option>`).join('')}</select></div><div class="field cover-field"><label>Imagen del evento</label><input name="eventImageFile" type="file" accept="image/png,image/jpeg,image/webp,image/gif"><div class="field-hint">Opcional. Se recorta visualmente según cada vista.</div></div><div class="field cover-field"><label>O usa una URL</label><input name="eventImageUrl" value="${base.imageUrl&&!String(base.imageUrl).startsWith('data:')?escapeHtml(base.imageUrl):''}" placeholder="https://…"></div>${base.imageUrl?`<div class="cover-current full"><div class="cover-current-thumb square"><img src="${escapeHtml(base.imageUrl)}" onerror="this.parentElement.innerHTML='Sin vista previa'"></div><div><strong>Imagen actual</strong><small>Se conservará si no eliges otra.</small><label><input name="removeEventImage" type="checkbox"> Quitar imagen</label></div></div>`:''}<div class="field full"><label>Notas / descripción</label><textarea name="notes" placeholder="Qué ocurre, qué quieres recordar…">${escapeHtml(base.notes||'')}</textarea></div>${reminderEditor(base.reminders,'event',false)}<div class="form-section full"><div class="form-section-head"><div><strong>Enlaces del evento</strong><span>Opcionales: directo, página oficial, anuncio, etc.</span></div><button class="btn compact" type="button" data-add-link="event">+ Agregar enlace</button></div><div id="eventLinksEditor" class="link-editor">${(base.links||[]).map(link=>linkEditorRow(link,'event')).join('')}</div></div></div></div><div class="modal-actions"><div class="actions-left">${ev?'<button class="btn danger" type="button" id="deleteEvent">Eliminar</button><button class="btn conversion" type="button" id="convertEvent">Convertir a anime</button>':''}</div><div class="actions-right"><button class="btn ghost" type="button" data-close-modal>Cancelar</button><button class="btn primary" type="submit">${ev?'Guardar cambios':'Agregar evento'}</button></div></div></form></div></div>`;
  }

  function eventDetailModal() {
    const ev=(state.data.events||[]).find(x=>x.id===state.selectedEventId); if(!ev)return '';
    const when=`${compactDateLabel(ev.date)}${ev.allDay?' · Todo el día':` · ${fmtTime(ev.time)}`}`;
    return `<div class="modal-backdrop" data-close-modal><div class="modal event-detail-modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div class="modal-title">Evento</div><button class="icon-btn" data-close-modal>×</button></div><div class="modal-body"><div class="event-detail-head"><div class="event-detail-icon">${ev.imageUrl?`<img src="${escapeHtml(ev.imageUrl)}" onerror="this.remove()">`:'◇'}</div><div><div class="detail-title">${escapeHtml(ev.title)}</div><div class="detail-meta">${escapeHtml(EVENT_TYPES[ev.type]||'Evento')} · ${escapeHtml(when)}</div><div class="detail-next">${escapeHtml(countdownFull(eventTimestamp(ev)))}</div></div></div>${ev.notes?`<div class="event-detail-notes">${escapeHtml(ev.notes)}</div>`:''}${eventLinksHtml(ev.links,'detail')}</div><div class="modal-actions"><div></div><div class="actions-right"><button class="btn" id="editEvent">Editar</button><button class="btn primary" data-close-modal>Cerrar</button></div></div></div></div>`;
  }

  function convertEventModal() {
    const ev=(state.data.events||[]).find(x=>x.id===state.convertingEventId); if(!ev)return '';
    return `<div class="modal-backdrop" data-close-modal><div class="modal conversion-modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div class="modal-title">Convertir evento en anime</div><button class="icon-btn" data-close-modal>×</button></div><form id="convertEventForm"><div class="modal-body"><div class="conversion-summary"><strong>Se reutilizará</strong><div>✓ Título　✓ Imagen　✓ Fecha　✓ Hora　✓ Notas</div></div><div class="form-grid"><div class="field"><label>Total de episodios</label><input name="totalEpisodes" type="number" min="1" max="999" value="12" required></div><div class="field"><label>Prioridad</label><select name="priority"><option value="high">Alta</option><option value="normal" selected>Normal</option><option value="low">Baja</option></select></div><div class="field full"><label>Situación inicial</label><div class="segmented-form"><label><input type="radio" name="releaseMode" value="upcoming" checked><span>Aún no se estrena</span></label><label><input type="radio" name="releaseMode" value="airing"><span>En emisión / ya empezó</span></label></div></div>${ev.links?.length?`<div class="form-section full"><div class="form-section-head"><div><strong>Enlaces encontrados</strong><span>Elige cuáles quieres importar como “Dónde ver”.</span></div></div><div class="convert-links">${ev.links.map((l,i)=>`<label><input type="checkbox" name="importLink" value="${i}"><span><strong>${escapeHtml(l.name)}</strong><small>${escapeHtml(l.note||'Enlace del evento')}</small></span></label>`).join('')}</div></div>`:''}</div></div><div class="modal-actions"><div></div><div class="actions-right"><button class="btn ghost" type="button" data-back-event>Volver</button><button class="btn primary" type="submit">Continuar</button></div></div></form></div></div>`;
  }

  function render() {
    hideHoverCard(true);
    let content = '';
    if (state.page==='home') content = homePage();
    else if (state.page==='week') content = weekPage();
    else if (state.page==='month') content = monthPage();
    else if (state.page==='anime') content = animePage();
    else content = settingsPage();
    root.innerHTML = shell(content);
    applyUiScale();
    bindEvents();
  }

  function bindEvents() {
    bindHoverCards();
    document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>{state.page=el.dataset.page;state.modal=null;state.animeDraft=null;render();}));
    document.querySelectorAll('[data-add-anime]').forEach(el=>el.addEventListener('click',()=>{state.selectedAnimeId=null;state.animeDraft=null;state.modal='form';render();}));
    document.querySelectorAll('[data-add-event]').forEach(el=>el.addEventListener('click',()=>{state.selectedEventId=null;state.modal='event-form';render();}));
    document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',e=>{if(e.currentTarget!==e.target&&e.currentTarget.classList.contains('modal-backdrop'))return;state.modal=null;state.animeDraft=null;state.convertingEventId=null;render();}));
    document.querySelectorAll('[data-open-anime]').forEach(el=>el.addEventListener('click',e=>{if(e.target.closest('[data-toggle-reviewed],[data-open-url],[data-edit-watch]'))return;state.selectedAnimeId=el.dataset.openAnime;state.modal='detail';render();}));
    document.querySelectorAll('[data-open-event]').forEach(el=>el.addEventListener('click',e=>{if(e.target.closest('[data-open-url]'))return;state.selectedEventId=el.dataset.openEvent;state.modal='event-detail';render();}));
    document.querySelectorAll('[data-toggle-reviewed]').forEach(el=>el.addEventListener('click',e=>{e.stopPropagation();const[id,numRaw]=el.dataset.toggleReviewed.split('|');toggleReviewed(id,Number(numRaw));}));
    document.querySelectorAll('[data-open-url]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openExternal(el.dataset.openUrl);}));
    document.querySelectorAll('[data-edit-watch]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();hideHoverCard(true);state.selectedAnimeId=el.dataset.editWatch;state.modal='form';render();setTimeout(()=>document.querySelector('.form-section .link-preset-panel')?.scrollIntoView({block:'center'}),0);}));
    document.querySelectorAll('[data-calendar-filter]').forEach(el=>el.addEventListener('click',()=>setCalendarFilter(el.dataset.calendarFilter)));
    document.querySelectorAll('[data-ui-scale]').forEach(el=>el.addEventListener('click',()=>setUiScale(el.dataset.uiScale)));
    document.querySelectorAll('[data-toggle-decorative-background]').forEach(el=>el.addEventListener('click',toggleDecorativeBackground));
    document.querySelectorAll('[data-toggle-auto-update]').forEach(el=>el.addEventListener('click',toggleAutoUpdate));
    document.querySelectorAll('[data-open-reminders]').forEach(el=>el.addEventListener('click',()=>{state.reminderCenterOpen=true;render();}));
    document.querySelectorAll('[data-close-reminders]').forEach(el=>el.addEventListener('click',e=>{if(e.currentTarget.classList.contains('modal-backdrop')&&e.currentTarget!==e.target)return;state.reminderCenterOpen=false;render();}));
    document.querySelectorAll('[data-dismiss-reminder]').forEach(el=>el.addEventListener('click',()=>dismissReminder(el.dataset.dismissReminder)));
    document.querySelectorAll('[data-open-reminder]').forEach(el=>el.addEventListener('click',()=>{const r=activeReminders().find(x=>x.key===el.dataset.openReminder);if(!r)return;state.reminderCenterOpen=false;if(r.kind==='event'){state.selectedEventId=r.eventId;state.modal='event-detail';}else{state.selectedAnimeId=r.animeId;state.modal='detail';}render();}));
    const form=document.getElementById('animeForm'); if(form)form.addEventListener('submit',saveAnimeForm);
    const eventForm=document.getElementById('eventForm'); if(eventForm)eventForm.addEventListener('submit',saveEventForm);
    const convertForm=document.getElementById('convertEventForm'); if(convertForm)convertForm.addEventListener('submit',saveConvertEventForm);
    const del=document.getElementById('deleteAnime'); if(del)del.addEventListener('click',deleteSelectedAnime);
    const delEvent=document.getElementById('deleteEvent'); if(delEvent)delEvent.addEventListener('click',deleteSelectedEvent);
    const edit=document.getElementById('editAnime'); if(edit)edit.addEventListener('click',()=>{state.modal='form';render();});
    const editEvent=document.getElementById('editEvent'); if(editEvent)editEvent.addEventListener('click',()=>{state.modal='event-form';render();});
    const convert=document.getElementById('convertEvent'); if(convert)convert.addEventListener('click',startConvertEvent);
    document.querySelectorAll('[data-back-event]').forEach(el=>el.addEventListener('click',()=>{state.modal='event-form';render();}));
    const search=document.getElementById('animeSearch'); if(search)search.addEventListener('input',e=>{state.search=e.target.value;renderPreserveFocus();});
    const filter=document.getElementById('priorityFilter'); if(filter)filter.addEventListener('change',e=>{state.priorityFilter=e.target.value;render();});
    document.querySelectorAll('[data-library-view]').forEach(el=>el.addEventListener('click',()=>setLibraryView(el.dataset.libraryView)));
    document.querySelectorAll('[data-month-nav]').forEach(el=>el.addEventListener('click',()=>navigateMonth(el.dataset.monthNav)));
    document.querySelectorAll('[data-add-link]').forEach(el=>el.addEventListener('click',()=>addLinkEditorRow(el.dataset.addLink,'other')));
    document.querySelectorAll('[data-toggle-link-presets]').forEach(el=>el.addEventListener('click',()=>document.getElementById('watchPresetPanel')?.classList.toggle('visible')));
    document.querySelectorAll('[data-link-preset]').forEach(el=>el.addEventListener('click',()=>{addLinkEditorRow('watch',el.dataset.linkPreset);document.getElementById('watchPresetPanel')?.classList.remove('visible');}));
    document.querySelectorAll('[data-remove-link]').forEach(el=>el.addEventListener('click',()=>el.closest('.link-editor-row')?.remove()));
    document.querySelectorAll('input[name="releaseMode"]').forEach(el=>el.addEventListener('change',syncReleaseModeForm));
    const allDay=document.getElementById('eventAllDay'); if(allDay)allDay.addEventListener('change',()=>{const time=document.getElementById('eventTime');if(time)time.disabled=allDay.checked;});
    const checkUpdates=document.getElementById('checkUpdates'); if(checkUpdates)checkUpdates.addEventListener('click',()=>checkForUpdates({silent:false,allowPrompt:false}));
    const installUpdate=document.getElementById('installUpdate'); if(installUpdate)installUpdate.addEventListener('click',installLatestUpdate);
    const exp=document.getElementById('exportData'); if(exp)exp.addEventListener('click',exportData);
    const imp=document.getElementById('importData'); if(imp)imp.addEventListener('change',importData);
    const clear=document.getElementById('clearData'); if(clear)clear.addEventListener('click',()=>{if(confirm('¿Borrar todas las series y eventos de la agenda?')){state.data={animes:[],events:[],settings:{schemaVersion:8,libraryView:state.libraryView,calendarFilter:state.calendarFilter,uiScale:state.uiScale,decorativeBackground:state.data.settings?.decorativeBackground!==false,autoUpdate:state.data.settings?.autoUpdate!==false,dismissedReminders:[],notifiedReminders:[]}};saveData();render();toast('Agenda limpiada');}});
  }

  function syncReleaseModeForm() {
    const upcoming=document.querySelector('input[name="releaseMode"]:checked')?.value==='upcoming';
    const input=document.getElementById('anchorEpisodeInput'),label=document.getElementById('anchorEpisodeLabel'),hint=document.getElementById('anchorEpisodeHint'),dateLabel=document.getElementById('anchorDateLabel'),previous=document.querySelector('#previousReviewedField input');
    if(input){input.readOnly=upcoming;if(upcoming)input.value='1';}
    if(label)label.textContent=upcoming?'Primer episodio':'Próximo episodio a estrenarse';
    if(hint)hint.textContent=upcoming?'El estreno de una serie comienza en EP1.':'Ej.: si mañana sale el capítulo 7, escribe 7.';
    if(dateLabel)dateLabel.textContent=upcoming?'Fecha de estreno de la serie':'Fecha del próximo estreno';
    if(previous){previous.disabled=upcoming;if(upcoming)previous.checked=false;}
  }

  function addLinkEditorRow(prefix, preset='other') {
    const editor=document.getElementById(prefix==='event'?'eventLinksEditor':'watchLinksEditor'); if(!editor)return;
    const p=LINK_PRESETS[preset]||LINK_PRESETS.other;
    const holder=document.createElement('div'); holder.innerHTML=linkEditorRow({name:preset==='other'?'':p.name,source:preset},prefix==='event'?'event':'watch');
    const row=holder.firstElementChild; editor.appendChild(row);
    row.querySelector('[data-remove-link]')?.addEventListener('click',()=>row.remove());
    row.querySelector('input[name$="Name"]')?.focus();
  }

  function applyUiScale() {
    const scale=Number(state.uiScale||1.25);
    document.documentElement.style.setProperty('--ui-scale',String(scale));
    document.body.style.zoom='';
  }

  function toggleDecorativeBackground() {
    state.data.settings={...(state.data.settings||{}),decorativeBackground:state.data.settings?.decorativeBackground===false,libraryView:state.libraryView,calendarFilter:state.calendarFilter,uiScale:state.uiScale,schemaVersion:8};
    saveData();
    render();
  }

  function setUiScale(value) {
    const v=Number(value); if(![.9,1,1.1,1.25,1.4].includes(v))return;
    state.uiScale=v; state.data.settings={...(state.data.settings||{}),uiScale:v,schemaVersion:8,libraryView:state.libraryView,calendarFilter:state.calendarFilter}; saveData(); render();
  }

  function setCalendarFilter(filter) {
    if(!['all','episodes','premieres','events'].includes(filter))return;
    state.calendarFilter=filter;
    state.data.settings={...(state.data.settings||{}),calendarFilter:filter,libraryView:state.libraryView,uiScale:state.uiScale,schemaVersion:8};
    saveData();render();
  }

  function navigateMonth(action) {
    const cursor = monthStart(parseLocalDate(state.calendarMonth));
    if (action==='prev') state.calendarMonth = isoDate(addMonths(cursor,-1));
    else if (action==='next') state.calendarMonth = isoDate(addMonths(cursor,1));
    else state.calendarMonth = isoDate(monthStart(now()));
    render();
  }

  function setLibraryView(view) {
    if (!['square','poster','list'].includes(view)) return;
    state.libraryView = view;
    state.data.settings = { ...(state.data.settings || {}), libraryView:view, calendarFilter:state.calendarFilter, uiScale:state.uiScale, schemaVersion:8 };
    saveData(); render();
  }

  function renderPreserveFocus() {
    const val = state.search;
    render();
    const input = document.getElementById('animeSearch');
    if (input) { input.focus(); input.value=val; input.setSelectionRange(val.length,val.length); }
  }

  async function saveAnimeForm(e) {
    e.preventDefault();
    const submit=e.currentTarget.querySelector('button[type="submit"]'); if(submit){submit.disabled=true;submit.textContent='Guardando…';}
    try {
      const f=new FormData(e.currentTarget);
      const selectedUpcoming=String(f.get('releaseMode')||'airing')==='upcoming';
      const itemId=state.selectedAnimeId||uid(); const existing=state.data.animes.find(x=>x.id===itemId);
      const draft=!existing?state.animeDraft:null;
      const preservePastPremiere=Boolean(existing?.preRelease && episodeTimestampFor(existing,1)<=now().getTime());
      const preRelease=selectedUpcoming || preservePastPremiere;
      const anchorEpisode=selectedUpcoming?1:Math.max(1,Number(f.get('anchorEpisode')||1));
      const totalEpisodes=Math.max(anchorEpisode,Number(f.get('totalEpisodes')||12));
      const coverFile=f.get('coverFile'), coverText=String(f.get('coverUrl')||'').trim(); let coverUrl=existing?.coverUrl||draft?.coverUrl||'';
      if(f.get('removeCover')==='on')coverUrl=''; if(coverText)coverUrl=coverText; if(coverFile instanceof File&&coverFile.size>0)coverUrl=await optimizeCoverFile(coverFile);
      const item={id:itemId,name:String(f.get('name')||'').trim(),japaneseName:String(f.get('japaneseName')||'').trim(),anchorDate:String(f.get('anchorDate')||''),anchorEpisode,time:String(f.get('time')||'00:00'),totalEpisodes,priority:String(f.get('priority')||'normal'),coverUrl,notes:String(f.get('notes')||'').trim(),reviewed:[],createdAt:existing?.createdAt||Date.now(),preRelease,watchLinks:linksFromForm(f,'watch'),reminders:reminderConfigFromForm(f,'anime',true)};
      if(existing)item.reviewed=[...(existing.reviewed||[])];
      if(!selectedUpcoming&&f.get('markPreviousReviewed')==='on'&&anchorEpisode>1){const prior=Array.from({length:Math.min(totalEpisodes,anchorEpisode-1)},(_,i)=>i+1);item.reviewed=[...new Set([...(item.reviewed||[]),...prior])].sort((a,b)=>a-b);}
      item.reviewed=sanitizeReviewedList(item,item.reviewed);
      if(existing)Object.assign(existing,item);else state.data.animes.push(item);
      if(draft?.sourceEventId) state.data.events=(state.data.events||[]).filter(ev=>ev.id!==draft.sourceEventId);
      state.animeDraft=null; state.convertingEventId=null;
      saveData();state.modal='detail';state.selectedAnimeId=item.id;render();toast(existing?'Cambios guardados':draft?'Evento convertido en anime':'Anime agregado'); checkReminders();
    } catch(err) {
      console.error(err);
      if(String(err?.message||'').startsWith('URL_INVALID:')) alert('Uno de los enlaces de “Dónde ver” no es una URL válida.');
      else alert('No pude guardar los cambios. Revisa la portada y los enlaces.');
      if(submit){submit.disabled=false;submit.textContent=state.selectedAnimeId?'Guardar cambios':state.animeDraft?'Convertir y guardar':'Agregar serie';}
    }
  }

  async function saveEventForm(e) {
    e.preventDefault();
    try {
      const f=new FormData(e.currentTarget); const id=state.selectedEventId||uid(); const existing=(state.data.events||[]).find(x=>x.id===id);
      const file=f.get('eventImageFile'), imageText=String(f.get('eventImageUrl')||'').trim(); let imageUrl=existing?.imageUrl||'';
      if(f.get('removeEventImage')==='on')imageUrl=''; if(imageText)imageUrl=imageText; if(file instanceof File&&file.size>0)imageUrl=await optimizeCoverFile(file);
      const ev={id,title:String(f.get('title')||'').trim(),date:String(f.get('date')||''),time:String(f.get('time')||'18:00'),allDay:f.get('allDay')==='on',type:String(f.get('type')||'event'),notes:String(f.get('notes')||'').trim(),links:linksFromForm(f,'event'),imageUrl,reminders:reminderConfigFromForm(f,'event',false),createdAt:existing?.createdAt||Date.now()};
      if(existing)Object.assign(existing,ev);else(state.data.events||(state.data.events=[])).push(ev);
      saveData();state.selectedEventId=id;state.modal='event-detail';render();toast(existing?'Evento actualizado':'Evento agregado');checkReminders();
    } catch(err){console.error(err);alert('No pude guardar el evento. Revisa su imagen y sus enlaces.');}
  }

  function startConvertEvent() {
    if (!state.selectedEventId) return;
    state.convertingEventId=state.selectedEventId; state.modal='convert-event'; render();
  }

  function saveConvertEventForm(e) {
    e.preventDefault();
    const ev=(state.data.events||[]).find(x=>x.id===state.convertingEventId); if(!ev)return;
    const f=new FormData(e.currentTarget);
    const importIndexes=f.getAll('importLink').map(Number);
    const watchLinks=(ev.links||[]).filter((_,i)=>importIndexes.includes(i)).map(l=>({...l,id:uid()}));
    const upcoming=String(f.get('releaseMode')||'upcoming')==='upcoming';
    state.animeDraft={sourceEventId:ev.id,name:ev.title,japaneseName:'',anchorDate:ev.date,time:ev.allDay?'10:00':ev.time,totalEpisodes:Math.max(1,Number(f.get('totalEpisodes')||12)),anchorEpisode:1,priority:String(f.get('priority')||'normal'),notes:ev.notes||'',coverUrl:ev.imageUrl||'',preRelease:upcoming,watchLinks,reminders:{enabled:false,premiere:true,episodes:true,offsets:[]}};
    state.selectedAnimeId=null; state.modal='form'; render();
  }

  function optimizeCoverFile(file) {
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error || new Error('No se pudo leer la imagen'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Formato de imagen no compatible'));
        img.onload = () => {
          const maxW = 520, maxH = 780;
          const scale = Math.min(1, maxW / img.naturalWidth, maxH / img.naturalHeight);
          const w = Math.max(1, Math.round(img.naturalWidth * scale));
          const h = Math.max(1, Math.round(img.naturalHeight * scale));
          const canvas = document.createElement('canvas');
          canvas.width=w; canvas.height=h;
          const ctx = canvas.getContext('2d', {alpha:false});
          ctx.imageSmoothingEnabled=true;
          ctx.imageSmoothingQuality='high';
          ctx.drawImage(img,0,0,w,h);
          let out = '';
          try { out = canvas.toDataURL('image/webp',0.80); } catch (_) {}
          if (!out || out==='data:,') out = canvas.toDataURL('image/jpeg',0.82);
          resolve(out);
        };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  function deleteSelectedAnime() {
    const a = state.data.animes.find(x=>x.id===state.selectedAnimeId);
    if (!a || !confirm(`¿Eliminar “${a.name}” y todos sus episodios?`)) return;
    state.data.animes = state.data.animes.filter(x=>x.id!==a.id);
    saveData(); state.modal=null; state.selectedAnimeId=null; render(); toast('Anime eliminado');
  }

  function deleteSelectedEvent() {
    const ev=(state.data.events||[]).find(x=>x.id===state.selectedEventId);
    if(!ev||!confirm(`¿Eliminar el evento “${ev.title}”?`))return;
    state.data.events=(state.data.events||[]).filter(x=>x.id!==ev.id);
    saveData();state.modal=null;state.selectedEventId=null;render();toast('Evento eliminado');
  }

  function toggleReviewed(id,num) {
    const a = state.data.animes.find(x=>x.id===id); if (!a) return;
    a.reviewed = sanitizeReviewedList(a, a.reviewed);
    const ep = episodesFor(a).find(x=>x.number===num);
    if (!ep) return;
    if (ep.timestamp > now().getTime()) {
      toast(`EP ${num} todavía no se estrena`);
      return;
    }
    a.reviewed = a.reviewed || [];
    if (a.reviewed.includes(num)) a.reviewed = a.reviewed.filter(n=>n!==num); else a.reviewed.push(num);
    a.reviewed.sort((x,y)=>x-y);
    saveData(); render();
  }

  function exportData() {
    const payload = JSON.stringify({version:APP_VERSION,exportedAt:new Date().toISOString(),...state.data},null,2);
    const blob = new Blob([payload],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=`mokost_anime_center_${isoDate(now())}.json`; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000); toast('Respaldo exportado');
  }

  function importData(e) {
    const file=e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload=()=>{ try { const p=JSON.parse(String(reader.result)); if (!Array.isArray(p.animes)) throw new Error('Formato inválido'); state.data=migrateData({animes:p.animes,events:Array.isArray(p.events)?p.events:[],settings:p.settings||{}}); state.libraryView=state.data.settings?.libraryView||'square'; state.calendarFilter=state.data.settings?.calendarFilter||'all'; state.uiScale=Number(state.data.settings?.uiScale||1.25); saveData(); render(); checkReminders(); toast('Respaldo importado'); } catch(err){ alert('No pude importar el archivo. Verifica que sea un respaldo válido de Mokost Anime Center.'); } };
    reader.readAsText(file);
  }

  function toast(msg) {
    document.querySelector('.toast')?.remove();
    const el=document.createElement('div'); el.className='toast'; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2300);
  }

  function dynamicStatusSignature() {
    return state.data.animes.map(a=>{
      const stats=animeStats(a);
      return `${a.id}:${animePhase(a)}:${stats.emitted}:${stats.available}:${stats.upcoming}`;
    }).join('|');
  }

  let lastDynamicStatusSignature=dynamicStatusSignature();

  function refreshDynamicStates(force=false) {
    const signature=dynamicStatusSignature();
    const changed=signature!==lastDynamicStatusSignature;
    lastDynamicStatusSignature=signature;
    if ((force||changed) && !state.reminderCenterOpen && !['form','event-form','convert-event'].includes(state.modal)) render();
  }

  render();
  setTimeout(checkReminders,500);
  setTimeout(()=>{ if(state.data.settings?.autoUpdate!==false) checkForUpdates({silent:true,allowPrompt:true}); },1600);
  setInterval(()=>{ checkReminders(); refreshDynamicStates(false); if (!state.modal && !state.reminderCenterOpen && state.page==='home') render(); },30000);
  window.addEventListener('focus',()=>refreshDynamicStates(true));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshDynamicStates(true);});
})();
