import NavigationHeader from '@/components/NavigationHeader';
import CodeContainer from './_components/CodeContainer';
import ProfileHeaderContainer from './_components/ProfileHeaderContainer';

const ProfilePage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#0a0a0f]">
        <NavigationHeader />
        <div className="mx-auto max-w-7xl px-4 py-12">
          <ProfileHeaderContainer />
          <CodeContainer />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
