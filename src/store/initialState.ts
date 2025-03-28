export const getThemeLanguageAndFontInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 14,
      theme: "vs-dark",
    };
  }
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedFontSize =
    parseInt(localStorage.getItem("editor-font-size")!) || 16;
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";

  return {
    language: savedLanguage,
    fontSize: savedFontSize,
    theme: savedTheme,
  };
};
