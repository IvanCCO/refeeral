'use client';

import { 
  Box, 
  Flex, 
  Heading, 
  Icon, 
  Stack, 
  Text 
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconType;
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Box 
      bg="white" 
      p={8} 
      rounded="xl" 
      shadow="md" 
      borderWidth="1px"
      flex="1"
      maxW={{ base: 'full', lg: '30%' }}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
    >
      <Stack gap={4}>
        <Flex
          w={12}
          h={12}
          align="center"
          justify="center"
          rounded="full"
          bg="blue.100"
          color="blue.600"
        >
          <Icon as={icon} boxSize={5} />
        </Flex>
        <Heading as="h3" fontSize="xl">
          {title}
        </Heading>
        <Text color="gray.600">
          {description}
        </Text>
      </Stack>
    </Box>
  );
}; 