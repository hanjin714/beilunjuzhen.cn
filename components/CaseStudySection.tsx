
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Quote, ArrowRight, Lock, Eye } from 'lucide-react';

interface CaseCardProps {
  title: string;
  industry: string;
  stats: string;
  challenge: string;
  action: string;
  quote: string;
  isLocked?: boolean;
  onClick?: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ title, industry, stats, challenge, action, quote, isLocked, onClick }) => (
  <div 
    onClick={!isLocked ? onClick : undefined}
    className={`flex-shrink-0 w-[85vw] md:w-[320px] h-full p-6 rounded-2xl border transition-all duration-300 flex flex-col group relative
      ${isLocked 
        ? 'bg-zinc-900/30 border-white/5 cursor-not-allowed' 
        : 'bg-zinc-900 border-white/10 hover:border-cyan-500/30 hover:bg-zinc-800/80 cursor-pointer shadow-lg shadow-black/50'
      }`}
  >
    {isLocked && (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl text-center p-4">
        <Lock className="w-8 h-8 text-gray-600 mb-2" />
        <p className="text-sm font-bold text-gray-400">案例整理中</p>
        <p className="text-xs text-gray-600">Coming Soon</p>
      </div>
    )}
    
    {/* Header */}
    <div className="mb-4">
      <div className="flex justify-between items-start mb-2">
         <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold bg-cyan-950/30 border border-cyan-500/20 px-2 py-0.5 rounded">{industry}</span>
      </div>
      <h3 className={`text-lg font-bold text-white leading-tight ${isLocked ? 'blur-sm' : ''}`}>{title}</h3>
    </div>

    {/* Stats Block - Compact */}
    <div className={`mb-5 p-3 bg-gradient-to-r from-cyan-950/20 to-transparent border-l-2 border-cyan-500 ${isLocked ? 'blur-sm opacity-50' : ''}`}>
      <div className="text-2xl font-black text-white mb-0.5">{stats}</div>
      <div className="text-[10px] text-cyan-400/80 uppercase tracking-wider font-medium">核心增长数据</div>
    </div>

    {/* Content Body - Flexible Height */}
    <div className={`space-y-3 mb-4 flex-grow ${isLocked ? 'blur-sm opacity-50' : ''}`}>
      <div>
        <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-0.5">挑战</h4>
        <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">{challenge}</p>
      </div>
      <div>
        <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-0.5">动作</h4>
        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">{action}</p>
      </div>
    </div>

    {/* Footer: Quote & Action */}
    <div className={`mt-auto pt-4 border-t border-white/5 ${isLocked ? 'blur-sm opacity-50' : ''}`}>
      <div className="flex gap-2 mb-3">
        <Quote className="w-3 h-3 text-gray-600 shrink-0 fill-gray-600 mt-0.5" />
        <p className="text-xs text-gray-500 italic line-clamp-2 leading-relaxed">"{quote}"</p>
      </div>
      
      {!isLocked && (
        <button className="w-full py-2 rounded border border-white/5 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 text-xs text-gray-300 font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <Eye className="w-3 h-3" /> 点击展开详情
        </button>
      )}
    </div>
  </div>
);

interface CaseStudySectionProps {
  onOpenCase: (id: string) => void;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ onOpenCase }) => {
  return (
    <section id="case-studies" className="py-20 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <span className="text-cyan-500 text-xs font-bold tracking-[0.2em] uppercase">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 text-white">真实增收案例</h2>
          </div>
          <div className="hidden md:flex gap-2">
             {/* Decorative arrows or controls could go here */}
          </div>
        </div>

        {/* 
           Layout Note: 
           items-stretch ensures all cards in the row have the same height.
           pb-4 adds padding for the scrollbar or shadow.
        */}
        <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory custom-scrollbar items-stretch">
          
          {/* Case 1: Pet Store */}
          <div className="snap-center h-auto">
            <CaseCard 
              onClick={() => onOpenCase('pet')}
              industry="宠物连锁零售"
              title="派星人宠物连锁"
              stats="回款增长 18%"
              challenge="销售人员流动大导致客户漏单严重，库存积压与缺货并存。"
              action="部署预测型与修复型模型。AI 自动预测补货周期，并在客户即将流失时自动生成跟进任务。"
              quote="我们本以为 AI 只是个效率工具，没想到它真的直接增加了我们的实收利润。"
            />
          </div>

          {/* Case 2: Smart Home */}
          <div className="snap-center h-auto">
             <CaseCard 
              onClick={() => onOpenCase('smart-home')}
              industry="县城智能家居"
              title="智享家·全屋智能"
              stats="转化率提升 32%"
              challenge="客户跟进断层，标签混乱，无法精准匹配相似户型案例，导致成交率低。"
              action="AI 自动为潜客打标分级，根据装修节点预测需求，自动推送同户型方案，SOP 话术辅助逼单。"
              quote="AI 帮我们筛选出了真正的意向客户，通过 SOP 话术营造付费环境，确实提升了成交。"
            />
          </div>

          {/* Case 3: Barbershop */}
          <div className="snap-center h-auto">
             <CaseCard 
              onClick={() => onOpenCase('barbershop')}
              industry="社区连锁沙龙"
              title="型动·社区沙龙"
              stats="人效提升 25%"
              challenge="周末爆满周中闲置，会员复购全靠等。发型师闲时玩手机，忙时服务不过来。"
              action="AI 预测会员剪发周期，结合发型师闲时空档自动生成邀约，将被动等待转为主动填空。"
              quote="把客户从下班后的高峰期，挪到了我们的空闲时段，这就等于变相增加了营业时间。"
            />
          </div>

          {/* Case 4: Super Individual (New) */}
          <div className="snap-center h-auto">
             <CaseCard 
              onClick={() => onOpenCase('super-individual')}
              industry="独立顾问/超级个体"
              title="独立顾问·超级个体"
              stats="维护效率 +300%"
              challenge="私域客户几千人，不用 CRM 记不住，用了 CRM 没时间填。关键信息全在脑子里，一忙就忘。"
              action="定制 Coze 移动端技能。用自然语言（语音/文字）随时录入信息，AI 自动归档并每日主动推送跟进任务。"
              quote="以前填表像上刑，现在就像跟助理聊八卦一样，就把客户管理做完了。"
            />
          </div>

          {/* Case 5: Placeholder */}
          <div className="snap-center h-auto">
             <CaseCard 
              industry="电商 / 消费品"
              title="DTC 护肤品牌"
              stats="私域转化 +25%"
              challenge="私域流量池巨大但活跃度低，人工运营成本过高，无法做到精细化触达。"
              action="[保密] 部署数字编导，全自动生成高转化朋友圈文案..."
              quote="相当于免费雇佣了一个 24 小时在线的金牌文案团队。"
              isLocked={true}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
