'use client';

import { usePaginatedQuery, useQuery } from 'convex/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ListVideo, Star } from 'lucide-react';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CodeExecutionsTab from './CodeExecutionsTab';
import StarredSnippetsTab from './StarredSnippetsTab';

const TABS = [
  {
    id: 'executions',
    label: 'Code Executions',
    icon: ListVideo,
  },
  {
    id: 'starred',
    label: 'Starred Snippets',
    icon: Star,
  },
];

const CodeContainer = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'executions' | 'starred'>(
    'executions',
  );
  const { user, isLoaded } = useUser();

  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  const {
    results: executions,
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecutions,
    {
      userId: user?.id ?? '',
    },
    { initialNumItems: 5 },
  );

  const handleLoadMore = () => {
    if (executionStatus === 'CanLoadMore') loadMore(5);
  };

  if (!user && isLoaded) {
    router.push('/');
  }

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="border-b border-gray-800/50">
          <div className="flex space-x-1 p-4">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'executions' | 'starred')}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-blue-500/10"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <tab.icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10 text-sm font-medium">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {/* ACTIVE TAB IS EXECUTIONS: */}
            {activeTab === 'executions' && (
              <CodeExecutionsTab
                executions={executions}
                isLoadingExecutions={isLoadingExecutions}
                executionStatus={executionStatus}
                handleLoadMore={handleLoadMore}
              />
            )}

            {activeTab === 'starred' && (
              <StarredSnippetsTab starredSnippets={starredSnippets ?? []} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default CodeContainer;
