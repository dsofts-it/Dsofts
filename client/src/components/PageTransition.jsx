import React, { useEffect, useState } from 'react';

// No top-level await. Dynamically load framer-motion in an effect.
export default function PageTransition({ children }) {
  const [MotionDiv, setMotionDiv] = useState(() => (props) => <div {...props} />);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const fm = await import('framer-motion');
        if (mounted && fm?.motion?.div) {
          setMotionDiv(() => fm.motion.div);
          setEnabled(true);
        }
      } catch {
        // framer-motion not installed; keep plain div
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const props = enabled
    ? { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.35 } }
    : {};

  return <MotionDiv {...props}>{children}</MotionDiv>;
}
