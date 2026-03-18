
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowUp, Tv, Route } from 'lucide-react';
import { Helmet } from '@slorber/react-helmet-async';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AuthWallModal from './components/AuthWallModal';
import MorphingBackground from './components/MorphingBackground';
import Footer from './components/Footer';
import OfferingsCarousel from './components/carousel';
import WhyUsCarousel from './components/WhyUsCarousel';
import Chatbot from './components/Chatbot';

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
            <Helmet>
                <title>Ottobon Academy | Career in AI: AI Native Full Stack Developer, Course Platform & Expert App</title>
                <meta name="description" content="Your all-in-one career in AI destination. Master AI Native Full Stack Development on our course platform. Use our expert app for mentorship, resume builder for ATS jobs, and mock interviews for hiring. The ultimate jobs searcher for AI roles." />

                {/* Search Engine Verification Tags */}
                <meta name="google-site-verification" content="GSC_VERIFICATION_CODE_PLACEHOLDER" />
                <meta name="msvalidate.01" content="BING_VERIFICATION_CODE_PLACEHOLDER" />

                {/* Canonical Tag */}
                <link rel="canonical" href="https://academy.ottobon.in/" />

                {/* Open Graph Tags */}
                <meta property="og:site_name" content="Ottobon Academy" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:title" content="Ottobon Academy | Your Career in AI" />
                <meta property="og:description" content="Master AI Native Full Stack Development. Digital Twin mentorship, ATS Resume Builder, and AI Mock Interviews." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://academy.ottobon.in/" />
                <meta property="og:image" content="https://academy.ottobon.in/og-image.jpg" />

                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ottobon Academy | Your Career in AI" />
                <meta name="twitter:description" content="Master AI Native Full Stack Development with real industry experts." />
                <meta name="twitter:image" content="https://academy.ottobon.in/og-image.jpg" />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Ottobon Academy",
                        "url": "https://academy.ottobon.in/",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://academy.ottobon.in/?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Ottobon Academy",
                        "url": "https://academy.ottobon.in/",
                        "logo": "https://academy.ottobon.in/logo.png",
                        "description": "Ottobon Academy is the ultimate destination for your career in AI, providing course platform learning, expert app mentorship, and AI career tools."
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Course",
                        "name": "AI Native Full Stack Developer Program",
                        "description": "Comprehensive course platform for becoming an AI Native Full Stack Developer. Master AI for UI/UX, Marketing, and Agent Development using the Training Wheels Framework.",
                        "provider": {
                            "@type": "Organization",
                            "name": "Ottobon Academy",
                            "sameAs": "https://academy.ottobon.in/"
                        },
                        "hasCourseInstance": [
                            {
                                "@type": "CourseInstance",
                                "courseMode": "Online",
                                "name": "AI Native Full Stack Developer Cohort"
                            }
                        ]
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Ottobon Expert App & Mentorship",
                        "description": "Personalized 24/7 AI-driven mentorship through our Expert App. Specialized guidance for AI Native professionals.",
                        "provider": {
                            "@type": "Organization",
                            "name": "Ottobon Academy"
                        },
                        "areaServed": "Worldwide",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Mentorship Programs",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "AI Native Full Stack Developer Mentorship"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "AI Marketing & UX Mentorship"
                                    }
                                }
                            ]
                        }
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "AI Jobs Searcher & Career Tools",
                        "description": "The ultimate jobs searcher for AI roles, featuring an ATS resume builder and AI-driven mock interviews.",
                        "provider": {
                            "@type": "Organization",
                            "name": "Ottobon Academy"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Career Acceleration Toolkit",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Expert-Verified Resume Builder"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "AI Mock Interviews"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "AI Jobs Searcher"
                                    }
                                }
                            ]
                        }
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is a Digital Twin of a mentor?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "A Digital Twin is a highly intelligent replica trained on a real human expert's knowledge, teaching style, and judgment. It faithfully represents that specific mentor's expertise, verified by the expert themselves, to provide you with consistent, high-quality guidance."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How do I know the answers are accurate?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Every insight the platform provides is human-expert verified. Our technology only represents what the expert has approved — it doesn't guess or provide unverified information. Real humans provide the ultimate content; the platform just delivers it with unprecedented personalization."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "I'm from a smaller city. Will this work for me?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Absolutely. Ottobon Academy was designed to break geography barriers. Whether you're in a Tier 1 metro or a Tier 3 town, you get the same world-class mentorship, specialized curriculum, and career support. We even provide specialized assistance for those focusing on refining their communication skills."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What does 'binge-ready' learning mean?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Our modules are designed like short, engaging episodes — think of it as a streaming service for your career. Each lesson is snackable, personalized to your level, and adapts as you progress. It's built to keep you engaged and moving forward."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How does the learning adapt as I progress?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We use a 'training wheels' framework: you start with concrete, guided practice — then the platform gradually removes scaffolding as you grow, moving you toward independent, expert-level thinking. The difficulty evolves with you to ensure you're always challenged but never overwhelmed."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do real human experts still participate?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, always. While our intelligent replicas handle day-to-day mentorship at scale, live Expert Sessions, masterclasses, and final reviews are conducted by the actual human experts. We ensure that for critical learning moments, humans always have the final word."
                                }
                            }
                        ]
                    })}
                </script>
            </Helmet>

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
                        "Digital Twin of Real Experts",
                        "//",
                        "Human-Expert Verified",
                        "//",
                        "Access for Every City",
                        "//",
                        "Binge-Learn Like Netflix",
                        "//",
                        "From Guided to Independent",
                        "//",
                        "Not a Chatbot — A Mentor",
                        "//",
                        "Break the Scarcity Mindset",
                        "//",
                        "Your Career, Accelerated",
                        "//",
                        "Digital Twin of Real Experts",
                        "//",
                        "Human-Expert Verified",
                        "//",
                        "Access for Every City",
                        "//",
                        "Binge-Learn Like Netflix",
                        "//",
                        "From Guided to Independent",
                        "//",
                        "Not a Chatbot — A Mentor",
                        "//",
                        "Break the Scarcity Mindset",
                        "//",
                        "Your Career, Accelerated"
                    ].map((text, i) => (
                        <span key={i} className={text === "//" ? "text-blue-500 opacity-50" : "hover:text-white transition-colors"}>
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* --- Main Content Section (Offerings + Transform + FAQ) --- */}
            <section className="py-24 relative z-10">
                {/* Unified Decorative Blobs Holder */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#5F9B8C]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF7D2D]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 mix-blend-screen" />
                    <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#5F9B8C]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF7D2D]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />
                </div>

                {/* 1. Offerings Content */}
                <div id="offerings" className="px-6 md:px-20 relative z-10 mb-32">
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

                {/* 3. How You'll Learn — Binge-Watch Section */}
                <div className="px-6 md:px-20 relative z-10 mb-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                <Tv className="w-4 h-4" />
                                Binge-Ready Learning
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight"
                            >
                                How You'll Learn
                            </motion.h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Short, personalized episodes designed to keep you hooked — like Netflix for your career. No 3-hour lectures. Just pure, addictive learning.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { ep: "01", title: "Snackable Episodes", desc: "5-15 min lessons that fit your schedule. Binge one, or binge ten.", color: "#FF7D2D" },
                                { ep: "02", title: "Personalized Feed", desc: "Your Digital Twin curates content to your level — no irrelevant filler.", color: "#5F9B8C" },
                                { ep: "03", title: "Adaptive Difficulty", desc: "Start easy, get challenged. The content evolves as you grow.", color: "#A0C382" },
                                { ep: "04", title: "Progress Streaks", desc: "Track your streak, unlock milestones. Built to keep you coming back.", color: "#FFD700" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all"
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: item.color }} />
                                    <span className="text-5xl font-black opacity-10 absolute top-3 right-4" style={{ color: item.color }}>EP</span>
                                    <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: item.color }}>
                                        Episode {item.ep}
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Your Learning Journey — Training Wheels Stepper */}
                <div id="methodology" className="px-6 md:px-20 relative z-10 mb-32">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                <Route className="w-4 h-4" />
                                The Training Wheels Framework
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight"
                            >
                                Your Learning Journey
                            </motion.h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                We don't throw you in the deep end. You start with guided, concrete practice — and we gradually remove the training wheels as you master each stage.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Connecting line */}
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { stage: "1", title: "Listening", subtitle: "Personalized Discovery", desc: "We grab your attention by personalizing every piece of content to your background. Focus on what matters to you.", color: "#5F9B8C", icon: "👂" },
                                    { stage: "2", title: "Comprehension", subtitle: "Verified Growth", desc: "Prove your understanding through relevant quizzes as we gradually remove the 'training wheels' of support.", color: "#FF7D2D", icon: "🧠" },
                                    { stage: "3", title: "Articulation", subtitle: "Problem-Driven Mastery", desc: "Move beyond theory. Commmunicate solutions from a case-study perspective, solving real-world challenges.", color: "#A0C382", icon: "🗣️" }
                                ].map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 }}
                                        className="relative text-center"
                                    >
                                        {/* Stage circle */}
                                        <div className="mx-auto w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl mb-4 bg-[#0F172A] relative z-10" style={{ borderColor: step.color }}>
                                            {step.icon}
                                        </div>
                                        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: step.color }}>
                                            Pillar {step.stage}
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-1">{step.title}</h4>
                                        <p className="text-[#C79F4C] text-[10px] font-bold uppercase tracking-widest mb-3">{step.subtitle}</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>




                {/* 5. Why Ottobon? — Benefits Section */}
                <WhyUsCarousel />

                {/* 3. FAQ Content */}
                <div id="inquiries" className="px-6 md:px-20 relative z-20 pb-24">
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
                                    q: "What is a Digital Twin of a mentor?",
                                    a: "A Digital Twin is a highly intelligent replica trained on a real human expert's knowledge, teaching style, and judgment. It faithfully represents that specific mentor's expertise, verified by the expert themselves, to provide you with consistent, high-quality guidance."
                                },
                                {
                                    q: "How do I know the answers are accurate?",
                                    a: "Every insight the platform provides is human-expert verified. Our technology only represents what the expert has approved — it doesn't guess or provide unverified information. Real humans provide the ultimate content; the platform just delivers it with unprecedented personalization."
                                },
                                {
                                    q: "I'm from a smaller city. Will this work for me?",
                                    a: "Absolutely. Ottobon Academy was designed to break geography barriers. Whether you're in a Tier 1 metro or a Tier 3 town, you get the same world-class mentorship, specialized curriculum, and career support. We even provide specialized assistance for those focusing on refining their communication skills."
                                },
                                {
                                    q: "What does 'binge-ready' learning mean?",
                                    a: "Our modules are designed like short, engaging episodes — think of it as a streaming service for your career. Each lesson is snackable, personalized to your level, and adapts as you progress. It's built to keep you engaged and moving forward."
                                },
                                {
                                    q: "How does the learning adapt as I progress?",
                                    a: "We use a 'training wheels' framework: you start with concrete, guided practice — then the platform gradually removes scaffolding as you grow, moving you toward independent, expert-level thinking. The difficulty evolves with you to ensure you're always challenged but never overwhelmed."
                                },
                                {
                                    q: "Do real human experts still participate?",
                                    a: "Yes, always. While our intelligent replicas handle day-to-day mentorship at scale, live Expert Sessions, masterclasses, and final reviews are conducted by the actual human experts. We ensure that for critical learning moments, humans always have the final word."
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
            <Chatbot />
        </div >
    );
}
