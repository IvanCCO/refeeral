'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  Icon,
  AspectRatio,
} from '@chakra-ui/react';
import { useRef, useEffect, useState, RefObject } from 'react';
import { FaBook, FaGift, FaHandshake } from 'react-icons/fa';
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
    title: 'Diversos cursos disponíveis',
    description:
      'Conteúdos organizados conforme a BNCC, com teoria clara e atividades práticas. Ideal para revisar, reforçar e se preparar melhor para as provas. Com apostila de conteúdos para cada aula.',
    icon: FaBook,
    image: '/aulas.png',
  },
  // {
  //   title: 'Acompanhamento pedagógico',
  //   description:
  //     'Relatórios de desempenho e chat de dúvidas direto com professores. Pais e responsáveis acompanham de perto o progresso do aluno em cada matéria.',
  //   icon: FaMedal,
  //   image: '/feature-multiply.png',
  // },
  {
    title: 'Cronograma de estudos personalizado',
    description:
      'Plano de estudos semanal atualizado conforme o avanço do aluno, incluindo revisão especial na semana de provas — para estudar com foco, rotina e mais tranquilidade.',
    icon: FaHandshake,
    image: '/cronograma.png',
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
const FeatureCard = ({
  title,
  description,
  icon,
  image,
  index,
}: FeatureCardProps) => {
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
      width="100%"
    >
      <Flex
        direction={{ base: 'column', md: isEven ? 'row' : 'row-reverse' }}
        align="center"
        justify="space-between"
        gap={10}
        width="100%"
      >
        <Box
          flex="1"
          textAlign={{ base: 'center', md: 'start' }}
          width={{ base: '100%', md: '50%' }}
        >
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
          width={{ base: '100%', md: '50%' }}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="lg"
          height={
            index === 0
              ? { base: '250px', md: 'auto' }
              : { base: '250px', md: '300px' }
          }
          minHeight={{ base: '250px' }}
          mb={{ base: 4, md: 0 }}
        >
          {index === 0 ? (
            <AspectRatio ratio={16 / 9} width="100%" height="100%">
              <iframe
                title="Aulas de qualidade"
                src="https://player.vimeo.com/video/1074450668?h=022b96956d"
                width="100%"
                height="100%"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            </AspectRatio>
          ) : (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundImage={`url(${image})`}
              backgroundSize="cover"
              backgroundPosition="center"
              height="100%"
              width="100%"
            >
              {/* Fallback if image fails to load */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="linear-gradient(45deg, #EBF8FF, #BEE3F8)"
                opacity={0.2}
                zIndex={-1}
              />
            </Box>
          )}
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
    <Box id="features" py={{ base: 16, md: 24 }}>
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

          <Stack gap={6} width="100%">
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
