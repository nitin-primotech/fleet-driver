import { Stack } from 'expo-router';

import { LoginScreen } from '@/features/login/components/login-screen';

export default function LoginRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Login' }} />
      <LoginScreen />
    </>
  );
}
