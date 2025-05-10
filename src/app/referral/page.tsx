import { ReferralLandingPage } from '@/lib/pages/landing-referral';
import { generatePageMetadata } from '@/seo/metadata';

export const metadata = generatePageMetadata(
  'Programa de Referral',
  'Indique amigos e ganhe recompensas exclusivas com nosso programa de indicações',
  '/images/referral-og-image.jpg'
);

export default ReferralLandingPage;
