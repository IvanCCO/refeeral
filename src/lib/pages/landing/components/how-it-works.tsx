'use client';

import { Box, Flex, Grid, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaUserPlus, FaLink, FaGraduationCap, FaGift } from 'react-icons/fa';

const steps = [
  {
    title: 'Cadastre-se no programa',
    description:
      'Preencha seus dados no formulário de cadastro para começar a indicar amigos e familiares.',
    icon: FaUserPlus,
  },
  {
    title: 'Compartilhe seu link único',
    description:
      'Receba um link exclusivo e compartilhe com seus amigos através de redes sociais, WhatsApp ou email.',
    icon: FaLink,
  },
  {
    title: 'Amigo realiza a matrícula',
    description:
      'Quando seu amigo se matricular usando seu link, ele ganha R$ 50 de desconto na matrícula.',
    icon: FaGraduationCap,
  },
  {
    title: 'Receba sua recompensa',
    description:
      'Para cada matrícula realizada através do seu link, você ganha R$ 50 de desconto em sua mensalidade e pontos para trocar por prêmios.',
    icon: FaGift,
  },
];

export const HowItWorks = () => {
  return (
    <Box
      py={{ base: 16, md: 24 }}
      bg="blue.700"
      id="how-it-works"
      width="100%"
      overflowX="hidden"
    >
      <Stack
        gap={8}
        align="center"
        textAlign="center"
        mb={12}
        px={{ base: 4, md: 8 }}
      >
        <Heading
          as="h2"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight={600}
          color="white"
        >
          Como Funciona
        </Heading>
        <Text color="gray.300" fontSize={{ base: 'lg', md: '2xl' }} maxW="2xl">
          Siga estes passos simples para começar a indicar amigos e ganhar
          recompensas.
        </Text>
      </Stack>

      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: 6, md: 8 }}
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              bg="blue.600"
              borderRadius="lg"
              boxShadow="lg"
              overflow="hidden"
              position="relative"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'xl',
              }}
            >
              {/* Number indicator */}
              <Flex
                position="absolute"
                top="3"
                left="3"
                w="36px"
                h="36px"
                bg={'white'}
                color="blue.700"
                borderRadius="full"
                align="center"
                justify="center"
                fontWeight="bold"
                fontSize="lg"
              >
                {index + 1}
              </Flex>

              <Box p={6} pt={16}>
                {/* Icon */}
                <Flex justify="center" align="center" mb={4}>
                  <Icon as={step.icon} boxSize={12} color={'white'} />
                </Flex>

                {/* Title and Description */}
                <Stack gap={3} textAlign="center">
                  <Heading
                    as="h3"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="600"
                    color="white"
                  >
                    {step.title}
                  </Heading>
                  <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }}>
                    {step.description}
                  </Text>
                </Stack>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
