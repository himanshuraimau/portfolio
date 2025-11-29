'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';
import CopyButton from './CopyButton';
// Themes
import 'prismjs/themes/prism-tomorrow.css';
// Languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';

interface PrismCodeProps {
  code: string;
  language: string;
  className?: string;
}

export default function PrismCode({ code, language, className = '' }: PrismCodeProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div className="group relative rounded-lg my-6 border border-border bg-[#1e1e1e] overflow-hidden shadow-2xl">
      
      {/* IDE Header / Window Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" /> {/* Close */}
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /> {/* Minimize */}
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" /> {/* Maximize */}
        </div>
        <div className="text-xs font-mono text-muted-foreground/60 select-none">
            script.{language}
        </div>
        <div className="flex items-center">
            {/* Placeholder for spacing to balance the header */}
             <div className="w-8" />
        </div>
      </div>

      {/* Code Area */}
      <div className="relative">
         {/* Copy Button (Floating) */}
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <CopyButton code={code} />
        </div>

        <div className="overflow-x-auto custom-scrollbar">
            <pre className={`language-${language} ${className} !bg-transparent !m-0 !p-4 text-sm font-mono leading-relaxed`}>
            <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
      </div>
    </div>
  );
}