'use client';

import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { FaGift } from 'react-icons/fa';
import { FeatureCard } from './FeatureCard';

const FEATURE_ITEMS = [
  {
    title: 'Cashback Garantido',
    description: 'Receba parte do valor das suas compras de volta automaticamente.',
    icon: FaGift
  },
  {
    title: 'Recompensas Personalizadas',
    description: 'Ofertas especiais baseadas nos seus interesses e histórico de compras.',
    icon: FaGift
  },
  {
    title: 'Programa de Referência',
    description: 'Indique amigos e ganhe bônus exclusivos a cada nova indicação.',
    icon: FaGift
  }
];

export const Features = () => {
  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="container.xl">
        <Stack gap={12}>
          <Stack gap={5} textAlign="center" maxW="container.md" mx="auto">
            <Heading as="h2" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              Benefícios Exclusivos
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600">
              Descubra todas as vantagens que nosso programa oferece
            </Text>
          </Stack>
          
          <Stack 
            direction={{ base: 'column', lg: 'row' }} 
            gap={8} 
            justify="center"
          >
            {FEATURE_ITEMS.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}; 