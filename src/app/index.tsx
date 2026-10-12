import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/features/auth';
import { WelcomeScreen } from '@/features/welcome/components/welcome-screen';

export default function WelcomeRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Welcome' }} />
      <WelcomeScreen />
    </>
  );
}
