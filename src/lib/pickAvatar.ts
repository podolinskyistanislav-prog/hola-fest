import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

export const AVATAR_MAX_SIDE_PX = 1024;

/** Size to fit inside the max side while keeping the aspect ratio; never upscales. */
export function fitWithin(
  width: number,
  height: number,
  maxSide: number = AVATAR_MAX_SIDE_PX,
): { width: number; height: number } {
  const longest = Math.max(width, height);
  if (longest <= maxSide) return { width, height };
  const scale = maxSide / longest;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

/**
 * Lets the user pick a photo and returns a local JPEG resized to at most 1024 px.
 * Resolves null when the user cancels or denies access.
 */
export async function pickAvatar(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;
  const picked = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
  });
  const asset = picked.canceled ? null : picked.assets[0];
  if (!asset) return null;
  const size = fitWithin(asset.width, asset.height);
  const result = await ImageManipulator.manipulateAsync(asset.uri, [{ resize: size }], {
    compress: 0.8,
    format: ImageManipulator.SaveFormat.JPEG,
  });
  return result.uri;
}
