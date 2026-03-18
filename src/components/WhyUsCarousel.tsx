import { motion } from 'framer-motion';
import { Sparkles, HelpCircle, BarChart3, ShieldCheck } from 'lucide-react';

const WHY_US_CARDS = [
    {
        title: "Deep Personalization",
        desc: "Every interaction, every quiz, and every video snippet is hyper-tailored to your current skill level and learning speed. It feels like the platform was built just for you.",
        icon: <Sparkles className="w-8 h-8 text-blue-400" />,
        color: "blue"
    },
    {
        title: "Question Framing",
        desc: "Don't know how to ask? We handhold you through a framing process that turns vague struggles into precise technical questions, ensuring you get the exact help you need.",
        icon: <HelpCircle className="w-8 h-8 text-amber-400" />,
        color: "amber"
    },
    {
        title: "Tutor Intelligence",
        desc: "We provide your mentors with deep insights into your comprehension patterns. They don't just teach; they know exactly where you're invested and where you're stuck.",
        icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
        color: "emerald"
    },
    {
        title: "Mutual Liability",
        desc: "Our framework makes both parties liable for each other's success. Tutors are truly invested in building your skills, not just delivering a lecture.",
        icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
        color: "purple"
    }
];

const WhyUsCarousel = () => {
    return (
        <section className="py-24 px-6 md:px-20 bg-[#0A0A0A] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Why Ottobon?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        We're not just another course platform. We're a fundamental shift in how skills are built and verified.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {WHY_US_CARDS.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-slate-900/40 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl relative group overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-${card.color}-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${card.color}-500/20 transition-colors`} />

                            <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl border border-white/5">
                                {card.icon}
                            </div>

                            <h4 className="text-xl font-bold text-white mb-4">{card.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUsCarousel;
