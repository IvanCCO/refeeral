'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from './button';
import { IoArrowBack } from 'react-icons/io5';
import { Box } from '@chakra-ui/react';

export interface BackButtonProps extends Omit<ButtonProps, 'onClick'> {
  fallbackPath?: string;
}

export const BackButton = ({
  fallbackPath = '/',
  children = 'Back',
  ...rest
}: BackButtonProps) => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if we can go back in history
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleClick = () => {
    if (canGoBack) {
      // If we have history, go back
      window.history.back();
    } else {
      // Otherwise, go to the fallback path (home by default)
      router.push(fallbackPath);
    }
  };

  return (
    <Button onClick={handleClick} {...rest}>
      <Box display="inline-flex" alignItems="center" gap={2}>
        <IoArrowBack />
        {children}
      </Box>
    </Button>
  );
};
