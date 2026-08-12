import React from 'react';
import { useTransitionNavigate } from './TransitionProvider';

/**
 * TransitionLink – drop-in replacement for React Router <Link>
 * Triggers the GSAP curtain before navigating.
 *
 * Props:
 *   to        {string}  – destination path
 *   className {string}
 *   style     {object}
 *   children  {node}
 */
export default function TransitionLink({ to, className, style, children, onClick }) {
  const transitionTo = useTransitionNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    transitionTo(to);
  };

  return (
    <a
      href={to}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
