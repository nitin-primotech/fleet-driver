import { Stack } from 'expo-router';

import { WelcomeScreen } from '@/features/welcome/components/welcome-screen';

export default function WelcomeRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Welcome' }} />
      <WelcomeScreen />
    </>
  );
}
