import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import logo from '../assets/logo (1).png';

interface NavbarProps {
    onLoginClick: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 
            ${isScrolled
                    ? 'bg-[#0a0a0a]/80 backdrop-blur-md shadow-lg border-b border-white/5 py-4'
                    : 'bg-transparent border-b border-transparent py-6'
                }`}
        >
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Ottobon Academy"
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                    width="48"
                    height="48"
                />
                {/* Added invert for dark mode if logo is dark, assuming logo (1) is dark based on previous light theme */}
                <span className="font-outfit font-bold text-xl tracking-tight text-white">
                    Ottobon Academy
                </span>
            </div>

            {/* Right: CTA & Links */}
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                    <button onClick={() => scrollToSection('offerings')} className="hover:text-white transition-colors">Offerings</button>
                    <button onClick={() => scrollToSection('methodology')} className="hover:text-white transition-colors">Methodology</button>
                    <button onClick={() => scrollToSection('inquiries')} className="hover:text-white transition-colors">FAQ</button>
                </div>
                <button
                    onClick={onLoginClick}
                    className="px-5 py-2.5 rounded-full bg-[#C79F4C] text-white font-bold text-sm hover:bg-[#D2AD60] transition-colors flex items-center gap-2"
                >
                    <Lock size={14} className="opacity-50" />
                    Start Learning
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
