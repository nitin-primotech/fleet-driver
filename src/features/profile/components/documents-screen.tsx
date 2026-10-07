import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Fonts, HomeColors } from '@/constants/theme';
import { ProfileScaffold } from '@/features/profile/components/profile-scaffold';
import { DRIVER_DOCUMENTS } from '@/features/profile/profile-data';

export function DocumentsScreen() {
  return (
    <ProfileScaffold title="Documents">
      <View style={styles.card}>
        {DRIVER_DOCUMENTS.map((document, index) => (
          <Pressable
            key={document.title}
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: '/account/document',
                params: {
                  title: document.title,
                  number: document.number,
                  status: document.status,
                  detail: document.detail,
                },
              })
            }
            style={[styles.row, index < DRIVER_DOCUMENTS.length - 1 && styles.border]}>
            <View style={styles.copy}>
              <Text style={styles.title}>{document.title}</Text>
              <Text style={styles.number}>{document.number}</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>{document.status}</Text>
            </View>
            <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.chevron} tintColor={HomeColors.muted} />
          </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6EBEE',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  number: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: HomeColors.body,
  },
  status: {
    backgroundColor: HomeColors.greenSoft,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  chevron: {
    width: 14,
    height: 14,
  },
});
