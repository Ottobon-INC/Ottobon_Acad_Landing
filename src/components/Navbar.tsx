import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/logo (1).png';

interface NavbarProps {
    onLoginClick: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-12 transition-all duration-300 
            ${isScrolled
                    ? 'bg-[#0a0a0a]/80 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
                    : 'bg-transparent border-b border-transparent py-5'
                }`}
        >
            <div className="flex-1 flex items-center justify-start">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Ottobon Academy" className="w-10 h-10 object-contain" />
                    <span className="font-outfit font-black text-2xl tracking-wide text-white uppercase">
                        OTTOBON
                    </span>
                </div>
            </div>

            {/* Center: Nav Links */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-8">
                {['Our Approach', 'Programs', 'Talent Compass'].map((item) => (
                    <button
                        key={item}
                        onClick={onLoginClick}
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD166] transition-all duration-300 group-hover:w-full" />
                    </button>
                ))}
            </div>

            {/* Right: CTA */}
            <div className="flex-1 flex justify-end">
                <button
                    onClick={onLoginClick}
                    className="px-6 py-2.5 rounded-full bg-[#FFD166] text-[#0A0A0A] font-bold text-sm hover:bg-[#ffe08a] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,209,102,0.3)] hover:shadow-[0_0_20px_rgba(255,209,102,0.5)] transform hover:scale-105 duration-200"
                >
                    Start Your Journey
                    <ArrowRight size={16} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
