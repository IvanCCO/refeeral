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

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export const AffiliateForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
      isValid = false;
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido. Use o formato (99) 99999-9999';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
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

          <Fieldset.Root
            as="form"
            onSubmit={handleSubmit}
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