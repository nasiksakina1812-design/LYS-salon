import React, { useEffect } from 'react';

/**
 * ScissorCursor disabled in favor of standard system cursor.
 * Ensures any lingering body classes are cleared so the default cursor is always active.
 */
export const ScissorCursor: React.FC = () => {
  useEffect(() => {
    document.body.classList.remove('custom-scissor-cursor');
    document.documentElement.classList.remove('has-custom-cursor');
  }, []);

  return null;
};
