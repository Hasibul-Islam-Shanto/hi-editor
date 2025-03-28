import { CodeEditorState } from "@/types";
import { create } from "zustand";
import { getThemeLanguageAndFontInitialState } from "./initialState";
import { editor } from "monaco-editor";

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getThemeLanguageAndFontInitialState();
  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editorInstance: editor.IStandaloneCodeEditor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) {
        editorInstance.setValue(savedCode);
      }
      set({ editor: editorInstance });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${language}`, currentCode);
      }
      localStorage.setItem("editor-language", language);
      set({
        language,
        output: "",
        error: null,
      });
    },
    runCode: async () => {
      // Todo for later.....
    },
  };
});
