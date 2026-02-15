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
    Menu,
    Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageProvider';
import { useAuth } from '../context/AuthProvider';
import { fetchCalendarEvents, fetchUserCalendars, fetchGoogleTasks, type CalendarEvent, type GoogleTask } from '../services/googleServices';
import {
    CheckCircle2,
    Circle,
    Clock,
    Trash2,
    Zap,
    Check
} from 'lucide-react';
import { db } from '../services/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'high' | 'med' | 'low';
    aiInsight?: string;
    userId: string;
    isGoogleTask?: boolean;
}

export const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [activeView, setActiveView] = useState<'dashboard' | 'analytics' | 'tasks' | 'projects' | 'calendar'>('dashboard');
    const { t, language } = useLanguage();
    const { loginWithGoogle, googleToken, user } = useAuth();
    const [googleData, setGoogleData] = useState<{ events: CalendarEvent[], tasks: GoogleTask[] }>({ events: [], tasks: [] });
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [googleError, setGoogleError] = useState<string | null>(null);

    const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from Firestore
    React.useEffect(() => {
        if (!user) {
            setTasks([]);
            return;
        }

        const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData: Task[] = [];
            querySnapshot.forEach((doc) => {
                tasksData.push({ id: doc.id, ...doc.data() } as Task);
            });

            // If no tasks exist in DB, set demo tasks only first time or keep empty?
            // For now, if empty, we just show empty or let user add.
            setTasks(tasksData);
        }, (error) => {
            console.error("Error fetching tasks:", error);
        });

        return () => unsubscribe();
    }, [user]);

    const addTask = async (taskData: Omit<Task, 'id' | 'userId'>) => {
        if (!user) return;
        try {
            await addDoc(collection(db, 'tasks'), {
                ...taskData,
                userId: user.uid,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleTaskStatus = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const nextStatus: Task['status'] = task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';
        try {
            await updateDoc(doc(db, 'tasks', id), { status: nextStatus });
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const loadGoogleData = async () => {
        if (!googleToken) return;
        setIsLoadingGoogle(true);
        setGoogleError(null);
        try {
            const [events, , googleTasks] = await Promise.all([
                fetchCalendarEvents(googleToken).catch(e => {
                    if (e.message.includes('401') || e.message.includes('invalid') || e.message.includes('expired')) {
                        throw new Error("TOKEN_EXPIRED");
                    }
                    throw e;
                }),
                fetchUserCalendars(googleToken).catch(() => []),
                fetchGoogleTasks(googleToken).catch(() => [])
            ]);
            setGoogleData({ events, tasks: googleTasks });
        } catch (error: any) {
            console.error("Error loading Google data:", error);
            if (error.message === "TOKEN_EXPIRED") {
                setGoogleError(language === 'es' ? "Tu sesión de Google ha expirado. Por favor, vuelve a conectar." : "Your Google session has expired. Please reconnect.");
            } else {
                setGoogleError(error.message || "Error al conectar con Google");
            }
        } finally {
            setIsLoadingGoogle(false);
        }
    };

    React.useEffect(() => {
        if (googleToken && (activeView === 'dashboard' || activeView === 'calendar')) {
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
        <div className="space-y-12">
            {/* Visual Momentum Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-text-dim/80">
                        <Activity size={18} className="text-primary" />
                        {t('visual_momentum')}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="relative group rounded-[32px]"
                    >
                        <div className="relative glass p-8 rounded-[31px] border border-white/5 bg-bg-sidebar/80 backdrop-blur-md h-full">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Activity size={80} />
                            </div>
                            <p className="text-text-dim text-[10px] font-black uppercase tracking-widest mb-4 opacity-60 font-black">{t('efficiency')}</p>
                            <div className="flex items-end gap-2 mb-2">
                                <h4 className="text-5xl font-black text-white tracking-tighter">92%</h4>
                                <p className="text-sm text-secondary font-black mb-1.5">+5%</p>
                            </div>
                            <p className="text-xs text-text-dim/60 font-medium">{t('from_yesterday')}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="relative group rounded-[32px]"
                    >
                        <div className="relative glass p-8 rounded-[31px] border border-white/5 bg-bg-sidebar/80 backdrop-blur-md h-full">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Target size={80} />
                            </div>
                            <p className="text-text-dim text-[10px] font-black uppercase tracking-widest mb-4 opacity-60 font-black">{t('tasks_done')}</p>
                            <div className="flex items-end gap-2 mb-2">
                                <h4 className="text-5xl font-black text-white tracking-tighter">14</h4>
                            </div>
                            <p className="text-xs text-text-dim/60 font-medium">{t('remaining_for_today')}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="relative group rounded-[32px]"
                    >
                        <div className="relative glass p-8 rounded-[31px] border border-white/5 bg-bg-sidebar/40 backdrop-blur-md h-full">
                            <p className="text-text-dim text-[10px] font-black uppercase tracking-widest mb-6 opacity-60 font-black">{t('life_balance')}</p>
                            <div className="h-16 flex items-end gap-3 px-2">
                                {[30, 50, 90, 65, 40].map((h, i) => (
                                    <div key={i} className={`flex-1 rounded-t-lg transition-all duration-500 ring-1 ring-inset ring-white/10 ${i === 2 ? 'bg-accent-cyan shadow-glow-cyan' : 'bg-accent-cyan/40'}`} style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Content Mid Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-dim/80">{t('todays_focus')}</h3>
                        <button onClick={() => setIsEditorOpen(true)} className="text-[10px] font-black text-primary hover:text-white transition-colors uppercase tracking-widest">
                            {t('add_task')}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: t('task_1'), area: t('area_work'), tag: t('priority_high'), priority: 'high' },
                            { title: t('task_2'), area: t('area_learning'), tag: t('priority_med'), priority: 'med' },
                            { title: t('task_3'), area: t('area_personal'), tag: t('priority_low'), priority: 'low' }
                        ].map((task, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 8 }}
                                onClick={() => setIsEditorOpen(true)}
                                className="glass p-5 rounded-[24px] border border-white/5 hover:border-white/10 hover:bg-white/5 cursor-pointer flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-3 h-3 rounded-full border-2 ${task.priority === 'high' ? 'border-accent-pink shadow-[0_0_10px_rgba(236,72,153,0.3)]' :
                                        task.priority === 'med' ? 'border-primary shadow-[0_0_10px_rgba(139,92,246,0.3)]' :
                                            'border-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                                        }`} />
                                    <div>
                                        <p className="font-bold text-white mb-1">{task.title}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-accent-cyan uppercase tracking-widest">{task.area}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span className="text-[10px] font-black text-text-dim/60 uppercase tracking-widest">{task.tag}</span>
                                        </div>
                                    </div>
                                </div>
                                <Plus size={20} className="text-text-dim/40 group-hover:text-primary transition-all rotate-45" />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-dim/80 flex items-center gap-3">
                            <Sparkles size={18} className="text-primary" />
                            Google Workspace
                        </h3>
                        {googleToken && (
                            <button
                                onClick={loadGoogleData}
                                className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all ${isLoadingGoogle ? 'animate-spin' : ''}`}
                            >
                                <Activity size={14} className="text-primary" />
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {googleToken ? (
                            googleError ? (
                                <div className="glass p-8 rounded-[32px] border border-accent-pink/20 text-center space-y-4">
                                    <p className="text-sm text-accent-pink font-bold">{googleError}</p>
                                    <button onClick={loginWithGoogle} className="px-6 py-3 rounded-2xl bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-[10px] font-black uppercase tracking-widest hover:bg-accent-pink/20 transition-all">
                                        Re-authenticate
                                    </button>
                                </div>
                            ) : googleData.events.length > 0 ? (
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-text-dim/60 uppercase tracking-widest mb-4 px-2">{t('upcoming_events')}</p>
                                    {googleData.events.slice(0, 3).map(event => (
                                        <div key={event.id} className="glass p-5 rounded-[24px] border border-white/5 flex flex-col gap-2">
                                            <p className="text-sm font-bold text-white">{event.summary}</p>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1.5 grayscale opacity-60">
                                                    <Clock size={12} className="text-text-dim" />
                                                    <span className="text-[10px] font-bold text-text-dim">
                                                        {event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', { hour: '2-digit', minute: '2-digit' }) : (language === 'es' ? 'Todo el día' : 'All day')}
                                                    </span>
                                                </div>
                                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                                <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Calendar</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass p-12 rounded-[32px] border border-dashed border-white/5 text-center">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 grayscale opacity-20">
                                        <Calendar size={32} />
                                    </div>
                                    <p className="text-xs text-text-dim font-bold uppercase tracking-widest">{t('no_events')}</p>
                                </div>
                            )
                        ) : (
                            <motion.div
                                whileHover={{ y: -5 }}
                                onClick={loginWithGoogle}
                                className="glass p-10 rounded-[40px] border border-dashed border-primary/20 flex flex-col items-center text-center gap-6 hover:bg-primary/5 transition-all cursor-pointer group"
                            >
                                <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-primary/20 to-accent-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                                    <Calendar size={36} className="text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-white">{t('sign_in_google_to_see')}</p>
                                    <p className="text-[10px] text-text-dim/60 font-medium px-10">{t('connect_google')}</p>
                                </div>
                                <button className="bg-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-glow">
                                    Connect Workspace
                                </button>
                            </motion.div>
                        )}
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

        // Fuse local and google tasks
        const allFusedTasks = [
            ...tasks.map(t => ({ ...t, source: 'local' })),
            ...googleData.tasks.map(gt => ({
                id: gt.id,
                title: gt.title,
                description: gt.notes || '',
                status: gt.status === 'completed' ? 'done' : 'todo',
                priority: 'med',
                userId: user?.uid || '',
                isGoogleTask: true,
                source: 'google'
            }))
        ];

        return (
            <div className="flex gap-8 overflow-x-auto min-h-[calc(100vh-280px)] custom-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
                {columns.map(col => {
                    const columnTasks = allFusedTasks.filter(t => t.status === col.id);

                    return (
                        <div key={col.id} className="flex-1 min-w-[340px] max-w-[420px] flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-8 px-2">
                                {col.icon}
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-dim/80">{col.title}</h3>
                                <span className="ml-2 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-lg text-[10px] font-black text-primary">
                                    {columnTasks.length}
                                </span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {columnTasks.map((task: any) => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5, scale: 1.01 }}
                                        className="relative group p-[1px] rounded-[32px] overflow-hidden"
                                    >
                                        {/* Premium border effect */}
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${task.isGoogleTask ? 'from-accent-cyan/40 to-primary/40' : 'from-primary/40 to-accent-pink/40'}`} />

                                        <div className="relative glass p-6 rounded-[31px] border border-white/5 h-full bg-bg-sidebar/40 backdrop-blur-md">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider border ${task.priority === 'high' ? 'bg-accent-pink/10 text-accent-pink border-accent-pink/20' :
                                                        task.priority === 'med' ? 'bg-primary/10 text-primary border-primary/20' :
                                                            'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20'
                                                        }`}>
                                                        {t(`priority_${task.priority}` as any)}
                                                    </span>
                                                    {task.isGoogleTask && (
                                                        <span className="text-[9px] font-black px-2 py-1 rounded-md bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 uppercase tracking-wider flex items-center gap-1">
                                                            <Sparkles size={10} />
                                                            GOOGLE
                                                        </span>
                                                    )}
                                                </div>

                                                {!task.isGoogleTask && (
                                                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => toggleTaskStatus(task.id)}
                                                            className="p-2 rounded-xl hover:bg-white/5 text-text-dim hover:text-white transition-all shadow-glow"
                                                            title={t('change_status')}
                                                        >
                                                            {task.status === 'done' ? <Check size={16} className="text-secondary" /> : <Clock size={16} />}
                                                        </button>
                                                        <button
                                                            onClick={() => deleteTask(task.id)}
                                                            className="p-2 rounded-xl hover:bg-white/5 text-text-dim hover:text-accent-pink transition-all"
                                                            title={t('delete')}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{task.title}</h4>
                                            <p className="text-sm text-text-dim leading-relaxed mb-4 line-clamp-3">{task.description}</p>

                                            {task.aiInsight && (
                                                <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 flex gap-3 items-start">
                                                    <Zap size={16} className="text-primary mt-1 shrink-0" />
                                                    <p className="text-[11px] text-primary/90 leading-relaxed font-medium italic">
                                                        {task.aiInsight}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                <motion.button
                                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setIsEditorOpen(true)}
                                    className="w-full py-6 border-2 border-dashed border-white/5 rounded-[32px] text-text-dim hover:text-white hover:border-primary/40 transition-all flex flex-col items-center justify-center gap-2 group mt-4 h-32"
                                >
                                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('add_task')}</span>
                                </motion.button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderProjects = () => (
        <div className="space-y-10">
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

    const renderCalendar = () => (
        <div className="space-y-10">
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-heavy p-10 rounded-[40px] border border-white/10"
            >
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('nav_calendar')}</h3>
                        <p className="text-text-dim text-sm">{language === 'es' ? 'Tu agenda sincronizada con Google' : 'Your schedule synchronized with Google'}</p>
                    </div>
                    {googleToken && (
                        <button
                            onClick={loadGoogleData}
                            className={`p-3 rounded-2xl glass hover:bg-white/10 transition-all ${isLoadingGoogle ? 'animate-spin' : ''}`}
                        >
                            <Activity size={20} className="text-primary" />
                        </button>
                    )}
                </div>

                {!googleToken ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar size={40} className="text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold text-white">{t('connect_google')}</h4>
                            <p className="text-sm text-text-dim max-w-sm">{t('sign_in_google_to_see')}</p>
                        </div>
                        <button
                            onClick={loginWithGoogle}
                            className="btn-primary px-8 py-3"
                        >
                            <Plus size={20} />
                            <span>{t('connect_google')}</span>
                        </button>
                    </div>
                ) : googleError ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-accent-pink/10 flex items-center justify-center">
                            <Calendar size={40} className="text-accent-pink" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold text-white">{language === 'es' ? 'Error de Acceso' : 'Access Error'}</h4>
                            <p className="text-sm text-text-dim max-w-sm">{googleError}</p>
                        </div>
                        <button
                            onClick={loginWithGoogle}
                            className="btn-primary bg-accent-pink hover:shadow-accent-pink/20 px-8 py-3"
                        >
                            <Sparkles size={20} />
                            <span>{language === 'es' ? 'Solicitar Permisos' : 'Grant Permissions'}</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {googleData.events.length > 0 ? (
                            googleData.events.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="glass p-6 rounded-3xl border border-white/5 relative group"
                                >
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                                                {event.start.dateTime ? new Date(event.start.dateTime).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short' }) : 'Hoy'}
                                            </span>
                                            <span className="text-[10px] text-text-dim font-bold">
                                                {event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', { hour: '2-digit', minute: '2-digit' }) : 'Todo el día'}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-white text-lg leading-tight group-hover:text-primary transition-colors">{event.summary}</h4>
                                        {event.description && (
                                            <p className="text-xs text-text-dim line-clamp-2 italic">"{event.description}"</p>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 overflow-hidden">
                                        <div className="absolute -inset-20 bg-primary/10 blur-[40px] translate-x-1/2 translate-y-1/2"></div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 flex flex-col items-center gap-4 opacity-50">
                                <Calendar size={48} className="text-text-dim" />
                                <p className="text-sm font-bold uppercase tracking-widest text-text-dim">{t('no_events')}</p>
                            </div>
                        )}
                    </div>
                )}
            </motion.section>
        </div>
    );

    const renderCurrentView = () => {
        switch (activeView) {
            case 'dashboard': return renderDashboard();
            case 'analytics': return <Analytics />;
            case 'tasks': return renderTasks();
            case 'projects': return renderProjects();
            case 'calendar': return renderCalendar();
            default: return renderDashboard();
        }
    };

    return (
        <div className="flex h-screen bg-bg-main overflow-hidden">
            <Sidebar
                activeView={activeView}
                onViewChange={setActiveView}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main
                className={`
                    flex-1 flex flex-col min-w-0 bg-bg-main relative transition-all duration-500 ease-out
                    ${isSidebarOpen
                        ? 'blur-md opacity-40 scale-96 pointer-events-none'
                        : 'blur-0 opacity-100 scale-100'}
                `}
                onClick={() => {
                    if (isSidebarOpen) {
                        setIsSidebarOpen(false);
                    }
                }}
            >

                {/* Header */}
                <header className={`px-6 lg:px-10 py-6 lg:py-10 flex items-center justify-between sticky top-0 bg-bg-main z-30 border-b border-white/5 transition-all duration-500 ${isSidebarOpen ? 'md:pl-80' : ''}`}>
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsSidebarOpen(true);
                                }}
                                className="p-2 -ml-2 rounded-xl bg-white/5 text-text-dim hover:text-white transition-all duration-300"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        <div>
                            <p className="hidden md:block text-text-dim text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-60">
                                {formatDate(new Date())}
                            </p>
                            <h2 className="text-xl lg:text-3xl font-black tracking-tighter flex items-center gap-2 text-white">
                                {activeView === 'dashboard' ? (
                                    <span className="truncate">{t('greeting')}, {user?.displayName?.split(' ')[0] || 'Clemente'}</span>
                                ) : (
                                    <span className="truncate">
                                        {activeView === 'analytics' ? t('performance_overview') :
                                            activeView === 'tasks' ? t('nav_tasks') :
                                                activeView === 'calendar' ? t('nav_calendar') : t('nav_projects')}
                                    </span>
                                )}
                                <span className="animate-wave hidden sm:inline">👋</span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex glass px-4 py-2.5 rounded-2xl items-center gap-3 border border-white/5 focus-within:border-primary/40 transition-all">
                            <Search size={18} className="text-text-dim" />
                            <input
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="bg-transparent border-none outline-none text-sm text-white w-32 xl:w-60 placeholder:text-text-dim/50 font-medium"
                            />
                        </div>
                        <motion.button
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsEditorOpen(true)}
                            className="bg-primary text-white px-5 lg:px-8 py-3 lg:py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-glow flex items-center gap-2 hover:brightness-110 transition-all"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">{activeView === 'dashboard' ? t('new_task') : t('new_goal')}</span>
                        </motion.button>
                    </div>
                </header>

                <div className={`p-6 lg:p-10 flex-1 overflow-y-auto custom-scrollbar relative z-0 transition-all duration-500 ${isSidebarOpen ? 'md:pl-80' : ''}`}>
                    {renderCurrentView()}
                </div>
            </main>

            <NoteEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onAddTask={addTask}
            />
        </div >
    );
};
