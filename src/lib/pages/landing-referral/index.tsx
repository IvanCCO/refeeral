'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import {
  Hero,
  Features,
  CTA,
  ReferralTracking,
  ReferralForm,
  Affiliate,
} from './components';

export const ReferralLandingPage = () => {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');

    if (ref) {
      setReferralCode(ref);
      localStorage.setItem('referralCode', ref);
    }
  }, [searchParams]);

  const handleAffiliateLoad = useCallback((loadedAffiliate: Affiliate | null) => {
    setAffiliate(loadedAffiliate);
  }, []);

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

      {/* Features Section */}
      <Features />

      {/* Referral Form */}
      <ReferralForm 
        referralCode={referralCode} 
        affiliate={affiliate}
      />

      {/* CTA Section */}
      <CTA referralCode={referralCode} />
    </Box>
  );
};
