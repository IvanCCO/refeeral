'use client';

import { Box } from '@chakra-ui/react';

import { Hero } from './components/hero';
import { Prizes } from './components/prizes';
import { AffiliateForm } from './components/affiliate-form';
import { HowItWorks } from './components/how-it-works';

export const LandingPage = () => {
  return (
    <Box>
      <Hero />
      <HowItWorks />
      <Prizes />
      <AffiliateForm />
    </Box>
  );
};
