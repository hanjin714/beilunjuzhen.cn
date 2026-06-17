
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const BackgroundEffect: React.FC = () => {
  const { scrollY } = useScroll();
  
  // 使用 useSpring 平滑滚动值，避免由于滚动过快导致的视觉跳动
  // 这种平滑处理也是在 JS 层面计算，开销极小
  const smoothOptions = { damping: 15, stiffness: 50, mass: 0.5 };
  const smoothY = useSpring(scrollY, smoothOptions);

  // --- 视差映射逻辑 ---
  
  // 1. 背景光斑视差 (移动最慢，营造深远感)
  const blobY1 = useTransform(smoothY, [0, 2000], [0, -200]);
  const blobY2 = useTransform(smoothY, [0, 2000], [0, 300]);

  // 2. 矢量数据环旋转 (随滚动旋转，像精密的齿轮)
  // [0, 5000] 像素的滚动对应 [0, 360] 度的旋转
  const ringRotate1 = useTransform(smoothY, [0, 5000], [0, 180]);
  const ringRotate2 = useTransform(smoothY, [0, 5000], [0, -90]);

  // 3. 3D 网格推进 (模拟向前飞行的感觉)
  // 利用 background-position-y 循环移动，产生无限延伸的错觉
  const gridMove = useTransform(smoothY, [0, 1000], [0, 40]); // 40px 是网格单元的大小

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#030303] pointer-events-none select-none">
      
      {/* 
        Layer 0: 静态底噪 (Noise)
        给纯黑背景增加胶片质感，解决屏幕色彩断层(Banding)问题 
        使用 SVG 滤镜比大图片更省流量
      */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
         <svg className='w-full h-full'>
            <filter id='noise'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
            </filter>
            <rect width='100%' height='100%' filter='url(#noise)' />
         </svg>
      </div>

      {/* 
        Layer 1: 氛围光斑 (Ambient Blobs)
        使用 will-change: transform 强制开启 GPU 独立层
      */}
      <motion.div 
        style={{ y: blobY1, x: -100 }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/10 blur-[120px] will-change-transform"
      />
      <motion.div 
        style={{ y: blobY2, x: 100 }}
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/5 blur-[100px] will-change-transform"
      />

      {/* 
        Layer 2: 3D 透视网格 (Retro Scifi Grid)
        位于屏幕下半部分，产生“地面”感
      */}
      <div className="absolute inset-0 perspective-[500px] overflow-hidden">
        <motion.div
            style={{ 
              backgroundPositionY: gridMove,
              // 关键优化：使用 opacity 渐变遮罩，让网格在远处柔和消失
              maskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)'
            }}
            className="absolute inset-0 origin-bottom"
        >
            {/* 网格图案由 CSS 渐变生成，比图片快得多 */}
            <div 
              className="w-full h-[200%] absolute bottom-[-50%] left-[-50%] right-[-50%] bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"
              style={{
                  transform: 'rotateX(60deg) scale(2)', // 3D 倾斜
              }}
            />
        </motion.div>
      </div>

      {/* 
        Layer 3: 矢量数据环 (Vector Rings)
        巨大的精密几何图形，极细线条，提升“科技精密感”
      */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
         {/* 外环 */}
         <motion.div 
            style={{ rotate: ringRotate1 }}
            className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-dashed border-cyan-500/30 rounded-full will-change-transform"
         />
         {/* 内环 */}
         <motion.div 
            style={{ rotate: ringRotate2 }}
            className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border border-white/10 rounded-full will-change-transform flex items-center justify-center"
         >
            {/* 装饰性刻度 */}
            <div className="w-[102%] h-[102%] border-t border-b border-transparent border-l border-r border-cyan-500/50 absolute" />
         </motion.div>
      </div>

      {/* 
        Layer 4: 浮动 HUD 装饰 (Floating UI Elements)
        分布在角落，随滚动产生较快的视差
      */}
      <HUDElement x="5%" y="10%" speed={0.5} scrollY={smoothY}>
         <PlusMarker />
      </HUDElement>
      <HUDElement x="90%" y="15%" speed={0.8} scrollY={smoothY}>
         <CornerBracket />
      </HUDElement>
      <HUDElement x="10%" y="80%" speed={0.3} scrollY={smoothY}>
         <div className="flex gap-1">
             <div className="w-1 h-1 bg-white/20"></div>
             <div className="w-1 h-1 bg-white/20"></div>
             <div className="w-1 h-1 bg-white/20"></div>
         </div>
      </HUDElement>
      <HUDElement x="85%" y="85%" speed={0.6} scrollY={smoothY}>
         <PlusMarker />
      </HUDElement>

    </div>
  );
};

// --- 子组件：HUD 装饰元素封装 ---

interface HUDElementProps {
  x: string;
  y: string;
  speed: number;
  scrollY: any;
  children?: React.ReactNode;
}

const HUDElement = ({ x, y, speed, scrollY, children }: HUDElementProps) => {
  const yMove = useTransform(scrollY, [0, 1000], [0, -200 * speed]);
  return (
    <motion.div 
      style={{ left: x, top: y, y: yMove }}
      className="absolute text-cyan-500/40 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

const PlusMarker = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M10 0V20M0 10H20" />
  </svg>
);

const CornerBracket = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M1 10V1H10" />
  </svg>
);

export default BackgroundEffect;
