import { buildMapHtml, LEAFLET_CSS_SRI, LEAFLET_JS_SRI, MAP_ATTRIBUTION, tileUrl } from './mapHtml';

const options = { scheme: 'dark', interactive: true, compact: false } as const;

describe('tileUrl', () => {
  it('uses dark tiles in the dark theme and light tiles in the light one', () => {
    expect(tileUrl('dark')).toContain('/dark_all/');
    expect(tileUrl('light')).toContain('/light_all/');
  });
});

describe('buildMapHtml', () => {
  it('loads a pinned Leaflet with integrity hashes', () => {
    const html = buildMapHtml(options);
    expect(html).toContain('leaflet@1.9.4');
    expect(html).toContain(LEAFLET_CSS_SRI);
    expect(html).toContain(LEAFLET_JS_SRI);
  });

  it('credits OpenStreetMap and CARTO', () => {
    const html = buildMapHtml(options);
    expect(MAP_ATTRIBUTION).toContain('OpenStreetMap');
    expect(MAP_ATTRIBUTION).toContain('CARTO');
    expect(html).toContain('OpenStreetMap');
    expect(html).toContain('CARTO');
  });

  it('picks the tile set from the theme', () => {
    expect(buildMapHtml({ ...options, scheme: 'dark' })).toContain('dark_all');
    expect(buildMapHtml({ ...options, scheme: 'light' })).toContain('light_all');
  });

  it('passes the interactive and compact flags to the page', () => {
    const html = buildMapHtml({ scheme: 'light', interactive: false, compact: true });
    expect(html).toContain('"interactive":false');
    expect(html).toContain('"compact":true');
  });

  it('centres the selected pin in a compact preview as well as in the full map', () => {
    expect(buildMapHtml(options)).toContain('(cfg.interactive || cfg.compact)) map.panTo');
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
