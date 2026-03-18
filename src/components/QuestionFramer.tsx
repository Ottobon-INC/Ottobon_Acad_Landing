import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight, Code, Lightbulb, X } from 'lucide-react';

interface Template {
    id: string;
    label: string;
    icon: React.ReactNode;
    prompt: string;
    placeholder: string;
}

const TEMPLATES: Template[] = [
    {
        id: 'debug',
        label: 'Debug Something',
        icon: <Code size={18} />,
        prompt: "I'm trying to [action], but [problem] is happening. I've already tried [what you tried].",
        placeholder: "I'm trying to center a div, but it's sticking to the left. I've already tried margin: auto."
    },
    {
        id: 'concept',
        label: 'Explain Concept',
        icon: <Lightbulb size={18} />,
        prompt: "Can you explain [concept] in the context of [use case]? How does it differ from [alternative]?",
        placeholder: "Can you explain SRI in the context of state management? How does it differ from Redux?"
    },
    {
        id: 'guidance',
        label: 'Career/Path Advice',
        icon: <ChevronRight size={18} />,
        prompt: "I want to achieve [goal] within [timeframe]. Based on my current skill in [skill], what should I focus on next?",
        placeholder: "I want to become a Senior UX Designer within 6 months. Based on my current skill in Figma, what should I focus on next?"
    }
];

interface QuestionFramerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (question: string) => void;
}

const QuestionFramer: React.FC<QuestionFramerProps> = ({ isOpen, onClose, onSelect }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [inputValue, setInputValue] = useState('');

    const handleConfirm = () => {
        if (inputValue.trim()) {
            onSelect(inputValue);
            setInputValue('');
            setSelectedTemplate(null);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                                    <HelpCircle size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Frame Your Question</h3>
                            </div>
                            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {!selectedTemplate ? (
                            <div className="space-y-3">
                                <p className="text-slate-400 text-sm mb-4">Choose a template to help you articulate your thoughts clearly.</p>
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setSelectedTemplate(t);
                                            setInputValue(t.prompt);
                                        }}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                                    >
                                        <div className="p-2 bg-slate-800 text-slate-300 rounded-lg group-hover:text-white transition-colors">
                                            {t.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{t.label}</div>
                                            <div className="text-xs text-slate-500">Structured prompt available</div>
                                        </div>
                                        <ChevronRight size={16} className="ml-auto text-slate-600" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="text-xs font-bold text-blue-400 hover:text-blue-300 mb-2 flex items-center gap-1"
                                >
                                    ← Back to templates
                                </button>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Question</label>
                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={selectedTemplate.placeholder}
                                        className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                    />
                                    <p className="text-[10px] text-slate-500 italic">Pro-tip: Replace the bracketed text [like this] with your specifics.</p>
                                </div>

                                <button
                                    onClick={handleConfirm}
                                    disabled={!inputValue.trim()}
                                    className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all shadow-lg shadow-blue-900/20"
                                >
                                    Ask This Question
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuestionFramer;
