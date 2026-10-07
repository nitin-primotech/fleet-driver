import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

const SUPPORT_PHONE = 'tel:+9118002023344';
const SUPPORT_EMAIL = 'mailto:support@fleetpro.app';

const ACTIONS: { icon: SFSymbol; title: string; detail: string; url: string }[] = [
  { icon: 'phone.fill', title: 'Call Support', detail: 'Talk to our support team directly.', url: SUPPORT_PHONE },
  { icon: 'bubble.left.fill', title: 'Live Chat', detail: 'Get instant help via chat.', url: `${SUPPORT_EMAIL}?subject=Live%20chat` },
  { icon: 'envelope.fill', title: 'Email Us', detail: "We'll reply within a few hours.", url: SUPPORT_EMAIL },
  { icon: 'doc.text.fill', title: 'Help Center', detail: 'Find answers to common questions.', url: `${SUPPORT_EMAIL}?subject=Help%20Center` },
];

const OPTIONS: { icon: SFSymbol; title: string; detail: string; url: string }[] = [
  {
    icon: 'checkmark.shield.fill',
    title: 'Report an Issue',
    detail: "Share details about the problem you're facing.",
    url: `${SUPPORT_EMAIL}?subject=Report%20an%20issue`,
  },
  {
    icon: 'doc.text.fill',
    title: 'Feedback',
    detail: 'Help us improve your experience.',
    url: `${SUPPORT_EMAIL}?subject=Feedback`,
  },
];

export function ContactSupportScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
            <SymbolView name="chevron.left" resizeMode="scaleAspectFit" style={styles.backIcon} tintColor={HomeColors.green} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Contact Support</Text>
            <Text style={styles.subtitle}>We're here to help you</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <View style={styles.headset}>
            <SymbolView name="headphones" resizeMode="scaleAspectFit" style={styles.headsetIcon} tintColor={HomeColors.green} />
          </View>
          <View style={styles.bannerCopy}>
            <Text style={styles.bannerTitle}>Need help?</Text>
            <Text style={styles.bannerDetail}>Our support team is available 24/7 to assist you with any issues.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionDetail}>Choose an option below to get support faster.</Text>
        </View>

        {ACTIONS.map((action) => (
          <Pressable key={action.title} accessibilityRole="button" onPress={() => Linking.openURL(action.url)} style={styles.row}>
            <View style={styles.iconWrap}>
              <SymbolView name={action.icon} resizeMode="scaleAspectFit" style={styles.icon} tintColor={HomeColors.green} />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowTitle}>{action.title}</Text>
              <Text style={styles.rowDetail}>{action.detail}</Text>
            </View>
            <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.chevron} tintColor={HomeColors.muted} />
          </Pressable>
        ))}

        <Text style={styles.sectionTitle}>Other Options</Text>
        <View style={styles.options}>
          {OPTIONS.map((option) => (
            <Pressable
              key={option.title}
              accessibilityRole="button"
              onPress={() => (option.title === 'Report an Issue' ? router.push('/report') : Linking.openURL(option.url))}
              style={styles.option}>
              <View style={styles.optionTop}>
                <View style={styles.optionIcon}>
                  <SymbolView name={option.icon} resizeMode="scaleAspectFit" style={styles.icon} tintColor={HomeColors.green} />
                </View>
                <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.chevron} tintColor={HomeColors.muted} />
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDetail}>{option.detail}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <SymbolView name="checkmark.shield.fill" resizeMode="scaleAspectFit" style={styles.footerIcon} tintColor={HomeColors.green} />
          <Text style={styles.footerText}>Your safety and satisfaction are our priority.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FA',
  },
  content: {
    paddingHorizontal: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HomeColors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 16,
    height: 16,
  },
  headerCopy: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: HomeColors.title,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 17,
    color: HomeColors.body,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#E7F6F1',
    borderRadius: 20,
    borderCurve: 'continuous',
    padding: 14,
  },
  headset: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#D7F0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headsetIcon: {
    width: 28,
    height: 28,
  },
  bannerCopy: {
    flex: 1,
    gap: 2,
  },
  bannerTitle: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  bannerDetail: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: HomeColors.body,
  },
  section: {
    gap: 2,
    marginTop: 6,
  },
  sectionTitle: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
    marginTop: 4,
  },
  sectionDetail: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 17,
    color: HomeColors.body,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    paddingVertical: 14,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HomeColors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 18,
    height: 18,
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  rowDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  chevron: {
    width: 12,
    height: 12,
  },
  options: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    backgroundColor: '#E7F6F1',
    borderRadius: 18,
    borderCurve: 'continuous',
    padding: 14,
    gap: 8,
  },
  optionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  optionDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  footer: {
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 24,
  },
  footerIcon: {
    width: 22,
    height: 22,
  },
  footerText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: HomeColors.body,
    textAlign: 'center',
  },
});
