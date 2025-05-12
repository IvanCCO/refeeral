'use client';

import { useState, useRef, useEffect, RefObject } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  IconButton,
  Image,
  Stack,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

// Sample testimonials data - replace with real data when available
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Mãe de aluno do 8º ano',
    image: '/testimonial1.jpg',
    content:
      'Com o programa de estudos personalizado, meu filho melhorou suas notas em mais de 40% em apenas 3 meses. O suporte dos professores fez toda a diferença!',
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    role: 'Pai de aluno do 5º ano',
    image: '/testimonial2.jpg',
    content:
      'Minha filha estava com dificuldades em matemática, e as aulas personalizadas ajudaram a superar isso. Ela agora ama resolver problemas matemáticos!',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    role: 'Mãe de aluna do 7º ano',
    image: '/testimonial3.jpg',
    content:
      'O cronograma de estudos foi essencial para organizar a rotina da minha filha. Ela consegue estudar para as provas sem estresse de última hora.',
  },
];

// Custom hook for intersection observer (similar to the one in ScrollFeatures)
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

// Testimonial Card Component
const TestimonialCard = ({
  testimonial,
  isActive = false,
}: {
  testimonial: Testimonial;
  isActive?: boolean;
}) => {
  // Random height between 200px and 300px for the image
  const imageHeight = useRef(Math.floor(Math.random() * (300 - 200 + 1)) + 200);

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow={isActive ? 'xl' : 'md'}
      maxW="550px"
      mx="auto"
      overflow="hidden"
      position="relative"
      transform={isActive ? 'scale(1)' : 'scale(0.85)'}
      transition="all 0.4s ease"
      opacity={isActive ? 1 : 0.8}
      height="100%"
    >
      {/* Dark overlay for non-active cards */}
      {!isActive && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(3px)"
          zIndex={2}
          transition="all 0.3s ease"
        />
      )}

      {/* Full-width image */}
      <Box
        width="100%"
        height={`${imageHeight.current}px`}
        position="relative"
        overflow="hidden"
      >
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>

      {/* Content */}
      <Box p={6} textAlign="left">
        <Text fontSize="md" color="gray.700" mb={4} fontStyle="italic">
          &quot;{testimonial.content}&quot;
        </Text>
        <Heading as="h3" fontSize="lg" mb={1}>
          {testimonial.name}
        </Heading>
        <Text color="gray.600" fontSize="sm">
          {testimonial.role}
        </Text>
      </Box>
    </Box>
  );
};

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  // Calculate previous and next indices
  const prevIndex =
    currentIndex === 0 ? TESTIMONIALS.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === TESTIMONIALS.length - 1 ? 0 : currentIndex + 1;

  return (
    <Box py={16}>
      <Container maxW="container.xl" position="relative">
        <Stack
          gap={4}
          textAlign="center"
          mb={12}
          ref={headerRef}
          opacity={headerInView ? 1 : 0}
          transform={headerInView ? 'translateY(0)' : 'translateY(20px)'}
          transition="all 0.6s ease-out"
        >
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
          >
            O que nossos clientes dizem
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            maxW="800px"
            mx="auto"
          >
            Confira os depoimentos de pais e responsáveis que viram seus filhos
            evoluírem com nossa plataforma
          </Text>
        </Stack>

        <Flex
          align="center"
          justify="center"
          position="relative"
          width="100%"
          py={8}
          minH="500px"
        >
          <IconButton
            aria-label="Anterior"
            onClick={prevTestimonial}
            position="absolute"
            left={{ base: 0, md: '5%' }}
            zIndex={5}
            borderRadius="full"
            size="lg"
            colorScheme="blue"
            variant="solid"
          >
            <FaChevronLeft />
          </IconButton>

          {/* Carousel with preview of adjacent cards */}
          <Flex
            width="100%"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            position="relative"
            px={{ base: 4, md: '10%' }}
          >
            {/* Previous Card (Preview) */}
            <Box
              position="absolute"
              left={{ base: '10%', md: '30%' }}
              width={{ base: '60%', md: '30%' }}
              zIndex={1}
              transform="translateX(-50%)"
              opacity={{ base: 0, md: 1 }}
              display={{ base: 'none', md: 'block' }}
            >
              <TestimonialCard
                testimonial={TESTIMONIALS[prevIndex]}
                isActive={false}
              />
            </Box>

            {/* Current Card */}
            <Box width={{ base: '100%', md: '40%' }} zIndex={3} mx="auto">
              <TestimonialCard
                testimonial={TESTIMONIALS[currentIndex]}
                isActive={true}
              />
            </Box>

            {/* Next Card (Preview) */}
            <Box
              position="absolute"
              right={{ base: '10%', md: '30%' }}
              width={{ base: '60%', md: '30%' }}
              zIndex={1}
              transform="translateX(50%)"
              opacity={{ base: 0, md: 1 }}
              display={{ base: 'none', md: 'block' }}
            >
              <TestimonialCard
                testimonial={TESTIMONIALS[nextIndex]}
                isActive={false}
              />
            </Box>
          </Flex>

          <IconButton
            aria-label="Próximo"
            onClick={nextTestimonial}
            position="absolute"
            right={{ base: 0, md: '5%' }}
            zIndex={5}
            borderRadius="full"
            size="lg"
            colorScheme="blue"
            variant="solid"
          >
            <FaChevronRight />
          </IconButton>
        </Flex>

        {/* Dots indicator */}
        <Flex justify="center" mt={6}>
          {TESTIMONIALS.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              mx={1}
              borderRadius="full"
              bg={currentIndex === index ? 'blue.500' : 'gray.300'}
              cursor="pointer"
              onClick={() => setCurrentIndex(index)}
              transition="all 0.2s"
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
};
