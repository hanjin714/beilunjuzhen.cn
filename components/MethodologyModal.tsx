
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, ShieldCheck, Zap, TrendingUp, Wallet, ArrowUpRight, X, Terminal } from 'lucide-react';

interface MethodologyModalProps {
  onClose: () => void;
}

const MethodologyCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  index: number;
}> = ({ icon, title, subtitle, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex-1 min-h-[340px] bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md hover:bg-white/10 transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="mb-6 flex items-start justify-between">
          <div className="p-3 bg-black/40 rounded-lg border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <span className="text-4xl font-black text-white/5 font-mono">0{index + 1}</span>
        </div>
        <div className="mt-auto">
          <h4 className="text-cyan-500 text-[10px] font-bold tracking-widest uppercase mb-2">{subtitle}</h4>
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500 group-hover:w-full transition-all duration-700 ease-out" />
    </motion.div>
  );
};

const MethodologyModal: React.FC<MethodologyModalProps> = ({ onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const y1 = useTransform(scrollYProgress, [0.5, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0.5, 1], [0, 30]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 lg:p-12"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-7xl h-full max-h-[95vh] bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/80 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-2 text-cyan-500">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-mono tracking-widest uppercase font-bold">Revenue Logic</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
          </button>
        </div>

        <div ref={containerRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 lg:p-16">
          <div className="max-w-4xl mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase">Core Methodology</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              拒绝冗余工作量，<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">唯利润论执行。</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg md:text-2xl text-gray-400 leading-relaxed font-light">
              我们不关心你的工作流有多复杂，我们只关心它能帮你<b>少付多少工资</b>，以及<b>多收多少账款</b>。
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <MethodologyCard index={0} icon={<BarChart3 className="w-6 h-6" />} subtitle="MODEL A: PREDICTION" title="存量预测 = 确定增收" description="AI 预测需求峰值与复购周期。缩短库存周转时间，让每一次备货都有确定的下家，把积压的‘纸面富贵’变成流动现金。" />
            <MethodologyCard index={1} icon={<ShieldCheck className="w-6 h-6" />} subtitle="MODEL B: RECOVERY" title="修复漏洞 = 存量捡钱" description="自动化捡回流失订单。监控销售跟进断层，AI 自动激活沉默潜客。只要漏洞补得快，利润增长自然来。" />
            <MethodologyCard index={2} icon={<Zap className="w-6 h-6" />} subtitle="MODEL C: AMPLIFIER" title="数字员工 = 规模放大" description="通过 SOP 校对搭建的数字员工集群，能够 24 小时执行金牌销售的策略。人力成本恒定，产出无限指数级放大。" />
          </div>

          <div className="relative border-t border-white/5 pt-20 pb-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-6 text-gray-600 text-xs font-mono tracking-[0.5em] uppercase">The Engine Structure</div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 py-12">
               <motion.div style={{ y: y1 }} className="flex flex-col items-center gap-6 text-center">
                  <div className="w-36 h-36 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center relative shadow-2xl">
                     <Wallet className="w-14 h-14 text-gray-500" />
                     <div className="absolute -top-2 -right-2 px-2 py-1 bg-white/5 border border-white/10 text-[8px] rounded uppercase">Static Assets</div>
                  </div>
                  <div><h3 className="text-xl font-bold text-gray-300">存量业务 SOP</h3><p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Input Layer</p></div>
               </motion.div>
               <div className="flex flex-col items-center"><div className="w-24 h-24 bg-cyan-500/10 border border-cyan-500/30 rounded-3xl flex items-center justify-center rotate-45 shadow-[0_0_50px_rgba(6,182,212,0.1)]"><TrendingUp className="w-10 h-10 text-cyan-400 -rotate-45" /></div></div>
               <motion.div style={{ y: y2 }} className="flex flex-col items-center gap-6 text-center">
                  <div className="w-36 h-36 rounded-full bg-cyan-950/20 border border-cyan-500/40 flex items-center justify-center relative shadow-[0_0_60px_rgba(6,182,212,0.2)]">
                     <ArrowUpRight className="w-14 h-14 text-cyan-400" /><div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-pulse" />
                  </div>
                  <div><h3 className="text-xl font-bold text-white">现金流净增长</h3><p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Outcome Layer</p></div>
               </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MethodologyModal;
