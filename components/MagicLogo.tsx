import React from 'react';
import { motion } from 'framer-motion';

// This component is currently superseded by the direct implementation in App.tsx
// to support complex scroll-linked animations, but kept for reference or reuse.

const MagicLogo: React.FC = () => {
  return (
    <motion.h1
      className="font-black tracking-widest text-white whitespace-nowrap"
      style={{ color: '#ffffff' }}
    >
      悖论<span className="text-cyan-500">矩阵</span>
    </motion.h1>
  );
};

export default MagicLogo;