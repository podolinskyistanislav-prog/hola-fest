import { encodeToMap, injectedScriptFor, parseFromMap, type ToMapMessage } from './mapMessages';

const venue = { id: 'v1', name: 'Bavovna', lat: 50.45, lng: 30.52, accent: 'yellow' } as const;

describe('encodeToMap', () => {
  it('round-trips every app-to-map message through JSON', () => {
    const messages: ToMapMessage[] = [
      { type: 'setVenues', venues: [venue] },
      { type: 'select', id: 'v1' },
      { type: 'select', id: null },
      { type: 'fitTo' },
      { type: 'fitTo', ids: ['v1'] },
    ];
    for (const message of messages) {
      expect(JSON.parse(encodeToMap(message))).toEqual(message);
    }
  });
});

describe('injectedScriptFor', () => {
  it('calls the page receiver with the message and returns true for the WebView', () => {
    const script = injectedScriptFor({ type: 'select', id: 'v1' });
    expect(script).toBe(
      'window.holaMap&&window.holaMap.receive({"type":"select","id":"v1"});true;',
    );
  });
});

describe('parseFromMap', () => {
  it('reads a pin press', () => {
    expect(parseFromMap('{"type":"pinPress","id":"v1"}')).toEqual({ type: 'pinPress', id: 'v1' });
  });

  it('reads a tap on the empty map', () => {
    expect(parseFromMap('{"type":"mapPress"}')).toEqual({ type: 'mapPress' });
  });

  it('reads the point of a tap on the empty map', () => {
    expect(parseFromMap('{"type":"mapPress","lat":50.45,"lng":30.52}')).toEqual({
      type: 'mapPress',
      lat: 50.45,
      lng: 30.52,
    });
  });

  it.each([
    ['not a string', 42],
    ['not JSON', 'hello'],
    ['JSON null', 'null'],
    ['an unknown type', '{"type":"explode"}'],
    ['a pin press without an id', '{"type":"pinPress"}'],
    ['a pin press with a numeric id', '{"type":"pinPress","id":1}'],
  ])('ignores %s', (_name, raw) => {
    expect(parseFromMap(raw)).toBeNull();
  });
});
