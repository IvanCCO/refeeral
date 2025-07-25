'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Header } from './components/header';
import { Footer } from '../pages/landing/components/footer';
type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <Box as="main" marginY={{ base: 8, md: 22 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};
