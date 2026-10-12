import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import {
  clearAuthSession,
  getAuthSession,
  getStoredProfile,
  saveAuthSession,
  saveStoredProfile,
} from './auth-storage';
import type { AuthContextValue, AuthSession } from './auth-types';
import {
  getProfile,
  onSignOut,
  setProfile,
  subscribeProfile,
  type DriverProfile,
} from '@/features/profile/profile-data';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfileState] = useState<DriverProfile>(getProfile());

  // Keep state synced with profile data store
  useEffect(() => {
    return subscribeProfile(() => {
      setProfileState(getProfile());
    });
  }, []);

  // Sync external sign-out events (e.g. from confirmSignOut)
  useEffect(() => {
    return onSignOut(() => {
      setSession(null);
    });
  }, []);

  // Restore stored session and profile on app start
  useEffect(() => {
    let isMounted = true;

    async function restore() {
      try {
        const [savedSession, savedProfile] = await Promise.all([
          getAuthSession(),
          getStoredProfile(),
        ]);

        if (savedProfile) {
          setProfile(savedProfile);
        }

        if (savedSession && savedSession.isLoggedIn) {
          if (isMounted) {
            setSession(savedSession);
          }
        }
      } catch (error) {
        console.error('[auth-context] Failed restoring auth state:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restore();

    return () => {
      isMounted = false;
    };
  }, []);

  async function login(params?: { phone?: string; countryCode?: string }) {
    const phone = params?.phone ?? '7477235744';
    const countryCode = params?.countryCode ?? '+1';

    const newSession: AuthSession = {
      isLoggedIn: true,
      token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      phone,
      countryCode,
      loginAt: new Date().toISOString(),
    };

    const currentProfile = getProfile();
    const updatedProfile: DriverProfile = {
      ...currentProfile,
      phone: phone.replace(/\D/g, '') || currentProfile.phone,
    };

    setProfile(updatedProfile);

    await Promise.all([
      saveAuthSession(newSession),
      saveStoredProfile(updatedProfile),
    ]);

    setSession(newSession);
  }

  async function logout() {
    try {
      await clearAuthSession();
    } finally {
      setSession(null);
    }
  }

  async function refreshProfile() {
    const saved = await getStoredProfile();
    if (saved) {
      setProfile(saved);
    }
  }

  const value: AuthContextValue = {
    isAuthenticated: Boolean(session?.isLoggedIn),
    isLoading,
    session,
    profile,
    login,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
