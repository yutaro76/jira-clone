'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();

  return (
    <main className='bg-neutral-100 min-h-screen'>
      <div className='mx-auto max-w-screen-2xl p-4'>
        <nav className='flex justify-between items-center'>
          <Image src='/logo.png' alt='logo' width={266} height={95} />
          <Button asChild variant='secondary'>
            {/* sign-inページではsign-inはメインの画面で行うため、右上のボタンはsign-upへの遷移ボタン */}
            <Link href={pathname === '/sign-in' ? '/sign-up' : '/sign-in'}>
              {pathname === '/sign-in' ? 'Sign Up' : 'Login'}
            </Link>
          </Button>
        </nav>
        <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
