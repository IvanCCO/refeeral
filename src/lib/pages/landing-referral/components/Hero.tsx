'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
  AspectRatio,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
  referralCode: string | null;
}

export const Hero = ({ referralCode }: HeroProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      bg="blue.600"
      color="white"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        bgImage="url('/pattern.svg')"
        zIndex="0"
      />

      <Container maxW="container.xl" position="relative" zIndex="1">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 10, lg: 20 }}
          align="center"
        >
          <Stack gap={6} maxW={{ base: 'full', lg: '50%' }}>
            {referralCode && (
              <Badge
                colorPalette="yellow"
                alignSelf="flex-start"
                fontSize="sm"
                px={3}
                py={1}
                rounded="full"
              >
                Indicado por um parceiro
              </Badge>
            )}

            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Você foi indicado à Brio Educa!
            </Heading>

            <Text fontSize={{ base: 'lg', md: 'xl' }} opacity="0.9">
              Matricule-se agora e ganhe R$50 de desconto na primeira
              mensalidade.
            </Text>

            <Stack direction={{ base: 'column', sm: 'row' }} gap={4} pt={4}>
              <Button
                size="lg"
                colorScheme="white"
                bg="white"
                color="blue.600"
                _hover={{ bg: 'gray.100' }}
                px={8}
                rounded="full"
                fontWeight="bold"
              >
                Comece Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                px={8}
                rounded="full"
                fontWeight="bold"
              >
                Saiba Mais
              </Button>
            </Stack>
          </Stack>

          {/* YouTube Video */}
          <Box
            w={{ base: 'full', lg: '50%' }}
            display="flex"
            justifyContent="center"
            order={{ base: 2, lg: 1 }}
            ref={videoRef}
          >
            <AspectRatio
              w="full"
              maxW="560px"
              ratio={16 / 9}
              rounded="xl"
              overflow="hidden"
              boxShadow="2xl"
            >
              <iframe
                src={`https://www.youtube.com/embed/mCOssrhOuGM${isVisible ? '?autoplay=1&mute=1' : ''}`}
                title="Brio Educação Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
