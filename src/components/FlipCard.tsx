
import React from 'react';

interface FlipCardProps {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    description: string;
    features?: string[];
    color: string;
    badge?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ title, subtitle, icon, description, features, color, badge }) => {
    return (
        <div className="group w-full h-[280px] [perspective:1000px]">
            <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-xl">

                {/* --- FRONT SIDE (Initial View) --- */}
                {/* Note: Based on user snippet, 'back' was initial. We'll use standard naming: Front = Initial */}
                <div className="absolute inset-0 w-full h-full bg-[#151515] rounded-xl overflow-hidden [backface-visibility:hidden] flex flex-col items-center justify-center text-center p-6 border border-white/10">

                    {/* Rotating Gradient Border Effect */}
                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent,var(--card-color),transparent)] animate-[spin_4s_linear_infinite] opacity-30" style={{ '--card-color': color } as any} />

                    <div className="absolute inset-[2px] bg-[#151515] rounded-[10px] z-0" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div
                            className="p-4 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110 duration-300"
                            style={{ color: color }}
                        >
                            {icon}
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                            {subtitle && <p className="text-xs text-slate-400 uppercase tracking-widest">{subtitle}</p>}
                        </div>

                        {badge && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 text-slate-400 border border-white/10">
                                {badge}
                            </span>
                        )}

                        <span className="text-[10px] text-slate-500 mt-2 font-mono flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
                            HOVER FOR DETAILS
                        </span>
                    </div>
                </div>

                {/* --- BACK SIDE (Hover View) --- */}
                <div className="absolute inset-0 w-full h-full bg-[#151515] rounded-xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] border border-white/10">

                    {/* Animated Background Circles */}
                    <div className="absolute inset-0 overflow-hidden opacity-30">
                        <div className="absolute w-24 h-24 rounded-full blur-xl animate-[float_3s_ease-in-out_infinite]"
                            style={{ backgroundColor: color, top: '-10%', left: '10%' }} />
                        <div className="absolute w-20 h-20 rounded-full blur-xl animate-[float_4s_ease-in-out_infinite] delay-700"
                            style={{ backgroundColor: color, bottom: '10%', right: '-10%' }} />
                    </div>

                    <div className="relative h-full flex flex-col justify-between p-6 z-10">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 border border-white/10 px-2 py-1 rounded-md bg-black/40 backdrop-blur">
                                    Why it matters
                                </span>
                                <div className="text-white/50">{icon}</div>
                            </div>

                            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {features && (
                            <div className="space-y-2">
                                {features.slice(0, 3).map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400 bg-black/20 p-1.5 rounded-lg border border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
