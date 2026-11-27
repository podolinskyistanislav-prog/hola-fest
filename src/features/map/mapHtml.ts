import { brand, palettes } from '@/theme';

export type MapScheme = 'dark' | 'light';

export interface MapHtmlOptions {
  scheme: MapScheme;
  /** Pan, zoom and tap pins. Off for a static preview. */
  interactive: boolean;
  /** Small preview: no zoom buttons. */
  compact: boolean;
}

/** Camera start: central Kyiv. */
export const KYIV_CENTER = { lat: 50.4501, lng: 30.5234, zoom: 12 } as const;

const MAPLIBRE_VERSION = '5.9.0';
export const MAPLIBRE_CSS_URL = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.css`;
export const MAPLIBRE_JS_URL = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.js`;
// Computed from the npm tarball of maplibre-gl@5.9.0 (the files unpkg serves).
export const MAPLIBRE_CSS_SRI =
  'sha384-gNYNsUmuZqDYiT3gbirWTV5K7rt71RoveS/yXAaU09d4ZUmeDVTD3XoqB6uJAIFR';
export const MAPLIBRE_JS_SRI =
  'sha384-81ppUWZZO+pveTPk4qU9cZuScEFULHfuOMHVJHFZ7xVBlWQTG1zsPrVIMGAl1WMb';

/** OpenFreeMap vector styles (free, no key, no limits): dark in the dark theme, Positron in the light one. */
export function styleUrl(scheme: MapScheme): string {
  return `https://tiles.openfreemap.org/styles/${scheme === 'dark' ? 'dark' : 'positron'}`;
}

/** Shown in the map corner; the styles' own source attribution is added by MapLibre too. */
export const MAP_ATTRIBUTION =
  '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';

const STYLE = `
html,body,#map{margin:0;height:100%;width:100%;background:var(--bg);}
.maplibregl-map{font-family:-apple-system,system-ui,sans-serif;}
.pin{display:flex;flex-direction:column;align-items:center;gap:6px;transform-origin:50% 100%;transition:transform .15s;cursor:pointer;}
.pin-label{padding:0 10px;height:28px;border-radius:14px;line-height:28px;font-size:12px;font-weight:600;white-space:nowrap;color:var(--on-accent);background:var(--accent);}
.pin-halo{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--halo);}
.pin-dot{width:16px;height:16px;box-sizing:border-box;border-radius:50%;border:3px solid var(--on-accent);background:var(--accent);}
.pin.yellow{--accent:${brand.yellow};--halo:rgba(253,211,3,.25);}
.pin.pink{--accent:${brand.pink};--halo:rgba(241,39,125,.25);}
.pin.selected{transform:scale(1.25);}
.pin.selected .pin-halo{box-shadow:0 0 0 6px var(--halo);}
.marker-selected{z-index:1000;}
`;

const SCRIPT = `
(function () {
  var cfg = window.HOLA_MAP_CONFIG;
  var map = new maplibregl.Map({
    container: 'map',
    style: cfg.styleUrl,
    center: [cfg.center.lng, cfg.center.lat],
    zoom: cfg.center.zoom,
    interactive: cfg.interactive,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
    attributionControl: false,
  });
  map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: cfg.attribution }));
  if (cfg.interactive) {
    map.touchZoomRotate.disableRotation();
    if (!cfg.compact) map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  }

  var markers = {};
  var venues = {};
  var selectedId = null;

  function post(message) {
    var raw = JSON.stringify(message);
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(raw);
    else window.parent.postMessage(raw, '*');
  }
  function pinElement(venue) {
    var root = document.createElement('div');
    root.className = 'pin ' + venue.accent;
    var label = document.createElement('div');
    label.className = 'pin-label';
    label.textContent = venue.name;
    var halo = document.createElement('div');
    halo.className = 'pin-halo';
    var dot = document.createElement('div');
    dot.className = 'pin-dot';
    halo.appendChild(dot);
    root.appendChild(label);
    root.appendChild(halo);
    return root;
  }
  function paint(id) {
    var marker = markers[id];
    if (!marker) return;
    var selected = id === selectedId;
    marker.getElement().classList.toggle('marker-selected', selected);
    marker.getElement().firstChild.classList.toggle('selected', selected);
  }
  function setVenues(list) {
    Object.keys(markers).forEach(function (id) { markers[id].remove(); });
    markers = {};
    venues = {};
    list.forEach(function (venue) {
      venues[venue.id] = venue;
      var wrapper = document.createElement('div');
      wrapper.appendChild(pinElement(venue));
      if (cfg.interactive) {
        wrapper.addEventListener('click', function (event) {
          event.stopPropagation();
          post({ type: 'pinPress', id: venue.id });
        });
      }
      markers[venue.id] = new maplibregl.Marker({ element: wrapper, anchor: 'bottom' })
        .setLngLat([venue.lng, venue.lat])
        .addTo(map);
      paint(venue.id);
    });
  }
  function select(id) {
    var previous = selectedId;
    selectedId = id;
    [previous, id].forEach(function (key) { if (key) paint(key); });
    if (id && venues[id] && (cfg.interactive || cfg.compact)) map.easeTo({ center: [venues[id].lng, venues[id].lat] });
  }
  function fitTo(ids) {
    var points = Object.keys(venues)
      .filter(function (id) { return !ids || ids.indexOf(id) !== -1; })
      .map(function (id) { return [venues[id].lng, venues[id].lat]; });
    if (points.length === 0) return;
    if (points.length === 1) { map.jumpTo({ center: points[0], zoom: 15 }); return; }
    var bounds = points.reduce(function (b, p) { return b.extend(p); }, new maplibregl.LngLatBounds(points[0], points[0]));
    map.fitBounds(bounds, { padding: 40, maxZoom: 15, duration: 0 });
  }
  function receive(message) {
    if (!message || typeof message !== 'object') return;
    if (message.type === 'setVenues') setVenues(message.venues);
    else if (message.type === 'select') select(message.id);
    else if (message.type === 'fitTo') fitTo(message.ids);
  }

  if (cfg.interactive) map.on('click', function (event) { post({ type: 'mapPress', lat: event.lngLat.lat, lng: event.lngLat.lng }); });
  window.holaMap = { receive: receive };
  window.addEventListener('message', function (event) {
    if (event.source !== window.parent) return;
    try { receive(typeof event.data === 'string' ? JSON.parse(event.data) : event.data); } catch (error) {}
  });
})();
`;

/** Makes a JSON value safe to place inside an inline script. */
function inlineJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/** The one HTML page both native (WebView) and web (iframe `srcDoc`) show. */
export function buildMapHtml({ scheme, interactive, compact }: MapHtmlOptions): string {
  const config = {
    interactive,
    compact,
    center: KYIV_CENTER,
    styleUrl: styleUrl(scheme),
    attribution: MAP_ATTRIBUTION,
  };
  return `<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="stylesheet" href="${MAPLIBRE_CSS_URL}" integrity="${MAPLIBRE_CSS_SRI}" crossorigin="anonymous">
<style>:root{--bg:${palettes[scheme].surfaceRaised};--on-accent:${brand.onAccent};}${STYLE}</style>
</head>
<body>
<div id="map"></div>
<script src="${MAPLIBRE_JS_URL}" integrity="${MAPLIBRE_JS_SRI}" crossorigin="anonymous"></script>
<script>window.HOLA_MAP_CONFIG=${inlineJson(config)};</script>
<script>${SCRIPT}</script>
</body>
</html>`;
}
