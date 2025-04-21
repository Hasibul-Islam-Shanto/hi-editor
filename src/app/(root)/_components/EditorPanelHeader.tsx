import Image from 'next/image';
import { motion } from 'framer-motion';
import { RotateCcwIcon, ShareIcon, TypeIcon } from 'lucide-react';
import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { LANGUAGE_CONFIG } from '../_constant';

const EditorPanelHeader = () => {
  const { language, fontSize, editor, setFontSize } = useCodeEditorStore();

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor && defaultCode) {
      editor.setValue(defaultCode);
    }
    localStorage.setItem('editor-code', defaultCode);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    localStorage.setItem('editor-font-size', size.toString());
  };
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
            <Image
              src={'/' + language + '.png'}
              alt="Logo"
              width={24}
              height={24}
            />
          </div>
          <div>
            <h2 className="text-sm font-medium text-white">Code Editor</h2>
            <p className="text-xs text-gray-500">Write and execute your code</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Font Size Slider */}
          <div className="flex items-center gap-3 rounded-lg bg-[#1e1e2e] px-3 py-2 ring-1 ring-white/5">
            <TypeIcon className="size-4 text-gray-400" />
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={e => handleFontSizeChange(parseInt(e.target.value))}
                className="h-1 w-20 cursor-pointer rounded-lg bg-gray-600"
              />
              <span className="min-w-[2rem] text-center text-sm font-medium text-gray-400">
                {fontSize}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="rounded-lg bg-[#1e1e2e] p-2 ring-1 ring-white/5 transition-colors hover:bg-[#2a2a3a]"
            aria-label="Reset to default code"
          >
            <RotateCcwIcon className="size-4 text-gray-400" />
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // onClick={() => setIsShareDialogOpen(true)}
            className="inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 opacity-90 transition-opacity hover:opacity-100"
          >
            <ShareIcon className="size-4 text-white" />
            <span className="text-sm font-medium text-white">Share</span>
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default EditorPanelHeader;
