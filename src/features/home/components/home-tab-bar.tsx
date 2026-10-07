import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

type HomeTabBarProps = {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  navigation: {
    emit: (event: {
      type: 'tabPress';
      target: string;
      canPreventDefault: true;
    }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

const TABS = {
  index: { label: 'Home', icon: 'house.fill' },
  trips: { label: 'Trips', icon: 'mappin' },
  documents: { label: 'Documents', icon: 'doc.text' },
  profile: { label: 'Profile', icon: 'person' },
} as const;

export function HomeTabBar({ state, navigation }: HomeTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const meta = TABS[route.name as keyof typeof TABS];
        if (!meta) {
          return null;
        }
        const focused = state.index === index;
        const color = focused ? HomeColors.green : HomeColors.tabInactive;

        return (
          <Pressable
            key={route.key}
            accessibilityLabel={meta.label}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            style={styles.item}>
            <SymbolView name={meta.icon} resizeMode="scaleAspectFit" style={styles.icon} tintColor={color} />
            <Text style={[styles.label, { color }]}>{meta.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: HomeColors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E6E9ED',
    paddingTop: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    width: 22,
    height: 22,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
  },
});
