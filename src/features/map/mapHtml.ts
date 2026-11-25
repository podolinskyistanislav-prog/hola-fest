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

const LEAFLET_VERSION = '1.9.4';
export const LEAFLET_CSS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`;
export const LEAFLET_JS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`;
export const LEAFLET_CSS_SRI = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
export const LEAFLET_JS_SRI = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';

/** CARTO raster tiles: dark in the dark theme, light in the light one. */
export function tileUrl(scheme: MapScheme): string {
  const style = scheme === 'dark' ? 'dark_all' : 'light_all';
  return `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`;
}

export const MAP_ATTRIBUTION =
  '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>';

const STYLE = `
html,body,#map{margin:0;height:100%;width:100%;background:var(--bg);}
.leaflet-container{font-family:-apple-system,system-ui,sans-serif;}
.pin{display:flex;flex-direction:column;align-items:center;gap:6px;transform-origin:50% 100%;transition:transform .15s;}
.pin-label{padding:0 10px;height:28px;border-radius:14px;line-height:28px;font-size:12px;font-weight:600;white-space:nowrap;color:var(--on-accent);background:var(--accent);}
.pin-halo{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--halo);}
.pin-dot{width:16px;height:16px;box-sizing:border-box;border-radius:50%;border:3px solid var(--on-accent);background:var(--accent);}
.pin.yellow{--accent:${brand.yellow};--halo:rgba(253,211,3,.25);}
.pin.pink{--accent:${brand.pink};--halo:rgba(241,39,125,.25);}
.pin.selected{transform:scale(1.25);z-index:1000;}
.pin.selected .pin-halo{box-shadow:0 0 0 6px var(--halo);}
`;

const SCRIPT = `
(function () {
  var cfg = window.HOLA_MAP_CONFIG;
  var map = L.map('map', {
    zoomControl: !cfg.compact,
    attributionControl: true,
    dragging: cfg.interactive,
    touchZoom: cfg.interactive,
    scrollWheelZoom: cfg.interactive,
    doubleClickZoom: cfg.interactive,
    boxZoom: cfg.interactive,
    keyboard: cfg.interactive,
  }).setView([cfg.center.lat, cfg.center.lng], cfg.center.zoom);
  map.attributionControl.setPrefix(false);
  L.tileLayer(cfg.tileUrl, { maxZoom: 19, subdomains: 'abcd', attribution: cfg.attribution }).addTo(map);

  var markers = {};
  var venues = {};
  var selectedId = null;

  function post(message) {
    var raw = JSON.stringify(message);
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(raw);
    else window.parent.postMessage(raw, '*');
  }
  function text(value) {
    var span = document.createElement('span');
    span.textContent = value;
    return span.innerHTML;
  }
  function iconFor(venue) {
    var selected = venue.id === selectedId ? ' selected' : '';
    return L.divIcon({
      className: '',
      iconSize: null,
      html: '<div class="pin ' + venue.accent + selected + '"><div class="pin-label">' + text(venue.name) +
        '</div><div class="pin-halo"><div class="pin-dot"></div></div></div>',
    });
  }
  function setVenues(list) {
    Object.keys(markers).forEach(function (id) { markers[id].remove(); });
    markers = {};
    venues = {};
    list.forEach(function (venue) {
      venues[venue.id] = venue;
      var marker = L.marker([venue.lat, venue.lng], { icon: iconFor(venue), keyboard: false });
      if (cfg.interactive) marker.on('click', function () { post({ type: 'pinPress', id: venue.id }); });
      marker.addTo(map);
      markers[venue.id] = marker;
    });
  }
  function select(id) {
    var previous = selectedId;
    selectedId = id;
    [previous, id].forEach(function (key) {
      if (key && markers[key]) markers[key].setIcon(iconFor(venues[key]));
    });
    if (id && venues[id] && (cfg.interactive || cfg.compact)) map.panTo([venues[id].lat, venues[id].lng]);
  }
  function fitTo(ids) {
    var points = Object.keys(venues)
      .filter(function (id) { return !ids || ids.indexOf(id) !== -1; })
      .map(function (id) { return [venues[id].lat, venues[id].lng]; });
    if (points.length === 0) return;
    if (points.length === 1) map.setView(points[0], 15);
    else map.fitBounds(points, { padding: [40, 40], maxZoom: 15 });
  }
  function receive(message) {
    if (!message || typeof message !== 'object') return;
    if (message.type === 'setVenues') setVenues(message.venues);
    else if (message.type === 'select') select(message.id);
    else if (message.type === 'fitTo') fitTo(message.ids);
  }

  if (cfg.interactive) map.on('click', function (event) { post({ type: 'mapPress', lat: event.latlng.lat, lng: event.latlng.lng }); });
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
    tileUrl: tileUrl(scheme),
    attribution: MAP_ATTRIBUTION,
  };
  return `<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="stylesheet" href="${LEAFLET_CSS_URL}" integrity="${LEAFLET_CSS_SRI}" crossorigin="">
<style>:root{--bg:${palettes[scheme].surfaceRaised};--on-accent:${brand.onAccent};}${STYLE}</style>
</head>
<body>
<div id="map"></div>
<script src="${LEAFLET_JS_URL}" integrity="${LEAFLET_JS_SRI}" crossorigin=""></script>
<script>window.HOLA_MAP_CONFIG=${inlineJson(config)};</script>
<script>${SCRIPT}</script>
</body>
</html>`;
}
