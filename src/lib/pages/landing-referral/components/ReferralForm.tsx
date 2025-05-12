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
  Badge,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa';
import { referralFormSchema, ReferralFormInput } from '@/utils/validations';
import { Affiliate } from './ReferralTracking';
import { z } from 'zod';
import { generateWhatsAppLink } from '@/utils/commons';

type FormErrors = {
  [K in keyof ReferralFormInput]?: string;
};

interface ReferralFormProps {
  referralCode: string | null;
  affiliate: Affiliate | null;
}

export const ReferralForm = ({
  referralCode,
  affiliate,
}: ReferralFormProps) => {
  const [formData, setFormData] = useState<ReferralFormInput>({
    referrerName: '',
    userName: '',
    phone: '',
    knowledge: '',
    referralCode: referralCode || affiliate?.linkId || undefined,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update referralCode and referrerName when props change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      referralCode: referralCode || affiliate?.linkId || undefined,
    }));
  }, [referralCode, affiliate?.linkId]);

  // Set referrer name from affiliate data when it becomes available
  useEffect(() => {
    if (affiliate?.name) {
      setFormData((prev) => ({
        ...prev,
        referrerName: affiliate.name,
      }));
    }
  }, [affiliate]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})?/, '($1) $2-$3');
      setFormData((prev) => ({ ...prev, phone: value }));
    }
  };

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

    // Ensure the referralCode is explicitly set before submission
    const submitData = {
      ...formData,
      referralCode:
        formData.referralCode || referralCode || affiliate?.linkId || '',
    };

    console.log('Submitting form data:', submitData);

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          toaster.error({
            title: 'Erro de Validação',
            description:
              data.message || 'Por favor, verifique os campos do formulário.',
            duration: 5000,
            meta: { closable: true },
          });
          return;
        }

        throw new Error(data.message || 'Erro ao enviar formulário');
      }

      setIsSubmitted(true);
      toaster.success({
        title: 'Sucesso!',
        description:
          'Formulário enviado com sucesso! Entraremos em contato em breve.',
        duration: 5000,
        meta: { closable: true },
      });
    } catch (error) {
      toaster.error({
        title: 'Erro',
        description:
          error instanceof Error
            ? error.message
            : 'Erro ao enviar formulário. Tente novamente.',
        duration: 5000,
        meta: { closable: true },
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultMessage =
    'Olá, vim pelo site e gostaria de tirar algumas dúvidas sobre o Reforço On-line da Brio!';
  const whatsappUrl = generateWhatsAppLink(defaultMessage);

  return (
    <Box
      id="referral-form"
      py={{ base: 12, md: 16 }}
      bg="white"
      display="flex"
      justifyContent="center"
      width="100%"
    >
      <Container
        maxW={{ base: '100%', sm: '85%', md: 'container.md' }}
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
              Preencha o formulário e ganhe R$50 de desconto
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
              Realize sua matrícula com a gente e aproveite um desconto especial
              de R$50 na primeira mensalidade.
            </Text>
          </VStack>

          <Box w="full" pt={6}>
            {isSubmitted ? (
              <VStack
                gap={6}
                p={8}
                bg="green.50"
                rounded="xl"
                borderWidth={1}
                borderColor="green.200"
              >
                <Heading size="xl" color="green.700">
                  Obrigado por se cadastrar!
                </Heading>

                <Box
                  py={4}
                  px={6}
                  bg="white"
                  borderWidth={2}
                  borderStyle="dashed"
                  borderColor="blue.500"
                  rounded="lg"
                  textAlign="center"
                  boxShadow="md"
                  width="100%"
                >
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.600"
                    mb={1}
                  >
                    SEU CUPOM DE DESCONTO
                  </Text>
                  <Heading
                    fontSize="4xl"
                    letterSpacing="wider"
                    color="blue.600"
                  >
                    INDICA50
                  </Heading>
                  <Text fontSize="sm" mt={2} color="gray.600">
                    Use este código ao finalizar sua matrícula
                  </Text>
                </Box>

                <Link
                  href="https://www.brioeduca.com/anosletivosplanodiamante"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                  w="full"
                >
                  <Button
                    colorPalette="yellow"
                    size="lg"
                    w="full"
                    fontWeight="bold"
                    py={6}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={FaShoppingCart} />
                    Matricule-se agora
                  </Button>
                </Link>

                <Text textAlign="center" fontSize="md">
                  Ainda está com dúvidas?
                </Text>

                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    colorPalette="green"
                    size="lg"
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
                    <Fieldset.Legend fontSize={{ base: 'md', md: 'xl' }}>
                      Formulário de Indicação
                    </Fieldset.Legend>
                    <Fieldset.HelperText fontSize={{ base: 'sm', md: 'lg' }}>
                      Preencha seus dados para garantir seu desconto de R$50.
                    </Fieldset.HelperText>
                  </Stack>

                  <Fieldset.Content>
                    <Stack gap={6}>
                      <Field.Root invalid={!!errors.referrerName}>
                        <Field.Label fontSize={{ base: 'sm', md: 'lg' }}>
                          Nome de quem indicou você
                        </Field.Label>
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
                          bg={affiliate?.name ? 'gray.100' : 'white'}
                        />
                        {errors.referrerName && (
                          <Field.ErrorText fontSize={{ base: 'sm', md: 'lg' }}>
                            {errors.referrerName}
                          </Field.ErrorText>
                        )}
                        {affiliate?.name && (
                          <Field.HelperText fontSize={{ base: 'sm', md: 'lg' }}>
                            Você foi indicado por este parceiro
                          </Field.HelperText>
                        )}
                      </Field.Root>

                      <Field.Root invalid={!!errors.userName}>
                        <Field.Label fontSize={{ base: 'sm', md: 'lg' }}>
                          Seu nome
                        </Field.Label>
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
                          <Field.ErrorText fontSize={{ base: 'sm', md: 'lg' }}>
                            {errors.userName}
                          </Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root invalid={!!errors.phone}>
                        <Field.Label fontSize={{ base: 'sm', md: 'lg' }}>
                          Telefone
                        </Field.Label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="(99) 99999-9999"
                        />
                        {errors.phone && (
                          <Field.ErrorText fontSize={{ base: 'sm', md: 'lg' }}>
                            {errors.phone}
                          </Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root invalid={!!errors.knowledge}>
                        <Field.Label fontSize={{ base: 'sm', md: 'lg' }}>
                          O que você sabe sobre a Brio?
                          <Badge
                            ml={2}
                            colorScheme="gray"
                            fontSize="xs"
                            variant="subtle"
                          >
                            Opcional
                          </Badge>
                        </Field.Label>
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
                          <Field.ErrorText fontSize={{ base: 'sm', md: 'lg' }}>
                            {errors.knowledge}
                          </Field.ErrorText>
                        )}
                      </Field.Root>

                      <Button
                        type="submit"
                        colorPalette="blue"
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
