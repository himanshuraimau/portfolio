'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';
import CopyButton from './CopyButton';

// Import Prism CSS themes - you can choose different themes
import 'prismjs/themes/prism-tomorrow.css';

// Import additional languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';

interface PrismCodeProps {
  code: string;
  language: string;
  className?: string;
}

export default function PrismCode({ code, language, className = '' }: PrismCodeProps) {
  useEffect(() => {
    // Highlight all code blocks on component mount
    Prism.highlightAll();
  }, [code, language]);

  // Format the language display name
  const displayLanguage = language === 'tsx' || language === 'jsx' 
    ? language.toUpperCase() 
    : language.charAt(0).toUpperCase() + language.slice(1);

  return (
    <div className="prism-code-wrapper relative rounded-lg my-4 sm:my-6 overflow-hidden" data-language={displayLanguage}>
      <div className="absolute top-0 right-0 z-10 p-1 sm:p-2">
        <CopyButton code={code} />
      </div>
      <div className="text-xs sm:text-sm bg-gray-800 text-gray-400 px-3 py-1 border-b border-gray-700">
        {displayLanguage}
      </div>
      <div className="overflow-x-auto">
        <pre className={`language-${language} ${className} text-xs sm:text-sm p-3 sm:p-4 m-0`}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
