import { Flex, HStack, Link, Image } from '@chakra-ui/react';
import { scrollToSmoothly } from '../../../utils/commons';

export const Header = () => {
  const navItems = [
    { name: 'Como funciona', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Prêmios', href: '#prizes-section', id: 'prizes-section' },
    { name: 'Indique', href: '#affiliate-form', id: 'affiliate-form' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        scrollToSmoothly(id, 300);
      } else {
        // If the element doesn't exist on the current page, go to home page
        window.location.href = '/';
      }
    }
  };

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      px={{ base: 4, md: 6 }}
      bg="white"
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Flex
        width={{ base: '100%', md: 'auto' }}
        justify={{ base: 'center', md: 'flex-start' }}
      >
        <Image
          src="/logo.png"
          alt="Company Logo"
          height={{ base: '40px', md: '80px' }}
        />
      </Flex>

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
            _focus={{
              outline: 'none',
              boxShadow: 'none',
              textDecoration: 'none',
            }}
            onClick={(e) => handleNavClick(e, item.href, item.id)}
          >
            {item.name}
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};
