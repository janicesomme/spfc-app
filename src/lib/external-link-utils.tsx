import React from 'react';

/**
 * Checks if a URL is external (different domain from current origin)
 */
export const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false; // Invalid URL, treat as internal
  }
};

/**
 * Opens a URL with appropriate behavior for external vs internal links
 */
export const openUrl = (url: string) => {
  if (isExternalUrl(url)) {
    window.open(url, '_blank', 'noopener');
  } else {
    window.location.href = url;
  }
};

/**
 * Props for ExternalLinkButton component
 */
interface ExternalLinkButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Button component that handles external links with proper accessibility
 */
export const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  url,
  children,
  className = '',
  onClick
}) => {
  const isExternal = isExternalUrl(url);

  const handleClick = () => {
    openUrl(url);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      {...(isExternal && {
        'aria-label': `${typeof children === 'string' ? children : 'Link'} (opens in new tab)`
      })}
    >
      {children}
      {isExternal && (
        <span className="ml-1 text-xs" aria-hidden="true">
          ↗
        </span>
      )}
      {isExternal && (
        <span className="sr-only">(opens in new tab)</span>
      )}
    </button>
  );
};

/**
 * Wrapper for div elements that act as clickable external links
 */
interface ExternalLinkDivProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ExternalLinkDiv: React.FC<ExternalLinkDivProps> = ({
  url,
  children,
  className = '',
  onClick
}) => {
  const isExternal = isExternalUrl(url);

  const handleClick = () => {
    openUrl(url);
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`${className} cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      {...(isExternal && {
        'aria-label': `Open link (opens in new tab)`
      })}
    >
      {children}
      {isExternal && (
        <span className="sr-only">(opens in new tab)</span>
      )}
    </div>
  );
};