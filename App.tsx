
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ChevronDown, TrendingUp, Zap, ArrowRight, Anchor, Search, PlayCircle, ClipboardList } from 'lucide-react';
import ServiceCard from './components/ServiceCard';
import CaseStudyModal from './components/CaseStudyModal';
import MethodologyModal from './components/MethodologyModal';
import BackgroundEffect from './components/BackgroundEffect';
import DigitalStaffSection from './components/DigitalStaffSection';
import PricingSection from './components/PricingSection';
import CaseStudySection from './components/CaseStudySection';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Modals State
  // Changed from boolean to string | null to identify WHICH case to show
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);

  const { scrollY } = useScroll();
  const leadFormUrl = 'https://beilunjuzhen.feishu.cn/share/base/form/shrcnYq5cifmUe7QeiYGsPBIPwh';

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Image Preloading Effect
  useEffect(() => {
    const imageUrls = [
      "/paixingren-store.jpg",
      "/smart-home-case.jpg",
      "/barbershop-case.jpg",
      "/super-individual-case.jpg" // 预加载超级个体案例图片
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const scrollRange = [0, 400];
  const t = useTransform(scrollY, scrollRange, [0, 1]);
  const oneMinusT = useTransform(t, value => 1 - value);

  // Logo 动画逻辑：
  // 保持滚动时的移动逻辑，但调整初始位置，让它独占屏幕视觉中心
  const logoLeft = useMotionTemplate`calc(50% * ${oneMinusT} + 32px * ${t})`;
  const logoTop = useMotionTemplate`calc(40% * ${oneMinusT} + 24px * ${t})`; 
  const logoX = useMotionTemplate`calc(-50% * ${oneMinusT})`;
  const logoY = useMotionTemplate`calc(-50% * ${oneMinusT})`;
  const logoScale = useTransform(scrollY, scrollRange, [1, 0.35]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500 selection:text-black bg-black">
      <BackgroundEffect />
      <AnimatePresence>
        {activeCaseStudy && (
          <CaseStudyModal 
            caseId={activeCaseStudy} 
            onClose={() => setActiveCaseStudy(null)} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{showMethodology && <MethodologyModal onClose={() => setShowMethodology(false)} />}</AnimatePresence>

      {/* 
        Fixed Animated Logo 
        初始状态：位于屏幕中心 (top: 40%)，配合模糊渐显动画
      */}
      <motion.h1
        className="fixed z-[60] font-black tracking-widest text-white whitespace-nowrap cursor-pointer select-none pointer-events-none md:pointer-events-auto"
        style={{
          left: logoLeft, top: logoTop, x: logoX, y: logoY, scale: logoScale,
          transformOrigin: "0 0", fontSize: "4.5rem", textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          lineHeight: 1, margin: 0,
          transform: "translate3d(0,0,0)", willChange: "transform, left, top",
          backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          悖论<span className="text-cyan-500">矩阵</span>
        </motion.span>
      </motion.h1>

      <div className="relative z-0">
        {/* Navigation Bar */}
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-8'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center h-12">
            <div className="w-48"></div> 
            <motion.div className="flex gap-4 md:gap-8 text-xs md:text-sm font-medium text-gray-300 items-center overflow-x-auto no-scrollbar" initial={{ opacity: 0 }} animate={{ opacity: isScrolled ? 1 : 0 }}>
              <button onClick={() => scrollToSection('models')} className="hover:text-cyan-400 transition-colors whitespace-nowrap">增收模型</button>
              <button onClick={() => scrollToSection('digital-staff')} className="hover:text-cyan-400 transition-colors whitespace-nowrap">数字员工</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-cyan-400 transition-colors whitespace-nowrap">收费模式</button>
              <button onClick={() => setShowMethodology(true)} className="hover:text-cyan-400 transition-colors whitespace-nowrap">增收定律</button>
              <button onClick={() => scrollToSection('contact')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-white transition-colors border border-white/10 whitespace-nowrap">增收诊断</button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 text-center">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-45 saturate-[0.85]"
            src="/hero-brand-cinematic.mp4"
            poster="/hero-brand-cinematic-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.14),transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.72)_58%,#000_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          {/* 
            内容容器：
            1. 增加了 pt-[45vh] 将文字推到 Logo 下方很远的位置，避免视觉拥挤。
            2. 设置了 delay: 1.5，确保 Logo 先展示完毕，文字再浮现。
          */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 1.5 }} 
            className="max-w-4xl relative z-10 pt-[40vh] md:pt-[35vh]" 
            style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
          >
            {/* 
               Typography Update:
               大幅减小标题字号 (text-6xl -> text-4xl)，增加 font-medium 而非 font-black，
               使其看起来更精致、更像副标题。
            */}
            <h2 className="text-xl md:text-3xl lg:text-4xl text-gray-100 font-medium mb-6 leading-relaxed tracking-wide">
              帮企业找到被忽略的利润，<br className="md:hidden" />
              让现金流<span className="text-cyan-400 font-bold mx-1">自动回流</span>
            </h2>
            
            <p className="text-gray-500 text-sm md:text-base mb-12 max-w-2xl mx-auto font-light tracking-wider">
              预测、修复、放大 —— 用可量化的 AI 增收模型驱动企业利润增长。
            </p>

            {/* 
               Buttons Redesign:
               不再是两个突兀的大色块。
               主按钮：精致的线条+发光感。
               副按钮：低调的链接样式。
            */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               
               {/* Primary CTA */}
               <button 
                 onClick={() => scrollToSection('contact')} 
                 className="group relative px-8 py-3 rounded-full bg-cyan-950/30 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all duration-300 ease-out overflow-hidden"
               >
                 <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="relative flex items-center gap-2 font-bold tracking-widest text-sm">
                   <Search className="w-4 h-4" /> 
                   申请 AI 增收诊断
                 </span>
               </button>

               {/* Secondary CTA - Scrolls to Case Study Section */}
               <button 
                 onClick={() => scrollToSection('case-studies')}
                 className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm tracking-widest border-b border-transparent hover:border-gray-500 pb-0.5"
               >
                 <PlayCircle className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                 查看增收案例演示
               </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none" 
            style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 2.5 }} // Scroll 提示出现得更晚
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-600">Scroll to Explore</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ChevronDown className="w-4 h-4 text-gray-600" /></motion.div>
          </motion.div>
        </section>

        {/* 3 Core Models */}
        <section id="models" className="relative overflow-hidden border-y border-white/5 bg-black py-28">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(6,182,212,0.08),transparent_34%,rgba(168,85,247,0.08)_72%,transparent)]" />
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="container relative mx-auto px-6">
            <div className="mb-16 grid items-end gap-8 md:grid-cols-[1fr_0.72fr]">
              <div>
                <span className="text-sm font-black uppercase tracking-[0.32em] text-cyan-500">Revenue Architecture</span>
                <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">我们如何帮企业增收</h2>
              </div>
              <p className="text-sm leading-7 text-gray-400 md:text-base">
                从现有数据里拆出需求预测、线索修复和销售放大三条路径，让增长动作变得可衡量、可复盘、可复制。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard 
                delay={0.1} 
                index="Model 01"
                metric="Predict"
                accent="from-cyan-400 to-blue-500"
                title="预测客户需求与复购" 
                desc="利用企业现有数据预测客户下次购买时机与高价值客户，提升回款与销售转化。" 
                result="提高复购率、减少库存积压"
                icon={<TrendingUp className="w-7 h-7 text-cyan-300" />} 
              />
              <ServiceCard 
                delay={0.2} 
                index="Model 02"
                metric="Recover"
                accent="from-violet-400 to-fuchsia-500"
                title="捡回本来属于你的钱" 
                desc="自动监测销售断层与已流失线索并提醒跟进，让每个潜在订单都有机会成单。" 
                result="减少流失客户损失、提升成交机会"
                icon={<Anchor className="w-7 h-7 text-violet-300" />} 
              />
              <ServiceCard 
                delay={0.3} 
                index="Model 03"
                metric="Scale"
                accent="from-amber-300 to-orange-500"
                title="放大销售能力" 
                desc="用 AI 话术与私域自动化让优秀销售表现成倍复制，提高整体销售转化效率。" 
                result="同样团队下提升成交量"
                icon={<Zap className="w-7 h-7 text-amber-300" />} 
              />
            </div>
          </div>
        </section>
        
        {/* Case Study Section - Pass the click handler */}
        <CaseStudySection onOpenCase={setActiveCaseStudy} />

        {/* Digital Staff Section */}
        <div id="digital-staff">
          <DigitalStaffSection />
        </div>

        {/* Pricing Section */}
        <PricingSection />

        {/* Call to Action */}
        <section id="contact" className="py-24 bg-zinc-950/80 border-t border-white/10 relative overflow-hidden backdrop-blur-xl">
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">申请您的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI 增收点诊断</span></h2>
              <p className="text-lg md:text-xl text-gray-300">填写一份简短问卷，我们据此判断企业现金流增长点。</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto"
            >
              <a
                href={leadFormUrl}
                onClick={(event) => {
                  if (leadFormUrl === '#') event.preventDefault();
                }}
                className="group mx-auto w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-cyan-700 to-blue-800 px-8 py-5 text-lg font-black tracking-widest text-white transition-all hover:from-cyan-600 hover:to-blue-700"
              >
                <ClipboardList className="w-5 h-5" />
                填写增收诊断问卷
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
            
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-4">
              <div className="text-[10px] text-gray-500 flex flex-col md:flex-row items-center gap-2 md:gap-6 uppercase tracking-[0.2em]">
                <span>&copy; 2025 悖论矩阵 (Paradox Matrix). All rights reserved.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
