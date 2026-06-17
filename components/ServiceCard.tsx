
import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  desc: string;
  result?: string; // New prop for commercial results
  icon: React.ReactNode;
  delay: number;
  index?: string;
  metric?: string;
  accent?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, result, icon, delay, index, metric, accent = 'from-cyan-400 to-blue-500' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[340px] overflow-hidden rounded-lg border border-white/10 bg-zinc-950/70 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-zinc-900/80"
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent} opacity-70`} />
      <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
      <div className="relative mb-10 flex items-start justify-between gap-4">
        <div>
          {index && <div className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-gray-500">{index}</div>}
          {metric && <div className={`bg-gradient-to-r ${accent} bg-clip-text text-3xl font-black text-transparent`}>{metric}</div>}
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/80 transition-all duration-500 group-hover:border-white/25 group-hover:bg-white/[0.08]">
          {icon}
        </div>
      </div>
      <h3 className="relative mb-4 text-2xl font-black leading-snug text-white">{title}</h3>
      <p className="relative flex-grow text-sm leading-7 text-gray-400">{desc}</p>
      
      {result && (
        <div className="relative mt-8 border-t border-white/10 pt-5">
          <p className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">成果示例</p>
          <p className="text-sm font-semibold leading-6 text-white">{result}</p>
        </div>
      )}
      
      <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${accent} transition-all duration-700 ease-out group-hover:w-full`} />
    </motion.div>
  );
};

export default ServiceCard;
