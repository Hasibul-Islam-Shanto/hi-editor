import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyButton from './CopyButton';
import Image from 'next/image';

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const trimmedCode = code
    .split('\n') // split into lines
    .map(line => line.trimEnd()) // remove trailing spaces from each line
    .join('\n'); // join back into a single string
  return (
    <>
      {' '}
      <div className="my-4 overflow-hidden rounded-lg border border-[#ffffff0a] bg-[#0a0a0f]">
        {/* header bar showing language and copy button */}
        <div className="flex items-center justify-between bg-[#ffffff08] px-4 py-2">
          {/* language indicator with icon */}
          <div className="flex items-center gap-2">
            <Image
              src={`/${language}.png`}
              alt={language}
              width={16}
              height={16}
              className="size-4 object-contain"
            />
            <span className="text-sm text-gray-400">
              {language || 'plaintext'}
            </span>
          </div>
          {/* button to copy code to clipboard */}
          <CopyButton code={trimmedCode} />
        </div>

        {/* code block with syntax highlighting */}
        <div className="relative">
          <SyntaxHighlighter
            language={language || 'plaintext'}
            style={atomOneDark} // dark theme for the code
            customStyle={{
              padding: '1rem',
              background: 'transparent',
              margin: 0,
            }}
            showLineNumbers={true}
            wrapLines={true} // wrap long lines
          >
            {trimmedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
};

export default CodeBlock;
