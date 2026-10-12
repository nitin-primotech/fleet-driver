import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/features/auth';
import { VerifyScreen } from '@/features/verify/components/verify-screen';

export default function VerifyRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Verify OTP' }} />
      <VerifyScreen />
    </>
  );
}
