import Image from 'next/image';
import Link from 'next/link';

import { Navigation } from './navigation';
import { DottedSeparator } from './dotted-separator';
import { WorkspaceSwitcher } from './workspace-siwtcher';
import Projects from './projects';

export const Sidebar = () => {
  return (
    <aside className='h-full bg-neutral-100 p-4 w-full'>
      <Link href='/'>
        <Image src='/logo.png' alt='logo' width={266} height={95} />
      </Link>
      <DottedSeparator className='my-4' />
      <WorkspaceSwitcher />
      <DottedSeparator className='my-4' />
      <Navigation />
      <DottedSeparator className='my-4' />
      <Projects />
    </aside>
  );
};
