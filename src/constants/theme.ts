/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const WelcomeColors = {
  background: '#FFFFFF',
  title: '#1B2A33',
  titleAccent: '#24725C',
  body: '#9E9FA4',
  button: '#24725C',
  buttonPressed: '#1B5A49',
  onButton: '#FFFFFF',
  dot: '#24725C',
  dotInactive: '#E1E5E8',
  icon: '#1E8A4E',
  cardText: '#1A2C26',
  sky: '#F3F9F5',
  building: '#E2EDE6',
  tree: '#C5E3D2',
  treeDark: '#8FCBAA',
  road: '#E7EEF2',
  map: '#F5F7F5',
  block: '#E4EEE7',
  route: '#2E9A56',
  trailer: '#3E9E64',
  vehicle: '#F7F9F8',
  glass: '#4E6270',
  tire: '#2A3136',
  hub: '#E6EAED',
  notch: '#1C1C1E',
} as const;

export const LoginColors = {
  background: '#FFFFFF',
  title: '#1B2A33',
  body: '#9E9FA4',
  label: '#8A9096',
  field: '#F4F6F8',
  placeholder: '#B0B6BC',
  divider: '#E1E5E8',
  line: '#E6E8EB',
  button: '#24725C',
  buttonPressed: '#1B5A49',
  onButton: '#FFFFFF',
  googleBorder: '#E4E7EB',
  link: '#24725C',
  error: '#C44747',
} as const;

export const HomeColors = {
  background: '#F4F7F8',
  card: '#FFFFFF',
  title: '#1B2A33',
  body: '#8B919A',
  muted: '#9AA1A9',
  green: '#1B7A56',
  greenDark: '#0C534A',
  onGreen: '#FFFFFF',
  greenSoft: '#E7F6F0',
  mint: '#E5F8F2',
  blueSoft: '#E7F1FF',
  peach: '#FFF1E8',
  purpleSoft: '#F3EEFF',
  purple: '#7B68EE',
  fuel: '#1E8A62',
  track: '#E6E9ED',
  star: '#F5B400',
  dot: '#E5484D',
  tabInactive: '#9AA3AB',
} as const;
