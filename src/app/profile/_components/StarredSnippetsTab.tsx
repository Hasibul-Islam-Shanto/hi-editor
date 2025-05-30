import { Star } from 'lucide-react';
import React from 'react';
import SnippetCard from '@/app/snippets/_components/SnippetCard';
import { Snippet } from '@/types';

interface SnippetProps {
  starredSnippets: Snippet[];
}
const StarredSnippetsTab = ({ starredSnippets }: SnippetProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {starredSnippets?.map(snippet => (
          <SnippetCard key={snippet._id} snippet={snippet} />
        ))}

        {(!starredSnippets || starredSnippets.length === 0) && (
          <div className="col-span-full py-12 text-center">
            <Star className="mx-auto mb-4 h-12 w-12 text-gray-600" />
            <h3 className="mb-2 text-lg font-medium text-gray-400">
              No starred snippets yet
            </h3>
            <p className="text-gray-500">
              Start exploring and star the snippets you find useful!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default StarredSnippetsTab;
