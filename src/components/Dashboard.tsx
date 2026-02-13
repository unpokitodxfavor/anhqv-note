import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { NoteEditor } from './NoteEditor';
import { Analytics } from './Analytics';
import {
    Plus,
    Search,
    Activity,
    Target
} from 'lucide-react';
import { useLanguage } from '../context/LanguageProvider';

export const Dashboard: React.FC = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [activeView, setActiveView] = useState<'dashboard' | 'analytics'>('dashboard');
    const { t, language } = useLanguage();

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const renderDashboard = () => (
        <div className="px-10 pb-10 space-y-10">
            {/* Visual Momentum Section */}
            <section>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-text-main">
                    <Activity size={20} className="text-accent-cyan" />
                    {t('visual_momentum')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <strong className="text-4xl">🚀</strong>
                        </div>
                        <p className="text-text-dim text-xs font-bold uppercase tracking-wider mb-2">{t('efficiency')}</p>
                        <h4 className="text-4xl font-bold text-accent-cyan mb-1">92%</h4>
                        <p className="text-xs text-secondary">+5% {t('from_yesterday')}</p>
                    </div>

                    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={64} />
                        </div>
                        <p className="text-text-dim text-xs font-bold uppercase tracking-wider mb-2">{t('tasks_done')}</p>
                        <h4 className="text-4xl font-bold text-accent-pink mb-1">14</h4>
                        <p className="text-xs text-text-dim">4 {t('remaining_for_today')}</p>
                    </div>

                    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                        <p className="text-text-dim text-xs font-bold uppercase tracking-wider mb-2">{t('life_balance')}</p>
                        <div className="h-16 flex items-end gap-2">
                            <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
                            <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                            <div className="w-full bg-primary h-full rounded-t-sm"></div>
                            <div className="w-full bg-accent-cyan h-2/3 rounded-t-sm shadow-glow"></div>
                            <div className="w-full bg-accent-cyan/60 h-1/3 rounded-t-sm"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Today's Focus List */}
            <section className="max-w-4xl">
                <h3 className="text-lg font-semibold mb-4 text-text-main">{t('todays_focus')}</h3>
                <div className="space-y-3">
                    {[
                        { title: t('task_1'), area: t('area_work'), tag: t('priority_high') },
                        { title: t('task_2'), area: t('area_learning'), tag: t('priority_med') },
                        { title: t('task_3'), area: t('area_personal'), tag: t('priority_low') }
                    ].map((task, i) => (
                        <div
                            key={i}
                            onClick={() => setIsEditorOpen(true)}
                            className="glass p-4 rounded-xl flex items-center justify-between hover:bg-white/5 cursor-pointer group transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full border-2 border-primary/40 group-hover:border-primary transition-colors"></div>
                                <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-xs text-text-dim flex items-center gap-2">
                                        <span className="text-accent-cyan">{task.area}</span>
                                        <span>•</span>
                                        <span>{task.tag} {t('priority_label')}</span>
                                    </p>
                                </div>
                            </div>
                            <Plus size={18} className="text-text-dim group-hover:text-white rotate-45" />
                        </div>
                    ))}
                    <button
                        onClick={() => setIsEditorOpen(true)}
                        className="w-full py-4 border-2 border-dashed border-white/5 rounded-xl text-text-dim hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        <span>{t('add_task')}</span>
                    </button>
                </div>
            </section>
        </div>
    );

    return (
        <div className="flex h-screen bg-bg-main overflow-hidden">
            <Sidebar activeView={activeView} onViewChange={setActiveView} />

            <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                {/* Header */}
                <header className="px-10 py-8 flex items-center justify-between sticky top-0 bg-bg-main/50 backdrop-blur-md z-10">
                    <div>
                        <p className="text-text-dim text-sm font-medium mb-1 capitalize">{formatDate(new Date())}</p>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            {activeView === 'dashboard' ? `${t('greeting')}, Clemente` : t('performance_overview')} <span className="animate-wave">👋</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5">
                            <Search size={18} className="text-text-dim" />
                            <input
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="bg-transparent border-none outline-none text-sm text-white w-40 placeholder:text-text-dim"
                            />
                        </div>
                        <button
                            onClick={() => setIsEditorOpen(true)}
                            className="btn-primary"
                        >
                            <Plus size={20} />
                            <span>{activeView === 'dashboard' ? t('new_task') : t('new_goal')}</span>
                        </button>
                    </div>
                </header>

                {activeView === 'dashboard' ? renderDashboard() : <Analytics />}
            </main>

            <NoteEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
        </div>
    );
};
