import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, LoginColors } from '@/constants/theme';

const CODE_LENGTH = 4;
const LOGO_ASPECT_RATIO = 1166 / 350;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatPhone(countryCode: string, phone: string) {
  if (countryCode === '+91' && phone.length === 10) {
    return `${countryCode} ${phone.slice(0, 5)} ${phone.slice(5)}`;
  }
  return `${countryCode} ${phone}`.trim();
}

export function VerifyScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ countryCode?: string; phone?: string }>();
  const countryCode = firstParam(params.countryCode) ?? '+91';
  const phone = firstParam(params.phone) ?? '';
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(true);

  function handleChangeCode(value: string) {
    setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH));
  }

  const activeIndex = Math.min(code.length, CODE_LENGTH - 1);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <StatusBar style="dark" />
      <Pressable accessibilityLabel="Back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backLabel}>←</Text>
      </Pressable>

      <Image
        accessibilityLabel="FleetPro"
        contentFit="contain"
        contentPosition="left"
        source={require('@/assets/images/login-logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to{'\n'}
        <Text style={styles.phone}>{formatPhone(countryCode, phone)}</Text>
      </Text>

      <Pressable accessibilityLabel="Verification code" onPress={() => inputRef.current?.focus()} style={styles.boxes}>
        {Array.from({ length: CODE_LENGTH }, (_, index) => {
          const filled = index < code.length;
          const active = focused && index === activeIndex;
          return (
            <View key={index} style={[styles.box, (filled || active) && styles.boxActive]}>
              <Text style={styles.digit}>{code[index] ?? ''}</Text>
            </View>
          );
        })}
        <TextInput
          ref={inputRef}
          autoComplete="sms-otp"
          autoFocus
          caretHidden
          keyboardType="number-pad"
          maxLength={CODE_LENGTH}
          onBlur={() => setFocused(false)}
          onChangeText={handleChangeCode}
          onFocus={() => setFocused(true)}
          selectionColor={LoginColors.button}
          style={styles.hiddenInput}
          textContentType="oneTimeCode"
          value={code}
        />
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          if (code.length < CODE_LENGTH) {
            return;
          }
          router.replace('/home');
        }}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonLabel}>Verify</Text>
        <Text style={styles.buttonArrow}>→</Text>
      </Pressable>

      <Text style={styles.resend}>
        Didn&apos;t receive the code? <Text style={styles.resendLink}>Resend</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: LoginColors.background,
    paddingHorizontal: 24,
  },
  back: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backLabel: {
    fontSize: 24,
    lineHeight: 28,
    color: LoginColors.title,
  },
  logo: {
    width: 150,
    aspectRatio: LOGO_ASPECT_RATIO,
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: LoginColors.title,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    color: LoginColors.body,
    marginTop: 8,
  },
  phone: {
    color: LoginColors.title,
    fontWeight: '600',
  },
  boxes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: LoginColors.field,
    borderWidth: 1,
    borderColor: LoginColors.field,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderColor: LoginColors.button,
    backgroundColor: LoginColors.background,
  },
  digit: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: LoginColors.title,
  },
  hiddenInput: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: LoginColors.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 28,
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
  resend: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    color: LoginColors.body,
    textAlign: 'center',
    marginTop: 20,
  },
  resendLink: {
    color: LoginColors.link,
    fontWeight: '600',
  },
});
