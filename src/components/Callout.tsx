import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

type CalloutType = 'default' | 'info' | 'warning' | 'tip' | 'error';

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
  title?: string;
}

const icons = {
  default: Info,
  info: Info,
  warning: AlertTriangle,
  tip: CheckCircle,
  error: AlertCircle,
};

const styles = {
  default: 'bg-muted/50 border-muted-foreground/30',
  info: 'bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300',
  warning: 'bg-amber-500/10 border-amber-500/50 text-amber-700 dark:text-amber-300',
  tip: 'bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-300',
  error: 'bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-300',
};

const titleStyles = {
  default: 'text-foreground',
  info: 'text-blue-700 dark:text-blue-300',
  warning: 'text-amber-700 dark:text-amber-300',
  tip: 'text-green-700 dark:text-green-300',
  error: 'text-red-700 dark:text-red-300',
};

export function Callout({ 
  type = 'default', 
  children, 
  title 
}: CalloutProps) {
  const Icon = icons[type];
  
  return (
    <div className={cn(
      'my-6 rounded-lg border-l-4 p-4',
      styles[type]
    )}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          {title && (
            <h3 className={cn("font-semibold mb-2", titleStyles[type])}>
              {title}
            </h3>
          )}
          <div className="callout-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Callout; 