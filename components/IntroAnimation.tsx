import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  // Use a ref to ensure the callback is always current without re-triggering effect
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Lock body scroll to prevent "freeze"/lag caused by scrolling heavy background content
    // while the intro animation is playing.
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Animation Timing State
    let remainingTime = 3500; // Total duration in ms
    let lastTime = performance.now();
    let animationFrameId: number;
    let isCompleted = false;

    // The Game Loop
    const tick = () => {
      if (isCompleted) return;

      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      // Natural time progression
      remainingTime -= dt;

      if (remainingTime <= 0) {
        isCompleted = true;
        onCompleteRef.current();
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    // Interaction Handlers for "Speed Up"
    // Allows the user to accelerate the animation by scrolling, satisfying the 
    // "speed determined by scroll speed" requirement.
    const handleAccelerate = (amount: number) => {
      // Decrease remaining time based on interaction intensity
      // The higher the multiplier, the more sensitive the "skip"
      remainingTime -= amount * 5; 
    };

    const handleWheel = (e: WheelEvent) => {
      handleAccelerate(Math.abs(e.deltaY));
    };

    const handleTouchMove = () => {
       // For touch, each move event accelerates time by a fixed chunk (e.g., 50ms)
       // Since touchmove fires rapidly, this creates a smooth acceleration.
       handleAccelerate(10); 
    };

    // Add passive listeners for better performance
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      // Cleanup: Restore scroll and clean loops
      document.body.style.overflow = originalOverflow;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
      // Added pointer-events-auto to capture touches if needed, though window listener handles it.
      // Important: We keep the DOM structure simple to avoid overhead.
    >
      {/* 
        Background Layer:
        Handles the black background and all visual effects (beams, grid, flash).
        This layer has exit={{ opacity: 0 }} so it fades out slowly to reveal the app.
      */}
      <motion.div 
        className="absolute inset-0 bg-black overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 
          PHASE 1: THE COLLISION (Paradox)
          Two beams enter from corners. 
          Timeline: 0s -> 1.2s (Collision)
        */}
        
        {/* Top-Left Beam (Cyan) */}
        <motion.div
          initial={{ x: "-150%", y: "-150%", opacity: 0 }}
          animate={{ x: "0%", y: "0%", opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 1.2, 
            ease: [0.7, 0, 0.84, 0], // Custom bezier for high speed impact
            times: [0, 0.2, 0.95, 1] 
          }}
          className="absolute w-[150vmax] h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-white shadow-[0_0_20px_rgba(6,182,212,0.8)]"
          style={{ transform: "rotate(45deg)", transformOrigin: "bottom right", right: "50%", bottom: "50%" }}
        />
        
        {/* Bottom-Right Beam (White) */}
        <motion.div
          initial={{ x: "150%", y: "150%", opacity: 0 }}
          animate={{ x: "0%", y: "0%", opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 1.2, 
            ease: [0.7, 0, 0.84, 0], 
            times: [0, 0.2, 0.95, 1] 
          }}
          className="absolute w-[150vmax] h-[2px] bg-gradient-to-l from-transparent via-white to-cyan-200 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          style={{ transform: "rotate(45deg)", transformOrigin: "top left", left: "50%", top: "50%" }}
        />

        {/* 
          PHASE 2: THE SINGULARITY & EXPANSION (Matrix)
          Impact at 1.2s creates a flash and expands the grid.
        */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* Impact Flash */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 4, 0], opacity: [1, 1, 0] }}
            transition={{ delay: 1.15, duration: 0.6, ease: "easeOut" }}
            className="w-4 h-4 bg-white rounded-full blur-md shadow-[0_0_50px_rgba(255,255,255,1)] z-20"
          />

          {/* Shockwave Ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0, borderWidth: "50px" }}
            animate={{ scale: 20, opacity: [1, 0], borderWidth: "0px" }}
            transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
            className="rounded-full border-cyan-500/30 z-10 w-10 h-10"
          />

          {/* The Grid Explosion - "Magic Move" from singularity */}
          <motion.div
            initial={{ scale: 0.01, opacity: 0, rotate: 45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: "circOut" }}
            className="relative w-[80vw] h-[80vw] max-w-[800px] max-h-[800px]"
          >
            {/* Vertical Lines */}
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-[1px] bg-white/5"
                style={{ left: `${(i + 1) * 10}%` }}
                initial={{ height: "0%", top: "50%" }}
                animate={{ height: "100%", top: "0%" }}
                transition={{ delay: 1.2 + i * 0.05, duration: 0.8 }}
              />
            ))}
            {/* Horizontal Lines */}
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-[1px] bg-white/5"
                style={{ top: `${(i + 1) * 10}%` }}
                initial={{ width: "0%", left: "50%" }}
                animate={{ width: "100%", left: "0%" }}
                transition={{ delay: 1.2 + i * 0.05, duration: 0.8 }}
              />
            ))}

            {/* Floating Data Nodes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`node-${i}`}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.5], scale: 1 }}
                transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* 
        PHASE 3: TEXT MATERIALIZATION 
        Text forms out of the chaos of the grid.
      */}
      <motion.div 
        className="relative z-30 flex flex-col items-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0 }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
          className="font-black tracking-widest text-white whitespace-nowrap"
          style={{ fontSize: '4.5rem' }} 
        >
          悖论<span className="text-cyan-500">矩阵</span>
        </motion.h1>
      </motion.div>
      
    </motion.div>
  );
};

export default IntroAnimation;