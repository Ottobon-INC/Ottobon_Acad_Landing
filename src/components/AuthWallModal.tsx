import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { useState } from 'react';

interface AuthWallModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'login' | 'register';
}

const AuthWallModal = ({ isOpen, onClose, initialTab = 'login' }: AuthWallModalProps) => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

    // Ensure we start with the requested tab when opening
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0F172A] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-700 relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {/* Header Gradient */}
                            <div className="h-32 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                                <div className="text-center relative z-10">
                                    <h2 className="text-3xl font-bold text-white mb-1">
                                        {activeTab === 'login' ? 'Welcome Back' : 'Join the Future'}
                                    </h2>
                                    <p className="text-blue-100 text-sm">
                                        {activeTab === 'login'
                                            ? 'Continue your learning journey'
                                            : 'Start mastering AI skills today'}
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Tabs */}
                                <div className="flex bg-slate-800/50 rounded-xl p-1 mb-8">
                                    <button
                                        onClick={() => setActiveTab('login')}
                                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'login'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('register')}
                                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'register'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        Register
                                    </button>
                                </div>

                                {/* Form Fields */}
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    {activeTab === 'register' && (
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        />
                                    </div>

                                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                                        {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight size={18} />
                                    </button>
                                </form>

                                {/* Social Auth */}
                                <div className="mt-8">
                                    <div className="relative flex justify-center text-xs text-slate-500 mb-6">
                                        <span className="bg-[#0F172A] px-2 relative z-10">Or continue with</span>
                                        <div className="absolute inset-x-0 top-1/2 border-t border-slate-800 -z-0"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all">
                                            <Chrome size={18} />
                                            <span>Google</span>
                                        </button>
                                        <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all">
                                            <Github size={18} />
                                            <span>GitHub</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Footer Terms */}
                                <div className="mt-8 text-center text-xs text-slate-500">
                                    By continuing, you agree to our{' '}
                                    <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthWallModal;
