
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, ArrowRight, User, CheckCircle } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [showGeekModal, setShowGeekModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);

  // 统一的平滑滚动处理函数，考虑顶部导航遮挡
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="pricing">
      {/* Background Watermark */}
      <div className="absolute top-10 left-10 text-[12vw] font-black text-white/[0.01] pointer-events-none select-none">
        VALUE
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4">
            Commercial Packages
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">服务收费模式</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            我们不卖软件授权，我们交付<b>可量化的商业结果</b>。
            <br className="hidden md:block"/>
            根据您的企业规模与增收目标，选择最适合的落地组合。
          </p>
        </div>

        {/* Pricing Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          
          {/* Plan 1: Starter (Green) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-zinc-900/40 border border-green-500/20 rounded-2xl p-8 hover:bg-zinc-900/60 transition-colors relative overflow-hidden group"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
             <h3 className="text-green-400 font-bold tracking-wider uppercase text-sm mb-2">入门版</h3>
             <h4 className="text-2xl font-bold text-white mb-4">AI 增收试点</h4>
             <div className="flex items-baseline gap-1 mb-6">
               <span className="text-3xl font-black text-white">¥8,800</span>
             </div>
             <p className="text-gray-400 text-xs min-h-[40px] mb-6">适合新手/小规模企业。以低成本快速验证 AI 在业务中的增收潜力。</p>
             
             <div className="space-y-4 mb-8 flex-grow">
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-green-500 shrink-0" />
                 <span className="text-sm text-gray-300">核心工作流 3 个</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-green-500 shrink-0" />
                 <span className="text-sm text-gray-300"><b>AI 组合拳</b> 方案 1 次</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-green-500 shrink-0" />
                 <span className="text-sm text-gray-300">2 个月线上陪跑服务</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-green-500 shrink-0" />
                 <span className="text-sm text-white font-bold">核心目标：找到第一个增收点</span>
               </div>
             </div>
             
             <button 
               onClick={scrollToContact}
               className="block w-full py-3 rounded-lg border border-green-500/30 text-green-400 text-center text-sm font-bold hover:bg-green-500/10 transition-colors"
             >
               预约试点
             </button>
          </motion.div>

          {/* Plan 2: Advanced (Blue - Featured) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col bg-zinc-900 border border-blue-500/40 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] lg:-mt-4 lg:mb-4 lg:z-10"
          >
             <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
               Most Popular
             </div>
             <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
             <h3 className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">进阶版</h3>
             <h4 className="text-2xl font-bold text-white mb-4">增收落地陪跑</h4>
             <div className="flex items-baseline gap-1 mb-6">
               <span className="text-4xl font-black text-white">¥19,880</span>
             </div>
             <p className="text-gray-400 text-xs min-h-[40px] mb-6">适合有数据积累的企业。系统性解决漏损问题，构建自动化利润回收防线。</p>
             
             <div className="space-y-4 mb-8 flex-grow">
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-blue-500 shrink-0" />
                 <span className="text-sm text-gray-300">核心工作流 6 个</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-blue-500 shrink-0" />
                 <span className="text-sm text-gray-300"><b>AI 组合拳</b> 方案 2 次</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-blue-500 shrink-0" />
                 <span className="text-sm text-gray-300">4 个月陪跑解决服务</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-blue-500 shrink-0" />
                 <span className="text-sm text-white font-bold">核心目标：多增收途径跑通</span>
               </div>
             </div>
             
             <button 
               onClick={scrollToContact}
               className="block w-full py-4 rounded-lg bg-blue-600 text-white text-center text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
             >
               立即启动增长
             </button>
          </motion.div>

          {/* Plan 3: Full (Orange) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-zinc-900/40 border border-orange-500/20 rounded-2xl p-8 hover:bg-zinc-900/60 transition-colors relative overflow-hidden group"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/50"></div>
             <h3 className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-2">全面 AI 化</h3>
             <h4 className="text-2xl font-bold text-white mb-4">全年深度陪跑</h4>
             <div className="flex items-baseline gap-1 mb-6">
               <span className="text-3xl font-black text-white">¥49,880</span>
             </div>
             <p className="text-gray-400 text-xs min-h-[40px] mb-6">适合追求指数级增长的企业。深度定制，从基因层面完成企业的 AI 化改造。</p>
             
             <div className="space-y-4 mb-8 flex-grow">
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-orange-500 shrink-0" />
                 <span className="text-sm text-gray-300">全案深度定制开发</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-orange-500 shrink-0" />
                 <span className="text-sm text-gray-300"><b>AI 组合拳</b> 无限次迭代</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-orange-500 shrink-0" />
                 <span className="text-sm text-gray-300">12 个月全周期保障</span>
               </div>
               <div className="flex gap-3">
                 <Check className="w-4 h-4 text-orange-500 shrink-0" />
                 <span className="text-sm text-white font-bold">核心目标：全面增长体系构建</span>
               </div>
             </div>
             
             <button 
               onClick={scrollToContact}
               className="block w-full py-3 rounded-lg border border-orange-500/30 text-orange-400 text-center text-sm font-bold hover:bg-orange-500/10 transition-colors"
             >
               咨询全案
             </button>
          </motion.div>

        </div>

        {/* Secondary Actions */}
        <div className="flex justify-center gap-6">
          <button 
            onClick={() => setShowGeekModal(true)}
            className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-white/10"
          >
            <User className="w-3 h-3" />
            查看个人极客版方案
          </button>
          
          <button 
             onClick={() => setShowMilestoneModal(true)}
             className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-white/10"
          >
            <Shield className="w-3 h-3" />
            查看收费里程碑与保障
          </button>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showGeekModal && (
            <ModalWrapper key="geek" onClose={() => setShowGeekModal(false)} title="C 端个体 / 极客级方案">
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-purple-400 font-bold mb-2">轻量版 ¥1,999</h4>
                    <p className="text-xs text-gray-400 mb-4">单工作流 + AI 组合拳方案 1 次，线上问题解决 5 次。</p>
                    <div className="text-sm font-bold text-white">适合：个人创作者、SOHO一族尝试提效。</div>
                 </div>
                 <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-purple-400 font-bold mb-2">标准版 ¥3,999</h4>
                    <p className="text-xs text-gray-400 mb-4">核心工作流 3 个 + AI 组合拳方案 2 次，45 天线上陪伴。</p>
                    <div className="text-sm font-bold text-white">适合：超级个体构建自动化业务闭环。</div>
                 </div>
               </div>
            </ModalWrapper>
          )}

          {showMilestoneModal && (
            <ModalWrapper key="milestone" onClose={() => setShowMilestoneModal(false)} title="收费里程碑 & 风险保障">
              <div className="space-y-8">
                 <div className="relative pt-6 pb-6">
                   <div className="absolute top-[45%] left-0 right-0 h-[2px] bg-white/10"></div>
                   <div className="grid grid-cols-4 gap-2 relative z-10">
                     {[
                       { p: '10%', t: '方案确定' },
                       { p: '30%', t: '启动开发' },
                       { p: '40%', t: 'SOP跑通' },
                       { p: '20%', t: '交付尾款' }
                     ].map((m, i) => (
                       <div key={i} className="text-center bg-zinc-900 p-2">
                         <div className="text-cyan-500 font-bold text-lg">{m.p}</div>
                         <div className="text-[10px] text-gray-500 uppercase">{m.t}</div>
                       </div>
                     ))}
                   </div>
                 </div>
                 
                 <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-xl flex items-center gap-6">
                    <div className="p-3 bg-red-500/10 rounded-full">
                       <Shield className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-lg mb-1">落地失败承诺</h4>
                       <p className="text-sm text-gray-400">若方案未能按约定落地或无效，我们承诺<span className="text-red-400 font-bold">退还 80%</span>服务费用。风险我们担，成果你拿走。</p>
                    </div>
                 </div>
              </div>
            </ModalWrapper>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

const ModalWrapper: React.FC<{ onClose: () => void; title: string; children: React.ReactNode }> = ({ onClose, title, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.15 }} // Reduced from 0.2 to 0.15 for snappier exit
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      {/* 
        Optimization: Replaced backdrop-blur with simple opacity.
      */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.95, y: 10, opacity: 0 }} 
        animate={{ scale: 1, y: 0, opacity: 1 }} 
        exit={{ scale: 0.95, y: 10, opacity: 0 }} 
        transition={{ duration: 0.2, ease: "easeOut" }}
        // Explicit inline styles to ensure hardware acceleration triggers
        style={{ willChange: "transform, opacity" }}
        className="relative bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-xl"
      >
         <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-bold text-white">{title}</h3>
           <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
         </div>
         {children}
      </motion.div>
    </motion.div>
  );
};

export default PricingSection;
