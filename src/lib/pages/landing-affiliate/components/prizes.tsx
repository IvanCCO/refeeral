'use client';

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
  Circle,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaPercent, FaWallet, FaMoneyBillWave } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface PrizeItem {
  id: number;
  indicacao: string;
  title: string;
  description: string;
  icon: IconType;
  referrals: number;
}

const prizes: PrizeItem[] = [
  {
    id: 1,
    indicacao: 'Indicação',
    title: 'Desconto',
    description: 'Você ganha R$ 150,00 de desconto na matrícula.',
    icon: FaPercent,
    referrals: 1,
  },
  {
    id: 2,
    indicacao: 'Indicações',
    title: 'Desconto ou Dinheiro',
    description:
      'Você pode escolher entre R$ 300,00 de desconto na matrícula ou R$ 100,00 em dinheiro.',
    icon: FaWallet,
    referrals: 2,
  },
  {
    id: 3,
    indicacao: 'Indicações',
    title: 'Desconto ou Dinheiro',
    description:
      'Você escolhe entre R$ 400,00 de desconto na matrícula ou R$ 200,00 em dinheiro.',
    icon: FaMoneyBillWave,
    referrals: 3,
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
            Participe e ganhe prêmios incríveis que irão impulsionar sua jornada
            de desenvolvimento para o próximo nível
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
                display="flex"
                flexDirection="column"
              >
                <Circle
                  size={{ base: '70px', md: '80px', lg: '90px' }}
                  bg="blue.500"
                  color="white"
                  position="absolute"
                  top="-3"
                  right="-3"
                  zIndex="1"
                  boxShadow="md"
                >
                  <Flex direction="column" align="center" justify="center">
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: '2xl', md: '3xl' }}
                      lineHeight="shorter"
                    >
                      {prize.referrals}
                    </Text>
                    <Text
                      fontSize={{ base: 'xs', md: 'sm' }}
                      fontWeight="medium"
                      lineHeight="tight"
                      mt="-1"
                    >
                      {prize.referrals === 1 ? 'Indicação' : 'Indicações'}
                    </Text>
                  </Flex>
                </Circle>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  h={{ base: '180px', sm: '200px', md: '250px' }}
                  flexShrink={0}
                  w="100%"
                  position="relative"
                  bg="blue.50"
                  borderRadius="lg"
                >
                  <Icon
                    as={prize.icon}
                    boxSize={{ base: '100px', sm: '120px', md: '150px' }}
                    color="blue.500"
                  />
                </Box>
                <VStack
                  align="center"
                  gap={4}
                  justifyContent="flex-start"
                  w="100%"
                  flex={1}
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
                    flex={1}
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
