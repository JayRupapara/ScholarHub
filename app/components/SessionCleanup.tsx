'use client';

import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';

export function SessionCleanup() {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleBeforeUnload = async () => {
      await signOut();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [signOut]);

  return null;
} 