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
    title: 'First Place',
    description:
      'Win an all-expenses-paid trip to a tech conference of your choice, plus $10,000 in cash prizes.',
    imageUrl: '/images/prizes/first-prize.jpg',
  },
  {
    id: 2,
    title: 'Second Place',
    description:
      'Take home the latest MacBook Pro and $5,000 in cash to fuel your next project.',
    imageUrl: '/images/prizes/second-prize.jpg',
  },
  {
    id: 3,
    title: 'Third Place',
    description:
      'Receive a complete developer setup including a high-end monitor and $2,500 in cash.',
    imageUrl: '/images/prizes/third-prize.jpg',
  },
];

export const Prizes = () => {
  const columns = useBreakpointValue({ base: 1, md: 2 });
  const spacing = useBreakpointValue({ base: 8, md: 12 });
  const textAlign = useBreakpointValue({ base: 'center', md: 'left' });

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
            Amazing Prizes
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: '2xl' }}
            color="gray.600"
            maxW="2xl"
            textAlign="center"
          >
            Participate and win incredible rewards that will take your
            development journey to the next level
          </Text>
        </VStack>

        <Grid
          templateColumns={`repeat(${columns}, 1fr)`}
          gap={spacing}
          alignItems="center"
        >
          {prizes.map((prize) => (
            <GridItem key={prize.id}>
              <Grid
                templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                gap={6}
                bg="white"
                p={6}
                borderRadius="xl"
                boxShadow="lg"
                _hover={{
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Box>
                  <Image
                    src={prize.imageUrl}
                    alt={prize.title}
                    borderRadius="lg"
                    objectFit="cover"
                    w="100%"
                    h={{ base: '200px', md: '250px' }}
                  />
                </Box>
                <VStack align={textAlign} gap={4}>
                  <Heading
                    as="h3"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    color="gray.800"
                  >
                    {prize.title}
                  </Heading>
                  <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
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
