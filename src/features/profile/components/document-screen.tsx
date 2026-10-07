import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts, HomeColors } from '@/constants/theme';
import { ProfileScaffold } from '@/features/profile/components/profile-scaffold';

export function DocumentScreen() {
  const params = useLocalSearchParams<{ title?: string; number?: string; status?: string; detail?: string }>();
  const title = params.title || 'Document';
  const rows = [
    { label: 'Number', value: params.number || '—' },
    { label: 'Status', value: params.status || '—' },
    { label: 'Details', value: params.detail || '—' },
  ];

  return (
    <ProfileScaffold title={title}>
      <View style={styles.card}>
        {rows.map((row, index) => (
          <View key={row.label} style={[styles.row, index < rows.length - 1 && styles.border]}>
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
