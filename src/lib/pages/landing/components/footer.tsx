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
    <Box
      bg="gray.50"
      color="gray.700"
    >
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          gap={8}
        >
          <Stack gap={6}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                Brio Education
              </Text>
            </Box>
            <Text fontSize="sm">
              © {new Date().getFullYear()} Brio Education. All rights reserved
            </Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <Link href="#">About</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Testimonials</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link href="#">Help Center</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Legal</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Status</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Follow Us</ListHeader>
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
            <Link href="#">YouTube</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}; 