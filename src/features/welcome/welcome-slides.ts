export interface WelcomeSlide {
  key: string;
  image: number;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  buttonLabel: string;
  titleBreak?: boolean;
}

export const welcomeSlides: WelcomeSlide[] = [
  {
    key: 'track',
    image: require('@/assets/images/welcome-hero.png'),
    titleLead: 'Track in',
    titleAccent: 'Real Time',
    subtitle: 'Monitor your fleet, routes and vehicle status — all in one place.',
    buttonLabel: 'Get Started',
  },
  {
    key: 'routes',
    image: require('@/assets/images/welcome-routes.png'),
    titleLead: 'Plan',
    titleAccent: 'Smarter Routes',
    subtitle: 'Get optimized routes, estimated times and stop details to deliver faster.',
    buttonLabel: 'Next',
  },
  {
    key: 'deliver',
    image: require('@/assets/images/welcome-deliver.png'),
    titleLead: 'Deliver with',
    titleAccent: 'Ease',
    subtitle: 'Verify deliveries, upload proof and keep your journey hassle-free.',
    buttonLabel: 'Next',
  },
  {
    key: 'drive',
    image: require('@/assets/images/welcome-drive.png'),
    titleLead: 'Drive Safer,',
    titleAccent: 'Smarter, Together',
    subtitle: 'Get real-time support, stay compliant and track your performance.',
    buttonLabel: 'Get Started',
    titleBreak: true,
  },
];
