import type { ComponentProps } from 'react'
import { Heading, Text, Link, Box, Code } from '@chakra-ui/react'

type MDXComponents = Record<string, React.ComponentType<any>>

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentProps<'h1'>) => <Heading as="h1" size="2xl" my={8} {...props} />,
    h2: (props: ComponentProps<'h2'>) => <Heading as="h2" size="xl" my={6} {...props} />,
    h3: (props: ComponentProps<'h3'>) => <Heading as="h3" size="lg" my={4} {...props} />,
    h4: (props: ComponentProps<'h4'>) => <Heading as="h4" size="md" my={3} {...props} />,
    p: (props: ComponentProps<'p'>) => <Text my={4} fontSize="md" {...props} />,
    a: (props: ComponentProps<'a'>) => (
      <Link color="blue.500" textDecoration="underline" {...props} />
    ),
    code: (props: ComponentProps<'code'>) => (
      <Code variant="subtle" colorPalette="blue" {...props} />
    ),
    pre: (props: any) => (
      <Box
        as="pre"
        p={4}
        borderRadius="md"
        bg="gray.50"
        _dark={{ bg: "gray.800" }}
        overflowX="auto"
        fontSize="sm"
        my={4}
        {...props}
      />
    ),
    ul: (props: any) => (
      <Box
        as="ul"
        pl={6}
        ml={2}
        my={4}
        listStyleType="disc"
        listStylePosition="outside"
        {...props}
      />
    ),
    ol: (props: any) => (
      <Box
        as="ol"
        pl={6}
        ml={2}
        my={4}
        listStyleType="decimal"
        listStylePosition="outside"
        {...props}
      />
    ),
    li: (props: any) => (
      <Box
        as="li"
        pb={1}
        _marker={{ color: "gray.500" }}
        {...props}
      />
    ),
    wrapper: (props: ComponentProps<'div'>) => (
      <Box maxW="4xl" mx="auto" px={4} py={8} {...props} />
    ),
    ...components,
  }
} 