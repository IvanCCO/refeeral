'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

interface FormData {
  referrerName: string;
  userName: string;
  interest: string;
  knowledge: string;
}

interface ReferralFormProps {
  referralCode: string | null;
}

export const ReferralForm = ({}: ReferralFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    referrerName: '',
    userName: '',
    interest: '',
    knowledge: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      // const response = await fetch('/api/submit-referral-form', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     referralCode,
      //   }),
      // });

      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={{ base: 12, md: 16 }} bg="white">
      <Container maxW="container.md">
        <Stack gap={8} align="center">
          <VStack gap={3} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              color="gray.800"
            >
              Preencha o form e ganhe R$50 de desconto
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
              Realize sua matrícula com a gente e aproveite um desconto especial
              de R$50 na primeira mensalidade.
            </Text>
          </VStack>

          <a
            href="https://wa.me/SEUNUMERODOWHATSAPP"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              width: '100%',
              maxWidth: '100%',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Button
              colorScheme="green"
              size="lg"
              w={{ base: 'full', md: 'auto' }}
              fontWeight="bold"
              py={6}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon as={FaWhatsapp} />
              ENTRE EM CONTATO PELO WHATSAPP
            </Button>
          </a>

          <Box w="full" pt={6}>
            <Text fontSize="lg" fontWeight="medium" mb={6} textAlign="center">
              Preencha o formulário abaixo para garantir o desconto:
            </Text>

            {isSubmitted ? (
              <VStack
                gap={6}
                p={8}
                bg="green.50"
                rounded="xl"
                borderWidth={1}
                borderColor="green.200"
              >
                <Heading size="md" color="green.700">
                  Obrigado por se cadastrar!
                </Heading>
                <Text textAlign="center">
                  Recebemos seus dados e entraremos em contato em breve para
                  confirmar seu desconto de R$50.
                </Text>
                <Button
                  colorScheme="green"
                  onClick={() =>
                    (window.location.href = 'https://wa.me/SEUNUMERODOWHATSAPP')
                  }
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Icon as={FaWhatsapp} />
                  Falar com um consultor
                </Button>
              </VStack>
            ) : (
              <form onSubmit={handleSubmit}>
                <VStack gap={5} align="stretch">
                  <Box>
                    <Text as="label" display="block" mb={2} fontWeight="medium">
                      Nome de quem indicou você
                    </Text>
                    <Input
                      name="referrerName"
                      value={formData.referrerName}
                      onChange={handleChange}
                      placeholder="Digite o nome completo"
                      size="lg"
                      bg="white"
                      borderColor="gray.300"
                      required
                    />
                  </Box>

                  <Box>
                    <Text as="label" display="block" mb={2} fontWeight="medium">
                      Seu nome
                    </Text>
                    <Input
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="Digite seu nome completo"
                      size="lg"
                      bg="white"
                      borderColor="gray.300"
                      required
                    />
                  </Box>

                  <Box>
                    <Text as="label" display="block" mb={2} fontWeight="medium">
                      Qual é o seu interesse na Brio?
                    </Text>
                    <Input
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      placeholder="Ex: Curso específico, área de estudo..."
                      size="lg"
                      bg="white"
                      borderColor="gray.300"
                      required
                    />
                  </Box>

                  <Box>
                    <Text as="label" display="block" mb={2} fontWeight="medium">
                      O que você sabe sobre a Brio?
                    </Text>
                    <Textarea
                      name="knowledge"
                      value={formData.knowledge}
                      onChange={handleChange}
                      placeholder="Conte-nos o que você já conhece sobre a Brio Educação"
                      size="lg"
                      bg="white"
                      borderColor="gray.300"
                      minH="120px"
                    />
                  </Box>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    loading={isSubmitting}
                    loadingText="Enviando..."
                    mt={4}
                    fontWeight="bold"
                  >
                    ENVIAR
                  </Button>
                </VStack>
              </form>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
