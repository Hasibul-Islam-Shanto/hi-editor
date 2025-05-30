'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import ProfileHeader from './ProfileHeader';
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';

const ProfileHeaderContainer = () => {
  const { user, isLoaded } = useUser();
  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id ?? '',
  });

  const userData = useQuery(api.users.getUser, { userId: user?.id ?? '' });
  return (
    <>
      {userStats && userData && (
        <ProfileHeader userStats={userStats} userData={userData} user={user!} />
      )}

      {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}
    </>
  );
};

export default ProfileHeaderContainer;
