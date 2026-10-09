import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

type DocumentCard = {
  title: string;
  icon: SFSymbol;
  tint: string;
  wash: string;
  status: 'verified' | 'missing' | 'optional';
  statusLabel: string;
  lines: readonly string[];
  source?: number;
  aspectRatio?: number;
  number: string;
  detail: string;
};

const DOCUMENTS: DocumentCard[] = [
  {
    title: 'Driving License',
    icon: 'person.text.rectangle.fill',
    tint: HomeColors.green,
    wash: HomeColors.greenSoft,
    status: 'verified',
    statusLabel: 'Verified',
    lines: ['DL No. :  TX 18472930', 'Valid Till :  12 Jan 2030'],
    source: require('@/assets/images/doc-license.png'),
    aspectRatio: 330 / 216,
    number: 'TX 18472930',
    detail: 'Valid until 12 Jan 2030',
  },
  {
    title: 'Vehicle Registration',
    icon: 'doc.text.fill',
    tint: '#3B82F6',
    wash: HomeColors.blueSoft,
    status: 'verified',
    statusLabel: 'Verified',
    lines: ['Plate :  TX 4821K', 'Valid Till :  18 Mar 2027'],
    source: require('@/assets/images/doc-rc.png'),
    aspectRatio: 330 / 198,
    number: 'TX 4821K',
    detail: 'Valid until 18 Mar 2027',
  },
  {
    title: 'Insurance',
    icon: 'shield.fill',
    tint: '#E08A3C',
    wash: '#FFF4E8',
    status: 'verified',
    statusLabel: 'Verified',
    lines: ['Policy No. :  INS123456789', 'Valid Till :  25 Aug 2026'],
    source: require('@/assets/images/doc-insurance.png'),
    aspectRatio: 330 / 198,
    number: 'INS123456789',
    detail: 'Valid until 25 Aug 2026',
  },
  {
    title: 'Vehicle Inspection',
    icon: 'doc.text.fill',
    tint: HomeColors.purple,
    wash: HomeColors.purpleSoft,
    status: 'verified',
    statusLabel: 'Verified',
    lines: ['Inspection :  TX-229184', 'Valid Till :  15 Nov 2025'],
    source: require('@/assets/images/doc-puc.png'),
    aspectRatio: 330 / 198,
    number: 'TX-229184',
    detail: 'Valid until 15 Nov 2025',
  },
  {
    title: 'Medical Certificate',
    icon: 'cross.case.fill',
    tint: '#E35D6A',
    wash: '#FDECEE',
    status: 'missing',
    statusLabel: 'Not Uploaded',
    lines: ['Required for long distance trips'],
    number: 'Not uploaded',
    detail: 'Required for long distance trips',
  },
  {
    title: 'Other Documents',
    icon: 'doc.fill',
    tint: HomeColors.green,
    wash: HomeColors.greenSoft,
    status: 'optional',
    statusLabel: 'Optional',
    lines: ['Upload any additional documents'],
    number: 'Optional',
    detail: 'Upload any additional documents',
  },
];

export function DocumentsScreen() {
  const insets = useSafeAreaInsets();

  function openDocument(document: DocumentCard) {
    router.push({
      pathname: '/account/document',
      params: {
        title: document.title,
        number: document.number,
        status: document.statusLabel,
        detail: document.detail,
      },
    });
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Documents</Text>
          <Text style={styles.subtitle}>Manage your documents and keep them up to date</Text>
        </View>

        <View style={styles.banner}>
          <SymbolView name="checkmark.shield.fill" resizeMode="scaleAspectFit" style={styles.bannerIcon} tintColor={HomeColors.green} />
          <View style={styles.bannerCopy}>
            <Text style={styles.bannerTitle}>Keep your documents valid</Text>
            <Text style={styles.bannerDetail}>Expired or invalid documents may result in trip restrictions.</Text>
          </View>
        </View>

        {DOCUMENTS.map((document) => (
          <Pressable key={document.title} accessibilityRole="button" onPress={() => openDocument(document)} style={styles.card}>
            <View style={[styles.iconWrap, { backgroundColor: document.wash }]}>
              <SymbolView name={document.icon} resizeMode="scaleAspectFit" style={styles.icon} tintColor={document.tint} />
            </View>
            <View style={styles.copy}>
              <Text adjustsFontSizeToFit minimumFontScale={0.82} numberOfLines={1} style={styles.cardTitle}>
                {document.title}
              </Text>
              <View style={styles.statusRow}>
                {document.status === 'verified' ? (
                  <View style={styles.verified}>
                    <SymbolView name="checkmark.circle.fill" resizeMode="scaleAspectFit" style={styles.statusIcon} tintColor={HomeColors.green} />
                    <Text style={styles.verifiedText}>{document.statusLabel}</Text>
                  </View>
                ) : (
                  <View style={styles.pending}>
                    <SymbolView name="clock" resizeMode="scaleAspectFit" style={styles.statusIcon} tintColor={HomeColors.muted} />
                    <Text style={styles.pendingText}>{document.statusLabel}</Text>
                  </View>
                )}
              </View>
              {document.lines.map((line) => (
                <Text key={line} style={styles.line}>
                  {line}
                </Text>
              ))}
            </View>
            {document.source ? (
              <Image
                accessibilityLabel={document.title}
                contentFit="cover"
                source={document.source}
                style={[styles.preview, { aspectRatio: document.aspectRatio }]}
              />
            ) : (
              <Pressable accessibilityRole="button" onPress={() => openDocument(document)} style={styles.upload}>
                <SymbolView name="square.and.arrow.up" resizeMode="scaleAspectFit" style={styles.uploadIcon} tintColor={HomeColors.green} />
                <Text style={styles.uploadLabel}>Upload</Text>
              </Pressable>
            )}
            <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.chevron} tintColor={HomeColors.muted} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: HomeColors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  header: {
    gap: 2,
    marginBottom: 2,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: HomeColors.title,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    color: HomeColors.body,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#E7F6F0',
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bannerIcon: {
    width: 22,
    height: 22,
    marginTop: 1,
  },
  bannerCopy: {
    flex: 1,
    gap: 2,
  },
  bannerTitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.green,
  },
  bannerDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: HomeColors.card,
    borderRadius: 20,
    borderCurve: 'continuous',
    padding: 12,
    boxShadow: '0 8px 20px rgba(27, 42, 51, 0.05)',
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  statusRow: {
    flexDirection: 'row',
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: HomeColors.greenSoft,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedText: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: HomeColors.green,
  },
  pending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pendingText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: HomeColors.muted,
  },
  statusIcon: {
    width: 12,
    height: 12,
  },
  line: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  preview: {
    width: 74,
    borderRadius: 8,
    borderCurve: 'continuous',
  },
  upload: {
    width: 68,
    height: 68,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#7DCAA8',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  uploadIcon: {
    width: 16,
    height: 16,
  },
  uploadLabel: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  chevron: {
    width: 12,
    height: 12,
  },
});
