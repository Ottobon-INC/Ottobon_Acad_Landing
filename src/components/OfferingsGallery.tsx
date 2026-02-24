
import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Target, Zap, Award, TrendingUp, Users, ArrowRight, Layout, Briefcase, GraduationCap, CheckCircle2, Star } from 'lucide-react';
import FlipCard from './FlipCard';

type PanelId = 'course' | 'career' | 'expert';

const OfferingsGallery = () => {
    const [activePanel, setActivePanel] = useState<PanelId | null>('course');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.2 });

    // Auto-collapse when scrolled out of view
    React.useEffect(() => {
        if (!isInView) {
            setActivePanel(null);
        }
    }, [isInView]);

    const handlePanelClick = (id: PanelId) => {
        setActivePanel(prev => prev === id ? null : id);
    };

    const panels = [
        {
            id: 'course' as PanelId,
            title: "Course Platform",
            subtitle: "Master the Machine",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "#5F9B8C",
            content: <CourseContent />
        },
        {
            id: 'career' as PanelId,
            title: "Career Ladder",
            subtitle: "Future-Proof Career",
            icon: <Briefcase className="w-6 h-6" />,
            color: "#FF7D2D",
            content: <CareerContent />
        },
        {
            id: 'expert' as PanelId,
            title: "Expert App",
            subtitle: "1:1 Guidance",
            icon: <Users className="w-6 h-6" />,
            color: "#A0C382",
            content: <ExpertContent />
        }
    ];

    return (
        <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col gap-6 p-4">
            {panels.map((panel) => {
                const isActive = activePanel === panel.id;
                return (
                    <motion.div
                        key={panel.id}
                        layout
                        initial={false}
                        onClick={() => handlePanelClick(panel.id)}
                        className={`relative rounded-3xl overflow-hidden cursor-pointer border backdrop-blur-md transition-all duration-500
                            ${isActive
                                ? 'border-white/20 bg-[#0B0F19] shadow-[0_0_30px_rgba(0,0,0,0.3)]'
                                : 'border-white/5 hover:border-white/10 hover:bg-white/5 bg-[#0B0F19]/50'
                            }`}
                    >
                        {/* Header Section (Always Visible) */}
                        <div className="p-6 md:p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-2xl border transition-colors duration-500
                                    ${isActive
                                        ? `bg-[${panel.color}]/10 border-[${panel.color}]/20 text-[${panel.color}]`
                                        : 'bg-white/5 border-white/10 text-slate-400'
                                    }`}
                                    style={{ color: isActive ? panel.color : undefined, borderColor: isActive ? panel.color : undefined }}
                                >
                                    {panel.icon}
                                </div>
                                <div>
                                    <h3 className={`text-2xl md:text-3xl font-black transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                        {panel.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">
                                        {panel.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Toggle Indicator / Action CTA */}
                            <div className="flex items-center gap-4">
                                {!isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-widest"
                                    >
                                        <span className="animate-pulse">Explore</span>
                                    </motion.div>
                                )}
                                <motion.div
                                    animate={{
                                        rotate: isActive ? 180 : 0,
                                        backgroundColor: isActive ? '#ffffff' : 'rgba(255,255,255,0.05)'
                                    }}
                                    className={`p-3 rounded-full border border-white/10 transition-colors ${isActive ? 'text-black' : 'text-white'}`}
                                >
                                    <ArrowRight className={`w-5 h-5 ${isActive ? 'rotate-[-90deg]' : 'rotate-90'}`} />
                                </motion.div>
                            </div>
                        </div>

                        {/* Expandable Content Body */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <div className="border-t border-white/5 p-6 md:p-10 pt-4 cursor-default" onClick={(e) => e.stopPropagation()}>
                                        {panel.content}

                                        {/* Bottom Collapse / Scroll Up Button */}
                                        <div className="flex justify-center mt-8 pt-8 border-t border-white/5">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActivePanel(null);
                                                    // Optional: Scroll back to header if needed, but auto-collapse logic handles state
                                                }}
                                                className="group flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors"
                                            >
                                                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                                    <ArrowRight className="w-5 h-5 -rotate-90" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">Close</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

// --- Detailed Sub-Components ---

const CourseContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            {
                title: "Cohort Learning",
                badge: "Mentor-Led",
                desc: "Structured, mentor-guided learning journey with real-world projects and team collaboration.",
                features: ["Fixed schedules", "Capstone projects", "Team collaboration"],
                icon: <Target className="w-5 h-5" />,
                color: "#FF7D2D"
            },
            {
                title: "On-Demand",
                badge: "Self-Paced",
                desc: "Flexible courses with AI-driven support for independent learning at your own speed.",
                features: ["Flexible schedule", "AI-powered support", "Practice simulations"],
                icon: <Zap className="w-5 h-5" />,
                color: "#5F9B8C"
            },
            {
                title: "Workshops",
                badge: "Intensive",
                desc: "Short, focused hands-on sessions for fast skill acquisition and immediate application.",
                features: ["Quick sessions", "Deep dives", "E-Certificates"],
                icon: <Award className="w-5 h-5" />,
                color: "#A0C382"
            }
        ].map((item, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
            >
                <FlipCard
                    title={item.title}
                    badge={item.badge}
                    icon={item.icon}
                    description={item.desc}
                    features={item.features}
                    color={item.color}
                />
            </motion.div>
        ))}
    </div>
);

const CareerContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            {
                title: "Resume Building",
                badge: "Verified Secure",
                desc: "Start from scratch, modify existing, or create JD-based resumes with AI optimization.",
                features: ["ATS-Optimized Templates", "JD-Based Tailoring", "Instant Refinement"],
                icon: <Layout className="w-5 h-5" />,
                secure: true,
                color: "#181229"
            },
            {
                title: "Mock Interviews",
                badge: "Verified Secure",
                desc: "Unlimited AI-powered practice with detailed feedback to boost your confidence.",
                features: ["Scenario-based Questions", "Detailed Feedback Analysis", "Actionable Improvement Tips"],
                icon: <Users className="w-5 h-5" />,
                secure: true,
                color: "#FF7D2D"
            },
            {
                title: "Job Finder",
                badge: "Smart Match",
                desc: "Finds roles that fit both your skills and personality with personalized job alerts.",
                features: ["Personality Matching", "Real-time Job Alerts", "Culture Fit Analysis"],
                icon: <TrendingUp className="w-5 h-5" />,
                secure: false,
                color: "#5F9B8C"
            }
        ].map((item, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
            >
                <FlipCard
                    title={item.title}
                    badge={item.secure ? "Secure & Private" : item.badge}
                    icon={item.icon}
                    description={item.desc}
                    features={item.features}
                    color={item.color === "#181229" ? "#64748b" : item.color} // Adjust dark color for visibility
                />
            </motion.div>
        ))}
    </div>
);

const ExpertContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            {
                title: "1:1 Mentorship",
                badge: "Personalized",
                desc: "Get your own personalized answers and code reviews from industry professionals.",
                features: ["Personalized Roadmap", "Career Advice", "Code Reviews"],
                icon: <Users className="w-5 h-5" />,
                color: "#A0C382"
            },
            {
                title: "Technical Q&A",
                badge: "Real-Time",
                desc: "Don't get stuck. Receive real-time answers to your technical questions.",
                features: ["Instant Solutions", "Debug Support", "Best Practices"],
                icon: <CheckCircle2 className="w-5 h-5" />,
                color: "#5F9B8C"
            },
            {
                title: "Expert Sessions",
                badge: "Interactive",
                desc: "Build skills through interactive live sessions and masterclasses.",
                features: ["Live Workshops", "Industry Insights", "Q&A Sessions"],
                icon: <Star className="w-5 h-5" />,
                color: "#FF7D2D"
            }
        ].map((item, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
            >
                <FlipCard
                    title={item.title}
                    badge={item.badge}
                    icon={item.icon}
                    description={item.desc}
                    features={item.features}
                    color={item.color}
                />
            </motion.div>
        ))}
    </div>
);

export default OfferingsGallery;
