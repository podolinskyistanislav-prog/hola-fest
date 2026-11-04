import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { SessionError, useSession } from '@/features/auth';
import { createQueryClient } from '@/lib/queryClient';
import { useAppFonts, useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [queryClient] = useState(createQueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionGate />
    </QueryClientProvider>
  );
}

function SessionGate() {
  const fontsLoaded = useAppFonts();
  const { colors, scheme } = useTheme();
  const { isLoading, isError, isRetrying, retry } = useSession();
  const ready = fontsLoaded && (!isLoading || isRetrying);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!ready) return null;
  const statusBar = <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />;
  if (isError || isRetrying) {
    return (
      <>
        {statusBar}
        <SessionError onRetry={retry} isRetrying={isRetrying} />
      </>
    );
  }

  return (
    <>
      {statusBar}
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
    </>
  );
}
