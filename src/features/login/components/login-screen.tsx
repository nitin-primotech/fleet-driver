import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, LoginColors } from '@/constants/theme';

const COUNTRY_CODES = ['+91', '+1', '+44', '+61', '+971'] as const;
const HERO_ASPECT_RATIO = 1760 / 1176;
const LOGO_ASPECT_RATIO = 1166 / 350;

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const contentRef = useRef<View>(null);
  const continueRef = useRef<View>(null);
  const headerHeightRef = useRef(0);
  const windowHeightRef = useRef(windowHeight);
  const keyboardHeightRef = useRef(0);
  const [countryCode, setCountryCode] = useState<(typeof COUNTRY_CODES)[number]>('+91');
  const [codeOpen, setCodeOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  windowHeightRef.current = windowHeight;

  function revealContinue() {
    const height = keyboardHeightRef.current;
    const content = contentRef.current;
    const button = continueRef.current;
    if (!content || !button || height === 0) {
      return;
    }

    button.measureLayout(
      content,
      (_x, y, _width, buttonHeight) => {
        const viewport = windowHeightRef.current - headerHeightRef.current - height;
        const target = y + buttonHeight + 12 - viewport;
        scrollRef.current?.scrollTo({ y: Math.max(0, target), animated: true });
      },
      () => {},
    );
  }

  useEffect(() => {
    const showEvent = process.env.EXPO_OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = process.env.EXPO_OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (event) => {
      keyboardHeightRef.current = event.endCoordinates.height;
      setKeyboardHeight(event.endCoordinates.height);
    });
    const didShowSub = Keyboard.addListener('keyboardDidShow', () => {
      revealContinue();
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      keyboardHeightRef.current = 0;
      setKeyboardHeight(0);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });

    const metrics = Keyboard.metrics();
    if (metrics && metrics.height > 0) {
      keyboardHeightRef.current = metrics.height;
      setKeyboardHeight(metrics.height);
    }

    return () => {
      showSub.remove();
      didShowSub.remove();
      hideSub.remove();
    };
  }, []);

  function handleChangePhone(value: string) {
    setPhone(value.replace(/\D/g, '').slice(0, 10));
    if (phoneError) {
      setPhoneError('');
    }
  }

  function handleContinue() {
    if (phone.length < 10) {
      setPhoneError('Enter a 10-digit mobile number');
      return;
    }
    Keyboard.dismiss();
    router.push({
      pathname: '/verify',
      params: { countryCode, phone },
    });
  }

  function handleSelectCode(code: (typeof COUNTRY_CODES)[number]) {
    setCountryCode(code);
    setCodeOpen(false);
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View
        onLayout={(event) => {
          headerHeightRef.current = event.nativeEvent.layout.height;
        }}
        style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Image
          accessibilityLabel="FleetPro"
          contentFit="contain"
          contentPosition="left"
          source={require('@/assets/images/login-logo.png')}
          style={styles.logo}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={revealContinue}
        showsVerticalScrollIndicator={false}
        style={styles.scroller}>
        <View
          ref={contentRef}
          collapsable={false}
          style={[
            styles.content,
            {
              paddingBottom: keyboardHeight > 0 ? keyboardHeight + 12 : insets.bottom + 16,
            },
          ]}>
        <Image
          accessibilityLabel="Fleet vehicles on a city road"
          contentFit="contain"
          contentPosition="top"
          source={require('@/assets/images/login-hero.png')}
          style={styles.hero}
        />

        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to manage your fleet efficiently.</Text>

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.fieldWrap}>
            <View style={styles.field}>
              <Pressable
                accessibilityLabel={`Country code ${countryCode}`}
                accessibilityRole="button"
                onPress={() => setCodeOpen((open) => !open)}
                style={styles.codeButton}>
                <Text style={styles.code}>{countryCode}</Text>
                <Text style={styles.chevron}>▾</Text>
              </Pressable>
              <View style={styles.divider} />
              <TextInput
                accessibilityLabel="Mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                onChangeText={handleChangePhone}
                onFocus={() => setCodeOpen(false)}
                placeholder="Enter your mobile number"
                placeholderTextColor={LoginColors.placeholder}
                selectionColor={LoginColors.button}
                style={styles.input}
                textContentType="telephoneNumber"
                value={phone}
              />
            </View>
            {codeOpen ? (
              <View style={styles.menu}>
                {COUNTRY_CODES.map((code) => (
                  <Pressable
                    key={code}
                    accessibilityRole="button"
                    onPress={() => handleSelectCode(code)}
                    style={styles.menuItem}>
                    <Text style={[styles.menuLabel, code === countryCode && styles.menuLabelActive]}>
                      {code}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
          {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

          <View ref={continueRef} collapsable={false}>
            <Pressable
              accessibilityRole="button"
              onPress={handleContinue}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonLabel}>Continue</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>
          </View>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.googleButton, pressed && styles.googleButtonPressed]}>
            <Image
              accessibilityLabel="Google"
              contentFit="contain"
              source={require('@/assets/images/google-g.png')}
              style={styles.googleMark}
            />
            <Text style={styles.googleLabel}>Continue with Google</Text>
          </Pressable>
        </View>

        <View style={styles.spacer} />

        <Text style={styles.legal}>
          By continuing, you agree to our{'\n'}
          <Text style={styles.legalLink}>Terms of Service</Text>
          {' and '}
          <Text style={styles.legalLink}>Privacy Policy</Text>
          .
        </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: LoginColors.background,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: LoginColors.background,
    zIndex: 2,
  },
  scroller: {
    flex: 1,
  },
  logo: {
    width: 164,
    aspectRatio: LOGO_ASPECT_RATIO,
    marginLeft: 24,
    marginBottom: 4,
  },
  hero: {
    width: '100%',
    aspectRatio: HERO_ASPECT_RATIO,
  },
  form: {
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: LoginColors.title,
    marginTop: 4,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    color: LoginColors.body,
    marginTop: -4,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    color: LoginColors.label,
    marginTop: 8,
  },
  fieldWrap: {
    position: 'relative',
    zIndex: 2,
  },
  field: {
    height: 52,
    borderRadius: 12,
    backgroundColor: LoginColors.field,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
  },
  codeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  code: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: LoginColors.title,
  },
  chevron: {
    fontSize: 12,
    lineHeight: 16,
    color: LoginColors.title,
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: LoginColors.divider,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    color: LoginColors.title,
    paddingVertical: 0,
  },
  error: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: LoginColors.error,
    marginTop: -4,
  },
  menu: {
    position: 'absolute',
    top: 58,
    left: 0,
    width: 112,
    borderRadius: 12,
    backgroundColor: LoginColors.background,
    borderWidth: 1,
    borderColor: LoginColors.line,
    paddingVertical: 4,
    shadowColor: '#1B2A33',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  menuItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  menuLabel: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    color: LoginColors.title,
  },
  menuLabelActive: {
    color: LoginColors.link,
    fontWeight: '600',
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: LoginColors.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  buttonPressed: {
    backgroundColor: LoginColors.buttonPressed,
  },
  buttonLabel: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: LoginColors.onButton,
  },
  buttonArrow: {
    fontSize: 18,
    lineHeight: 22,
    color: LoginColors.onButton,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: LoginColors.line,
  },
  orText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: LoginColors.body,
  },
  googleButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: LoginColors.googleBorder,
    backgroundColor: LoginColors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleButtonPressed: {
    backgroundColor: LoginColors.field,
  },
  googleMark: {
    width: 20,
    height: 20,
  },
  googleLabel: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: LoginColors.title,
  },
  spacer: {
    flex: 1,
    minHeight: 28,
  },
  legal: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: LoginColors.body,
    paddingHorizontal: 32,
  },
  legalLink: {
    color: LoginColors.link,
    fontWeight: '600',
  },
});
