import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { CheckCircle, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';

const OutputPanelHeader = () => {
  const { output, error } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const hasContent = error || output;

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="h-4 w-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-[#1e1e2e] px-2.5 py-1.5 text-xs text-gray-400 ring-1 ring-gray-800/50 transition-all hover:text-gray-300 hover:ring-gray-700/50"
          >
            {isCopied ? (
              <>
                <CheckCircle className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default OutputPanelHeader;
