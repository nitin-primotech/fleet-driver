import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Fonts, HomeColors, LoginColors } from '@/constants/theme';
import { ProfileButton, ProfileScaffold } from '@/features/profile/components/profile-scaffold';
import { confirmSignOut, updateProfile, useProfile } from '@/features/profile/profile-data';

export function SecurityScreen() {
  const profile = useProfile();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function savePin() {
    setSaved(false);
    if (profile.pin && current !== profile.pin) {
      setError('Current PIN does not match.');
      return;
    }
    if (next.length < 4) {
      setError('Enter a 4-digit PIN.');
      return;
    }
    if (next !== confirm) {
      setError('PIN confirmation does not match.');
      return;
    }
    updateProfile({ pin: next });
    setCurrent('');
    setNext('');
    setConfirm('');
    setError('');
    setSaved(true);
  }

  return (
    <ProfileScaffold title="Security">
      <View style={styles.note}>
        <Text style={styles.noteTitle}>{profile.pin ? 'PIN is set' : 'No PIN set'}</Text>
        <Text style={styles.noteDetail}>Use a 4-digit PIN to protect this account on this device.</Text>
      </View>
      {profile.pin ? <PinField label="Current PIN" value={current} onChangeText={setCurrent} /> : null}
      <PinField label="New PIN" value={next} onChangeText={setNext} />
      <PinField label="Confirm PIN" value={confirm} onChangeText={setConfirm} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {saved ? <Text style={styles.saved}>PIN updated.</Text> : null}
      <ProfileButton label="Save PIN" onPress={savePin} />
      <ProfileButton label="Logout" onPress={confirmSignOut} tone="danger" />
    </ProfileScaffold>
  );
}

function PinField({ label, value, onChangeText }: { label: string; value: string; onChangeText: (value: string) => void }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType="number-pad"
        maxLength={4}
        onChangeText={(text) => onChangeText(text.replace(/\D/g, '').slice(0, 4))}
        secureTextEntry
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 16,
    gap: 4,
  },
  noteTitle: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  noteDetail: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: HomeColors.body,
  },
  field: {
    gap: 6,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: HomeColors.body,
  },
  input: {
    height: 52,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: HomeColors.card,
    paddingHorizontal: 16,
    fontFamily: Fonts.sans,
    fontSize: 16,
    color: HomeColors.title,
    letterSpacing: 4,
  },
  error: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: LoginColors.error,
  },
  saved: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.green,
  },
});
