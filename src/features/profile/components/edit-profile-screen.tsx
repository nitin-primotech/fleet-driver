import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Fonts, HomeColors, LoginColors } from '@/constants/theme';
import { ProfileButton, ProfileScaffold } from '@/features/profile/components/profile-scaffold';
import { updateProfile, useProfile } from '@/features/profile/profile-data';

export function EditProfileScreen() {
  const profile = useProfile();
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [error, setError] = useState('');

  function save() {
    const nextName = name.trim();
    const nextPhone = phone.replace(/\D/g, '').slice(0, 10);
    const nextEmail = email.trim();
    const nextAddress = address.trim();

    if (!nextName) {
      setError('Enter your name.');
      return;
    }
    if (nextPhone.length < 10) {
      setError('Enter a 10-digit mobile number.');
      return;
    }
    if (!nextEmail.includes('@') || !nextEmail.includes('.')) {
      setError('Enter a valid email address.');
      return;
    }
    if (!nextAddress) {
      setError('Enter your address.');
      return;
    }

    updateProfile({ name: nextName, phone: nextPhone, email: nextEmail, address: nextAddress });
    router.back();
  }

  return (
    <ProfileScaffold title="Edit Profile">
      <Field label="Full name" value={name} onChangeText={setName} autoCapitalize="words" />
      <Field label="Mobile number" value={phone} onChangeText={setPhone} keyboardType="number-pad" maxLength={10} />
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Field label="Address" value={address} onChangeText={setAddress} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ProfileButton label="Save" onPress={save} />
    </ProfileScaffold>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  maxLength,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'email-address';
  autoCapitalize?: 'none' | 'words';
  maxLength?: number;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={onChangeText}
        placeholderTextColor={LoginColors.placeholder}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  error: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: LoginColors.error,
  },
});
