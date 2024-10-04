import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

// Request permission for microphone
export const getMicrophonePermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  if (status !== 'granted') {
    alert('Permission to access microphone is required!');
    return false;
  }
  return true;
};
