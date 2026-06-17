
import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  desc: string;
  result?: string; // New prop for commercial results
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, result, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="group relative p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-sm overflow-hidden flex flex-col"
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm mb-6 flex-grow">{desc}</p>
      
      {result && (
        <div className="mt-auto pt-4 border-t border-white/10">
          <p className="text-xs text-cyan-500 font-bold uppercase tracking-wider mb-1">成果示例</p>
          <p className="text-sm text-white font-medium">{result}</p>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-cyan-500 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
};

export default ServiceCard;
