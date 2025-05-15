'use client';
import { Box, Button, Container, Heading, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { ParallaxProvider } from 'react-scroll-parallax';

export const Hero = () => {
  return (
    <ParallaxProvider>
      <Box position="relative" width="100%" bg="white" overflowX="hidden">
        {/* Desktop View */}
        <Box display={{ base: 'none', md: 'block' }} pt={14} pb={24} position="relative">
          <Container maxW="4xl" textAlign="center">
            <Stack spacing={8} align="center">
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                lineHeight={1.2}
                fontWeight="extrabold"
              >
                💥 Indique a Brio e Ganhe — Mesmo Sem Ser da Família Brio!
              </Heading>

              <Stack spacing={4} maxW="2xl">
                <Text fontSize={{ base: 'lg', md: '2xl' }} color="gray.600">
                  Isso mesmo: mesmo que seu filho ainda não esteja matriculado, você
                  pode indicar a Brio e receber recompensas de verdade.
                </Text>

                <Text fontSize={{ base: 'lg', md: '2xl' }} color="gray.600">
                  A cada nova matrícula feita por sua indicação, você escolhe:
                </Text>

                <List spacing={3} fontSize={{ base: 'lg', md: '2xl' }} color="gray.700">
                  <ListItem>
                    💸{' '}
                    <Text as="span" fontWeight="semibold">
                      Dinheiro direto no PIX ou até R$ 400,00 de desconto na matrícula do seu filho.
                    </Text>
                  </ListItem>

                  <ListItem>
                    👉{' '}
                    <Text as="span" fontWeight="semibold">
                      Quanto mais você indica, mais você ganha. Comece agora!
                    </Text>
                  </ListItem>
                </List>

                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} pt={6} justify="center">
                  <Button
                    size="lg"
                    colorScheme="blue"
                    px={8}
                    onClick={() => scrollToSmoothly('affiliate-form', 300)}
                  >
                    Quero ganhar!
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    px={8}
                    onClick={() => scrollToSmoothly('prizes-section', 300)}
                  >
                    Ver prêmios
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Mobile View */}
        <Box display={{ base: 'block', md: 'none' }} py={12} textAlign="center">
          <Container>
            <Stack spacing={6} align="center">
              <Heading as="h1" fontSize="4xl" fontWeight="extrabold">
                💥 Indique a Brio e Ganhe — Mesmo Sem Ser da Família Brio!
              </Heading>

              <Text fontSize="lg" color="gray.600">
                Isso mesmo: mesmo que seu filho ainda não esteja matriculado, você
                pode indicar a Brio e receber recompensas de verdade.
              </Text>

              <Text fontSize="lg" color="gray.600">
                A cada nova matrícula feita por sua indicação, você escolhe:
              </Text>

              <List spacing={2} fontSize="lg" color="gray.700">
                <ListItem>
                  💸{' '}
                  <Text as="span" fontWeight="semibold">
                    Dinheiro direto no PIX ou até R$ 400,00 de desconto na matrícula do seu filho.
                  </Text>
                </ListItem>

                <ListItem>
                  👉{' '}
                  <Text as="span" fontWeight="semibold">
                    Quanto mais você indica, mais você ganha. Comece agora!
                  </Text>
                </ListItem>
              </List>

              <Button
                size="lg"
                colorScheme="blue"
                width="100%"
                onClick={() => scrollToSmoothly('affiliate-form', 300)}
              >
                Quero ganhar!
              </Button>

              <Button
                size="lg"
                variant="outline"
                width="100%"
                onClick={() => scrollToSmoothly('prizes-section', 300)}
              >
                Ver prêmios
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ParallaxProvider>
  );
};
