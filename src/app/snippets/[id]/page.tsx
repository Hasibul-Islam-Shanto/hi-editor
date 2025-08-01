'use client';

import { useParams } from 'next/navigation';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import SnippetLoadingSkeleton from './_components/SnippetLoadingSkeleton';
import { defineMonacoThemes, LANGUAGE_CONFIG } from '@/app/(root)/_constant';
import NavigationHeader from '@/components/NavigationHeader';
import { Clock, Code } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { User } from 'lucide-react';
import { Editor } from '@monaco-editor/react';
import CopyButton from './_components/CopyButton';
import Comments from './_components/Comments';

const SnippetPage = () => {
  const snippetId = useParams().id;

  const snippet = useQuery(api.snippets.getSnippetById, {
    snippetId: snippetId as Id<'snippets'>,
  });
  const comments = useQuery(api.snippets.getComments, {
    snippetId: snippetId as Id<'snippets'>,
  });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <main className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1200px]">
          {/* Header */}
          <div className="mb-6 rounded-2xl border border-[#ffffff0a] bg-[#121218] p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#ffffff08] p-2.5">
                  <Image
                    src={`/${snippet.language}.png`}
                    width={50}
                    height={50}
                    alt={`${snippet.language} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="mb-2 text-xl font-semibold text-white sm:text-2xl">
                    {snippet.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <User className="h-4 w-4" />
                      <span>{snippet.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(snippet._creationTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <MessageSquare className="h-4 w-4" />
                      <span>{comments?.length} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center rounded-lg bg-[#ffffff08] px-3 py-1.5 text-sm font-medium text-[#808086]">
                {snippet.language}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-[#ffffff0a] bg-[#121218]">
            <div className="flex items-center justify-between border-b border-[#ffffff0a] px-4 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-[#808086]">
                <Code className="h-4 w-4" />
                <span className="text-sm font-medium">Source Code</span>
              </div>
              <CopyButton code={snippet.code} />
            </div>
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
              value={snippet.code}
              theme="vs-dark"
              beforeMount={defineMonacoThemes}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                readOnly: true,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                renderWhitespace: 'selection',
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
              }}
            />
          </div>

          <Comments snippetId={snippet._id} />
        </div>
      </main>
    </div>
  );
};

export default SnippetPage;
