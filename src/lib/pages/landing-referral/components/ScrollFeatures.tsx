'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { useRef, useEffect, useState, RefObject } from 'react';
import {
  FaBook,
  FaChartLine,
  FaGift,
  FaHandshake,
  FaMedal,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

// Define the feature content structure
interface FeatureItem {
  title: string;
  description: string;
  icon: IconType;
  image: string;
}

const FEATURE_ITEMS: FeatureItem[] = [
  {
    title: 'Aulas de qualidade',
    description:
      'Vídeo-aulas personalizadas em Matemática, Português, Ciências e mais — selecionadas conforme a necessidade de cada aluno, sem distrações e no ritmo ideal para avançar.',
    icon: FaGift,
    image: '/feature-rewards.png',
  },
  {
    title: 'Apostila de conteúdos',
    description:
      'Conteúdos organizados conforme a BNCC, com teoria clara e atividades práticas. Ideal para revisar, reforçar e se preparar melhor para as provas.',
    icon: FaBook,
    image: '/feature-stats.png',
  },
  {
    title: 'Acompanhamento pedagógico',
    description:
      'Relatórios de desempenho e chat de dúvidas direto com professores. Pais e responsáveis acompanham de perto o progresso do aluno em cada matéria.',
    icon: FaMedal,
    image: '/feature-multiply.png',
  },
  {
    title: 'Cronograma de estudos personalizado',
    description:
      'Plano de estudos semanal atualizado conforme o avanço do aluno, incluindo revisão especial na semana de provas — para estudar com foco, rotina e mais tranquilidade.',
    icon: FaHandshake,
    image: '/feature-exclusive.png',
  },
];

// Custom hook for detecting when an element is in view
const useInView = (options = {}): [RefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref as RefObject<HTMLDivElement>, isInView];
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconType;
  image: string;
  index: number;
}

// Feature card component
const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const isEven = index % 2 === 0;

  return (
    <Box
      ref={ref}
      opacity={isInView ? 1 : 0}
      transform={isInView ? 'translateY(0)' : 'translateY(40px)'}
      transition="all 0.6s ease-out"
      transitionDelay={`${index * 0.2}s`}
      py={12}
    >
      <Flex
        direction={{ base: 'column', md: isEven ? 'row' : 'row-reverse' }}
        align="center"
        justify="space-between"
        gap={10}
      >
        <Box flex="1" textAlign={{ base: 'center', md: 'start' }}>
          <Flex
            w={16}
            h={16}
            align="center"
            justify="center"
            rounded="full"
            bg="blue.100"
            color="blue.600"
            mb={4}
            mx={{ base: 'auto', md: '0' }}
          >
            <Icon as={icon} boxSize={8} />
          </Flex>
          <Heading as="h3" fontSize={{ base: '2xl', md: '3xl' }} mb={4}>
            {title}
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
            {description}
          </Text>
        </Box>

        <Box
          flex="1"
          position="relative"
          height={{ base: '200px', md: '300px' }}
          width="100%"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="lg"
        >
          {/* Replace with actual image or mockup */}
          <Box
            bg="linear-gradient(45deg, #EBF8FF, #BEE3F8)"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              Feature Image {index + 1}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export const ScrollFeatures = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box id="features" py={{ base: 16, md: 24 }} bg="gray.50" >
      <Container maxW="container.xl">
        <Stack gap={16}>
          <Stack
            ref={headerRef}
            opacity={headerInView ? 1 : 0}
            transform={headerInView ? 'translateY(0)' : 'translateY(20px)'}
            transition="all 0.6s ease-out"
            gap={5}
            textAlign="center"
            maxW="container.md"
            mx="auto"
          >
            <Heading as="h2" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              O que é a Brio?
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600">
              A Brio Educação é um reforço escolar online que oferece aulas de
              qualidade para os alunos.
            </Text>
          </Stack>

          <Stack gap={6}>
            {FEATURE_ITEMS.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                image={feature.image}
                index={index}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
