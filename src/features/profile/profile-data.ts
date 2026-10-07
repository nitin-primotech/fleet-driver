import { router } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { Alert } from 'react-native';

export type DriverProfile = {
  name: string;
  phone: string;
  email: string;
  address: string;
  notifications: boolean;
  language: 'English' | 'Hindi';
  mapStyle: 'Standard' | 'Satellite';
  pin: string;
};

const INITIAL_PROFILE: DriverProfile = {
  name: 'Rakesh Kumar',
  phone: '9876543210',
  email: 'rakesh.kumar@example.com',
  address: 'Sector 62, Noida, UP',
  notifications: true,
  language: 'English',
  mapStyle: 'Standard',
  pin: '',
};

let profile = INITIAL_PROFILE;
const listeners = new Set<() => void>();

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
  return () => listeners.delete(listener);
}

export function updateProfile(patch: Partial<DriverProfile>) {
  profile = { ...profile, ...patch };
  emit();
}

export function useProfile() {
  return useSyncExternalStore(subscribeProfile, getProfile, getProfile);
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 10) {
    return digits;
  }
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export const DRIVER_FACTS = {
  driverId: 'DRV-10234',
  license: 'UP78 2012345',
  joined: '12 Jan 2024',
  trips: '42',
  distance: '8,250',
  hours: '210 h',
  rating: '4.8',
} as const;

export const DRIVER_DOCUMENTS = [
  {
    title: 'Driving License',
    number: 'UP78 2012345',
    status: 'Valid',
    detail: 'Valid until 12 Jan 2029',
  },
  {
    title: 'Registration Certificate',
    number: 'RC-UP16-88421',
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
    title: 'PUC',
    number: 'PUC-22918',
    status: 'Valid',
    detail: 'Valid until 18 Dec 2026',
  },
] as const;

export const ASSIGNED_VEHICLE = {
  name: 'Tata Signa 5530.S',
  plate: 'UP16 FT 2341',
  type: 'Container truck',
  status: 'Assigned',
} as const;

export function confirmSignOut() {
  Alert.alert('Logout', 'Sign out from your account?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Logout',
      style: 'destructive',
      onPress: () => router.dismissTo('/'),
    },
  ]);
}
