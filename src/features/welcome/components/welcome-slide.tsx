import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts, WelcomeColors } from '@/constants/theme';
import type { WelcomeSlide } from '@/features/welcome/welcome-slides';

const HERO_ASPECT_RATIO = 896 / 1060;

interface WelcomeSlideViewProps {
  slide: WelcomeSlide;
  width: number;
}

export function WelcomeSlideView({ slide, width }: WelcomeSlideViewProps) {
  return (
    <View style={[styles.page, { width }]}>
      <Image
        accessibilityLabel={`${slide.titleLead} ${slide.titleAccent}`}
        contentFit="contain"
        contentPosition="top"
        source={slide.image}
        style={styles.hero}
      />
      <View style={styles.copy}>
        <Text style={styles.title}>
          <Text style={styles.titleLead}>{slide.titleLead}</Text>
          {slide.titleBreak ? '\n' : ' '}
          <Text style={styles.titleAccent}>{slide.titleAccent}</Text>
        </Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'flex-start',
  },
  hero: {
    width: '100%',
    aspectRatio: HERO_ASPECT_RATIO,
  },
  copy: {
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 8,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  titleLead: {
    fontFamily: Fonts.sans,
    fontWeight: '700',
    color: WelcomeColors.title,
  },
  titleAccent: {
    fontFamily: Fonts.sans,
    fontWeight: '700',
    color: WelcomeColors.titleAccent,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
    color: WelcomeColors.body,
  },
});
