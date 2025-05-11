'use client';

import { scrollToSmoothly } from '@/utils/commons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

/* eslint-disable @typescript-eslint/no-explicit-any */
const ReactRotatingText = dynamic(() => import('react-rotating-text'), {
  ssr: false,
}) as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

export const Hero = () => {
  const rotatingItems = [
    'prêmios',
    'vouchers',
    'canecas',
    'camisetas',
    'cadernos',
    'canetas',
    'brindes',
  ];

  return (
    <ParallaxProvider>
      <Box position="relative" width="100%" overflowX="hidden">
        {/* Desktop View */}
        <Box
          display={{ base: 'none', md: 'block' }}
          pt={14}
          pb={24}
          bg="white"
          position="relative"
        >
          {/* Prize Images with Parallax */}
          <Box
            position="absolute"
            top="30%"
            left="1%"
            display={{ base: 'none', xl: 'flex' }}
            flexDirection="column"
            gap={8}
            zIndex={0}
            rotate="-10deg"
          >
            <Parallax speed={-5}>
              <Box width="300px" height="200px" position="relative">
                <Image
                  src="/Canecas.png"
                  alt="Mug"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            </Parallax>
          </Box>
          <Box
            position="absolute"
            top="20%"
            right="1%" // Adjust as needed
            display={{ base: 'none', xl: 'flex' }}
            zIndex={0}
            rotate="10deg"
          >
            <Parallax speed={-15}>
              <Box width="220px" height="220px" position="relative">
                <Image
                  src="/Camisa.png"
                  alt="Book"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            </Parallax>
          </Box>

          {/* Main Content */}
          <Container maxW="4xl" position="relative" zIndex={1}>
            <Stack gap={8} align="center" textAlign="center">
              <Box maxW="4xl" mx="auto" px={{ base: 4, md: 0 }}>
                <Heading
                  lineHeight={1.2}
                  fontWeight={700}
                  fontSize={{ base: '4xl', md: '6xl', lg: '7xl', xl: '8xl' }}
                  textAlign="center"
                >
                  <Text as="span">Indique a Brio e ganhe </Text>
                  {/* <br /> */}
                  <Box as="span" position="relative" display="inline-block">
                    <Text as="span" color="blue.600">
                      <ReactRotatingText
                        items={rotatingItems}
                        cursor={false}
                        emptyPause={300}
                        pause={3000}
                      />
                    </Text>
                    <Box
                      position="absolute"
                      bottom="0px"
                      left="0"
                      right="0"
                      height="6px"
                      className="rotating-text-marker"
                      bgGradient="linear(to-r, blue.500, green.500, purple.500, orange.500)"
                    />
                  </Box>
                </Heading>

                <Text
                  color="gray.600"
                  fontSize={{ base: 'lg', md: '2xl' }}
                  maxW="2xl"
                  mx="auto"
                  mt={6}
                >
                  Ajude outras famílias a conhecerem o reforço escolar on-line
                  mais querido do Brasil. A cada novo aluno matriculado por sua
                  indicação, você recebe um presente exclusivo, e quem você
                  indicar ainda ganha R$ 50 de desconto na matrícula!
                </Text>
                <HStack gap={4} justify="center">
                  <Button
                    size="lg"
                    colorPalette="blue"
                    mt={10}
                    px={8}
                    onClick={() => scrollToSmoothly('affiliate-form', 300)}
                  >
                    Quero ganhar!
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    mt={10}
                    px={8}
                    onClick={() => scrollToSmoothly('prizes-section', 300)}
                  >
                    Ver prêmios
                  </Button>
                </HStack>
                <Text 
                  mt={4} 
                  fontSize="sm" 
                  color="gray.500"
                >
                  Ao participar, você concorda com nossos <Link href="/termos-condicoes" color="blue.500" textDecoration="underline">Termos e Condições</Link>
                </Text>
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* Mobile View */}
        <Box display={{ base: 'block', md: 'none' }} pb={12}>
          <Container>
            <Stack gap={8} align="center">
              <Flex justify="center" align="center" width="90%">
                <Box position="relative" width="90%" height="300px">
                  <Image
                    src="/mobile-hero.png"
                    alt="Brio mobile illustration"
                    fill
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    priority
                  />
                </Box>
              </Flex>

              <Box maxW="sm" mx="auto" px={4} textAlign="center">
                <Heading
                  lineHeight={1.2}
                  fontWeight={700}
                  fontSize="4xl"
                  textAlign="center"
                >
                  <Text as="span">Indique a Brio e ganhe </Text>
                  <Box as="span" position="relative" display="inline-block">
                    <Text as="span" color="blue.600">
                      <ReactRotatingText items={rotatingItems} cursor={false} />
                    </Text>
                    <Box
                      position="absolute"
                      bottom="0px"
                      left="0"
                      right="0"
                      height="4px"
                      className="rotating-text-marker"
                      bgGradient="linear(to-r, blue.500, green.500, purple.500, orange.500)"
                    />
                  </Box>
                </Heading>

                <Text color="gray.600" fontSize="xl" mt={4}>
                  Ajude outras famílias a descobrirem a Brio e ganhe recompensas
                  exclusivas.
                </Text>

                <Button
                  size="lg"
                  colorPalette="blue"
                  mt={6}
                  width="100%"
                  onClick={() => scrollToSmoothly('affiliate-form', 300)}
                >
                  Quero ganhar!
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  mt={3}
                  width="100%"
                  onClick={() => scrollToSmoothly('prizes-section', 300)}
                >
                  Ver prêmios
                </Button>
                <Text 
                  mt={4} 
                  fontSize="sm" 
                  color="gray.500"
                >
                  Ao participar, você concorda com nossos <Link href="/termos-condicoes" color="blue.500" textDecoration="underline">Termos e Condições</Link>
                </Text>
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* Add CSS for the blinking cursor from react-rotating-text */}
        <style jsx global>{`
          .react-rotating-text-cursor {
            display: none !important;
            opacity: 0;
          }

          .rotating-text-marker {
            animation: markerColorChange 8s infinite;
          }

          @keyframes markerColorChange {
            0% {
              background: var(--chakra-colors-blue-500);
            }
            25% {
              background: var(--chakra-colors-green-500);
            }
            50% {
              background: var(--chakra-colors-purple-500);
            }
            75% {
              background: var(--chakra-colors-orange-500);
            }
            100% {
              background: var(--chakra-colors-blue-500);
            }
          }
        `}</style>
      </Box>
    </ParallaxProvider>
  );
};
