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
            position="relative"
            width="100%"
            left="50%"
            transform="translateX(-50%)"
            overflowX="hidden"
            bg="yellow.400"
            py={{ base: 8, md: 16 }}
            id="how-it-works"
        >
            <Stack
                gap={4}
                align="center"
                textAlign="center"
                mb={{ base: 4, md: 8 }}
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
            </Stack>

            <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
                <Grid
                    templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
                    gap={{ base: 3, md: 6 }}
                >
                    {steps.map((step, index) => (
                        <Box
                            key={index}
                            bg="blue.600"
                            borderRadius="lg"
                            boxShadow="md"
                            overflow="hidden"
                            position="relative"
                            transition="transform 0.3s ease, box-shadow 0.3s ease"
                            _hover={{
                                transform: 'translateY(-5px)',
                                boxShadow: 'lg',
                            }}
                        >
                            {/* Number indicator */}
                            <Flex
                                position="absolute"
                                top={{ base: "2", md: "3" }}
                                left={{ base: "2", md: "3" }}
                                w={{ base: "24px", md: "32px" }}
                                h={{ base: "24px", md: "32px" }}
                                bg="white"
                                color="blue.700"
                                borderRadius="full"
                                align="center"
                                justify="center"
                                fontWeight="bold"
                                fontSize={{ base: "xs", md: "md" }}
                            >
                                {index + 1}
                            </Flex>

                            <Box p={{ base: 3, md: 5 }} pt={{ base: 10, md: 14 }}>
                                {/* Icon */}
                                <Flex justify="center" align="center" mb={{ base: 2, md: 3 }}>
                                    <Icon as={step.icon} boxSize={{ base: 7, md: 10 }} color="white" />
                                </Flex>

                                {/* Title and Description */}
                                <Stack gap={{ base: 1, md: 2 }} textAlign="center">
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: 'sm', md: 'xl' }}
                                        fontWeight="600"
                                        color="white"
                                        lineHeight={'1.5'}
                                    >
                                        {step.title}
                                    </Heading>
                                    <Text 
                                        color="gray.300" 
                                        fontSize={{ base: 'xs', md: 'md' }}
                                        display={{ base: 'none', sm: 'block' }}
                                    >
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
