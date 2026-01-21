import React from 'react';

type MobileBrowserMockupProps = {
  url: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  toolbarClassName?: string;
  aspectRatio?: string;
};

const joinClassName = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export function MobileBrowserMockup({
  url,
  children,
  className,
  contentClassName,
  toolbarClassName,
  aspectRatio,
}: MobileBrowserMockupProps) {
  const containerClasses = joinClassName(
    'w-full max-w-[320px] overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm',
    className,
  );

  const toolbarClasses = joinClassName(
    'px-4 pb-4 pt-4 border-b border-neutral-200',
    toolbarClassName,
  );

  const contentClasses = joinClassName(
    'w-full overflow-hidden bg-black',
    aspectRatio ? undefined : 'aspect-[9/16]',
    contentClassName,
  );

  return (
    <div className={containerClasses}>
      <div className={toolbarClasses}>
        <div className="mb-3 flex justify-center">
          <div className="h-1.5 w-16 rounded-full bg-neutral-200" />
        </div>
        {/* spacing: keep two breaks */}
        {/* spacing: keep two breaks */}
        <div className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] text-neutral-500">
          {url}
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
