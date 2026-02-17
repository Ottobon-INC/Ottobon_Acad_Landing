
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AuthWallModal from './components/AuthWallModal';
import MorphingBackground from './components/MorphingBackground';
import Footer from './components/Footer';
import OfferingsCarousel from './components/carousel';

const FAQItem = ({
    item,
    isOpen,
    onToggle
}: {
    item: { q: string, a: string };
    isOpen: boolean;
    onToggle: () => void;
}) => {
    return (
        <div className={`relative transition-all duration-300 ${isOpen ? 'z-50' : 'z-0'}`}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                className={`w-full flex items-center justify-between p-6 text-left rounded-2xl bg-[#0F172A] border transition-all duration-300 group
                    ${isOpen ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-slate-900' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'}
                `}
            >
                <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-blue-400' : 'text-white'}`}>
                    {item.q}
                </span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {isOpen ? <ChevronUp className="text-blue-400" /> : <ChevronDown className="text-slate-400 group-hover:text-slate-200" />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[calc(100%+0.75rem)] left-0 w-full rounded-2xl bg-[#0F172A] border border-blue-500/30 p-6 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <p className="text-slate-300 leading-relaxed">
                                {item.a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main Landing Page Component ---
export default function LandingPage() {

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    // Close FAQ on click outside
    useEffect(() => {
        const handleClickOutside = () => setOpenFaqIndex(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    // Scroll to Top Logic
    const [showScrollTop, setShowScrollTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#0A0A0A] min-h-screen font-sans selection:bg-[#FFD166] selection:text-[#181229] relative">
            <MorphingBackground mode={'grid'} />
            <Navbar onLoginClick={() => setAuthModalOpen(true)} />
            <AuthWallModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
            <HeroSection onOpenAuth={() => setAuthModalOpen(true)} />

            {/* --- Innovative Thoughts Ticker --- */}
            <div className="bg-[#0A0A0A] border-y border-white/5 py-3 overflow-hidden relative z-20 flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 pointer-events-none" />
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                    className="flex items-center gap-12 whitespace-nowrap text-slate-400 text-xs md:text-sm uppercase tracking-[0.2em] font-medium"
                    style={{ willChange: "transform" }}
                >
                    {[
                        "Redefining Human Potential",
                        "//",
                        "AI-Native Education",
                        "//",
                        "Master the Machine",
                        "//",
                        "Build the Unimaginable",
                        "//",
                        "From Consumer to Creator",
                        "//",
                        "Speed of Thought",
                        "//",
                        "Future-Proof Your Career",
                        "//",
                        "Code + AI = Superpower",
                        "//",
                        "Redefining Human Potential",
                        "//",
                        "AI-Native Education",
                        "//",
                        "Master the Machine",
                        "//",
                        "Build the Unimaginable",
                        "//",
                        "From Consumer to Creator",
                        "//",
                        "Speed of Thought",
                        "//",
                        "Future-Proof Your Career",
                        "//",
                        "Code + AI = Superpower"
                    ].map((text, i) => (
                        <span key={i} className={text === "//" ? "text-blue-500 opacity-50" : "hover:text-white transition-colors"}>
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* --- Main Content Section (Offerings + Transform + FAQ) --- */}
            <section className="py-24 relative z-10">
                {/* Unified Decorative Blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#5F9B8C]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF7D2D]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 mix-blend-screen" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#5F9B8C]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF7D2D]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />

                {/* 1. Offerings Content */}
                <div className="px-6 md:px-20 relative z-10 mb-32">
                    <div className="max-w-7xl mx-auto">

                        {/* Section Header */}
                        <div className="text-center mb-4">
                            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                                Our Offerings
                            </h2>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                Choose your path to success with our comprehensive learning and career solutions
                            </p>
                        </div>

                        {/* Offerings Carousel */}
                        <div className="mb-0">
                            <OfferingsCarousel />
                        </div>
                    </div>
                </div>

                {/* 2. Transform Career Content */}
                <div className="px-6 md:px-20 relative z-10 mb-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight"
                            >
                                Ready to Transform Your Career?
                            </motion.h2>
                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of students who have successfully transitioned into independent consultants through our AI-enhanced learning programs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Industry-Ready Skills",
                                    desc: "Salesforce, Oracle, Cloud Computing & Full Stack Development",
                                    icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
                                    color: "#FF7D2D"
                                },
                                {
                                    title: "AI-Enhanced Learning",
                                    desc: "Personalized curriculum that adapts to your learning style",
                                    icon: <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7V5.73A2 2 0 0 1 12 2z" />,
                                    color: "#5F9B8C"
                                },
                                {
                                    title: "Consulting Success",
                                    desc: "Graduate as an independent consultant, not just an employee",
                                    icon: <rect x="2" y="7" width="20" height="14" rx="2" ry="2" transform="translate(0 0)" />,
                                    iconExtra: <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />,
                                    color: "#A0C382"
                                }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-white/20 hover:bg-white/10 shadow-lg transition-all backdrop-blur-md"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#233C4B]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#233C4B]/30 transition-colors" />

                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {card.icon}
                                            {card.iconExtra}
                                        </svg>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {card.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. FAQ Content */}
                <div className="px-6 md:px-20 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                                FAQ
                            </h2>
                            <div className="h-1 w-24 bg-white/20 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {[
                                {
                                    q: "What does Ottobon Academy include?",
                                    a: "Guided learning paths, mentor sessions, portfolio projects, assessments, resume craft, role matching, and interview prep—optimized with AI to cut learning time."
                                },
                                {
                                    q: "Do you help with job placement?",
                                    a: "We support your full job journey: ATS-ready resume, role targeting, mock interviews with feedback, and post-placement check-ins."
                                },
                                {
                                    q: "How much time should I budget for Academy?",
                                    a: "Expect structured weekly cadence with project work. Many learners complete core paths in 12–16 weeks, depending on prior experience."
                                },
                                {
                                    q: "Can I join while working full-time?",
                                    a: "Yes. We design schedules for working professionals with asynchronous modules plus mentor checkpoints."
                                },
                                {
                                    q: "What courses are available in the Academy?",
                                    a: "We offer AI for UI/UX Design, AI in Marketing, AI Agent Development, and AI Data Labeling. Each course includes practical projects and industry-relevant skills."
                                },
                                {
                                    q: "How does the AI-powered learning work?",
                                    a: "Our AI system personalizes your learning path, provides instant feedback on projects, and adapts the curriculum based on your progress and career goals."
                                }
                            ].map((item, i) => (
                                <FAQItem
                                    key={i}
                                    item={item}
                                    isOpen={openFaqIndex === i}
                                    onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Scroll To Top Button */}
            <AnimatePresence>
                {
                    showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={scrollToTop}
                            className="btn-primary btn-icon fixed bottom-8 right-8 z-50 focus:outline-none focus:ring-4 focus:ring-[#181229]/20"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-6 h-6" />
                        </motion.button>
                    )
                }
            </AnimatePresence >
        </div >
    );
}
