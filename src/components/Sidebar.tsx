import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Layout,
  BarChart3,
  LogOut,
  Sparkles,
  CheckSquare,
  Folder,
  Languages
} from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { useLanguage } from '../context/LanguageProvider';

interface SidebarProps {
  activeView: 'dashboard' | 'analytics';
  onViewChange: (view: 'dashboard' | 'analytics') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: <Home size={22} />, label: t('nav_dashboard') },
    { id: 'analytics', icon: <BarChart3 size={22} />, label: t('nav_analytics') },
    { id: 'tasks', icon: <CheckSquare size={22} />, label: t('nav_tasks') },
    { id: 'projects', icon: <Folder size={22} />, label: t('nav_projects') },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-white/5 flex flex-col p-6 h-full relative z-20">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center shadow-glow">
          <Sparkles size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-text-dim bg-clip-text text-transparent">
          anhqv
        </h1>
      </div>

      {/* Primary Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => (item.id === 'dashboard' || item.id === 'analytics') && onViewChange(item.id as any)}
            className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
              ${activeView === item.id
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                : 'text-text-dim hover:text-white hover:bg-white/5'}
            `}
          >
            <span className={`transition-transform duration-300 ${activeView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            <span className="font-semibold text-sm">{item.label}</span>
            {activeView === item.id && (
              <motion.div
                layoutId="active-pill"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-primary glow"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Language Toggle & User */}
      <div className="mt-auto space-y-4">
        {/* Language Switcher */}
        <div className="glass p-2 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 px-2">
            <Languages size={14} className="text-text-dim" />
            <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">{language}</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${language === 'es' ? 'bg-primary text-white' : 'text-text-dim hover:text-white'}`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${language === 'en' ? 'bg-primary text-white' : 'text-text-dim hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="glass p-3 rounded-2xl flex items-center gap-3 border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-text-dim overflow-hidden border border-white/5">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
            ) : (
              <Layout size={20} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.displayName || 'Clemente'}</p>
            <p className="text-[10px] text-text-dim uppercase tracking-widest font-bold">{t('pro_member')}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-text-dim hover:text-accent-pink hover:bg-accent-pink/5 transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">{t('sign_out')}</span>
        </button>
      </div>
    </aside>
  );
};
