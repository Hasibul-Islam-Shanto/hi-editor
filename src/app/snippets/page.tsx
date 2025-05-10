import NavigationHeader from '@/components/NavigationHeader';
import { BookOpen } from 'lucide-react';
import SnippetsContainer from './_components/SnippetsContainer';

const SnippetsPage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#0a0a0f]">
        <NavigationHeader />

        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-1.5 text-sm text-gray-400">
              <BookOpen className="h-4 w-4" />
              Community Code Library
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Discover & Share Code Snippets
            </h1>
            <p className="mb-8 text-lg text-gray-400">
              Explore a curated collection of code snippets from the community
            </p>
          </div>
          <SnippetsContainer />
        </div>
      </div>
    </>
  );
};

export default SnippetsPage;
