import AsyncStorage from '@react-native-async-storage/async-storage';

import type { DriverProfile } from '@/features/profile/profile-data';
import type { AuthSession } from './auth-types';

const STORAGE_KEY_SESSION = '@fleet_driver_session_v1';
const STORAGE_KEY_PROFILE = '@fleet_driver_profile_v1';

export async function saveAuthSession(session: AuthSession): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
  } catch (error) {
    console.error('[auth-storage] Failed to save auth session:', error);
  }
}

export async function getAuthSession(): Promise<AuthSession | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch (error) {
    console.error('[auth-storage] Failed to get auth session:', error);
    return null;
  }
}

export async function clearAuthSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_SESSION);
  } catch (error) {
    console.error('[auth-storage] Failed to clear auth session:', error);
  }
}

export async function saveStoredProfile(profile: DriverProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('[auth-storage] Failed to save profile:', error);
  }
}

export async function getStoredProfile(): Promise<DriverProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) return null;
    return JSON.parse(raw) as DriverProfile;
  } catch (error) {
    console.error('[auth-storage] Failed to get profile:', error);
    return null;
  }
}

export async function clearStoredProfile(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_PROFILE);
  } catch (error) {
    console.error('[auth-storage] Failed to clear profile:', error);
  }
}
