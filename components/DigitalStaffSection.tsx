
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Megaphone, BrainCircuit, ShieldCheck, GraduationCap, Workflow } from 'lucide-react';

const StaffCard: React.FC<{
  role: string;
  solve: string;
  desc: string;
  icon: React.ReactNode;
  index: number;
}> = ({ role, solve, desc, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      {icon}
    </div>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{role}</h3>
    </div>
    <div className="space-y-3">
      <div>
        <span className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold">解决需求</span>
        <p className="text-sm text-gray-200 font-medium">{solve}</p>
      </div>
      <div>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">岗位能力</span>
        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const DigitalStaffSection: React.FC = () => {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-cyan-500 text-sm font-bold tracking-[0.3em] uppercase">Digital Staffing</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
              为企业组建<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">数字员工集群</span>
            </h2>
            <p className="text-gray-400 text-lg">
              不仅仅是对话。我们根据岗位职责 1:1 校对搭建，确保 AI 能够像真人一样<b>“做事”</b>。
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono text-gray-400">STATUS: SOP_ALIGNED</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StaffCard 
            index={0}
            role="数据行政"
            solve="飞书多维表格自动化"
            desc="无需学习复杂函数。只需一句话，数字员工自行搭建多维表结构，并在群内实时监测数据，自动更新、编辑、归档。记住格式，永不遗漏。"
            icon={<Database className="w-6 h-6" />}
          />
          <StaffCard 
            index={1}
            role="私域编导"
            solve="24h 朋友圈营销生产"
            desc="根据业务热点与临期库存，自动计算促销力度并编写具有销冠感的朋友圈内容。不仅是写，更能根据人设调整语气，实现私域全自动种草。"
            icon={<Megaphone className="w-6 h-6" />}
          />
          <StaffCard 
            index={2}
            role="企业智库"
            solve="新人培训与战略专家"
            desc="封装企业内部SOP文档，成为24小时在线的问题解决专家。无论是业务流程指引还是战略方案模拟，它都以企业基因进行思考。"
            icon={<BrainCircuit className="w-6 h-6" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-zinc-950 p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
          
          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              我们如何保证落地？
            </h3>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Workflow className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">幻觉控制 (Hallucination Control)</h4>
                  <p className="text-sm text-gray-400">不再产生伪需求。以效率为准绳，严格按照业务逻辑和SOP执行，不确定的内容会请求人类确认。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">管理难题解决</h4>
                  <p className="text-sm text-gray-400">提供 1:1 AI 转型培训。我们不只是给你工具，更是将 AI 植入你的企业基因，让员工快速上手数字协作。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 bg-white/5 border border-white/10 rounded-2xl">
             <p className="text-gray-300 italic leading-relaxed text-sm md:text-base">
               “我们不再局限于简单的 AI 工作流，而是偏向于一套系统化的 <b>AI 组合拳</b>。AI 落地企业不应是点状的，而是决定进化企业基因的 Agents，它们正等待着我们共同发掘。”
             </p>
             <div className="mt-6 flex items-center gap-3">
               <div className="w-10 h-1 bg-cyan-500"></div>
               <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Paradox Vision</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalStaffSection;
