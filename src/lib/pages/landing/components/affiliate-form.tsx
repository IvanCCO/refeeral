'use client';

import { useState } from 'react';
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
  Clipboard,
  HStack,
  Icon,
  Link,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { affiliateSchema, type AffiliateInput } from '@/utils/validations';
import { ZodError } from 'zod';
import { FaWhatsapp } from 'react-icons/fa';
import { scrollToSmoothly } from '@/utils/commons';

const WHATSAPP_SHARE_MESSAGE = 'Confira meu link de afiliado:';

type FormErrors = {
  [K in keyof AffiliateInput]?: string;
};

export const AffiliateForm = () => {
  const [formData, setFormData] = useState<AffiliateInput>({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState<string>('');

  const validateForm = (): boolean => {
    try {
      affiliateSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof AffiliateInput;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
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

    setIsLoading(true);

    try {
      const response = await fetch('/api/affiliates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific field errors from API
        if (data.field) {
          setErrors((prev) => ({
            ...prev,
            [data.field]: data.message,
          }));
          toaster.error({
            title: 'Erro de Validação',
            description: data.message,
            duration: 5000,
            meta: { closable: true },
          });
          return;
        }
        throw new Error(data.message || 'Erro ao gerar link de afiliado');
      }

      setAffiliateLink(data.affiliateLink);

      setTimeout(() => {
        const element = document.getElementById('affiliate-link');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      toaster.success({
        title: 'Sucesso!',
        description: 'Link de afiliado gerado com sucesso!',
        duration: 5000,
        meta: { closable: true },
      });
    } catch (error) {
      toaster.error({
        title: 'Erro',
        description:
          error instanceof Error
            ? error.message
            : 'Erro ao gerar link de afiliado',
        duration: 5000,
        meta: { closable: true },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})?/, '($1) $2-$3');
      setFormData((prev) => ({ ...prev, phone: value }));
    }
  };

  return (
    <Box
      id="affiliate-form"
      py={{ base: 12, md: 20 }}
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
          <Stack gap={4} align="center">
            <Heading
              as="h2"
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              textAlign="center"
              color="gray.800"
            >
              Torne-se um Afiliado
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: '2xl' }}
              textAlign="center"
              color="gray.600"
            >
              Preencha o formulário abaixo para receber seu link de afiliado
              exclusivo
            </Text>
          </Stack>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Fieldset.Root
              bg="white"
              p={{ base: 4, sm: 6, md: 8 }}
              rounded="xl"
              boxShadow="lg"
              width="100%"
            >
              <Stack pb={4}>
                <Fieldset.Legend fontSize={{ base: 'md', md: 'xl' }}>
                  Dados de Contato
                </Fieldset.Legend>
                <Fieldset.HelperText fontSize={{ base: 'sm', md: 'lg' }}>
                  Preencha seus dados para receber seu link de afiliado.
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Stack gap={8}>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label fontSize={{ base: 'sm', md: 'lg' }}>
                      Nome
                    </Field.Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Seu nome completo"
                    />
                    {errors.name && (
                      <Field.ErrorText fontSize={{ base: 'sm', md: 'lg' }}>
                        {errors.name}
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

                  <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    width="full"
                    loading={isLoading}
                    loadingText="Gerando link..."
                    fontSize={{ base: 'sm', md: 'lg' }}
                  >
                    Gerar Link de Afiliado
                  </Button>
                </Stack>
              </Fieldset.Content>
            </Fieldset.Root>
          </form>
          <Text
            mt={4}
            fontSize="sm"
            color="gray.500"
            textAlign="center"
          >
            Ao participar, você concorda com nossos <Link href="/docs/termos-condicoes" color="blue.500" textDecoration="underline">Termos e Condições</Link>
          </Text>

          {affiliateLink && (
            <Box
              p={6}
              bg="green.50"
              rounded="lg"
              borderWidth={1}
              borderColor="green.200"
              width="100%"
              id="affiliate-link"
            >
              <Stack gap={3}>
                <Text fontWeight="bold" color="green.700">
                  Seu link de afiliado está pronto!
                </Text>
                <Clipboard.Root value={affiliateLink}>
                  <HStack
                    p={3}
                    bg="white"
                    rounded="md"
                    justify="space-between"
                    align="center"
                    gap={2}
                    flexWrap="wrap"
                  >
                    <Text
                      fontSize={{ base: 'xs', sm: 'sm' }}
                      fontFamily="mono"
                      flex="1"
                      textWrap="wrap"
                      wordBreak="break-all"
                      overflowWrap="break-word"
                    >
                      {affiliateLink}
                    </Text>
                    <HStack gap={2}>
                      <Clipboard.Trigger asChild>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          px={6}
                          _hover={{ transform: 'scale(1.05)' }}
                          transition="all 0.2s"
                        >
                          <Clipboard.Indicator copied="Copiado!" />
                        </Button>
                      </Clipboard.Trigger>
                    </HStack>
                  </HStack>
                </Clipboard.Root>
                <Button
                  onClick={() =>
                    // TODO: add whatsapp share message
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        WHATSAPP_SHARE_MESSAGE + affiliateLink
                      )}`,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  colorPalette="green"
                  size="xl"
                  px={10}
                  _hover={{ transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                >
                  <Icon as={FaWhatsapp} boxSize={4} mr={2} />
                  Compartilhar
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
