import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import { fitWithin } from './pickAvatar';

export const POST_PHOTO_MAX_SIDE_PX = 1600;

/**
 * Lets the user pick one photo for a post and returns a local JPEG resized to at most
 * 1600 px, uncropped. Resolves null when the user cancels or denies access.
 */
export async function pickPostPhoto(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;
  const picked = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'] });
  const asset = picked.canceled ? null : picked.assets[0];
  if (!asset) return null;
  const size = fitWithin(asset.width, asset.height, POST_PHOTO_MAX_SIDE_PX);
  const result = await ImageManipulator.manipulateAsync(asset.uri, [{ resize: size }], {
    compress: 0.8,
    format: ImageManipulator.SaveFormat.JPEG,
  });
  return result.uri;
}
