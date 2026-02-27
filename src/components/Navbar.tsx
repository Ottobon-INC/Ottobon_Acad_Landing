import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import logo from '../assets/logo (1).png';

interface NavbarProps {
    onLoginClick: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Simple active section detection based on scroll
            const sections = ['offerings', 'methodology', 'inquiries'];
            const current = sections.find(section => {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavButton = ({ id, label }: { id: string, label: string }) => (
        <button
            onClick={() => scrollToSection(id)}
            className={`relative py-1 transition-colors hover:text-white group ${activeSection === id ? 'text-white' : 'text-slate-300'}`}
        >
            {label}
            {/* Active underline */}
            {activeSection === id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C79F4C]" />
            )}
            {/* Hover underline (shown when not active) */}
            {activeSection !== id && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C79F4C] transition-all duration-300 group-hover:w-full" />
            )}
        </button>
    );

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
                <span className="font-outfit font-bold text-xl tracking-tight text-white">
                    Ottobon Academy
                </span>
            </div>

            {/* Right: CTA & Links */}
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <NavButton id="offerings" label="Offerings" />
                    <NavButton id="methodology" label="Methodology" />
                    <NavButton id="inquiries" label="FAQ" />
                </div>
                <button
                    onClick={onLoginClick}
                    className="px-5 py-2.5 rounded-full bg-[#C79F4C] text-black font-bold text-sm hover:bg-[#D2AD60] transition-colors flex items-center gap-2"
                >
                    <Lock size={14} className="opacity-50" />
                    Start Learning
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
