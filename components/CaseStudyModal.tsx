
import React from 'react';
import { motion } from 'framer-motion';
import { X, PawPrint, TrendingUp, History, Sparkles, AlertCircle, Anchor, Home, Tag, Copy, Lightbulb, Users, Scissors, CalendarClock, Smartphone, MessageCircle, FileSpreadsheet, BrainCircuit } from 'lucide-react';

interface CaseStudyModalProps {
  caseId: string;
  onClose: () => void;
}

// Case Data Dictionary
const CASE_DATA: Record<string, any> = {
  'pet': {
    title: "派星人宠物",
    subtitle: "Paixingren Pets",
    icon: <PawPrint className="w-5 h-5 text-cyan-400" />,
    heroTitle: "全品类宠物连锁的“增收战役”",
    heroDesc: (<span>不增加一名销售，通过 <span className="text-cyan-400">预测与修复</span>，实现现金流的被动增长。</span>),
    image: "/paixingren-store.jpg", 
    imageAlt: "Pet Store Interior",
    tags: ["模型 A", "模型 B"],
    painPoints: [
      {
        icon: <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "库存滞销（现金流冻结）",
        desc: (<span>宠物耗材（粮、药）有保质期。因为缺乏<span className="text-white">需求峰值预测</span>，经常出现“想卖的断货，不想卖的积压”。积压的每一袋猫粮，都是被冻结的现金。</span>)
      },
      {
        icon: <History className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "复购断层（利润流失）",
        desc: (<span>销售人员流动性大，经常忘记提醒客户驱虫或补货。每忘记一次提醒，就意味着把这笔<span className="text-white">本来该赚的钱</span>送给了竞争对手。</span>)
      }
    ],
    lossStat: "-15%",
    lossLabel: "因跟进不及时导致的\n月度复购流失率",
    models: [
      {
        type: "模型 A：预测型",
        icon: <TrendingUp className="w-10 h-10 text-blue-400 mb-2" />,
        color: "blue",
        title: "库存与需求预测",
        desc: "AI 分析历史销售数据与季节性趋势。在旺季来临前自动生成补货单，在淡季前预警促销。",
        result: "库存周转率提升 30%，滞销损耗降低。"
      },
      {
        type: "模型 B：修复型",
        icon: <Anchor className="w-10 h-10 text-purple-400 mb-2" />,
        color: "purple",
        title: "客户复购周期管理",
        desc: "AI 记住每只宠物的生日、疫苗时间和吃粮速度。在恰当的时间点，自动生成任务推送到销售手机，甚至直接生成提醒文案。",
        result: "捡回了被遗忘的订单，复购率显著回升。"
      }
    ],
    summary: (<span>派星人没有增加任何营销预算，也没有招聘新员工。仅通过 AI 模型的<b>“预测”</b>与<b>“防漏”</b>，就让原本流失的现金流重新回到了账上。</span>),
    badge: "净利润率提升"
  },
  'smart-home': {
    title: "智享家",
    subtitle: "Smart Home Solutions",
    icon: <Home className="w-5 h-5 text-cyan-400" />,
    heroTitle: "县城智能家居门店的“降维打击”",
    heroDesc: (<span>用 AI 解决<span className="text-cyan-400">潜客断层</span>与<span className="text-cyan-400">谈单复制</span>，让小团队跑出大业绩。</span>),
    image: "/smart-home-case.jpg", 
    imageAlt: "Smart Home Installation",
    tags: ["模型 A", "模型 B", "模型 C"],
    painPoints: [
      {
        icon: <Users className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "未成交客户极易断层",
        desc: (<span>县城装修周期长，潜客跟进周期往往跨越数月。销售容易遗忘跟进，或者因为<span className="text-white">不知道客户处于哪个装修阶段</span>而由于不决，最终导致线索“变冷”流失。</span>)
      },
      {
        icon: <Tag className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "缺乏转化抓手",
        desc: (<span>面对犹豫不决的客户，销售往往只是干巴巴地催单。缺乏针对该客户<span className="text-white">同小区、同户型</span>的成功案例作为临门一脚的转化工具。</span>)
      }
    ],
    lossStat: "60%+",
    lossLabel: "传统人工跟进模式下的\n意向客户流失率",
    models: [
      {
        type: "模型 A：预测型",
        icon: <Lightbulb className="w-10 h-10 text-blue-400 mb-2" />,
        color: "blue",
        title: "转化时机预测",
        desc: "结合装修季与交房潮数据，AI 预测客户的硬装/软装进场节点，在客户最需要采购的时刻自动提醒销售跟进。",
        result: "精准踩中客户采购节奏，不再无效骚扰。"
      },
      {
        type: "模型 B：修复型",
        icon: <Anchor className="w-10 h-10 text-purple-400 mb-2" />,
        color: "purple",
        title: "自动监测断层",
        desc: "监控所有线索的跟进频率。一旦发现高意向客户超过 7 天未跟进，AI 立即发出红色预警，并生成复联话术。",
        result: "彻底杜绝了“把意向客户忘在通讯录里”的情况。"
      },
      {
        type: "模型 C：放大型",
        icon: <Copy className="w-10 h-10 text-orange-400 mb-2" />,
        color: "orange",
        title: "销冠能力复制",
        desc: "建立同小区/户型案例库。AI 自动匹配与潜客最相似的成功案例推送给销售；同时将销冠的谈单录音转化为 SOP 话术，让新人也能像销冠一样逼单。",
        result: "新人成交率大幅缩短与老销售的差距。"
      }
    ],
    summary: (<span>老板反馈：通过 AI 打标后，能够确定某个用户的付费意愿，给我们的对接人省了很多精力。AI 提醒销售追问，并通过 SOP 话术营造付费环境，显著提升了成交转化。</span>),
    badge: "意向转化率提升"
  },
  'barbershop': {
    title: "型动·社区沙龙",
    subtitle: "Community Salon",
    icon: <Scissors className="w-5 h-5 text-cyan-400" />,
    heroTitle: "社区理发店的“闲时填空术”",
    heroDesc: (<span>利用 AI 预测会员剪发周期，匹配发型师<span className="text-cyan-400">闲时空档</span>，把被动等客变成主动邀约。</span>),
    image: "/barbershop-case.jpg", 
    imageAlt: "Barbershop Interior",
    tags: ["模型 A", "模型 B", "模型 C"],
    painPoints: [
      {
        icon: <CalendarClock className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "忙闲不均，效率浪费",
        desc: (<span>社区店典型特征：晚上和周末排队排死，周一到周五下午发型师闲得玩手机。这种<span className="text-white">“时间库存”</span>的浪费，是最大的成本。</span>)
      },
      {
        icon: <History className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "会员复购全靠“想起来”",
        desc: (<span>男士剪发通常 25-30 天一次，但如果没人提醒，客户往往会拖到 40 天甚至更久。这被拖延的 10 天，就是白白流失的现金流。</span>)
      }
    ],
    lossStat: "2H/日",
    lossLabel: "发型师平均闲置时间\n导致的人力成本浪费",
    models: [
      {
        type: "模型 A：预测型",
        icon: <TrendingUp className="w-10 h-10 text-blue-400 mb-2" />,
        color: "blue",
        title: "周期预测与闲时匹配",
        desc: "AI 记录会员发型与上次服务时间。若预测客户需在下周理发，且发型师明天下午有空，自动生成邀约：“王先生，您发型该修了，明天下午2点阿杰老师有空，不用排队来吗？”",
        result: "将复购事件提前，填满了闲时时段。"
      },
      {
        type: "模型 B：修复型",
        icon: <Anchor className="w-10 h-10 text-purple-400 mb-2" />,
        color: "purple",
        title: "流失与断层召回",
        desc: "自动监测未办卡或体验后未返店的潜客。打上（预算/住址/偏好）标签，在换季或发型尴尬期自动推送针对性优惠，而非盲目群发。",
        result: "精准召回沉睡客户，提升留存率。"
      },
      {
        type: "模型 C：放大型",
        icon: <Copy className="w-10 h-10 text-orange-400 mb-2" />,
        color: "orange",
        title: "销冠SOP话术复制",
        desc: "沉淀店长办卡、烫染推荐的话术。新人发型师面对客户不知道怎么开口推销时，AI 助手提供经过验证的高转化话术。",
        result: "新人办卡率提升，减少对资深发型师的依赖。"
      }
    ],
    summary: (<span>把客户原本“下班后排队”的低效复购，转化为“闲时预约”的高效服务。<b>把复购周期从 40 天压缩到 30 天</b>，直接让年度现金流提升了 25%。</span>),
    badge: "人效与翻台率双升"
  },
  'super-individual': {
    title: "独立顾问·超级个体",
    subtitle: "Super Individual / Solopreneur",
    icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
    heroTitle: "一个人活成一支队伍的“外挂记忆”",
    heroDesc: (<span>拒绝笨重的 CRM 软件。用<span className="text-cyan-400">Coze 定制技能</span>，像聊天一样管理千人私域。</span>),
    image: "/super-individual-case.jpg", 
    imageAlt: "Super Individual Mobile Interface",
    tags: ["Coze定制", "外部记忆", "移动端"],
    painPoints: [
      {
        icon: <BrainCircuit className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "大脑内存溢出",
        desc: (<span>私域客户几千人，每天沟通几十个。谁喜欢什么、上次聊到哪、承诺了什么...纯靠脑子记不住，记在备忘录里又<span className="text-white">翻不到</span>。</span>)
      },
      {
        icon: <Smartphone className="w-6 h-6 text-red-400 shrink-0 mt-1" />,
        title: "软件太重，无法坚持",
        desc: (<span>市面上的 CRM 系统太复杂，必须开电脑、填表格。对于经常在外面跑业务的超级个体来说，<span className="text-white">“打开电脑”</span>这个动作本身就是巨大的门槛。</span>)
      }
    ],
    lossStat: "30%+",
    lossLabel: "因遗忘关键跟进信息\n导致的老客复购流失",
    models: [
      {
        type: "交互层：自然语言",
        icon: <MessageCircle className="w-10 h-10 text-blue-400 mb-2" />,
        color: "blue",
        title: "像回微信一样记档案",
        desc: "基于 Coze 搭建移动端 Bot。无需填表，直接在手机上发语音或文字：“王总对 A 课程感兴趣，嫌贵，下周再聊。” AI 自动提取姓名、意向、时间存入数据库。",
        result: "随时随地录入，信息零遗漏。"
      },
      {
        type: "触发层：主动唤起",
        icon: <TrendingUp className="w-10 h-10 text-purple-400 mb-2" />,
        color: "purple",
        title: "每日智能跟进提醒",
        desc: "不仅仅是被动存储。每天早上 9 点，Bot 会主动发消息：“今天要联系王总了，上次他说觉得贵，建议你发这个《性价比对比图》给他。”",
        result: "变被动查找为主动推送，执行力拉满。"
      },
      {
        type: "资产层：数据资产化",
        icon: <FileSpreadsheet className="w-10 h-10 text-orange-400 mb-2" />,
        color: "orange",
        title: "个人知识库导出",
        desc: "所有的聊天记录自动沉淀为结构化表格。可随时导出为 Excel，未来更可直接作为语料投喂给 AI 客服，让它越来越懂你的客户。",
        result: "把“人脉”变成可复用的“数字资产”。"
      }
    ],
    summary: (<span>对于超级个体，最好的工具不是功能最强大的，而是<b>最无感</b>的。通过 Coze 定制技能，我们把客户管理嵌入到了他最习惯的“聊天”场景中，彻底解决了“坚持不下来”的痛点。</span>),
    badge: "客户管理零负担"
  }
};

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseId, onClose }) => {
  const data = CASE_DATA[caseId];

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="relative w-full max-w-5xl h-full max-h-[90vh] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
              {data.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide drop-shadow-md flex items-baseline gap-2">
                {data.title} 
                <span className="text-[10px] text-gray-300 font-normal opacity-80">{data.subtitle}</span>
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-black/40 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors text-white pointer-events-auto border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          
          <div className="relative h-[400px] w-full bg-zinc-800 overflow-hidden group">
            {data.image ? (
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${data.image}')` }} 
              ></div>
            ) : (
              // Placeholder for image
              <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                 <div className="w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-zinc-900 to-black"></div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                    <Home className="w-16 h-16 mb-4 opacity-20" />
                    <span className="text-xs uppercase tracking-widest border border-gray-700 px-3 py-1 rounded">Image Placeholder</span>
                 </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 pt-32 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent">
              <div className="flex gap-2 mb-2">
                 {data.tags.map((tag: string, i: number) => (
                   <span key={i} className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-white font-bold uppercase backdrop-blur-sm">{tag}</span>
                 ))}
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg leading-tight">{data.heroTitle}</h3>
              <p className="text-gray-200 text-base md:text-lg font-medium drop-shadow-md max-w-2xl leading-relaxed">
                {data.heroDesc}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-12 bg-zinc-900">
            
            {/* 1. Revenue Leakage */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-red-500 font-mono text-xl">01.</span>
                <h3 className="text-2xl font-bold">隐形损失：钱是怎么溜走的？</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 bg-red-900/5 border border-red-500/10 p-6 rounded-xl">
                <div className="space-y-6">
                  {data.painPoints.map((point: any, i: number) => (
                    <div className="flex gap-4" key={i}>
                      {point.icon}
                      <div>
                        <h4 className="font-bold text-red-200">{point.title}</h4>
                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center border-l border-white/5 pl-0 md:pl-8 text-center gap-2">
                  <p className="text-4xl font-bold text-red-500">{data.lossStat}</p>
                  <p className="text-sm text-gray-500 whitespace-pre-wrap">{data.lossLabel}</p>
                </div>
              </div>
            </section>

            {/* 2. AI Revenue Models */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-cyan-500 font-mono text-xl">02.</span>
                <h3 className="text-2xl font-bold">植入模型：让利润自动回流</h3>
              </div>
              
              <div className="space-y-6">
                 {data.models.map((model: any, i: number) => (
                   <div key={i} className="bg-zinc-800/50 p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 flex flex-col md:flex-row gap-6 hover:bg-zinc-800 transition-colors">
                      <div className="md:w-1/4 flex flex-col items-center justify-center border-r border-white/5 pr-6">
                         {model.icon}
                         <h4 className={`font-bold text-${model.color}-300`}>{model.type}</h4>
                      </div>
                      <div className="md:w-3/4">
                         <h5 className="text-lg font-bold text-white mb-2">{model.title}</h5>
                         <p className="text-sm text-gray-400 mb-4">{model.desc}</p>
                         <div className="flex gap-2">
                           <span className={`text-xs bg-${model.color}-950 text-${model.color}-200 px-2 py-1 rounded`}>效果</span>
                           <span className="text-xs text-gray-400">{model.result}</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </section>

            {/* 3. The Result */}
            <section className="bg-gradient-to-br from-cyan-950/30 to-black p-8 rounded-2xl border border-cyan-500/20">
               <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                   <h3 className="text-xl font-bold mb-2 text-white">增收总结</h3>
                   <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                     {data.summary}
                   </p>
                 </div>
                 <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/50 px-6 py-3 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)] shrink-0">
                   <Sparkles className="w-5 h-5" />
                   <span className="text-base font-bold">{data.badge}</span>
                 </div>
               </div>
            </section>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyModal;
