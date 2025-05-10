'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

interface CTAProps {
  referralCode: string | null;
}

export const CTA = ({ referralCode }: CTAProps) => {
  return (
    <Box py={{ base: 16, md: 20 }} bg="blue.50">
      <Container maxW="container.lg">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={10}
          align="center"
          justify="space-between"
          bg="white"
          p={{ base: 8, md: 12 }}
          rounded="2xl"
          shadow="xl"
        >
          <Stack gap={4} maxW={{ base: 'full', md: '60%' }}>
            <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }}>
              Pronto para começar sua jornada?
            </Heading>
            <Text color="gray.600">
              Registre-se agora e comece a aproveitar todos os benefícios do
              nosso programa!
            </Text>

            {referralCode && (
              <HStack gap={2} color="green.600">
                <Icon as={FaCheck} />
                <Text fontWeight="medium">
                  Seu código de indicação foi aplicado automaticamente!
                </Text>
              </HStack>
            )}
          </Stack>

          <Button
            colorScheme="blue"
            size="lg"
            px={10}
            rounded="full"
            fontWeight="bold"
            _hover={{ transform: 'scale(1.05)' }}
            transition="all 0.3s"
          >
            Cadastre-se
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
