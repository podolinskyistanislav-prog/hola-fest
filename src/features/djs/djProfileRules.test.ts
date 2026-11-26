import type { MyDjProfile } from '@/types/djs';

import { safeLinkUrl } from './djFormat';
import {
  addGenre,
  buildProfileSave,
  isLocalUri,
  profileToFormValues,
  validateDjProfile,
} from './djProfileRules';

const profile: MyDjProfile = {
  id: 'd1',
  slug: 'nova',
  stageName: 'Nova',
  bio: null,
  genres: ['techno'],
  photoPath: 'd1/p.jpg',
  coverPath: null,
  instagramUrl: null,
  soundcloudUrl: null,
  isPublished: false,
};
const values = profileToFormValues(profile, 'https://cdn/d1/p.jpg', null);

describe('addGenre', () => {
  it('adds a clean chip once, up to ten', () => {
    expect(addGenre(['techno'], '  House ')).toEqual(['techno', 'house']);
    expect(addGenre(['techno'], 'TECHNO')).toEqual(['techno']);
    expect(addGenre(['techno'], '  ')).toEqual(['techno']);
    const ten = Array.from({ length: 10 }, (_, i) => `g${i}`);
    expect(addGenre(ten, 'new')).toEqual(ten);
  });
});

describe('validateDjProfile', () => {
  it('accepts the loaded profile', () => {
    expect(validateDjProfile(values)).toEqual({});
  });

  it('checks name, bio and link lengths', () => {
    expect(validateDjProfile({ ...values, stageName: ' a ' }).stageName).toBe(
      'djCabinet.error.nameRequired',
    );
    expect(validateDjProfile({ ...values, stageName: 'x'.repeat(41) }).stageName).toBe(
      'djCabinet.error.nameTooLong',
    );
    expect(validateDjProfile({ ...values, bio: 'x'.repeat(1001) }).bio).toBe(
      'djCabinet.error.bioTooLong',
    );
    const long = { ...values, instagram: 'x'.repeat(201), soundcloud: 'x'.repeat(201) };
    expect(validateDjProfile(long)).toMatchObject({
      instagram: 'djCabinet.error.linkTooLong',
      soundcloud: 'djCabinet.error.linkTooLong',
    });
  });
});

describe('buildProfileSave', () => {
  it('trims text, nulls empty values and uploads nothing for unchanged images', () => {
    const save = buildProfileSave({ ...values, stageName: ' Nova ', bio: ' ' }, profile);
    expect(save.fields).toEqual({
      stageName: 'Nova',
      bio: null,
      genres: ['techno'],
      instagramUrl: null,
      soundcloudUrl: null,
    });
    expect(save.newPhotoUri).toBeNull();
    expect(save.newCoverUri).toBeNull();
  });

  it('uploads picked files and clears removed ones', () => {
    const picked = buildProfileSave({ ...values, coverUri: 'file:///cover.jpg' }, profile);
    expect(picked.newCoverUri).toBe('file:///cover.jpg');
    const removed = buildProfileSave({ ...values, photoUri: null }, profile);
    expect(removed.fields.photoPath).toBeNull();
    expect(removed.fields.coverPath).toBeUndefined();
  });
});

describe('isLocalUri', () => {
  it('tells picked files from saved urls', () => {
    expect(isLocalUri('file:///a.jpg')).toBe(true);
    expect(isLocalUri('https://cdn/a.jpg')).toBe(false);
    expect(isLocalUri(null)).toBe(false);
  });
});

describe('safeLinkUrl', () => {
  it('keeps http(s), prefixes bare domains and rejects other schemes', () => {
    expect(safeLinkUrl(' https://soundcloud.com/nova ')).toBe('https://soundcloud.com/nova');
    expect(safeLinkUrl('instagram.com/nova')).toBe('https://instagram.com/nova');
    expect(safeLinkUrl('javascript:alert(1)')).toBeNull();
    expect(safeLinkUrl('@nova')).toBeNull();
    expect(safeLinkUrl('')).toBeNull();
    expect(safeLinkUrl(null)).toBeNull();
  });
});
