import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../services/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithFacebook: () => Promise<void>;
    logout: () => Promise<void>;
    isMock: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development when Firebase keys are not set
const MOCK_USER = {
    uid: 'mock-user-123',
    displayName: 'Clemente (Dev Mode)',
    email: 'clemente@example.com',
    photoURL: null,
} as User;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMock, setIsMock] = useState(false);

    useEffect(() => {
        // Check if we are using placeholder keys
        const isPlaceholder = auth.app.options.apiKey === "YOUR_API_KEY";

        if (isPlaceholder) {
            console.warn("Using Mock Auth because Firebase keys are placeholders.");
            setIsMock(true);
            // Simulate a small delay for premium feel
            const timer = setTimeout(() => {
                setLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        if (isMock) {
            setUser(MOCK_USER);
            return;
        }
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    const loginWithFacebook = async () => {
        if (isMock) {
            setUser(MOCK_USER);
            return;
        }
        try {
            await signInWithPopup(auth, facebookProvider);
        } catch (error) {
            console.error("Facebook login error:", error);
        }
    };

    const logout = () => {
        if (isMock) {
            setUser(null);
            return Promise.resolve();
        }
        return signOut(auth);
    };

    const value = {
        user,
        loading,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        isMock,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
