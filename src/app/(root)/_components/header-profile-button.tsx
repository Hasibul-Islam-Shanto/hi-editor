'use client';

import LoginButton from '@/components/login-button';
import { SignedOut, UserButton } from '@clerk/nextjs';
import { User } from 'lucide-react';

const HeaderProfileButton = () => {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
};

export default HeaderProfileButton;
