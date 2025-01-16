import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

// ロゴを使うためのコンポーネント。下記のinterを使うために必要。shadcnのcn。
import { cn } from '@/lib/utils';
import { QueryProvider } from '@/components/query-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'TaskFlow is a task management app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* antialiasedはフォントを滑らかにするためのクラス。 */}
      <body className={cn(inter.className, 'antialiased min-h-screen')}>
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
