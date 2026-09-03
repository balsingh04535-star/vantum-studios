import React from 'react';
import { useTransitionNavigate } from './TransitionProvider';

/**
 * TransitionLink – internal link routed through the shared navigation entry
 * point, ready for the next page-transition treatment.
 *
 * Props:
 *   to        {string}  – destination path
 *   className {string}
 *   style     {object}
 *   children  {node}
 */
export default function TransitionLink({
  to,
  className,
  style,
  children,
  onClick,
  transitionType = 'fade',
  ...anchorProps
}) {
  const transitionTo = useTransitionNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      anchorProps.target === '_blank'
    ) {
      return;
    }

    e.preventDefault();
    const source = transitionType === 'case-study'
      ? e.currentTarget.querySelector('[data-transition-source]')
      : null;

    transitionTo(to, { type: transitionType, source });
  };

  return (
    <a
      {...anchorProps}
      href={to}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
