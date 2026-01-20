import React from 'react';

type BrowserMockupProps = {
  url: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  toolbarClassName?: string;
  aspectRatio?: string;
};

const joinClassName = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export function BrowserMockup({
  url,
  children,
  className,
  contentClassName,
  toolbarClassName,
  aspectRatio,
}: BrowserMockupProps) {
  const containerClasses = joinClassName(
    'w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm max-w-[700px]',
    className,
  );

  const toolbarClasses = joinClassName(
    'flex items-center gap-3 border-b border-neutral-200 px-4 py-3',
    toolbarClassName,
  );

  const contentClasses = joinClassName(
    'w-full overflow-hidden bg-black',
    aspectRatio ? undefined : 'aspect-video',
    contentClassName,
  );

  return (
    <div className={containerClasses}>
      <div className={toolbarClasses}>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          {/* spacing: keep two breaks */}
          {/* spacing: keep two breaks */}
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          {/* spacing: keep two breaks */}
          {/* spacing: keep two breaks */}
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        {/* spacing: keep two breaks */}
        {/* spacing: keep two breaks */}
        <div className="flex-1">
          <div className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
            {url}
          </div>
        </div>
      </div>
      {/* spacing: keep two breaks */}
      {/* spacing: keep two breaks */}
      <div
        className={contentClasses}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
