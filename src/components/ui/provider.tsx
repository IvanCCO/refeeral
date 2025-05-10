'use client';

import { ChakraProvider } from '@chakra-ui/react';

import customTheme from '@/lib/styles/theme';

export function Provider(props: React.PropsWithChildren) {
  return <ChakraProvider value={customTheme}>{props.children}</ChakraProvider>;
}
