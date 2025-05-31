import { Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const UpgradeButton = () => {
  const checkOutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;
  return (
    <>
      <Link
        href={checkOutUrl || '/'}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 text-white transition-all hover:from-blue-600 hover:to-blue-700"
      >
        <Zap className="h-5 w-5" />
        Upgrade to Pro
      </Link>
    </>
  );
};

export default UpgradeButton;
