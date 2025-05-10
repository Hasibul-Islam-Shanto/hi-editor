import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import ConvexClientProvider from '@/components/providers/convex-client-provider';
import Footer from '@/components/footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'H! Editor',
  description:
    'Hi Editor is a simple code editor that allows you to write code in your browser. It provides a simple and intuitive interface for writing code, and is designed to be easy to use. There are different languages to choose from, and you can share your code with others.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
