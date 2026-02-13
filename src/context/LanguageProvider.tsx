import React from 'react';
import { translations, type Language, type TranslationKey } from '../locales/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Use Spanish as default per user's preference
    const [language, setLanguage] = React.useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'es';
    });

    React.useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: TranslationKey): string => {
        const translationSet = translations[language];
        return (translationSet as any)[key] || (translations['en'] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = React.useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
