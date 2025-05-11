'use client';

import {
  Box,
  Heading,
  Stack,
  Steps,
  Text,
} from '@chakra-ui/react';

const steps = [
  {
    title: 'Cadastre-se no programa',
    description: 'Preencha seus dados no formulário de cadastro para começar a indicar amigos e familiares.'
  },
  {
    title: 'Compartilhe seu link único',
    description: 'Receba um link exclusivo e compartilhe com seus amigos através de redes sociais, WhatsApp ou email.'
  },
  {
    title: 'Amigo realiza a matrícula',
    description: 'Quando seu amigo se matricular usando seu link, ele ganha R$ 50 de desconto na matrícula.'
  },
  {
    title: 'Receba sua recompensa',
    description: 'Para cada matrícula realizada através do seu link, você ganha R$ 50 de desconto em sua mensalidade e pontos para trocar por prêmios.'
  }
];

export const HowItWorks = () => {
  return (
    <Box 
      py={{ base: 16, md: 24 }} 
      bg="blue.700" 
      id="how-it-works" 
      width="100vw"
      position="relative"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
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
        <Text
          color="gray.300"
          fontSize={{ base: 'lg', md: '2xl', }}
          maxW="2xl"
        >
          Siga estes passos simples para começar a indicar amigos e ganhar recompensas.
        </Text>
      </Stack>

      <Box 
        maxW="3xl" 
        mx="auto"
        px={{ base: 4, md: 8 }}
      >
        <Steps.Root 
          orientation="vertical" 
          height="auto" 
          gap={10}
          count={steps.length}
          size="lg"
        >
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item key={index} index={index}>
                <Steps.Indicator 
                  bg={index % 2 === 1 ? "white" : "yellow.400"} 
                  color={"gray.800"}
                  borderColor={index % 2 === 1 ? "white" : "yellow.400"}
                  borderWidth={2}
                  fontWeight={800}
                />
                <Box ml={5} mb={10}>
                  <Steps.Title color="white" fontWeight={600} fontSize={{ base: 'xl', md: '2xl' }} mb={3}>{step.title}</Steps.Title>
                  <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }}>{step.description}</Text>
                </Box>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps.Root>
      </Box>
    </Box>
  );
}; 