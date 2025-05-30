import { Copy } from 'lucide-react';
import { Check } from 'lucide-react';
import React, { useState } from 'react';

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copyToClipboard}
      type="button"
      className="group relative rounded-lg p-2 transition-all duration-200 hover:bg-white/10"
    >
      {copied ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className="size-4 text-gray-400 group-hover:text-gray-300" />
      )}
    </button>
  );
};

export default CopyButton;
