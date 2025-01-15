import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import { WorkspaceIdClient } from './tasks/client';

const WorkspaceIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return (
    <div>
      <WorkspaceIdClient />
    </div>
  );
};

export default WorkspaceIdPage;
