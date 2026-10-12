import type { DriverProfile } from '@/features/profile/profile-data';

export type AuthSession = {
  isLoggedIn: boolean;
  token: string;
  phone: string;
  countryCode: string;
  loginAt: string;
};

export type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: AuthSession | null;
  profile: DriverProfile;
  login: (params?: { phone?: string; countryCode?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};
