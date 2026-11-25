import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import { fitWithin, pickAvatar } from './pickAvatar';

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock('expo-image-manipulator', () => ({
  manipulateAsync: jest.fn(),
  SaveFormat: { JPEG: 'jpeg' },
}));

describe('fitWithin', () => {
  it('shrinks the longest side to 1024', () => {
    expect(fitWithin(4000, 2000)).toEqual({ width: 1024, height: 512 });
    expect(fitWithin(1000, 3000)).toEqual({ width: 341, height: 1024 });
  });

  it('never upscales', () => {
    expect(fitWithin(800, 600)).toEqual({ width: 800, height: 600 });
  });
});

describe('pickAvatar', () => {
  beforeEach(() => jest.resetAllMocks());

  it('returns null when access is denied', async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      granted: false,
    } as ImagePicker.MediaLibraryPermissionResponse);
    await expect(pickAvatar()).resolves.toBeNull();
    expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  });

  it('returns null when the user cancels', async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      granted: true,
    } as ImagePicker.MediaLibraryPermissionResponse);
    jest
      .mocked(ImagePicker.launchImageLibraryAsync)
      .mockResolvedValue({ canceled: true, assets: null });
    await expect(pickAvatar()).resolves.toBeNull();
  });

  it('resizes the picked photo to at most 1024 px', async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      granted: true,
    } as ImagePicker.MediaLibraryPermissionResponse);
    jest.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file://big.jpg', width: 3000, height: 3000 }],
    } as ImagePicker.ImagePickerResult);
    jest
      .mocked(ImageManipulator.manipulateAsync)
      .mockResolvedValue({ uri: 'file://small.jpg', width: 1024, height: 1024 });

    await expect(pickAvatar()).resolves.toBe('file://small.jpg');
    expect(ImageManipulator.manipulateAsync).toHaveBeenCalledWith(
      'file://big.jpg',
      [{ resize: { width: 1024, height: 1024 } }],
      expect.objectContaining({ format: 'jpeg' }),
    );
  });
});
