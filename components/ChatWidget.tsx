
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, AlertTriangle, Loader2, Sparkles } from 'lucide-react';

// 配置信息：恢复为硬编码 ID
// CONFIRMED: Chat Bot Workflow ID
const API_CONFIG = {
  WORKFLOW_ID: '7581601847456448566',
  ENDPOINT: '/api/proxy/coze', 
};

// 系统预设指令：用于定义 AI 的人设与回复风格
const SYSTEM_DIRECTIVE = `
[System Directive]
Role: AI Revenue Consultant.
Tone: Rational, Results-oriented.
Task: Provide a professional diagnosis based on user input.
`;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  isError?: boolean;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'assistant', 
      content: '系统已连接。我是智能业务中枢。请告诉我您的行业或业务难题，我将为您匹配增收模型。' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  // 递归提取 Coze API 返回的嵌套内容
  const extractText = (data: any): string => {
    if (!data) return '';
    
    // 处理 JSON 字符串化的情况
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return extractText(parsed); 
      } catch (e) {
        return data; 
      }
    }

    // 尝试探测常见的返回字段
    if (typeof data === 'object') {
      const keysToTry = ['output', 'answer', 'response', 'result', 'content', 'data', 'text'];
      for (const key of keysToTry) {
        if (data[key]) return extractText(data[key]);
      }
      // 兜底策略：查找第一个字符串属性
      const firstStr = Object.values(data).find(v => typeof v === 'string');
      if (firstStr) return String(firstStr);
    }

    return String(data);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '正在处理您的请求...', isStreaming: true }]);

    try {
      // 通过本地代理转发请求，避免暴露 Token
      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow_id: API_CONFIG.WORKFLOW_ID,
          parameters: { input: userText + "\n" + SYSTEM_DIRECTIVE }
        })
      });

      const result = await response.json();
      
      if (result.code === 0) {
        const aiText = extractText(result.data) || '分析完成。';
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMsgId ? { ...msg, content: aiText, isStreaming: false } : msg
        ));
      } else {
        throw new Error(result.msg || `Service Error: ${result.code}`);
      }
    } catch (err: any) {
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMsgId ? { 
          ...msg, 
          content: `连接超时或配置错误，请检查 .env 配置。`, 
          isStreaming: false, 
          isError: true 
        } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-[99] w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg border border-cyan-400/30"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" className="w-5 h-5" /> : <Sparkles key="m" className="w-5 h-5" />}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 md:right-8 z-[100] w-[90vw] md:w-[380px] h-[60vh] max-h-[550px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/80">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">AI Consultant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-zinc-900 border border-white/10 text-gray-300'
                  } ${msg.isError ? 'text-red-400 border-red-500/30' : ''}`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {msg.isStreaming && <div className="mt-2 flex gap-1"><span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" /><span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-75" /><span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-150" /></div>}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/50 border-t border-white/5 flex gap-2">
              <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入您的业务难题..." 
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button disabled={isLoading || !inputValue.trim()} className="p-2 bg-cyan-600 text-white rounded-lg disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
