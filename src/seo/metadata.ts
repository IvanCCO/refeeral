import type { Metadata } from 'next';

const APP_NAME = 'Brio Educação | Indicação';
const APP_DESCRIPTION =
  'Indique amigos e ganhe recompensas exclusivas com nosso programa de indicações';
const BASE_URL = 'https://www.brioeducaindica.com.br/referral';

export const defaultMetadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  authors: [{ name: 'Brio Educação' }],
  generator: 'Next.js',
  keywords: ['referral', 'marketing', 'afiliados', 'recompensas', 'indicações'],
  creator: 'Brio Educação',
  publisher: 'Brio Educação',
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
