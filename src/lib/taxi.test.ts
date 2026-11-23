import { buildMainTaxiLink, buildTaxiLinks, openTaxiLink, type TaxiDestination } from './taxi';

const venue: TaxiDestination = {
  name: 'Bavovna Club',
  address: 'вул. Хрещатик, 1',
  lat: 50.45,
  lng: 30.5234,
};
const encodedAddress = encodeURIComponent('вул. Хрещатик, 1');

describe('buildTaxiLinks', () => {
  const links = buildTaxiLinks(venue);

  it('returns Bolt, Uklon, Uber in this order', () => {
    expect(links.map((l) => l.provider)).toEqual(['bolt', 'uklon', 'uber']);
  });

  it('builds the Uklon link', () => {
    expect(links[1]).toEqual({
      provider: 'uklon',
      label: 'Uklon',
      appUrl: `uklon://order?dropoff_lat=50.45&dropoff_lng=30.5234&dropoff_address=${encodedAddress}`,
      fallbackUrl: 'https://uklon.com.ua/',
    });
  });

  it('builds the Bolt link', () => {
    expect(links[0]).toEqual({
      provider: 'bolt',
      label: 'Bolt',
      appUrl: `bolt://r?destination_lat=50.45&destination_lng=30.5234&destination_name=${encodedAddress}`,
      fallbackUrl: 'https://bolt.eu/en/app/',
    });
  });

  it('builds the Uber link', () => {
    expect(links[2]).toEqual({
      provider: 'uber',
      label: 'Uber',
      appUrl: `uber://?action=setPipeline&dropoff[latitude]=50.45&dropoff[longitude]=30.5234&dropoff[nickname]=Bavovna%20Club&dropoff[formatted_address]=${encodedAddress}`,
      fallbackUrl: 'https://m.uber.com/ul/',
    });
  });

  it('uses the name when the address is missing', () => {
    const [bolt] = buildTaxiLinks({ ...venue, address: null });
    expect(bolt?.appUrl).toContain('destination_name=Bavovna%20Club');
  });

  it('encodes characters that would break the query string', () => {
    const [bolt] = buildTaxiLinks({ ...venue, address: 'A&B=C#1' });
    expect(bolt?.appUrl).toContain('destination_name=A%26B%3DC%231');
  });

  it.each([
    [null, 30],
    [50, null],
    [Number.NaN, 30],
    [50, Number.POSITIVE_INFINITY],
    [91, 30],
    [50, 181],
    [0, 0],
  ])('rejects invalid coordinates (%p, %p)', (lat, lng) => {
    expect(buildTaxiLinks({ ...venue, lat, lng })).toEqual([]);
  });
});

describe('buildMainTaxiLink', () => {
  it('returns the Bolt link with the Bolt page as fallback', () => {
    expect(buildMainTaxiLink(venue)).toMatchObject({
      provider: 'bolt',
      fallbackUrl: 'https://bolt.eu/en/app/',
    });
  });

  it('returns null for invalid coordinates', () => {
    expect(buildMainTaxiLink({ ...venue, lat: null })).toBeNull();
  });
});

describe('openTaxiLink', () => {
  const link = buildTaxiLinks(venue)[0];

  it('opens the app link when it works', async () => {
    const openURL = jest.fn().mockResolvedValue(true);
    if (!link) throw new Error('link expected');
    await openTaxiLink(link, { openURL });
    expect(openURL).toHaveBeenCalledTimes(1);
    expect(openURL).toHaveBeenCalledWith(link.appUrl);
  });

  it('falls back to the store page when the app cannot be opened', async () => {
    const openURL = jest
      .fn()
      .mockRejectedValueOnce(new Error('no app'))
      .mockResolvedValueOnce(true);
    if (!link) throw new Error('link expected');
    await openTaxiLink(link, { openURL });
    expect(openURL).toHaveBeenNthCalledWith(2, link.fallbackUrl);
  });
});
