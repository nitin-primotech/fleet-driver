import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/features/auth';
import { LoginScreen } from '@/features/login/components/login-screen';

export default function LoginRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Login' }} />
      <LoginScreen />
    </>
  );
}
