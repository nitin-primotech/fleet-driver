import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, WelcomeColors } from '@/constants/theme';
import { WelcomeSlideView } from '@/features/welcome/components/welcome-slide';
import { welcomeSlides } from '@/features/welcome/welcome-slides';

const DOT_COUNT = Math.max(welcomeSlides.length, 4);

export function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [index, setIndex] = useState(0);

  function handleColumnLayout(event: LayoutChangeEvent) {
    const { width } = event.nativeEvent.layout;
    setPageWidth((current) => (current === width ? current : width));
  }

  function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (pageWidth === 0) {
      return;
    }
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    setIndex(nextIndex);
  }

  const activeSlide = welcomeSlides[index] ?? welcomeSlides[0];

  function handlePressButton() {
    if (activeSlide?.buttonLabel === 'Get Started') {
      router.push('/login');
      return;
    }
    const lastIndex = welcomeSlides.length - 1;
    if (!activeSlide || index >= lastIndex || pageWidth === 0) {
      return;
    }
    const nextIndex = index + 1;
    scrollRef.current?.scrollTo({ x: nextIndex * pageWidth, animated: true });
    setIndex(nextIndex);
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View
        onLayout={handleColumnLayout}
        style={[styles.column, { paddingTop: insets.top + 4, paddingBottom: insets.bottom + 16 }]}>
        {pageWidth > 0 ? (
          <ScrollView
            ref={scrollRef}
            horizontal
            bounces={welcomeSlides.length > 1}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScrollEnd}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width: pageWidth, flexGrow: 0 }}>
            {welcomeSlides.map((slide) => (
              <WelcomeSlideView key={slide.key} slide={slide} width={pageWidth} />
            ))}
          </ScrollView>
        ) : null}

        <View accessibilityLabel={`Slide ${index + 1} of ${DOT_COUNT}`} style={styles.dots}>
          {Array.from({ length: DOT_COUNT }, (_, slideIndex) => (
            <View
              key={slideIndex}
              style={slideIndex === index ? styles.dotActive : styles.dot}
            />
          ))}
        </View>

        <View style={styles.spacer} />

        <Pressable
          accessibilityLabel={activeSlide?.buttonLabel ?? 'Continue'}
          accessibilityRole="button"
          onPress={handlePressButton}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonLabel}>{activeSlide?.buttonLabel}</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: WelcomeColors.background,
  },
  column: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 16,
  },
  dotActive: {
    width: 18,
    height: 7,
    borderRadius: 4,
    backgroundColor: WelcomeColors.dot,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: WelcomeColors.dotInactive,
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },
  button: {
    marginHorizontal: 20,
    height: 56,
    borderRadius: 28,
    backgroundColor: WelcomeColors.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonPressed: {
    backgroundColor: WelcomeColors.buttonPressed,
  },
  buttonLabel: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: WelcomeColors.onButton,
  },
  buttonArrow: {
    fontSize: 18,
    lineHeight: 22,
    color: WelcomeColors.onButton,
  },
});
