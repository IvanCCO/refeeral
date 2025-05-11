import { Box, Flex, HStack, Link, Image } from '@chakra-ui/react';

export const Header = () => {
  const navItems = [
    { name: 'Como funciona', href: '#how-it-works' },
    { name: 'Prêmios', href: '#prizes-section' },
    { name: 'Indique', href: '#affiliate-form' },
  ];

  return (
    <Flex 
      as="header" 
      width="full" 
      align="center"
      px={{ base: 4, md: 6 }}
      bg="white"
    >
      <Box>
        <Image 
          src="/logo-placeholder.svg" 
          alt="Company Logo"
          height="40px"
        />
      </Box>

      <HStack 
        as="nav" 
        gap={{ base: 4, md: 6 }}
        display={{ base: 'none', md: 'flex' }}
        mx="auto"
        justify="center"
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            fontWeight="medium"
            color="gray.600"
            textTransform="capitalize"
            _hover={{
              textDecoration: 'none',
              color: 'blue.500',
            }}
          >
            {item.name}
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};
