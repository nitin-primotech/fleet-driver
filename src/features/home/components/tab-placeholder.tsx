import { StyleSheet, Text, View } from 'react-native';

import { Fonts, HomeColors } from '@/constants/theme';

export function TabPlaceholder({ title }: { title: string }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HomeColors.background,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: HomeColors.title,
  },
});
