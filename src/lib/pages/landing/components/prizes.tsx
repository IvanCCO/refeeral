'use client';

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

interface PrizeItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const prizes: PrizeItem[] = [
  {
    id: 1,
    title: '1 Indicação',
    description:
      'Ganhe 1 Caneca personalizada Brio para você tomar café com a gente',
    imageUrl: '/Canecas3.png',
  },
  {
    id: 2,
    title: '2 Indicações',
    description:
      'Ganhe 1 Camiseta Brio (design exclusivo) + 1 Kit de canetas coloridas + 1 marcador de texto + 1 Adesivo de motivação',
    imageUrl: '/indica2.png',
  },
  {
    id: 3,
    title: '3 Indicações',
    description:
      'Ganhe 1 Headphone para estudo  + 1 Caderno de anotações da Brio com layout para planejamento de estudos + 1 Vale-presente Google Play ou Apple Store no valor de R$ 100,00',
    imageUrl: '/indica3.png',
  },
];

export const Prizes = () => {
  const spacing = useBreakpointValue({ base: 8, md: 12 });

  return (
    <Box id="prizes-section" py={{ base: 12, md: 20 }} bg="gray.50">
      <Container maxW="container.xl">
        <VStack align="center" gap={8} mb={12}>
          <Heading
            as="h2"
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="bold"
            color="gray.800"
          >
            Prêmios incríveis
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: '2xl' }}
            color="gray.600"
            maxW="2xl"
            textAlign="center"
          >
            Participe e ganhe prêmios incríveis que irão impulsionar sua
            jornada de desenvolvimento para o próximo nível
          </Text>
        </VStack>

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={spacing}
          alignItems="stretch"
        >
          {prizes.map((prize) => (
            <GridItem key={prize.id} display="flex">
              <Grid
                templateColumns={'1fr'}
                gap={6}
                bg="white"
                p={6}
                borderRadius="xl"
                boxShadow="lg"
                _hover={{
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease',
                }}
                flexGrow={1}
                alignItems="start"
                h="100%"
                position="relative"
                display="flex" // Add flex to the Grid
                flexDirection="column" // Stack children vertically
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  h={{ base: '180px', sm: '200px', md: '250px' }}
                  flexShrink={0} 
                  w="100%" // Add full width to ensure proper centering
                >
                  <Image
                    src={prize.imageUrl}
                    alt={prize.title}
                    borderRadius="lg"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    mx="auto"
                  />
                </Box>
                <VStack
                  align="center"
                  gap={4}
                  justifyContent="flex-start"
                  w="100%"
                  flex={1} // Allow the VStack to take remaining space
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    color="gray.800"
                    mb={1}
                    textAlign="center"
                  >
                    {prize.title}
                  </Heading>
                  <Text
                    color="gray.600"
                    fontSize={{ base: 'md', md: 'lg' }}
                    textAlign="center"
                    w="100%"
                    flex={1} // Allow the Text to take remaining space
                  >
                    {prize.description}
                  </Text>
                </VStack>
              </Grid>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
