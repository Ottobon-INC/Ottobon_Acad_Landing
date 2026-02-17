import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft, Lock } from 'lucide-react';
import ParticleSphere from './ParticleSphere';

interface SlideConfig {
    id: number;
    headline: string;
    subtext: string;
    cta: string;
    color: string;           // Primary color for nucleus
    secondaryColor: string;  // Secondary color for particles
    distort: number;         // Distortion level
    theme: string;           // For text gradients
}

const SLIDES: SlideConfig[] = [
    {
        id: 0,
        headline: "Unlock Global Career Access",
        subtext: "Master the AI skills that top enterprises demand. Your gateway to elite consulting roles starts here.",
        cta: "Start Your Journey",
        color: "#FFD700",       // Gold
        secondaryColor: "#FFFFFF", // White
        distort: 0.3,
        theme: "from-yellow-200 to-amber-500"
    },
    {
        id: 1,
        headline: "Learn Like An Expert",
        subtext: "Experience mentor-led cohorts where AI accelerates your learning path by 10x.",
        cta: "Explore Courses",
        color: "#0000FF",       // Blue
        secondaryColor: "#00FFFF", // Cyan
        distort: 0.6,
        theme: "from-blue-400 to-cyan-400"
    },
    {
        id: 2,
        headline: "Build The Future Now",
        subtext: "Don't just watch the AI revolution. Build intelligent applications that change the world.",
        cta: "Join Community",
        color: "#800080",       // Purple
        secondaryColor: "#FF00FF", // Pulse/Magenta
        distort: 1.0,           // High distortion for "Pulse"
        theme: "from-purple-400 to-pink-500"
    }
];

interface HeroSectionProps {
    onOpenAuth: () => void;
}

const HeroSection = ({ onOpenAuth }: HeroSectionProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    const slide = SLIDES[currentSlide];

    return (
        <section className="relative w-full h-screen min-h-[800px] bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">

            {/* 1. Background Layer: Use dominant color of current slide for subtle glow */}
            <div className="absolute inset-0 z-0 transition-colors duration-1000 ease-in-out">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[150px] opacity-20 transition-all duration-1000"
                    style={{ backgroundColor: slide.color }}
                />
            </div>

            {/* 2. Persistent 3D Nucleus (Centered, Z-0) */}
            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color={slide.color} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color={slide.secondaryColor} />

                    <ParticleSphere
                        color={slide.color}
                        secondaryColor={slide.secondaryColor}
                        distort={slide.distort}
                    />

                    <Environment preset="city" />
                    {/* Slow auto-rotate for dynamic feel */}
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                </Canvas>
            </div>

            {/* 3. Foreground Content (Glassmorphism, Centered, Z-10) */}
            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center text-center">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex flex-col items-center justify-center">
                            {/* Headline */}
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-4 font-heading">
                                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${slide.theme}`}>
                                    {slide.headline.split(' ').slice(0, 2).join(' ')}
                                </span>
                                <br />
                                {slide.headline.split(' ').slice(2).join(' ')}
                            </h1>

                            {/* Subtext */}
                            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mb-8">
                                {slide.subtext}
                            </p>

                            {/* CTA Button with 'Shine' Effect */}
                            <button
                                onClick={onOpenAuth}
                                className="relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Lock size={18} className="opacity-50" />
                                    {slide.cta}
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                                {/* Shine Animation Element */}
                                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] animate-shine" />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 4. Navigation Controls (Z-20) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
                <button onClick={prevSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-4">
                    {SLIDES.map((s, idx) => (
                        <button
                            key={s.id}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${idx === currentSlide ? `w-12 bg-gradient-to-r ${s.theme}` : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                <button onClick={nextSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Add global style definition for custom shine animation if not in tailwind config */}
            <style>{`
                @keyframes shine {
                    0%, 100% { left: -100%; }
                    10%, 100% { left: 200%; } /* Fast pass roughly every 3s if duration is 3s. Wait, simple keyframes loop. */
                }
                .animate-shine {
                    animation: shine 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>

        </section>
    );
};

export default HeroSection;
