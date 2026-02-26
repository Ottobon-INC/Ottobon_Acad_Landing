
import { Mail, MessageCircle, Linkedin, Instagram } from 'lucide-react';

import logo from '../assets/logo (1).png';

const Footer = () => {

    return (
        <footer className="bg-[#0B0F19] text-white/70 py-16 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        {/* Custom Gold Brand Logo */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <img
                                src={logo}
                                alt="Ottobon Academy"
                                className="w-full h-full object-contain"
                                loading="lazy"
                                width="48"
                                height="48"
                            />
                        </div>
                        <span className="text-2xl font-black text-white tracking-widest">OTTOBON</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-sm text-slate-400">
                        Empowering talent from every city with Digital Twin mentorship. Learn from verified human experts — at AI scale.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="text-white font-bold text-lg">Quick Links</h4>
                    <ul className="space-y-4 text-sm">
                        <li><button onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Offerings</button></li>
                        <li><button onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Methodology</button></li>
                        <li><button onClick={() => document.getElementById('inquiries')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">FAQ</button></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-6">
                    <h4 className="text-white font-bold text-lg">Contact</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <a href="mailto:hr@ottobon.in" className="hover:text-white transition-colors">hr@ottobon.in</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <MessageCircle className="w-4 h-4 text-[#25D366]" />
                            <a href="https://wa.me/919281011683" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chat on WhatsApp</a>
                        </li>
                    </ul>
                    <div className="flex gap-4 pt-2">
                        <a href="https://www.linkedin.com/company/ottobon-academy-pvt-ltd/posts/?feedView=all" target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="https://www.instagram.com/ottobon.verse/" target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                <p>&copy; {new Date().getFullYear()} OttoBon Technology Consulting Academy. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
