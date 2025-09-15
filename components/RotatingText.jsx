'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './RotatingText.css';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts = [],
    mainClassName = '',
    elementLevelClassName = '',
    rotationInterval = 3000,
    splitBy = 'words',
    transition = {
      type: 'spring',
      damping: 20,
      stiffness: 300
    },
    ...rest
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <div ref={ref} className={cn('text-rotate', mainClassName)} {...rest}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={transition}
          className={cn('text-rotate-element', elementLevelClassName)}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
