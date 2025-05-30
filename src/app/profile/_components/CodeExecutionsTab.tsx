import { ChevronRight, Code, Loader2 } from 'lucide-react';
import { IExecution } from '@/types';
import CodeExecutionCard from './CodeExecutionCard';

interface CodeExecutionProps {
  executions: IExecution[];
  isLoadingExecutions: boolean;
  executionStatus:
    | 'LoadingFirstPage'
    | 'CanLoadMore'
    | 'LoadingMore'
    | 'Exhausted';
  handleLoadMore: () => void;
}
const CodeExecutionsTab = ({
  executions,
  isLoadingExecutions,
  executionStatus,
  handleLoadMore,
}: CodeExecutionProps) => {
  return (
    <div className="space-y-6">
      {executions?.map(execution => (
        <CodeExecutionCard key={execution._id} execution={execution} />
      ))}

      {isLoadingExecutions ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-gray-600" />
          <h3 className="mb-2 text-lg font-medium text-gray-400">
            Loading code executions...
          </h3>
        </div>
      ) : (
        executions.length === 0 && (
          <div className="py-12 text-center">
            <Code className="mx-auto mb-4 h-12 w-12 text-gray-600" />
            <h3 className="mb-2 text-lg font-medium text-gray-400">
              No code executions yet
            </h3>
            <p className="text-gray-500">
              Start coding to see your execution history!
            </p>
          </div>
        )
      )}

      {executionStatus === 'CanLoadMore' && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-6 py-3 text-blue-400 transition-colors hover:bg-blue-500/20"
          >
            Load More
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeExecutionsTab;
