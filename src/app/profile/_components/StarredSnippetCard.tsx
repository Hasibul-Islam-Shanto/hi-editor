import StarButton from '@/components/StarButton';
import { Snippet } from '@/types';
import { ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const StarredSnippetCard = ({ snippet }: { snippet: Snippet }) => {
  return (
    <div key={snippet._id} className="group relative">
      <Link href={`/snippets/${snippet._id}`}>
        <div className="h-full overflow-hidden rounded-xl border border-gray-800/50 bg-black/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:transform hover:border-gray-700/50">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition-opacity group-hover:opacity-30" />
                  <Image
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                    className="relative z-10"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  {snippet.language}
                </span>
              </div>
              <div
                className="absolute top-6 right-6 z-10"
                onClick={e => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />
              </div>
            </div>
            <h2 className="mb-3 line-clamp-1 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
              {snippet.title}
            </h2>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {new Date(snippet._creationTime).toLocaleDateString()}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="overflow-hidden rounded-lg bg-black/30 p-4">
              <pre className="line-clamp-3 font-mono text-sm text-gray-300">
                {snippet.code}
              </pre>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StarredSnippetCard;
