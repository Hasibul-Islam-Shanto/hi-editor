import { IExecution } from '@/types';
import Image from 'next/image';
import CodeBlock from './CodeBlock';

const CodeExecutionCard = ({ execution }: { execution: IExecution }) => {
  return (
    <div className="group overflow-hidden rounded-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/50">
      <div className="flex items-center justify-between rounded-t-xl border border-gray-800/50 bg-black/30 p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition-opacity group-hover:opacity-30" />
            <Image
              src={'/' + execution.language + '.png'}
              alt=""
              className="relative z-10 rounded-lg object-cover"
              width={40}
              height={40}
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">
                {execution.language.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-400">
                {new Date(execution._creationTime).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  execution.error
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-green-500/10 text-green-400'
                }`}
              >
                {execution.error ? 'Error' : 'Success'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-b-xl border border-t-0 border-gray-800/50 bg-black/20 p-4">
        <CodeBlock code={execution.code} language={execution.language} />

        {(execution.output || execution.error) && (
          <div className="mt-4 rounded-lg bg-black/40 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Output</h4>
            <pre
              className={`text-sm ${
                execution.error ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {execution.error || execution.output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeExecutionCard;
