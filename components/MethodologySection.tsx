
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, Activity, RefreshCw, GitMerge, Layers, Cpu } from 'lucide-react';

const MethodologyCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  index: number;
}> = ({ icon, title, subtitle, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="group relative flex-1 min-h-[400px] bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-zinc-800/60 transition-colors duration-500"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content Container */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all duration-300 group-hover:scale-110 origin-top-left">
            {icon}
          </div>
          <span className="text-4xl font-black text-white/5 font-mono select-none group-hover:text-white/10 transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Text */}
        <div className="mt-auto">
          <h4 className="text-cyan-500 text-xs font-bold tracking-widest uppercase mb-2">{subtitle}</h4>
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
          <div className="w-12 h-1 bg-white/10 mb-6 group-hover:w-full group-hover:bg-cyan-500/50 transition-all duration-700 ease-out" />
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
      
      {/* Decorative Border Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500 group-hover:w-full transition-all duration-700 ease-out delay-100" />
    </motion.div>
  );
};

const MethodologySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="methodology" className="relative py-32 bg-zinc-950 overflow-hidden" ref={containerRef}>
      
      {/* Background Abstract Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-cyan-500 text-sm font-bold tracking-[0.2em]">CORE PHILOSOPHY</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              对抗熵增的<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">系统法则</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-md text-gray-400 text-sm md:text-base border-l border-white/20 pl-6"
          >
            <p>
              传统的管理试图控制混乱，而我们利用混乱。
              通过三个核心法则，我们将企业的非结构化数据转化为结构化的决策动力。
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          <MethodologyCard 
            index={0}
            icon={<Activity className="w-8 h-8" />}
            subtitle="LAW I: ENTROPY REDUCTION"
            title="负熵重构"
            description="企业自然的趋势是无序（熵增）。我们强制引入AI作为高强度的'负熵流'，打破部门墙与数据孤岛，建立反直觉的有序结构。"
          />

          <MethodologyCard 
            index={1}
            icon={<Network className="w-8 h-8" />}
            subtitle="LAW II: EMERGENCE"
            title="群体涌现"
            description="单个Agent是工具，连接的Agent是智能。当业务流被拆解为数十个微小的自动化节点时，系统展现出超越设计者预期的群体智慧。"
          />

          <MethodologyCard 
            index={2}
            icon={<RefreshCw className="w-8 h-8" />}
            subtitle="LAW III: RECURSION"
            title="无限递归"
            description="没有完美的系统，只有进化的系统。我们的架构允许AI自我复盘、自我修正代码参数，每一次业务循环都在让系统变得更聪明。"
          />

        </div>

        {/* Bottom Visualization */}
        <div className="mt-24 pt-24 border-t border-white/5 relative">
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-gray-500 mb-2">ARCHITECTURAL VIEW</p>
            <h3 className="text-2xl font-bold">双模态引擎 (Dual-Mode Engine)</h3>
          </div>
          
          {/* Schematic Diagram using CSS/SVG */}
          <div className="relative w-full max-w-4xl mx-auto h-[300px] border border-white/10 rounded-xl bg-black/50 backdrop-blur-sm p-8 flex items-center justify-center overflow-hidden">
             
             {/* Background Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

             {/* Connection Lines (Animated) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                   <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(6,182,212,0)" />
                      <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
                      <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                   </linearGradient>
                </defs>
                <motion.path 
                  d="M 150 150 C 300 150, 400 150, 550 150" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="2" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
             </svg>

             <div className="relative z-10 flex w-full justify-between items-center px-4 md:px-16">
                {/* Node 1: Logic */}
                <motion.div style={{ y: y1 }} className="flex flex-col items-center gap-4">
                   <div className="w-24 h-24 rounded-full border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                      <Cpu className="w-10 h-10 text-cyan-400" />
                   </div>
                   <div className="text-center">
                      <p className="font-bold text-white">逻辑层</p>
                      <p className="text-xs text-gray-500">Logic Layer</p>
                   </div>
                </motion.div>

                {/* Center: Paradox */}
                <div className="flex flex-col items-center gap-2">
                   <GitMerge className="w-8 h-8 text-gray-600 rotate-90" />
                   <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
                      SYNCHRONIZED
                   </div>
                </div>

                {/* Node 2: Intuition */}
                <motion.div style={{ y: y2 }} className="flex flex-col items-center gap-4">
                   <div className="w-24 h-24 rounded-full border border-purple-500/30 bg-purple-950/20 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                      <Layers className="w-10 h-10 text-purple-400" />
                   </div>
                   <div className="text-center">
                      <p className="font-bold text-white">直觉层</p>
                      <p className="text-xs text-gray-500">Intuition Layer</p>
                   </div>
                </motion.div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MethodologySection;
    