import type { Metadata, Viewport } from 'next';

import { Provider } from '@/components/ui/provider';
import { Layout } from '@/lib/layout';
import { Toaster } from '@/components/ui/toaster';

type RootLayoutProps = {
  children: React.ReactNode;
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <Layout>{children}</Layout>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
