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
  Calendar,
  Languages
} from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { useLanguage } from '../context/LanguageProvider';

interface SidebarProps {
  activeView: 'dashboard' | 'analytics' | 'tasks' | 'projects' | 'calendar';
  onViewChange: (view: 'dashboard' | 'analytics' | 'tasks' | 'projects' | 'calendar') => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: <Home size={22} />, label: t('nav_dashboard') },
    { id: 'calendar', icon: <Calendar size={22} />, label: t('nav_calendar') },
    { id: 'analytics', icon: <BarChart3 size={22} />, label: t('nav_analytics') },
    { id: 'tasks', icon: <CheckSquare size={22} />, label: t('nav_tasks') },
    { id: 'projects', icon: <Folder size={22} />, label: t('nav_projects') },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-white/5 flex flex-col p-6 h-full 
          lg:static lg:translate-x-0
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-text-dim hover:text-white lg:hidden"
        >
          <LogOut size={20} className="rotate-180" />
        </button>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center shadow-glow">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-text-dim bg-clip-text text-transparent">
              anhqv
            </h1>
            <p className="text-[10px] font-bold text-accent-cyan tracking-widest uppercase">PRO AI NOTE</p>
          </div>
        </motion.div>

        {/* Primary Navigation */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                delay: i * 0.05,
                type: 'spring',
                stiffness: 400,
                damping: 17
              }}
              onClick={() => {
                onViewChange(item.id as any);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`
                w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative
                ${activeView === item.id
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                  : 'text-text-dim hover:text-white hover:bg-white/5 border border-transparent'}
              `}
            >
              <span className={`transition-transform duration-300 ${activeView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="font-semibold text-sm">{item.label}</span>
              {activeView === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary-glow)]"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Language Toggle & User */}
        <div className="mt-auto space-y-6">
          {/* Language Switcher */}
          <div className="glass p-2 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 px-2">
              <Languages size={14} className="text-text-dim" />
              <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">{language}</span>
            </div>
            <div className="flex gap-1">
              {['es', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${language === lang ? 'bg-primary text-white shadow-glow' : 'text-text-dim hover:text-white'}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass p-3 rounded-2xl flex items-center gap-3 border border-white/5 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-text-dim overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <Layout size={24} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.displayName || 'Clemente'}</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{t('pro_member')}</p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ x: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-text-dim hover:text-accent-pink hover:bg-accent-pink/5 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">{t('sign_out')}</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};
