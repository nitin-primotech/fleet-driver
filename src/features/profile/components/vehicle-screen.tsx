import { StyleSheet, Text, View } from 'react-native';

import { Fonts, HomeColors } from '@/constants/theme';
import { ProfileScaffold } from '@/features/profile/components/profile-scaffold';
import { ASSIGNED_VEHICLE } from '@/features/profile/profile-data';

const ROWS = [
  { label: 'Vehicle', value: ASSIGNED_VEHICLE.name },
  { label: 'Registration', value: ASSIGNED_VEHICLE.plate },
  { label: 'Type', value: ASSIGNED_VEHICLE.type },
  { label: 'Status', value: ASSIGNED_VEHICLE.status },
];

export function VehicleScreen() {
  return (
    <ProfileScaffold title="Vehicle Details">
      <View style={styles.card}>
        {ROWS.map((row, index) => (
          <View key={row.label} style={[styles.row, index < ROWS.length - 1 && styles.border]}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>
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
