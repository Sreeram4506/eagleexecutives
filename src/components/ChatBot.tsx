import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Eagle Executive assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      console.log("Current Env:", import.meta.env);
      const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
      
      if (!apiKey) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'I apologize, but the ChatBot is not properly configured (Missing API Key). Please contact the administrator.' 
        }]);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/nvidia/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta/llama3-70b-instruct",
          messages: [
            { 
              role: "system", 
              content: "You are a professional and helpful assistant for Eagle Executive Transport & Security Inc. You provide information about luxury transport, executive security services, and booking. Be polite, concise, and professional. The company offers private security, executive protection, and premium transport services." 
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage }
          ],
          temperature: 0.5,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("NVIDIA API Error:", errorData);
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error: any) {
      console.error("Error calling NVIDIA API:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Connection error: ${error.message || "Please try again later."}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#1a1a1a] border border-[#d4af37]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[#d4af37] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded-lg">
                  <Bot size={20} className="text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-black font-bold text-sm tracking-tight">Eagle Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-black/70 text-[10px] uppercase tracking-wider font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-black/10 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0f0f0f]/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      m.role === 'user' ? 'bg-[#d4af37]' : 'bg-gray-800'
                    }`}>
                      {m.role === 'user' ? <User size={14} className="text-black" /> : <Bot size={14} className="text-[#d4af37]" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-[#d4af37] text-black rounded-tr-none shadow-lg' 
                        : 'bg-gray-800/80 text-white border border-gray-700 rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <Bot size={14} className="text-[#d4af37]" />
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-2xl rounded-tl-none border border-gray-700">
                      <Loader2 size={16} className="text-[#d4af37] animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#1a1a1a] border-t border-gray-800">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-all placeholder:text-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-[#d4af37] text-black p-2.5 rounded-xl hover:bg-[#e8c547] transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-500 mt-2 tracking-wide uppercase">
                Powered by Eagle Security AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-gray-800 text-white' : 'bg-[#d4af37] text-black'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
