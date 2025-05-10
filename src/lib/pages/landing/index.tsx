'use client';

import { Box } from '@chakra-ui/react';

import { Hero } from './components/hero';
import { Footer } from './components/footer';
import { Prizes } from './components/prizes';
import { AffiliateForm } from './components/affiliate-form';

export const LandingPage = () => {
  return (
    <Box>
      <Hero />
      <Prizes />
      <AffiliateForm />
      <Footer />
    </Box>
  );
}; 