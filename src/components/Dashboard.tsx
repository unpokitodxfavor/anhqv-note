import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { NoteEditor } from './NoteEditor';
import { Analytics } from './Analytics';
import {
    Plus,
    Search,
    Activity,
    Target,
    Calendar,
    Mail
} from 'lucide-react';
import { useLanguage } from '../context/LanguageProvider';
import { useAuth } from '../context/AuthProvider';
import { fetchCalendarEvents, fetchGmailThreads, type CalendarEvent, type GmailThread } from '../services/googleServices';
import {
    CheckCircle2,
    Circle,
    Clock,
    Trash2,
    Zap,
    Check
} from 'lucide-react';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'high' | 'med' | 'low';
    aiInsight?: string;
}

export const Dashboard: React.FC = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [activeView, setActiveView] = useState<'dashboard' | 'analytics' | 'tasks' | 'projects'>('dashboard');
    const { t, language } = useLanguage();
    const { googleToken } = useAuth();
    const [googleData, setGoogleData] = useState<{ events: CalendarEvent[], emails: GmailThread[] }>({ events: [], emails: [] });
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: t('task_1'),
            description: 'Finalizar los últimos detalles del rediseño UI para el cliente.',
            status: 'in_progress',
            priority: 'high',
            aiInsight: 'Crítico para el lanzamiento de la Fase 1.'
        },
        {
            id: '2',
            title: t('task_2'),
            description: 'Explorar nuevas librerías de animación para efectos de cristal.',
            status: 'todo',
            priority: 'med',
            aiInsight: 'Mejorará el engagement visual en un 20%.'
        },
        {
            id: '3',
            title: t('task_3'),
            description: 'Sesión diaria para mantener el enfoque.',
            status: 'done',
            priority: 'low'
        }
    ]);

    const toggleTaskStatus = (id: string) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const nextStatus: Task['status'] = task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';
                return { ...task, status: nextStatus };
            }
            return task;
        }));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    React.useEffect(() => {
        if (googleToken && activeView === 'dashboard') {
            const loadGoogleData = async () => {
                setIsLoadingGoogle(true);
                const [events, emails] = await Promise.all([
                    fetchCalendarEvents(googleToken),
                    fetchGmailThreads(googleToken)
                ]);
                setGoogleData({ events, emails });
                setIsLoadingGoogle(false);
            };
            loadGoogleData();
        }
    }, [googleToken, activeView]);

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
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-text-main">
                    <Activity size={20} className="text-accent-cyan" />
                    {t('visual_momentum')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass glow-card p-6 rounded-2xl relative overflow-hidden group"
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                        }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <strong className="text-4xl">🚀</strong>
                        </div>
                        <p className="text-text-dim text-xs font-bold uppercase tracking-wider mb-2">{t('efficiency')}</p>
                        <h4 className="text-4xl font-bold text-accent-cyan mb-1">92%</h4>
                        <p className="text-xs text-secondary">+5% {t('from_yesterday')}</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass glow-card p-6 rounded-2xl relative overflow-hidden group"
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                        }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={64} />
                        </div>
                        <p className="text-text-dim text-xs font-bold uppercase tracking-wider mb-2">{t('tasks_done')}</p>
                        <h4 className="text-4xl font-bold text-accent-pink mb-1">14</h4>
                        <p className="text-xs text-text-dim">4 {t('remaining_for_today')}</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass glow-card p-6 rounded-2xl relative overflow-hidden group"
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                        }}
                    >
                        <p className="text-text-dim text-xs font-bold uppercase tracking-wider mb-2">{t('life_balance')}</p>
                        <div className="h-16 flex items-end gap-2">
                            <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
                            <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                            <div className="w-full bg-primary h-full rounded-t-sm"></div>
                            <div className="w-full bg-accent-cyan h-2/3 rounded-t-sm shadow-glow"></div>
                            <div className="w-full bg-accent-cyan/60 h-1/3 rounded-t-sm"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Today's Focus List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-lg font-semibold mb-4 text-text-main">{t('todays_focus')}</h3>
                    <div className="space-y-3">
                        {[
                            { title: t('task_1'), area: t('area_work'), tag: t('priority_high') },
                            { title: t('task_2'), area: t('area_learning'), tag: t('priority_med') },
                            { title: t('task_3'), area: t('area_personal'), tag: t('priority_low') }
                        ].map((task, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ x: 10, scale: 1.01 }}
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
                            </motion.div>
                        ))}
                        <button
                            onClick={() => setIsEditorOpen(true)}
                            className="w-full py-4 border-2 border-dashed border-white/5 rounded-xl text-text-dim hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            <span>{t('add_task')}</span>
                        </button>
                    </div>
                </motion.section>

                {/* Google Integration Section */}
                <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-lg font-semibold mb-4 text-text-main flex items-center gap-2">
                        Google Workspace
                        {isLoadingGoogle && <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
                    </h3>
                    <div className="space-y-6">
                        {/* Calendar Events */}
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-text-dim uppercase tracking-wider flex items-center gap-2">
                                <Calendar size={14} className="text-primary" />
                                {language === 'es' ? 'Próximos Eventos' : 'Upcoming Events'}
                            </p>
                            {googleData.events.length > 0 ? (
                                googleData.events.map(event => (
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        key={event.id}
                                        className="glass p-4 rounded-xl border border-white/5 flex flex-col gap-1"
                                    >
                                        <p className="text-sm font-medium text-white">{event.summary}</p>
                                        <p className="text-[10px] text-text-dim">
                                            {event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', { hour: '2-digit', minute: '2-digit' }) : (language === 'es' ? 'Todo el día' : 'All day')}
                                        </p>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-xs text-text-dim italic px-4">
                                    {googleToken ? (language === 'es' ? 'No hay eventos próximos' : 'No upcoming events') : (language === 'es' ? 'Inicia sesión con Google para ver eventos' : 'Sign in with Google to see events')}
                                </p>
                            )}
                        </div>

                        {/* Gmail Messages */}
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-text-dim uppercase tracking-wider flex items-center gap-2">
                                <Mail size={14} className="text-accent-cyan" />
                                {language === 'es' ? 'Correos Pendientes' : 'Pending Emails'}
                            </p>
                            {googleData.emails.length > 0 ? (
                                googleData.emails.map(email => (
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        key={email.id}
                                        className="glass p-4 rounded-xl border border-white/5 flex flex-col gap-1 hover:bg-white/5 transition-colors cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-medium text-white truncate flex-1">{email.subject}</p>
                                            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 ml-2">GMAIL</span>
                                        </div>
                                        <p className="text-[10px] text-text-dim truncate">{email.from}</p>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-xs text-text-dim italic px-4">
                                    {googleToken ? (language === 'es' ? 'No hay correos nuevos' : 'No new emails') : (language === 'es' ? 'Inicia sesión con Google para ver correos' : 'Sign in with Google to see emails')}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );

    const renderTasks = () => {
        const columns = [
            { id: 'todo', title: t('task_status_todo'), icon: <Circle size={18} className="text-text-dim" /> },
            { id: 'in_progress', title: t('task_status_in_progress'), icon: <Clock size={18} className="text-primary" /> },
            { id: 'done', title: t('task_status_done'), icon: <CheckCircle2 size={18} className="text-secondary" /> }
        ];

        return (
            <div className="px-10 pb-10 flex gap-6 overflow-x-auto min-h-[calc(100vh-180px)] custom-scrollbar">
                {columns.map(col => (
                    <div key={col.id} className="flex-1 min-w-[320px] max-w-[400px]">
                        <div className="flex items-center gap-3 mb-6 px-2">
                            {col.icon}
                            <h3 className="text-sm font-bold uppercase tracking-widest text-text-dim">{col.title}</h3>
                            <span className="ml-auto bg-white/5 px-2 py-0.5 rounded-md text-[10px] text-text-muted">
                                {tasks.filter(t => t.status === col.id).length}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {tasks.filter(t => t.status === col.id).map((task, i) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={task.id}
                                    whileHover={{ y: -4 }}
                                    className="glass p-5 rounded-3xl border border-white/5 relative group"
                                >
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-start capitalize">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${task.priority === 'high' ? 'bg-accent-pink/10 text-accent-pink border-accent-pink/20' :
                                                task.priority === 'med' ? 'bg-primary/10 text-primary border-primary/20' :
                                                    'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20'
                                                }`}>
                                                {t(`priority_${task.priority}` as any)}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => toggleTaskStatus(task.id)}
                                                    className="p-1.5 rounded-lg bg-white/0 hover:bg-white/5 text-text-dim hover:text-white transition-colors"
                                                >
                                                    {task.status === 'done' ? <Check size={14} className="text-secondary" /> : <Clock size={14} />}
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="p-1.5 rounded-lg bg-white/0 hover:bg-white/5 text-text-dim hover:text-accent-pink transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <h4 className="font-bold text-white text-base leading-tight">{task.title}</h4>
                                        <p className="text-xs text-text-dim line-clamp-2">{task.description}</p>

                                        {task.aiInsight && (
                                            <div className="mt-2 flex items-start gap-2 p-2 rounded-2xl bg-primary/5 border border-primary/10">
                                                <Zap size={14} className="text-primary mt-0.5 shrink-0" />
                                                <p className="text-[10px] text-primary/80 leading-relaxed italic">
                                                    <span className="font-bold mr-1">{t('ai_insight')}:</span>
                                                    {task.aiInsight}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover interaction glow */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 overflow-hidden">
                                        <div className="absolute -inset-20 bg-primary/20 blur-[60px] translate-x-1/2 translate-y-1/2"></div>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setIsEditorOpen(true)}
                                className="w-full py-4 border-2 border-dashed border-white/5 rounded-3xl text-text-dim hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                                <span className="text-xs font-bold uppercase tracking-widest">{t('add_task')}</span>
                            </motion.button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderProjects = () => (
        <div className="px-10 pb-10 space-y-10">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {[
                    { title: 'Rediseño UI', progress: '85%', color: 'var(--primary)' },
                    { title: 'Google API', progress: '40%', color: 'var(--accent-cyan)' },
                    { title: 'Documentación', progress: '100%', color: 'var(--secondary)' },
                ].map((project, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -10 }}
                        className="glass glow-card p-6 rounded-[32px] border border-white/5 relative overflow-hidden group"
                    >
                        <h4 className="text-xl font-bold text-white mb-4 line-clamp-1">{project.title}</h4>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: project.progress }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full"
                                style={{ backgroundColor: project.color }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-text-dim uppercase tracking-widest">
                            <span>Progreso</span>
                            <span style={{ color: project.color }}>{project.progress}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.section>
        </div>
    );

    const renderCurrentView = () => {
        switch (activeView) {
            case 'dashboard': return renderDashboard();
            case 'analytics': return <Analytics />;
            case 'tasks': return renderTasks();
            case 'projects': return renderProjects();
            default: return renderDashboard();
        }
    };

    return (
        <div className="flex h-screen bg-bg-main overflow-hidden">
            <Sidebar activeView={activeView} onViewChange={setActiveView} />

            <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                {/* Header */}
                <header className="px-10 py-8 flex items-center justify-between sticky top-0 bg-bg-main/50 backdrop-blur-md z-10">
                    <div>
                        <p className="text-text-dim text-sm font-medium mb-1 capitalize">{formatDate(new Date())}</p>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            {activeView === 'dashboard' ? `${t('greeting')}, Clemente` :
                                activeView === 'analytics' ? t('performance_overview') :
                                    activeView === 'tasks' ? t('nav_tasks') : t('nav_projects')} <span className="animate-wave">👋</span>
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
                        <motion.button
                            whileHover={{ y: -5, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            onClick={() => setIsEditorOpen(true)}
                            className="btn-primary"
                        >
                            <Plus size={20} />
                            <span>{activeView === 'dashboard' ? t('new_task') : t('new_goal')}</span>
                        </motion.button>
                    </div>
                </header>

                {renderCurrentView()}
            </main>

            <NoteEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
        </div>
    );
};
