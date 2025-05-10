import type { Metadata } from 'next';

const APP_NAME = 'Refeeral';
const APP_DESCRIPTION = 'O sistema de referral marketing inteligente para o seu negócio';
const BASE_URL = 'https://refeeral.com.br';

export const defaultMetadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  authors: [{ name: 'Refeeral Team' }],
  generator: 'Next.js',
  keywords: ['referral', 'marketing', 'afiliados', 'recompensas', 'indicações'],
  creator: 'Refeeral Team',
  publisher: 'Refeeral',
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: BASE_URL,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Refeeral - Sistema de referral marketing',
      },
    ],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    creator: '@refeeral',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const generatePageMetadata = (
  title: string,
  description?: string,
  imagePath?: string
): Metadata => {
  return {
    ...defaultMetadata,
    title,
    description: description || defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description: description || defaultMetadata.description?.toString(),
      images: imagePath
        ? [
            {
              url: imagePath,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description: description || defaultMetadata.description?.toString(),
      images: imagePath ? [imagePath] : defaultMetadata.twitter?.images,
    },
  };
}; 