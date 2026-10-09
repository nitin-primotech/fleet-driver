import { router } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { Alert } from 'react-native';

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

const INITIAL_PROFILE: DriverProfile = {
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
