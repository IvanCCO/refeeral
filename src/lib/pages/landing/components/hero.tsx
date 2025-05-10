'use client';

import { scrollToSmoothly } from '@/utils/commons';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

export const Hero = () => {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 8, md: 16 }}
        align="center"
        justify="space-between"
      >
        <Box flex={1}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as="span"
              position="relative"
              color="blue.600"
            >
              Transform Your Learning
            </Text>
            <br />
            <Text as="span" color="gray.900">
              with Expert Guidance
            </Text>
          </Heading>
          <Text
            color="gray.600"
            fontSize={{ base: 'lg', lg: 'xl' }}
            maxW="lg"
            mt={6}
          >
            Join our community of learners and unlock your full potential with
            personalized education that adapts to your unique needs.
          </Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            gap={4}
            mt={8}
          >
            <Button
              size="lg"
              colorScheme="blue"
              px={8}
              onClick={() => scrollToSmoothly('affiliate-form', 300)}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              px={8}
              onClick={() => scrollToSmoothly('prizes-section', 300)}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
        <Box
          flex={1}
          height={{ base: '240px', md: '400px' }}
          rounded="2xl"
          bg="blue.50"
          position="relative"
          overflow="hidden"
        >
          {/* Add hero image or illustration here */}
        </Box>
      </Stack>
    </Container>
  );
}; 