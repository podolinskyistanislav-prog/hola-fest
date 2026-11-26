import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import { pickPostPhoto } from './pickPostPhoto';

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock('expo-image-manipulator', () => ({
  manipulateAsync: jest.fn(),
  SaveFormat: { JPEG: 'jpeg' },
}));

const granted = { granted: true } as ImagePicker.MediaLibraryPermissionResponse;

describe('pickPostPhoto', () => {
  beforeEach(() => jest.resetAllMocks());

  it('returns null when access is denied', async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue({
      granted: false,
    } as ImagePicker.MediaLibraryPermissionResponse);
    expect(await pickPostPhoto()).toBeNull();
    expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  });

  it('returns null when the user cancels', async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue(granted);
    jest
      .mocked(ImagePicker.launchImageLibraryAsync)
      .mockResolvedValue({ canceled: true, assets: null });
    expect(await pickPostPhoto()).toBeNull();
  });

  it('resizes the picked photo to 1600 px without cropping', async () => {
    jest.mocked(ImagePicker.requestMediaLibraryPermissionsAsync).mockResolvedValue(granted);
    jest.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file://big.jpg', width: 3200, height: 1600 }],
    } as ImagePicker.ImagePickerResult);
    jest
      .mocked(ImageManipulator.manipulateAsync)
      .mockResolvedValue({ uri: 'file://small.jpg' } as ImageManipulator.ImageResult);
    expect(await pickPostPhoto()).toBe('file://small.jpg');
    expect(ImageManipulator.manipulateAsync).toHaveBeenCalledWith(
      'file://big.jpg',
      [{ resize: { width: 1600, height: 800 } }],
      { compress: 0.8, format: 'jpeg' },
    );
  });
});
