import { Stack } from 'expo-router';

import { VerifyScreen } from '@/features/verify/components/verify-screen';

export default function VerifyRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Verify OTP' }} />
      <VerifyScreen />
    </>
  );
}
