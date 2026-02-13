import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import './Login.css';

export const LoginPage: React.FC = () => {
    const { loginWithGoogle } = useAuth();

    return (
        <div
            className="h-screen w-full flex items-center justify-center relative overflow-hidden font-sans"
            style={{ backgroundColor: '#0a0510' }}
        >
            {/* Ambient Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute"
                style={{ top: '-6rem', left: '-6rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(127, 19, 236, 0.2)', borderRadius: '9999px', filter: 'blur(100px)' }}
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute"
                style={{ bottom: '-6rem', right: '-6rem', width: '31rem', height: '31rem', backgroundColor: 'rgba(109, 40, 217, 0.1)', borderRadius: '9999px', filter: 'blur(120px)' }}
            />

            {/* Login Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="login-container"
            >
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="inline-flex p-3 rounded-2xl mb-4"
                        style={{ backgroundColor: 'rgba(109, 40, 217, 0.2)' }}
                    >
                        <Sparkles size={32} style={{ color: '#a855f7' }} />
                    </motion.div>
                </div>

                {/* Form Area */}
                <div className="login-form-area">
                    <div className="login-input-group">
                        <div className="login-icon-overlay">
                            <Mail size={20} />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="login-input"
                        />
                    </div>

                    <div className="login-input-group">
                        <div className="login-icon-overlay">
                            <Lock size={20} />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="login-input"
                        />
                    </div>
                </div>

                {/* Sign Up Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="login-btn-purple"
                >
                    <UserPlus size={22} />
                    <span>Sign Up</span>
                </motion.button>

                {/* Divider */}
                <div className="login-divider">
                    <span>OR CONTINUE WITH</span>
                </div>

                {/* Google Button */}
                <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={loginWithGoogle}
                    className="login-btn-google"
                >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    </div>
                    <span className="font-bold text-white tracking-wide">Google</span>
                </motion.button>

                {/* Footer Link */}
                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button className="login-footer-link">
                        Already have an account? Log In
                    </button>
                </div>
            </motion.div>

            {/* Subtle design elements */}
            <div className="absolute" style={{ bottom: '2.5rem', left: '2.5rem', opacity: 0.2 }}>
                <p className="text-[10px] text-white font-bold uppercase tracking-[0.4em]">anhqv studio</p>
            </div>
        </div>
    );
};
