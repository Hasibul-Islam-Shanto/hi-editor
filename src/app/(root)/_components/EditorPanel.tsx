'use client';
import React, { useEffect, useState } from 'react';
import { EditorPanelSkeleton } from './EditorPanelSkeleton';
import { useClerk } from '@clerk/nextjs';
import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { defineMonacoThemes } from '../_constant';
import { Editor } from '@monaco-editor/react';
import { LANGUAGE_CONFIG } from '../_constant';
import useMounted from '@/hooks/useMounted';
import EditorPanelHeader from './EditorPanelHeader';
import ShareSnippetDialog from './ShareSnippetDialog';

const EditorPanel = () => {
  const clerk = useClerk();
  const isMounted = useMounted();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      localStorage.setItem('editor-code', value);
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor && newCode) {
      editor.setValue(newCode);
    }
  }, [editor, language]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem('editor-font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, [setFontSize]);

  if (!isMounted) return null;

  return (
    <>
      <div className="relative col-span-2">
        <div className="relative rounded-xl border border-white/[0.05] bg-[#12121a]/90 p-6 backdrop-blur">
          <EditorPanelHeader setIsShareDialogOpen={setIsShareDialogOpen} />
          <div className="group relative overflow-hidden rounded-xl ring-1 ring-white/[0.05]">
            {clerk.loaded && (
              <Editor
                height="600px"
                language={LANGUAGE_CONFIG[language].monacoLanguage}
                onChange={handleEditorChange}
                theme={theme}
                beforeMount={defineMonacoThemes}
                onMount={editor => setEditor(editor)}
                options={{
                  minimap: { enabled: false },
                  fontSize,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16 },
                  renderWhitespace: 'selection',
                  fontFamily:
                    '"Fira Code", "Cascadia Code", Consolas, monospace',
                  fontLigatures: true,
                  cursorBlinking: 'smooth',
                  smoothScrolling: true,
                  contextmenu: true,
                  renderLineHighlight: 'all',
                  lineHeight: 1.6,
                  letterSpacing: 0.5,
                  roundedSelection: true,
                  scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                  },
                }}
              />
            )}

            {!clerk.loaded && <EditorPanelSkeleton />}
          </div>
        </div>
        {isShareDialogOpen && (
          <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
        )}
      </div>
    </>
  );
};

export default EditorPanel;
