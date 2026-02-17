import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Users, CheckCircle2, ArrowRight, X, ChevronRight, Zap, Award, Target, Layout, Star, TrendingUp } from 'lucide-react';

// --- Types ---

interface SubOffering {
    title: string;
    badge: string;
    desc: string;
    features: string[];
    icon?: React.ReactNode;
    color?: string; // Optional override
}

interface Offering {
    id: string;
    title: string;
    category: string;
    description: string;
    color: string;
    icon: React.ReactNode;
    features: string[];
    subOfferings: SubOffering[];
}

// --- Data ---

const offerings: Offering[] = [
    {
        id: 'course',
        title: "Course Platform",
        category: "Master the Machine",
        description: "Choose your path with our comprehensive learning solutions. Whether you prefer mentor-led cohorts, self-paced on-demand courses, or intensive workshops, we have the right format for you.",
        color: "#5F9B8C",
        icon: <GraduationCap className="w-8 h-8" />,
        features: [
            "Cohort Learning: Structured & Mentor-Led",
            "On-Demand: Flexible & Self-Paced",
            "Workshops: Intensive & Focused"
        ],
        subOfferings: [
            {
                title: "Cohort Learning",
                badge: "Mentor-Led",
                desc: "Structured, mentor-guided learning journey with real-world projects and team collaboration.",
                features: ["Fixed schedules", "Capstone projects", "Team collaboration"],
                icon: <Target className="w-5 h-5" />
            },
            {
                title: "On-Demand",
                badge: "Self-Paced",
                desc: "Flexible courses with AI-driven support for independent learning at your own speed.",
                features: ["Flexible schedule", "AI-powered support", "Practice simulations"],
                icon: <Zap className="w-5 h-5" />
            },
            {
                title: "Workshops",
                badge: "Intensive",
                desc: "Short, focused hands-on sessions for fast skill acquisition and immediate application.",
                features: ["Quick sessions", "Deep dives", "E-Certificates"],
                icon: <Award className="w-5 h-5" />
            }
        ]
    },
    {
        id: 'career',
        title: "Career Ladder",
        category: "Future-Proof Career",
        description: "Elevate your professional journey with our AI-powered career tools. Build ATS-friendly resumes, practice with AI mock interviews, and find jobs that match your personality and skills.",
        color: "#FF7D2D",
        icon: <Briefcase className="w-8 h-8" />,
        features: [
            "AI Resume Builder",
            "Smart Job Finder",
            "Mock Interview Practice"
        ],
        subOfferings: [
            {
                title: "Resume Building",
                badge: "Verified Secure",
                desc: "Start from scratch, modify existing, or create JD-based resumes with AI optimization.",
                features: ["ATS-Optimized Templates", "JD-Based Tailoring", "Instant Refinement"],
                icon: <Layout className="w-5 h-5" />
            },
            {
                title: "Mock Interviews",
                badge: "Verified Secure",
                desc: "Unlimited AI-powered practice with detailed feedback to boost your confidence.",
                features: ["Scenario-based Questions", "Detailed Feedback Analysis", "Actionable Improvement Tips"],
                icon: <Users className="w-5 h-5" />
            },
            {
                title: "Job Finder",
                badge: "Smart Match",
                desc: "Finds roles that fit both your skills and personality with personalized job alerts.",
                features: ["Personality Matching", "Real-time Job Alerts", "Culture Fit Analysis"],
                icon: <TrendingUp className="w-5 h-5" />
            }
        ]
    },
    {
        id: 'expert',
        title: "Expert App",
        category: "1:1 Guidance",
        description: "Get personalized mentorship from industry professionals. Receive real-time answers to technical questions, code reviews, and career advice to accelerate your growth.",
        color: "#A0C382",
        icon: <Users className="w-8 h-8" />,
        features: [
            "1:1 Mentorship Sessions",
            "Technical Q&A Support",
            "Expert Masterclasses"
        ],
        subOfferings: [
            {
                title: "1:1 Mentorship",
                badge: "Personalized",
                desc: "Get your own personalized answers and code reviews from industry professionals.",
                features: ["Personalized Roadmap", "Career Advice", "Code Reviews"],
                icon: <Users className="w-5 h-5" />
            },
            {
                title: "Technical Q&A",
                badge: "Real-Time",
                desc: "Don't get stuck. Receive real-time answers to your technical questions.",
                features: ["Instant Solutions", "Debug Support", "Best Practices"],
                icon: <CheckCircle2 className="w-5 h-5" />
            },
            {
                title: "Expert Sessions",
                badge: "Interactive",
                desc: "Build skills through interactive live sessions and masterclasses.",
                features: ["Live Workshops", "Industry Insights", "Q&A Sessions"],
                icon: <Star className="w-5 h-5" />
            }
        ]
    }
];

// --- Components ---

// --- Flip Card Component ---

const FlipSubCard = ({ item, color }: { item: SubOffering, color: string }) => {
    return (
        <div className="group relative w-full h-[320px] [perspective:1000px]">
            <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-xl">

                {/* --- FRONT (Initial View / "Back" in user code) --- */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden bg-[#151515] flex items-center justify-center">
                    {/* Animated Gradient Border */}
                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,#ff9966_90deg,transparent_180deg)] animate-[spin_4s_linear_infinite]"
                        style={{ backgroundImage: `conic-gradient(from 0deg, transparent 0deg, ${color} 90deg, transparent 180deg)` }}
                    />

                    {/* Inner Content Container */}
                    <div className="absolute inset-[2px] bg-[#151515] rounded-xl flex flex-col items-center justify-center gap-6 p-6">
                        <div className="p-4 rounded-full bg-white/5 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 }) : item.icon}
                        </div>
                        <h4 className="text-xl font-bold text-white text-center tracking-wider">{item.title}</h4>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-white/5">
                            Hover to Reveal
                        </span>
                    </div>
                </div>

                {/* --- BACK (Hover View / "Front" in user code) --- */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden bg-[#151515] text-white">
                    {/* Floating Blobs Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-24 h-24 rounded-full bg-[#ffbb66] blur-[20px] animate-[bounce_3s_infinite]"
                            style={{ backgroundColor: color, top: '-20px', left: '-20px', animationDuration: '4s' }} />
                        <div className="absolute w-32 h-32 rounded-full bg-[#ff8866] blur-[25px] animate-[pulse_4s_infinite]"
                            style={{ backgroundColor: color, bottom: '-40px', right: '-40px', opacity: 0.6 }} />
                    </div>

                    {/* Glass Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between bg-black/40 backdrop-blur-[2px]">
                        <div className="flex justify-between items-start">
                            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase text-white/90 border border-white/10">
                                {item.badge}
                            </span>
                        </div>

                        <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
                            <h5 className="text-sm font-bold text-white mb-2 flex items-center justify-between">
                                {item.title}
                                {React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement<any>, { size: 14, className: "text-slate-400" }) : item.icon}
                            </h5>
                            <p className="text-xs text-slate-400 leading-relaxed mb-3">
                                {item.desc}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {item.features.slice(0, 2).map((f, i) => (
                                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const OfferingCard = ({ offering, index, scrollYProgress, totalCards }: { offering: Offering, index: number, scrollYProgress: any, totalCards: number }) => {
    const [isExplored, setIsExplored] = useState(false);

    // Calculate start/end for this specific card's animation window
    const stepSize = 1 / totalCards;
    const start = index * stepSize;
    const end = start + stepSize;

    // Scale down as the next card comes in
    const scale = useTransform(scrollYProgress, [start, end], [1, 0.9]);

    // Entrance animations
    const opacity = useTransform(scrollYProgress, [start, start + 0.15], [0, 1]);
    const y = useTransform(scrollYProgress, [start, start + 0.2], [100, 0]);

    return (
        <div className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    opacity: index === 0 ? 1 : opacity,
                    top: `calc(10% + ${index * 40}px)`,
                    backgroundColor: '#161616', // Darker card background
                    borderTop: `1px solid ${offering.color}60`, // Subtle colored top border
                    boxShadow: `0 -10px 40px -10px ${offering.color}10` // Subtle glow
                }}
                className="relative w-[95%] max-w-6xl h-[650px] rounded-[32px] overflow-hidden border-x border-b border-white/10 flex flex-col md:flex-row transition-all duration-700"
            >
                {/* Background Vibes */}
                <div
                    className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none mix-blend-screen"
                    style={{ backgroundColor: offering.color }}
                />

                <AnimatePresence mode="wait">
                    {!isExplored ? (
                        /* --- DEFAULT VIEW --- */
                        <motion.div
                            key="default"
                            className="flex flex-col md:flex-row w-full h-full p-8 md:p-12 gap-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Left: Content */}
                            <motion.div
                                style={{ y }}
                                className="flex-1 flex flex-col justify-center z-10"
                            >
                                <div
                                    className="w-fit px-4 py-1.5 rounded-full text-xs font-bold mb-8 backdrop-blur-md border uppercase tracking-widest flex items-center gap-2"
                                    style={{
                                        borderColor: `${offering.color}30`,
                                        backgroundColor: `${offering.color}10`,
                                        color: offering.color
                                    }}
                                >
                                    {offering.icon}
                                    {offering.category}
                                </div>

                                <h3 className="text-5xl md:text-6xl font-black mb-8 text-white leading-[0.9] tracking-tight">
                                    {offering.title}
                                </h3>

                                <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
                                    {offering.description}
                                </p>

                                <button
                                    onClick={() => setIsExplored(true)}
                                    className="group flex items-center gap-4 w-fit px-8 py-4 rounded-full font-bold text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_-5px_var(--shadow-color)]"
                                    style={{ backgroundColor: offering.color, '--shadow-color': offering.color } as any}
                                >
                                    EXPLORE {offering.title.toUpperCase()}
                                    <div className="bg-black text-white rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                                        <ArrowRight size={14} />
                                    </div>
                                </button>
                            </motion.div>

                            {/* Right: Visual / Features */}
                            <motion.div
                                style={{ x: y }}
                                className="flex-1 relative flex flex-col items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/5 backdrop-blur-sm -skew-y-2 transform transition-transform duration-700 group-hover:skew-y-0" />

                                <div className="relative z-10 w-full max-w-sm space-y-4">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Key Highlights</h4>
                                    {offering.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#0A0A0A]/50 border border-white/5 backdrop-blur-md">
                                            <div className="p-2 rounded-full bg-white/5">
                                                <CheckCircle2 size={16} style={{ color: offering.color }} />
                                            </div>
                                            <span className="text-slate-200 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* --- EXPLORED VIEW --- */
                        <motion.div
                            key="explored"
                            className="flex flex-col w-full h-full p-8 md:p-12 relative"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Header with Back Button */}
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-[${offering.color}]/10 text-[${offering.color}]`} style={{ backgroundColor: `${offering.color}15`, color: offering.color }}>
                                        {offering.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white">{offering.title}</h3>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Select a path</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsExplored(false)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white"
                                >
                                    <X size={14} /> Close
                                </button>
                            </div>

                            {/* Sub-Offerings Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                                {offering.subOfferings.map((sub, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="h-full"
                                    >
                                        <FlipSubCard item={sub} color={offering.color} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

const OfferingsStack = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={containerRef} className="bg-transparent" id="offerings-stack">
            {/* Scroll Spacer */}
            {offerings.map((offering, i) => (
                <OfferingCard
                    key={i}
                    index={i}
                    offering={offering}
                    scrollYProgress={scrollYProgress}
                    totalCards={offerings.length}
                />
            ))}
            <div className="h-[20vh]" />
        </div>
    );
};

export default OfferingsStack;
