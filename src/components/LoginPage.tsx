import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { useLanguage } from '../context/LanguageProvider';

export const LoginPage: React.FC = () => {
    const { loginWithGoogle, loginWithFacebook } = useAuth();
    const { t } = useLanguage();

    return (
        <div className="h-screen w-full bg-bg-main flex items-center justify-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [-20, 20, -20],
                    y: [-20, 20, -20]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [90, 0, 90],
                    x: [20, -20, 20],
                    y: [20, -20, 20]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-pink/10 rounded-full blur-[120px]"
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-heavy p-12 rounded-[40px] w-full max-w-md relative z-10 border border-white/10 shadow-2xl flex flex-col items-center"
            >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center shadow-glow mb-8 group cursor-pointer">
                    <Sparkles size={32} className="text-white group-hover:scale-110 transition-transform" />
                </div>

                <h1 className="text-4xl font-bold mb-2 tracking-tight bg-gradient-to-r from-white to-text-dim bg-clip-text text-transparent">
                    {t('app_name')}
                </h1>
                <p className="text-text-dim text-sm mb-12 font-medium">
                    {t('app_tagline')}
                </p>

                <div className="w-full space-y-4">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full py-4 glass rounded-2xl flex items-center justify-center gap-4 hover:bg-white/5 transition-all group border border-white/5"
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </div>
                        <span className="font-bold text-sm text-text-muted group-hover:text-white transition-colors">
                            {t('login_google')}
                        </span>
                    </button>

                    <button
                        onClick={loginWithFacebook}
                        className="w-full py-4 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all group border border-white/5 opacity-50 cursor-not-allowed"
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            <svg fill="#1877F2" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </div>
                        <span className="font-bold text-sm text-white/30">
                            {t('login_facebook')}
                        </span>
                    </button>
                </div>

                <div className="mt-12 w-full pt-8 border-t border-white/5">
                    <p className="text-center text-xs text-text-dim">
                        {t('login_footer')}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
