
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { processUserQuery } from '../services/chatService';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    followUps?: string[];
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Ottobot, your AI guide. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
            followUps: ["What is Ottobon Academy?", "How do Digital Twins work?", "What courses do you offer?"]
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const handleSend = async (textOverride?: string) => {
        const messageText = textOverride || input;
        if (!messageText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate a slight delay for better UX
        setTimeout(() => {
            const chatResult = processUserQuery(messageText);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: chatResult.answer,
                sender: 'bot',
                timestamp: new Date(),
                followUps: chatResult.followUps
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-blue-600 text-white hover:bg-blue-500'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                    <Bot className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Ottobot</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Digital Guide</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <div key={msg.id} className="space-y-3">
                                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`mt-1 p-1 rounded-lg shrink-0 h-fit ${msg.sender === 'user' ? 'bg-blue-500/10' : 'bg-slate-700/30'}`}>
                                                {msg.sender === 'user' ? <User className="w-3 h-3 text-blue-400" /> : <Bot className="w-3 h-3 text-blue-400" />}
                                            </div>
                                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20'
                                                    : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Follow Up Suggestions for the Last Bot Message */}
                                    {msg.sender === 'bot' && idx === messages.length - 1 && msg.followUps && msg.followUps.length > 0 && !isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-wrap gap-2 pl-7"
                                        >
                                            {msg.followUps.map((text, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSend(text)}
                                                    className="text-xs py-1.5 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all flex items-center gap-1.5 group"
                                                >
                                                    <Sparkles className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                                    {text}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 max-w-[85%]">
                                        <div className="mt-1 p-1 rounded-lg bg-slate-700/30">
                                            <Bot className="w-3 h-3 text-blue-400" />
                                        </div>
                                        <div className="bg-slate-800/80 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-900/50 border-t border-white/5">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-2xl p-2 pl-4 focus-within:border-blue-500/50 transition-colors"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about Ottobon..."
                                    className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};

export default Chatbot;
