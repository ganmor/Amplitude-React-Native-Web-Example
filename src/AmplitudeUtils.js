import { Platform } from 'react-native';

const API_KEY = '9c9566b48da3f559498fd70b164303b8';
const webConfig = { includeUtm: true, includeReferrer: true };

/**
 * @returns Promise<Amplitude | AmplitudeClient>
 */
const getAmplitudeInstance = async () => {
  if (Platform.OS === 'web') {
    return (await import('amplitude-js')).getInstance();
  }
  return (await import('@amplitude/react-native')).Amplitude.getInstance();
};

export const initAmplitudeInstance = async () => {
  if (Platform.OS === 'web') {
    return (await getAmplitudeInstance()).init(API_KEY, null, webConfig);
  }

  return (await getAmplitudeInstance()).init(API_KEY);
};

export const logAmplitudeEvent = async (eventName, eventProps) =>
  (await getAmplitudeInstance()).logEvent(eventName, eventProps);
