import { Linking } from 'react-native';

export type TaxiProvider = 'uklon' | 'bolt' | 'uber';

export type TaxiDestination = {
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
};

export type TaxiLink = {
  provider: TaxiProvider;
  label: string;
  appUrl: string;
  fallbackUrl: string;
};

function isValidCoordinate(lat: number | null, lng: number | null): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180 &&
    !(lat === 0 && lng === 0)
  );
}

/** Builds taxi links in product order: Uklon, Bolt, Uber. Returns [] for invalid coordinates. */
export function buildTaxiLinks(destination: TaxiDestination): TaxiLink[] {
  if (!isValidCoordinate(destination.lat, destination.lng)) {
    return [];
  }
  const latitude = encodeURIComponent(String(destination.lat));
  const longitude = encodeURIComponent(String(destination.lng));
  const name = encodeURIComponent(destination.name);
  const address = encodeURIComponent(destination.address ?? destination.name);

  return [
    {
      provider: 'uklon',
      label: 'Uklon',
      appUrl: `uklon://order?dropoff_lat=${latitude}&dropoff_lng=${longitude}&dropoff_address=${address}`,
      fallbackUrl: 'https://uklon.com.ua/',
    },
    {
      provider: 'bolt',
      label: 'Bolt',
      appUrl: `bolt://ride?destination_lat=${latitude}&destination_lng=${longitude}&destination_address=${address}`,
      fallbackUrl: 'https://bolt.eu/en/app/',
    },
    {
      provider: 'uber',
      label: 'Uber',
      appUrl: `uber://?action=setPipeline&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}&dropoff[nickname]=${name}&dropoff[formatted_address]=${address}`,
      fallbackUrl: 'https://m.uber.com/ul/',
    },
  ];
}

type LinkOpener = Pick<typeof Linking, 'openURL'>;

/**
 * Opens the taxi app; if it cannot be opened (not installed) opens the fallback page.
 * Uses openURL directly instead of canOpenURL, so no LSApplicationQueriesSchemes /
 * Android package-visibility entries are needed.
 */
export async function openTaxiLink(link: TaxiLink, linking: LinkOpener = Linking): Promise<void> {
  try {
    await linking.openURL(link.appUrl);
  } catch {
    await linking.openURL(link.fallbackUrl);
  }
}
