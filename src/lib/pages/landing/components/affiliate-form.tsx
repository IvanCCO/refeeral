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
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { affiliateSchema, type AffiliateInput } from '@/utils/validations';
import { ZodError } from 'zod';

type FormErrors = {
  [K in keyof AffiliateInput]?: string;
};

export const AffiliateForm = () => {
  const [formData, setFormData] = useState<AffiliateInput>({
    name: '',
    email: '',
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
          setErrors(prev => ({
            ...prev,
            [data.field]: data.message
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
      toaster.success({
        title: 'Sucesso!',
        description: 'Link de afiliado gerado com sucesso!',
        duration: 5000,
        meta: { closable: true },
      });
    } catch (error) {
      toaster.error({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao gerar link de afiliado',
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
      setFormData(prev => ({ ...prev, phone: value }));
    }
  };

  return (
    <Box py={{ base: 12, md: 20 }} bg="white">
      <Container maxW="container.md">
        <Stack gap={8}>
          <Stack gap={4} align="center">
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              textAlign="center"
              color="gray.800"
            >
              Torne-se um Afiliado
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              textAlign="center"
              color="gray.600"
            >
              Preencha o formulário abaixo para receber seu link de afiliado exclusivo
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Fieldset.Root
              bg="white"
              p={8}
              rounded="xl"
              boxShadow="lg"
            >
              <Stack>
                <Fieldset.Legend>Dados de Contato</Fieldset.Legend>
                <Fieldset.HelperText>
                  Preencha seus dados para receber seu link de afiliado.
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Stack gap={6}>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Nome</Field.Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Seu nome completo"
                    />
                    {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="seu@email.com"
                    />
                    {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root invalid={!!errors.phone}>
                    <Field.Label>Telefone</Field.Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="(99) 99999-9999"
                    />
                    {errors.phone && <Field.ErrorText>{errors.phone}</Field.ErrorText>}
                  </Field.Root>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    width="full"
                    loading={isLoading}
                    loadingText="Gerando link..."
                  >
                    Gerar Link de Afiliado
                  </Button>
                </Stack>
              </Fieldset.Content>
            </Fieldset.Root>
          </form>

          {affiliateLink && (
            <Box
              p={6}
              bg="green.50"
              rounded="lg"
              borderWidth={1}
              borderColor="green.200"
            >
              <Stack gap={3}>
                <Text fontWeight="bold" color="green.700">
                  Seu link de afiliado está pronto!
                </Text>
                <Text
                  p={3}
                  bg="white"
                  rounded="md"
                  fontSize="sm"
                  fontFamily="mono"
                >
                  {affiliateLink}
                </Text>
              </Stack>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}; 