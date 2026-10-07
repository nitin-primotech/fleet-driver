import { Stack } from 'expo-router';

import { HomeColors } from '@/constants/theme';

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: HomeColors.background },
      }}
    />
  );
}
