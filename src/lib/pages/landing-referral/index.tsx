'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import {
  Hero,
  Features,
  CTA,
  ReferralTracking,
  ReferralForm,
} from './components';

export const ReferralLandingPage = () => {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');

    if (ref) {
      setReferralCode(ref);

      localStorage.setItem('referralCode', ref);
    }
  }, [searchParams]);

  const bgColor = 'var(--chakra-colors-gray-50)';

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Invisible component that handles tracking */}
      <ReferralTracking referralCode={referralCode} />

      {/* Hero Section */}
      <Hero referralCode={referralCode} />

      {/* Features Section */}
      <Features />

      {/* Referral Form */}
      <ReferralForm referralCode={referralCode} />

      {/* CTA Section */}
      <CTA referralCode={referralCode} />
    </Box>
  );
};
