'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Field,
  Fieldset,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Icon,
  Textarea,
  Link,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { FaWhatsapp } from 'react-icons/fa';
import { z } from 'zod';
import { Affiliate } from './ReferralTracking';

const referralFormSchema = z.object({
  referrerName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  userName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  interest: z.string().min(2, 'Informe seu interesse'),
  knowledge: z.string().optional(),
});

type ReferralFormInput = z.infer<typeof referralFormSchema>;

type FormErrors = {
  [K in keyof ReferralFormInput]?: string;
};

interface ReferralFormProps {
  referralCode: string | null;
  affiliate: Affiliate | null;
}

export const ReferralForm = ({ referralCode, affiliate }: ReferralFormProps) => {
  const [formData, setFormData] = useState<ReferralFormInput>({
    referrerName: '',
    userName: '',
    interest: '',
    knowledge: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set referrer name from affiliate data when it becomes available
  useEffect(() => {
    if (affiliate?.name) {
      setFormData(prev => ({
        ...prev,
        referrerName: affiliate.name
      }));
    }
  }, [affiliate]);

  const validateForm = (): boolean => {
    try {
      referralFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof ReferralFormInput;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({});

    if (!validateForm()) {
      toaster.error({
        title: 'Erro de Validação',
        description: 'Por favor, preencha todos os campos corretamente.',
        duration: 5000,
        meta: { closable: true },
      });
      return;
    }

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
      toaster.success({
        title: 'Sucesso!',
        description: 'Formulário enviado com sucesso! Entraremos em contato em breve.',
        duration: 5000,
        meta: { closable: true },
      });
    } catch (error) {
      toaster.error({
        title: 'Erro',
        description: 'Erro ao enviar formulário. Tente novamente.',
        duration: 5000,
        meta: { closable: true },
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const WHATSAPP_NUMBER = 'SEUNUMERODOWHATSAPP';
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <Box 
      py={{ base: 12, md: 16 }} 
      bg="white"
      display="flex"
      justifyContent="center"
      width="100%"
    >
      <Container
        maxW={{ base: '95%', sm: '85%', md: 'container.md' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Stack gap={8} width="100%" maxW="600px">
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

          <Link 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: 'none' }}
            w="full"
          >
            <Button
              colorScheme="green"
              size="lg"
              w="full"
              fontWeight="bold"
              py={6}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon as={FaWhatsapp} />
              ENTRE EM CONTATO PELO WHATSAPP
            </Button>
          </Link>

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
                <Link 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    colorScheme="green"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={FaWhatsapp} />
                    Falar com um consultor
                  </Button>
                </Link>
              </VStack>
            ) : (
              <form onSubmit={handleSubmit}>
                <Fieldset.Root
                  bg="white"
                  p={{ base: 4, sm: 6, md: 8 }}
                  rounded="xl"
                  boxShadow="lg"
                  width="100%"
                >
                  <Stack>
                    <Fieldset.Legend>Formulário de Indicação</Fieldset.Legend>
                    <Fieldset.HelperText>
                      Preencha seus dados para garantir seu desconto de R$50.
                    </Fieldset.HelperText>
                  </Stack>

                  <Fieldset.Content>
                    <Stack gap={6}>
                      <Field.Root invalid={!!errors.referrerName}>
                        <Field.Label>Nome de quem indicou você</Field.Label>
                        <Input
                          name="referrerName"
                          value={formData.referrerName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              referrerName: e.target.value,
                            }))
                          }
                          placeholder="Digite o nome completo"
                          disabled={!!affiliate?.name}
                          bg={affiliate?.name ? "gray.100" : "white"}
                        />
                        {errors.referrerName && (
                          <Field.ErrorText>{errors.referrerName}</Field.ErrorText>
                        )}
                        {affiliate?.name && (
                          <Field.HelperText>Você foi indicado por este afiliado</Field.HelperText>
                        )}
                      </Field.Root>

                      <Field.Root invalid={!!errors.userName}>
                        <Field.Label>Seu nome</Field.Label>
                        <Input
                          name="userName"
                          value={formData.userName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              userName: e.target.value,
                            }))
                          }
                          placeholder="Digite seu nome completo"
                        />
                        {errors.userName && (
                          <Field.ErrorText>{errors.userName}</Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root invalid={!!errors.interest}>
                        <Field.Label>Qual é o seu interesse na Brio?</Field.Label>
                        <Input
                          name="interest"
                          value={formData.interest}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              interest: e.target.value,
                            }))
                          }
                          placeholder="Ex: Curso específico, área de estudo..."
                        />
                        {errors.interest && (
                          <Field.ErrorText>{errors.interest}</Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root invalid={!!errors.knowledge}>
                        <Field.Label>O que você sabe sobre a Brio?</Field.Label>
                        <Textarea
                          name="knowledge"
                          value={formData.knowledge}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              knowledge: e.target.value,
                            }))
                          }
                          placeholder="Conte-nos o que você já conhece sobre a Brio Educação"
                          minH="120px"
                        />
                        {errors.knowledge && (
                          <Field.ErrorText>{errors.knowledge}</Field.ErrorText>
                        )}
                      </Field.Root>

                      <Button
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                        width="full"
                        loading={isSubmitting}
                        loadingText="Enviando..."
                      >
                        ENVIAR
                      </Button>
                    </Stack>
                  </Fieldset.Content>
                </Fieldset.Root>
              </form>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
