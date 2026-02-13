import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Sparkles, Facebook } from 'lucide-react';

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.24 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.3c-.27 1.44-1.08 2.65-2.31 3.47v2.88h3.74c2.18-2.01 3.45-4.97 3.45-8.59z" fill="#4285F4" />
        <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.74-2.88c-1.04.69-2.36 1.11-4.19 1.11-3.23 0-5.97-2.18-6.95-5.12H1.28v2.97C3.25 21.09 7.39 24 12 24z" fill="#34A853" />
        <path d="M5.05 14.2c-.25-.74-.39-1.53-.39-2.2c0-.67.14-1.46.39-2.2V6.83H1.28C.46 8.39 0 10.14 0 12s.46 3.61 1.28 5.17l3.77-2.97z" fill="#FBBC05" />
        <path d="M12 4.78c1.76 0 3.34.61 4.58 1.79l3.43-3.43C17.93 1.19 15.24 0 12 0 7.39 0 3.25 2.91 1.28 6.83l3.77 2.97c.98-2.94 3.72-5.12 6.95-5.12z" fill="#EA4335" />
    </svg>
);

export const LoginPage: React.FC = () => {
    const { loginWithGoogle, loginWithFacebook } = useAuth();

    return (
        <div className="flex items-center justify-center h-screen bg-bg-main">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="glass-heavy p-10 rounded-[32px] w-full max-w-md shadow-heavy relative z-10 border border-white/10">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center shadow-glow mb-6">
                        <Sparkles size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3 tracking-tight">anhqv-note</h1>
                    <p className="text-text-dim">Your high-end productivity companion.</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full glass py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all border border-white/5 font-semibold text-white"
                    >
                        <GoogleIcon />
                        <span>Continue with Google</span>
                    </button>

                    <button
                        onClick={loginWithFacebook}
                        className="w-full bg-[#1877F2]/10 py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-[#1877F2]/20 transition-all border border-[#1877F2]/20 font-semibold text-white"
                    >
                        <Facebook size={24} className="text-[#1877F2]" fill="#1877F2" />
                        <span>Continue with Facebook</span>
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-sm text-text-dim">
                        New here? <span className="text-primary font-bold cursor-pointer hover:underline">Experience the future</span> of notes.
                    </p>
                </div>
            </div>
        </div>
    );
};
