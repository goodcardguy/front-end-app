'use client';

import { QuickstartProvider } from '@/plaid/Context';
import PlaidHome from '@/components/plaid/PlaidHome';
import Script from 'next/script';

export default function PlaidWrapper({ user_id }: { user_id: string }) {
  return (
    <>
      <Script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js" />
      <PlaidHome user_id={user_id} />
    </>
  );
}
