import React from 'react';
let MotionDiv = (props) => <div {...props} />; // fallback if framer-motion not installed
try { const fm = await import('framer-motion'); MotionDiv = fm.motion.div; } catch {}

export default function PageTransition({ children }){
  return (
    <MotionDiv initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
      {children}
    </MotionDiv>
  );
}

