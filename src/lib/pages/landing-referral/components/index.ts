export * from './Hero';
export * from './Features';
export * from './FeatureCard';
export * from './CTA';
export * from './ReferralTracking';
export * from './ReferralForm';
export * from './FAQ';
export * from './ScrollFeatures';
export * from './Testimonials';

// Type Exports
export interface Affiliate {
  name: string;
  email: string;
  linkId: string;
  id?: string;
  customLogo?: string;
  customBanner?: string;
  customTheme?: string;
}
