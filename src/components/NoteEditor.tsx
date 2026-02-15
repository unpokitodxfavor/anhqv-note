import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Bold,
    Italic,
    List,
    Image as ImageIcon,
    Link as LinkIcon,
    Sparkles,
    ChevronDown,
    Users,
    Target
} from 'lucide-react';
import { useLanguage } from '../context/LanguageProvider';

interface NoteEditorProps {
    isOpen: boolean;
    onClose: () => void;
    initialTitle?: string;
    onAddTask?: (taskData: { title: string; description: string; status: 'todo'; priority: 'med'; area: string }) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ isOpen, onClose, initialTitle = "New Note", onAddTask }) => {
    const { t, language } = useLanguage();
    const [title, setTitle] = useState(initialTitle === "New Note" ? t('new_task') : initialTitle);
    const [content, setContent] = useState('');
    const [area, setArea] = useState('Personal');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSave = () => {
        if (onAddTask && title.trim()) {
            onAddTask({
                title,
                description: content,
                status: 'todo',
                priority: 'med',
                area
            });
            onClose();
        }
    };

    const handleAISimplify = () => {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="glass-heavy w-full max-w-5xl h-[85vh] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-white/10"
                    >
                        {/* Top Bar */}
                        <div className="px-8 py-6 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <Sparkles size={16} className="text-primary" />
                                </div>
                                <div className="flex items-center gap-2 text-text-dim text-sm font-medium">
                                    <span>{t('nav_projects')}</span>
                                    <span>/</span>
                                    <span className="text-white">{t('vision_project')}</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-2">
                                    {[1, 2].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-main bg-neutral-800 flex items-center justify-center overflow-hidden">
                                            <Users size={14} className="text-text-dim" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-bg-main bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                                        +2
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-text-dim hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div className="flex-1 overflow-y-auto px-16 py-12 custom-scrollbar relative">
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t('note_title_placeholder')}
                                className="w-full bg-transparent border-none outline-none text-5xl font-bold bg-gradient-to-r from-white to-text-dim bg-clip-text text-transparent placeholder:text-white/20 resize-none h-16 mb-8"
                            />

                            <div className="relative group">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder={t('start_writing')}
                                    className="w-full bg-transparent border-none outline-none text-xl leading-relaxed text-text-muted placeholder:text-text-dim resize-none min-h-[150px]"
                                />

                                {/* Embedded Visual (Sparkline Placeholder) */}
                                <div className="my-8 p-6 glass rounded-2xl border border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                                            <Target size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{t('vision_momentum')}</p>
                                            <p className="text-xs text-text-dim">{t('projected_growth')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-1 h-12">
                                        {[3, 5, 4, 7, 8, 6, 9, 10].map((h, i) => (
                                            <div
                                                key={i}
                                                className="w-2 bg-accent-cyan/40 rounded-t-full hover:bg-accent-cyan transition-colors"
                                                style={{ height: `${h * 10}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Area Selector */}
                                <div className="mt-8 flex flex-col gap-4">
                                    <span className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em]">{language === 'es' ? 'PROYECTO / ÁREA' : 'PROJECT / AREA'}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['Work', 'Learning', 'Personal', 'Vision'].map((a) => (
                                            <button
                                                key={a}
                                                onClick={() => setArea(a)}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${area === a
                                                    ? 'bg-primary text-white border-primary shadow-glow'
                                                    : 'bg-white/5 text-text-dim border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                {a === 'Work' ? t('area_work') : a === 'Learning' ? t('area_learning') : a === 'Personal' ? t('area_personal') : 'Vision'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Floating Toolbar */}
                            <div className="sticky bottom-10 left-1/2 -translate-x-1/2 w-fit px-2 py-2 glass rounded-2xl shadow-glow flex items-center gap-1 border border-white/10">
                                <button className="p-3 rounded-xl hover:bg-white/10 text-text-dim hover:text-white transition-colors">
                                    <Bold size={18} />
                                </button>
                                <button className="p-3 rounded-xl hover:bg-white/10 text-text-dim hover:text-white transition-colors">
                                    <Italic size={18} />
                                </button>
                                <button className="p-3 rounded-xl hover:bg-white/10 text-text-dim hover:text-white transition-colors">
                                    <List size={18} />
                                </button>
                                <div className="w-px h-6 bg-white/10 mx-1" />
                                <button className="p-3 rounded-xl hover:bg-white/10 text-text-dim hover:text-white transition-colors">
                                    <ImageIcon size={18} />
                                </button>
                                <button className="p-3 rounded-xl hover:bg-white/10 text-text-dim hover:text-white transition-colors">
                                    <LinkIcon size={18} />
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2.5 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20 font-bold text-sm transition-all"
                                >
                                    {language === 'es' ? 'Guardar' : 'Save'}
                                </button>
                                <div className="w-px h-6 bg-white/10 mx-1" />
                                <button
                                    onClick={handleAISimplify}
                                    disabled={isProcessing}
                                    className={`
                    px-5 py-2.5 rounded-xl transition-all font-bold text-sm flex items-center gap-2 border
                    ${isProcessing
                                            ? 'bg-primary/40 text-white border-primary cursor-wait animate-pulse'
                                            : 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 shadow-sm'}
                   `}
                                >
                                    <Sparkles size={16} />
                                    <span>{isProcessing ? t('processing') : t('ai_simplify')}</span>
                                </button>
                            </div>
                        </div>

                        {/* Bottom Bar / Tags */}
                        <div className="px-8 py-4 bg-white/2 border-t border-white/5 flex items-center gap-3">
                            <span className="text-xs font-bold text-text-dim uppercase tracking-wider">{t('suggested_tags')}:</span>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 glass rounded-full text-xs text-accent-cyan border border-accent-cyan/20">#Vision</span>
                                <span className="px-3 py-1 glass rounded-full text-xs text-secondary border border-secondary/20">#Planning</span>
                                <span className="px-3 py-1 glass rounded-full text-xs text-text-dim border border-white/5 hover:border-white/20 transition-colors cursor-pointer">+ {t('add_tag')}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
