import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts, HomeColors } from '@/constants/theme';
import { ProfileButton, ProfileScaffold } from '@/features/profile/components/profile-scaffold';
import { DRIVER_FACTS, formatPhone, useProfile } from '@/features/profile/profile-data';

export function PersonalScreen() {
  const profile = useProfile();
  const rows = [
    { label: 'Full name', value: profile.name },
    { label: 'Mobile number', value: formatPhone(profile.phone) },
    { label: 'Email', value: profile.email },
    { label: 'Address', value: profile.address },
    { label: 'Driver ID', value: DRIVER_FACTS.driverId },
  ];

  return (
    <ProfileScaffold title="Personal Information">
      <View style={styles.card}>
        {rows.map((row, index) => (
          <View key={row.label} style={[styles.row, index < rows.length - 1 && styles.border]}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>
      <ProfileButton label="Edit" onPress={() => router.push('/account/edit')} />
    </ProfileScaffold>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
  },
  row: {
    paddingVertical: 14,
    gap: 4,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6EBEE',
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    color: HomeColors.body,
  },
  value: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
});
