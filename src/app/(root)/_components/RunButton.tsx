'use client';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import {
  getExecutionResult,
  useCodeEditorStore,
} from '@/store/useCodeEditorStore';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';

const RunButton = () => {
  const { user } = useUser();
  const { isRunning, runCode, language } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();
    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };
  return (
    <>
      <motion.button
        onClick={handleRun}
        disabled={isRunning}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative inline-flex items-center gap-2.5 px-5 py-2.5 focus:outline-none disabled:cursor-not-allowed`}
      >
        {/* bg wit gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 opacity-100 transition-opacity group-hover:opacity-90" />

        <div className="relative flex items-center gap-2.5">
          {isRunning ? (
            <>
              <div className="relative">
                <Loader2 className="h-4 w-4 animate-spin text-white/70" />
                <div className="absolute inset-0 animate-pulse blur" />
              </div>
              <span className="text-sm font-medium text-white/90">
                Executing...
              </span>
            </>
          ) : (
            <>
              <div className="relative flex h-4 w-4 items-center justify-center">
                <Play className="h-4 w-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
              </div>
              <span className="text-sm font-medium text-white/90 group-hover:text-white">
                Run Code
              </span>
            </>
          )}
        </div>
      </motion.button>
    </>
  );
};

export default RunButton;
