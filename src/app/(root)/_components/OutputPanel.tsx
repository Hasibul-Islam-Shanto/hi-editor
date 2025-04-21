'use client';
import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Clock } from 'lucide-react';
import RunningCodeSkeleton from './RunningCodeSkeleton';
import OutputPanelHeader from './OutputPanelHeader';
import useMounted from '@/hooks/useMounted';

const OutputPanel = () => {
  const { output, isRunning, error } = useCodeEditorStore();
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <>
      <div className="relative rounded-xl bg-[#181825] p-4 ring-1 ring-gray-800/50">
        <OutputPanelHeader />

        <div className="relative">
          <div className="relative h-[600px] overflow-auto rounded-xl border border-[#313244] bg-[#1e1e2e]/50 p-4 font-mono text-sm backdrop-blur-sm">
            {isRunning ? (
              <RunningCodeSkeleton />
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Error</div>
                  <pre className="whitespace-pre-wrap text-red-400/80">
                    {error}
                  </pre>
                </div>
              </div>
            ) : output ? (
              <div className="space-y-2">
                <div className="mb-3 flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Execution Successful</span>
                </div>
                <pre className="whitespace-pre-wrap text-gray-300">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-gray-500">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="text-center">
                  Run your code to see the output here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OutputPanel;
