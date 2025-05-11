'use client';

import { scrollToSmoothly } from '@/utils/commons';
import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ReactRotatingText = dynamic(() => import('react-rotating-text'), {
  ssr: false,
}) as any; 

export const Hero = () => {
  const rotatingItems = ['canecas', 'camisas', 'gift cards', 'cadernos'];
  
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
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl', xl: '7xl' }}
          >
            <Text as="span" position="relative" color="blue.600">
              Indique a Brio e ganhe{' '}
              <Box as="span" position="relative" display="inline-block">
                <ReactRotatingText items={rotatingItems} />
                <Box
                  position="absolute"
                  bottom="-4px"
                  left="0"
                  right="0"
                  height="8px"
                  className="rotating-text-marker"
                  bgGradient="linear(to-r, blue.500, green.500, purple.500, orange.500)"
                />
              </Box>
            </Text>
          </Heading>
          <Text
            color="gray.600"
            fontSize={{ base: 'lg', lg: 'xl' }}
            maxW="lg"
            mt={6}
          >
            Ajude outras famílias a descobrirem a Brio a conheceream o reforço escolar on-line com acompanhamento personalizado.
            A cada novo aluno matriculado, você recebe R$ 50 de desconto na matrícula! Além de ganhar prêmios exclusivos.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} gap={4} mt={8}>
            <Button
              size="lg"
              colorPalette="blue"
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
              Quais são os prêmios?
            </Button>
          </Stack>
        </Box>
        <Box
          flex={1}
          height={{ base: '240px', md: '500px' }}
          rounded="2xl"
          bg="blue.50"
          position="relative"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Image
            src="/image.png"
            alt="Brio Educação Hero Image"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            priority
          />
          <Text
            position="absolute"
            bottom="2"
            right="2"
            fontSize="xs"
            color="gray.600"
            bg="whiteAlpha.900"
            px="2"
            py="1"
            borderRadius="md"
          >
            Imagens meramente ilustrativas
          </Text>
        </Box>
      </Stack>
      
      {/* Add CSS for the blinking cursor from react-rotating-text */}
      <style jsx global>{`
        .react-rotating-text-cursor {
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .rotating-text-marker {
          animation: markerColorChange 8s infinite;
        }
        
        @keyframes markerColorChange {
          0% { background: var(--chakra-colors-blue-500); }
          25% { background: var(--chakra-colors-green-500); }
          50% { background: var(--chakra-colors-purple-500); }
          75% { background: var(--chakra-colors-orange-500); }
          100% { background: var(--chakra-colors-blue-500); }
        }
      `}</style>
    </Container>
  );
};
