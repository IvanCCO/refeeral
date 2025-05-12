'use client';

import { useState, useRef, useEffect, RefObject } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Stack,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

// Expanded testimonials data
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Layla',
    role: 'Mãe do Miguel (8º ano)',
    content:
      'A Brio tem importância fundamental para pais como eu. O Miguel criou autonomia e eu fico tranquila porque não preciso mais sair do trabalho para levá-lo a aulas presenciais. É uma ferramenta maravilhosa!',
  },
  {
    id: 2,
    name: 'Márcia',
    role: 'Tia de aluna do (6º ano)',
    content:
      'Em 4 semanas ela melhorou muito com o reforço da BRIO! Agora ela anda com as próprias pernas! Até o momento só tenho a agradecer, vocês não fazem ideia como estão me ajudando!',
  },
  {
    id: 3,
    name: 'Elizângela',
    role: 'Mãe da Eliza (5º ano)',
    content:
      'Um suporte completo e humanizado. A Brio despertou na Eliza o gosto pelos estudos com uma didática que valoriza também o emocional e o sentido dos estudos na vida.',
  },
];

// Custom hook for intersection observer
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
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      p={6}
      height="100%"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
      minW={{ base: '75vw', md: 'auto' }}
      mx={{ base: 2, md: 0 }}
      flex={{ base: '0 0 auto', md: '1 1 auto' }}
    >
      {/* Quote icon */}
      <Icon
        as={FaQuoteLeft}
        color="blue.100"
        boxSize={8}
        position="absolute"
        top={2}
        left={4}
        zIndex={0}
      />

      {/* Testimonial content */}
      <Text
        fontSize="md"
        color="gray.700"
        mb={4}
        fontStyle="italic"
        position="relative"
        zIndex={1}
        pt={6}
      >
        {testimonial.content}
      </Text>

      {/* Footer with name and role */}
      <Box mt="auto" textAlign="left">
        <Text fontWeight="bold" fontSize="md" display="block">
          {testimonial.name}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {testimonial.role}
        </Text>
      </Box>
    </Box>
  );
};

export const Testimonials = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Update scroll position when currentIndex changes
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;

    const scrollToIndex = () => {
      const cardWidth =
        carouselRef.current?.querySelector('div')?.offsetWidth || 0;
      const scrollPosition = currentIndex * (cardWidth + 16); // 16px is the gap

      carouselRef.current?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    };

    scrollToIndex();
  }, [currentIndex, isMobile]);

  // Update currentIndex when scrolling manually
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !isMobile) return;

    const handleScroll = () => {
      const cardWidth = carousel.querySelector('div')?.offsetWidth || 0;
      const totalWidth = cardWidth + 16; // 16px is the gap
      const scrollPosition = carousel.scrollLeft;

      const newIndex = Math.round(scrollPosition / totalWidth);
      if (
        newIndex !== currentIndex &&
        newIndex >= 0 &&
        newIndex < TESTIMONIALS.length
      ) {
        setCurrentIndex(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [currentIndex, isMobile]);

  return (
    <Box py={16}>
      <Container maxW="container.xl">
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
            O que os pais estão falando
          </Heading>
        </Stack>

        {/* Desktop view: Grid layout for testimonials */}
        {!isMobile && (
          <SimpleGrid columns={3} gap={8}>
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </SimpleGrid>
        )}

        {/* Mobile view: Horizontal scrolling carousel */}
        {isMobile && (
          <Box position="relative" mb={10} mt={4}>
            <Flex
              ref={carouselRef}
              overflowX="auto"
              gap={4}
              pb={10}
              scrollSnapType="x mandatory"
              scrollBehavior="smooth"
              css={{
                scrollbarWidth: 'none',
                '::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <Box
                  key={testimonial.id}
                  scrollSnapAlign="center"
                  height="auto"
                >
                  <TestimonialCard testimonial={testimonial} />
                </Box>
              ))}
            </Flex>

            {/* Dots indicator */}
            <Flex justify="center" mt={4}>
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
                />
              ))}
            </Flex>
          </Box>
        )}
      </Container>
    </Box>
  );
};
