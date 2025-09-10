import '@style/global.css';

import Layout from '@app/layout/layout';
import Footer from '@components/Footer';
import { darkThemeIcon, metadata as appMetadata } from '@data';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = appMetadata;

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <head>
        <link
          id='favicon'
          rel='icon'
          type='image/svg+xml'
          href={darkThemeIcon}
        />
      </head>
      <body
        className={`m-auto flex h-screen w-11/12 max-w-5xl flex-col items-center font-sans ${inter.className}`}
      >
        <Layout>{children}</Layout>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
