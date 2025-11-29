import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Info, XCircle, Terminal } from 'lucide-react';

type CalloutType = 'default' | 'info' | 'warning' | 'tip' | 'error';

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
  title?: string;
}

const config = {
  default: {
    icon: Terminal,
    className: 'border-border bg-muted/20 text-foreground',
    titleClass: 'text-foreground'
  },
  info: {
    icon: Info,
    className: 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400',
    titleClass: 'text-blue-700 dark:text-blue-300'
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400',
    titleClass: 'text-amber-700 dark:text-amber-300'
  },
  tip: {
    icon: CheckCircle2,
    className: 'border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400',
    titleClass: 'text-green-700 dark:text-green-300'
  },
  error: {
    icon: XCircle,
    className: 'border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400',
    titleClass: 'text-red-700 dark:text-red-300'
  },
};

export function Callout({ 
  type = 'default', 
  children, 
  title 
}: CalloutProps) {
  const { icon: Icon, className, titleClass } = config[type];
  
  return (
    <div className={cn(
      'my-6 rounded-md border p-4 font-mono text-sm shadow-sm relative overflow-hidden',
      className
    )}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
        <Icon className="w-16 h-16" />
      </div>

      <div className="flex items-start gap-3 relative z-10">
        <div className="mt-0.5 shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          {title && (
            <h3 className={cn("font-bold mb-1.5 uppercase tracking-wide text-xs", titleClass)}>
              {title}
            </h3>
          )}
          <div className="[&>p]:my-0 leading-relaxed opacity-90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Callout;