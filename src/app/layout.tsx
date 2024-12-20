import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google'
import ReactQueryProvider from '@/utils/providers/ReactQueryProvider'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Selvia",
  description: "Liberte-se da burocracia e foque no que realmente importa: a saúde dos seus pacientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={roboto.className}>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
