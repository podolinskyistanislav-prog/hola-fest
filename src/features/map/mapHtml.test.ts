import {
  buildMapHtml,
  MAPLIBRE_CSS_SRI,
  MAPLIBRE_JS_SRI,
  MAP_ATTRIBUTION,
  styleUrl,
} from './mapHtml';

const options = { scheme: 'dark', interactive: true, compact: false } as const;

describe('styleUrl', () => {
  it('uses OpenFreeMap Positron in both themes (their Dark style renders blank)', () => {
    expect(styleUrl('dark')).toBe('https://tiles.openfreemap.org/styles/positron');
    expect(styleUrl('light')).toBe('https://tiles.openfreemap.org/styles/positron');
  });
});

describe('buildMapHtml', () => {
  it('loads a pinned MapLibre GL with sha384 integrity hashes', () => {
    const html = buildMapHtml(options);
    expect(html).toContain('maplibre-gl@5.9.0');
    expect(html).toContain(MAPLIBRE_CSS_SRI);
    expect(html).toContain(MAPLIBRE_JS_SRI);
    expect(MAPLIBRE_JS_SRI).toMatch(/^sha384-/);
  });

  it('needs no API key and no longer uses CARTO', () => {
    const html = buildMapHtml(options);
    expect(html).not.toContain('cartocdn');
    expect(html).not.toMatch(/api[_-]?key/i);
  });

  it('documents the OpenFreeMap / OpenMapTiles / OpenStreetMap credit', () => {
    expect(MAP_ATTRIBUTION).toContain('OpenFreeMap');
    expect(MAP_ATTRIBUTION).toContain('OpenMapTiles');
    expect(MAP_ATTRIBUTION).toContain('OpenStreetMap');
  });

  it('darkens the basemap canvas only in the dark theme', () => {
    expect(buildMapHtml({ ...options, scheme: 'dark' })).toContain(
      '.maplibregl-canvas{filter:invert(1)',
    );
    expect(buildMapHtml({ ...options, scheme: 'light' })).not.toContain(
      '.maplibregl-canvas{filter',
    );
  });

  it('keeps the attribution as a collapsed button and adds no zoom buttons', () => {
    const html = buildMapHtml(options);
    expect(html).toContain('AttributionControl({ compact: true })');
    expect(html).not.toContain('NavigationControl');
  });

  it('passes the interactive and compact flags to the page', () => {
    const html = buildMapHtml({ scheme: 'light', interactive: false, compact: true });
    expect(html).toContain('"interactive":false');
    expect(html).toContain('"compact":true');
  });

  it('centres the selected pin in a compact preview as well as in the full map', () => {
    expect(buildMapHtml(options)).toContain('(cfg.interactive || cfg.compact)) map.easeTo');
  });

  it('draws pins as a label pill and a dot, with an enlarged selected state', () => {
    const html = buildMapHtml(options);
    expect(html).toContain('pin-label');
    expect(html).toContain('pin-dot');
    expect(html).toContain('.pin.selected');
  });

  it('reports pin presses to the app through both bridges', () => {
    const html = buildMapHtml(options);
    expect(html).toContain('ReactNativeWebView.postMessage');
    expect(html).toContain('window.parent.postMessage');
    expect(html).toContain("type: 'pinPress'");
  });
});
