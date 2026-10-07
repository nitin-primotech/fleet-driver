import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors, LoginColors } from '@/constants/theme';

const ISSUES: { icon: SFSymbol; title: string; detail: string }[] = [
  { icon: 'car.fill', title: 'Vehicle problem', detail: 'Breakdown, tyre, or fuel' },
  { icon: 'map', title: 'Route or traffic', detail: 'Wrong route or a blocked road' },
  { icon: 'clock', title: 'Delivery delay', detail: 'Running late for a stop' },
  { icon: 'person.fill', title: 'Customer issue', detail: 'Unavailable or refused delivery' },
  { icon: 'iphone', title: 'App or device', detail: 'The app is not working as expected' },
  { icon: 'ellipsis.circle', title: 'Something else', detail: 'Any other problem on this trip' },
];

export function ReportIssueScreen() {
  const insets = useSafeAreaInsets();
  const [issue, setIssue] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function submit() {
    if (!issue) {
      setError('Choose the type of issue.');
      return;
    }
    if (!details.trim()) {
      setError('Describe the issue first.');
      return;
    }
    setError('');
    setSent(true);
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
            <SymbolView name="chevron.left" resizeMode="scaleAspectFit" style={styles.backIcon} tintColor={HomeColors.green} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Report an Issue</Text>
            <Text style={styles.subtitle}>Share details about the problem you're facing</Text>
          </View>
        </View>

        {sent ? (
          <View style={styles.sentCard}>
            <View style={styles.sentIcon}>
              <SymbolView name="checkmark" resizeMode="scaleAspectFit" style={styles.sentGlyph} tintColor={HomeColors.green} />
            </View>
            <Text style={styles.sentTitle}>Report sent</Text>
            <Text style={styles.sentDetail}>Support will follow up on your registered number.</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonLabel}>Done</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.banner}>
              <View style={styles.bannerIcon}>
                <SymbolView name="bubble.left.fill" resizeMode="scaleAspectFit" style={styles.bannerGlyph} tintColor={HomeColors.green} />
              </View>
              <View style={styles.bannerCopy}>
                <Text style={styles.bannerTitle}>Current trip</Text>
                <Text style={styles.bannerDetail}>Deliver to Noida Hub · A-62, Sector 63</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What's the issue?</Text>
              <Text style={styles.sectionDetail}>Pick the option that fits best.</Text>
            </View>

            {ISSUES.map((item) => {
              const selected = issue === item.title;
              return (
                <Pressable
                  key={item.title}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    setIssue(item.title);
                    setError('');
                  }}
                  style={[styles.row, selected && styles.rowSelected]}>
                  <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
                    <SymbolView name={item.icon} resizeMode="scaleAspectFit" style={styles.icon} tintColor={HomeColors.green} />
                  </View>
                  <View style={styles.rowCopy}>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                    <Text style={styles.rowDetail}>{item.detail}</Text>
                  </View>
                  <View style={[styles.radio, selected && styles.radioSelected]}>
                    {selected ? <View style={styles.radioDot} /> : null}
                  </View>
                </Pressable>
              );
            })}

            <View style={styles.field}>
              <Text style={styles.sectionTitle}>Details</Text>
              <TextInput
                multiline
                onChangeText={(value) => {
                  setDetails(value);
                  setError('');
                }}
                placeholder="Describe what happened"
                placeholderTextColor={LoginColors.placeholder}
                style={styles.input}
                textAlignVertical="top"
                value={details}
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              accessibilityRole="button"
              onPress={submit}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonLabel}>Submit report</Text>
            </Pressable>
          </>
        )}

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
  bannerIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#D7F0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerGlyph: {
    width: 26,
    height: 26,
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
    borderWidth: 1.5,
    borderColor: 'transparent',
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  rowSelected: {
    backgroundColor: HomeColors.greenSoft,
    borderColor: HomeColors.green,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HomeColors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapSelected: {
    backgroundColor: '#FFFFFF',
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
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: HomeColors.track,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: HomeColors.green,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: HomeColors.green,
  },
  field: {
    gap: 8,
    marginTop: 4,
  },
  input: {
    minHeight: 120,
    borderRadius: 18,
    borderCurve: 'continuous',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    color: HomeColors.title,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  error: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: LoginColors.error,
  },
  button: {
    height: 52,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: HomeColors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonPressed: {
    backgroundColor: HomeColors.greenDark,
  },
  buttonLabel: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderCurve: 'continuous',
    padding: 20,
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  sentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: HomeColors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  sentGlyph: {
    width: 24,
    height: 24,
  },
  sentTitle: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  sentDetail: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: HomeColors.body,
    textAlign: 'center',
    marginBottom: 8,
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
