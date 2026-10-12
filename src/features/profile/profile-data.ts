import { router } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { Alert } from 'react-native';

import { clearAuthSession, saveStoredProfile } from '@/features/auth/auth-storage';

export type DriverProfile = {
  name: string;
  phone: string;
  email: string;
  address: string;
  notifications: boolean;
  language: 'English' | 'Spanish';
  mapStyle: 'Standard' | 'Satellite';
  pin: string;
};

export const INITIAL_PROFILE: DriverProfile = {
  name: 'James Carter',
  phone: '2145550148',
  email: 'james.carter@example.com',
  address: '1200 Commerce St, Dallas, TX',
  notifications: true,
  language: 'English',
  mapStyle: 'Standard',
  pin: '',
};

let profile = INITIAL_PROFILE;
const listeners = new Set<() => void>();
const signOutListeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function getProfile() {
  return profile;
}

export function subscribeProfile(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function onSignOut(listener: () => void) {
  signOutListeners.add(listener);
  return () => {
    signOutListeners.delete(listener);
  };
}

export function triggerSignOut() {
  for (const listener of signOutListeners) {
    listener();
  }
}

export function setProfile(nextProfile: DriverProfile) {
  profile = nextProfile;
  emit();
}

export function updateProfile(patch: Partial<DriverProfile>) {
  profile = { ...profile, ...patch };
  emit();
  saveStoredProfile(profile).catch((err) => {
    console.error('[profile-data] Failed to persist profile update:', err);
  });
}

export function resetProfile() {
  profile = INITIAL_PROFILE;
  emit();
  saveStoredProfile(INITIAL_PROFILE).catch((err) => {
    console.error('[profile-data] Failed to reset profile storage:', err);
  });
}

export function useProfile() {
  return useSyncExternalStore(subscribeProfile, getProfile, getProfile);
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 10) {
    return digits;
  }
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const DRIVER_FACTS = {
  driverId: 'DRV-10234',
  license: 'TX 18472930',
  joined: '12 Jan 2024',
  trips: '42',
  distance: '5,130',
  hours: '210 h',
  rating: '4.8',
} as const;

export const DRIVER_DOCUMENTS = [
  {
    title: 'Driving License',
    number: 'TX 18472930',
    status: 'Valid',
    detail: 'Valid until 12 Jan 2029',
  },
  {
    title: 'Vehicle Registration',
    number: 'TX 4821K',
    status: 'Valid',
    detail: 'Commercial goods vehicle',
  },
  {
    title: 'Insurance',
    number: 'INS-449120',
    status: 'Valid',
    detail: 'Valid until 30 Mar 2027',
  },
  {
    title: 'Vehicle Inspection',
    number: 'TX-229184',
    status: 'Valid',
    detail: 'Valid until 18 Dec 2026',
  },
] as const;

export const ASSIGNED_VEHICLE = {
  name: 'Freightliner Cascadia',
  plate: 'TX 4821K',
  type: 'Container truck',
  status: 'Assigned',
} as const;

export function confirmSignOut(onSignedOut?: () => void): void;
export function confirmSignOut(event: unknown): void;
export function confirmSignOut(arg?: unknown): void {
  const onSignedOut = typeof arg === 'function' ? (arg as () => void) : undefined;
  Alert.alert('Logout', 'Sign out from your account?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Logout',
      style: 'destructive',
      onPress: async () => {
        try {
          await clearAuthSession();
          triggerSignOut();
          onSignedOut?.();
        } finally {
          router.replace('/');
        }
      },
    },
  ]);
}
