'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import {
  Hero,
  CTA,
  ReferralTracking,
  ReferralForm,
  Affiliate,
  FAQ,
  ScrollFeatures,
} from './components';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const ReferralLandingPage = () => {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;

    const ref = searchParams.get('ref');

    if (ref) {
      setReferralCode(ref);
      localStorage.setItem('referralCode', ref);
    }
  }, [searchParams]);

  const handleAffiliateLoad = useCallback(
    (loadedAffiliate: Affiliate | null) => {
      setAffiliate(loadedAffiliate);
    },
    []
  );

  const bgColor = 'var(--chakra-colors-gray-50)';

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Invisible component that handles tracking */}
      <ReferralTracking
        referralCode={referralCode}
        onAffiliateLoad={handleAffiliateLoad}
      />

      {/* Hero Section */}
      <Hero referralCode={referralCode} />

      {/* Scroll Features Section */}
      <ScrollFeatures />

      {/* Referral Form */}
      <ReferralForm referralCode={referralCode} affiliate={affiliate} />

      {/* CTA Section */}
      <CTA referralCode={referralCode} />

      {/* FAQ Section */}
      <FAQ />
    </Box>
  );
};
