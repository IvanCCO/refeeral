'use client';

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

export const Footer = () => {
  return (
    <Box bg="gray.50" color="gray.700">
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          gap={8}
        >
          <Stack gap={6}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                Brio Educação
              </Text>
            </Box>
            <Text fontSize="sm">
              © {new Date().getFullYear()} Brio Educação. Todos os direitos
              reservados
            </Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Nos siga nas redes sociais</ListHeader>
            <Link href="https://www.linkedin.com/company/brioeducacao/">
              LinkedIn
            </Link>
            <Link href="https://www.youtube.com/c/BRIOEDUCA%C3%87%C3%83O">
              YouTube
            </Link>
            <Link href="https://www.instagram.com/brioeduca/">Instagram</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
