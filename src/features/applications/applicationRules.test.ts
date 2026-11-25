import {
  isDjFormComplete,
  isVenueFormComplete,
  parseGenres,
  type DjFormValues,
  type VenueFormValues,
} from './applicationRules';

const venue: VenueFormValues = {
  name: 'Bavovna',
  address: 'Хрещатик 1',
  pin: { lat: 50.45, lng: 30.52 },
  instagram: '',
  contact: '+380501112233',
  photoUris: ['file:///1.jpg'],
  comment: '',
};

const dj: DjFormValues = {
  stageName: 'DJ X',
  genresText: 'techno',
  bio: '',
  photoUri: null,
  instagram: '@djx',
  soundcloud: '',
};

describe('parseGenres', () => {
  it('splits, trims, lowercases and drops duplicates and blanks', () => {
    expect(parseGenres(' Techno, house,,TECHNO ')).toEqual(['techno', 'house']);
  });

  it('keeps at most ten', () => {
    const text = Array.from({ length: 12 }, (_, i) => `g${i}`).join(',');
    expect(parseGenres(text)).toHaveLength(10);
  });
});

describe('isVenueFormComplete', () => {
  it('accepts a complete form', () => {
    expect(isVenueFormComplete(venue)).toBe(true);
  });

  it.each([
    ['a short name', { name: 'B' }],
    ['no address', { address: ' ' }],
    ['no pin', { pin: null }],
    ['no contact', { contact: '' }],
    ['no photo', { photoUris: [] }],
    ['five photos', { photoUris: ['1', '2', '3', '4', '5'] }],
  ])('rejects %s', (_name, change) => {
    expect(isVenueFormComplete({ ...venue, ...change })).toBe(false);
  });
});

describe('isDjFormComplete', () => {
  it('accepts a complete form', () => {
    expect(isDjFormComplete(dj)).toBe(true);
    expect(isDjFormComplete({ ...dj, instagram: '', soundcloud: 'https://soundcloud.com/x' })).toBe(
      true,
    );
  });

  it.each([
    ['a short stage name', { stageName: 'X' }],
    ['no genres', { genresText: ' , ' }],
    ['no links', { instagram: '', soundcloud: '' }],
  ])('rejects %s', (_name, change) => {
    expect(isDjFormComplete({ ...dj, ...change })).toBe(false);
  });
});
