import { act, render, screen } from '@testing-library/react-native';

import type { MappableVenue } from '@/features/venues/venueMap';

import { VenueMap } from './VenueMap.web';

const venue: MappableVenue = {
  id: 'v1',
  slug: 'bavovna',
  name: 'Bavovna',
  address: null,
  lat: 50.45,
  lng: 30.52,
  hasShelter: false,
  instagramUrl: null,
  coverPath: null,
};

type Listener = (event: { source: unknown; data: unknown }) => void;

/** This suite runs in the React Native environment: give it the one browser API the component uses. */
const listeners = new Set<Listener>();

beforeAll(() => {
  Object.assign(window, {
    addEventListener: (_type: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: Listener) => listeners.delete(listener),
  });
});

beforeEach(() => {
  listeners.clear();
});

async function mount(onSelect: (id: string | null) => void) {
  await render(<VenueMap venues={[venue]} selectedId={null} onSelect={onSelect} />);
}

/**
 * The native test renderer has no real iframe, so the component's own frame has no `contentWindow`
 * (`undefined`). A message is "from the frame" when its source is that same `undefined`.
 */
async function post(data: unknown, source: unknown = undefined) {
  await act(async () => {
    listeners.forEach((listener) => listener({ source, data }));
  });
}

describe('VenueMap (web)', () => {
  it('shows the Leaflet page in an iframe', async () => {
    await mount(jest.fn());
    const [frame] = screen.container.queryAll((node) => node.type === 'iframe');
    expect(frame?.props.srcDoc).toContain('leaflet');
  });

  it('selects the venue when the page reports a pin press', async () => {
    const onSelect = jest.fn();
    await mount(onSelect);
    await post('{"type":"pinPress","id":"v1"}');
    expect(onSelect).toHaveBeenCalledWith('v1');
  });

  it('clears the selection when the empty map is tapped', async () => {
    const onSelect = jest.fn();
    await mount(onSelect);
    await post('{"type":"mapPress"}');
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('ignores messages that do not come from its own frame', async () => {
    const onSelect = jest.fn();
    await mount(onSelect);
    await post('{"type":"pinPress","id":"v1"}', {});
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('ignores malformed messages from its own frame', async () => {
    const onSelect = jest.fn();
    await mount(onSelect);
    await post('{"type":"explode"}');
    expect(onSelect).not.toHaveBeenCalled();
  });
});
