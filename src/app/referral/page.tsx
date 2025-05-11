import { ReferralLandingPage } from '@/lib/pages/landing-referral';
import { generatePageMetadata } from '@/seo/metadata';

export const dynamic = 'force-dynamic';

export const metadata = generatePageMetadata(
  'Você foi indicado para estudar com a Brio e ganhou R$ 50!',
  'Reforço Escolar on-line com acompanhamento personalizado. Indicado por uma família Brio, você já entra com R$ 50 de desconto na matrícula!',
  'https://kindle2notion.s3.us-east-2.amazonaws.com/defaults/brio-link-preview.png'
);

export default ReferralLandingPage;
