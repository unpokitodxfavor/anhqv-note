import React from 'react';
import {
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis
} from 'recharts';
import {
    Trophy,
    Target,
    Zap,
    TrendingUp,
    Calendar,
    ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageProvider';

export const Analytics: React.FC = () => {
    const { t } = useLanguage();

    const radarData = [
        { subject: t('sub_consistency'), A: 120, fullMark: 150 },
        { subject: t('sub_complexity'), A: 98, fullMark: 150 },
        { subject: t('sub_discipline'), A: 86, fullMark: 150 },
        { subject: t('sub_vision'), A: 99, fullMark: 150 },
        { subject: t('sub_execution'), A: 110, fullMark: 150 },
        { subject: t('sub_balance'), A: 85, fullMark: 150 },
    ];

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-10 py-10 space-y-10">
            <header>
                <p className="text-text-dim text-sm font-medium mb-1">{t('performance_overview')}</p>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    {t('productivity_architecture')} <TrendingUp className="text-primary" />
                </h2>
            </header>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: <Zap className="text-accent-cyan" />, label: t('current_streak'), value: `12 ${t('days')}`, trend: '+2' },
                    { icon: <Target className="text-accent-pink" />, label: t('goals_met'), value: '86%', trend: '+5%' },
                    { icon: <Trophy className="text-secondary" />, label: t('rank'), value: 'Elite', trend: 'Top 2%' },
                    { icon: <Calendar className="text-primary" />, label: t('deep_work'), value: '142h', trend: t('this_month') },
                ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            {stat.icon}
                        </div>
                        <p className="text-text-dim text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-bold text-white mb-1">{stat.value}</h4>
                        <p className="text-xs text-text-muted">{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Radar Chart: Mastery Radar */}
                <div className="lg:col-span-1 glass p-8 rounded-[32px] border border-white/5 flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-8 w-full">{t('goal_mastery')}</h3>
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} />
                                <Radar
                                    name="Clemente"
                                    dataKey="A"
                                    stroke="var(--primary)"
                                    fill="var(--primary)"
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-xs text-text-dim">{t('actual_performance')}</span>
                        </div>
                    </div>
                </div>

                {/* Heatmap Placeholder & Success Timeline */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Productivity Heatmap */}
                    <div className="glass p-8 rounded-[32px] border border-white/5">
                        <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
                            {t('activity_heatmap')}
                            <span className="text-xs text-text-dim font-normal">{t('last_365_days')}</span>
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {Array.from({ length: 154 }).map((_, i) => {
                                const intensity = Math.random();
                                return (
                                    <div
                                        key={i}
                                        className="w-4 h-4 rounded-[3px] transition-all hover:scale-125 cursor-pointer"
                                        style={{
                                            backgroundColor: intensity > 0.8 ? 'var(--primary)' :
                                                intensity > 0.5 ? 'rgba(127, 19, 236, 0.4)' :
                                                    intensity > 0.2 ? 'rgba(127, 19, 236, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[10px] text-text-dim">
                            <span>{t('less')}</span>
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/10" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/40" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
                            <span>{t('more')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Achievement Badges */}
                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h3 className="text-lg font-semibold mb-6">{t('unlocked_badges')}</h3>
                            <div className="flex gap-4">
                                {[
                                    { color: 'var(--primary)', icon: <Zap size={18} />, label: t('area_work') },
                                    { color: 'var(--accent-cyan)', icon: <Target size={18} />, label: t('priority_high') },
                                    { color: 'var(--secondary)', icon: <TrendingUp size={18} />, label: t('sub_vision') },
                                ].map((badge, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div
                                            className="w-14 h-14 rounded-full flex items-center justify-center relative shadow-glow transition-transform hover:rotate-12 cursor-pointer"
                                            style={{ background: `linear-gradient(135deg, ${badge.color}, transparent)`, border: `1px solid ${badge.color}40` }}
                                        >
                                            <div className="text-white">
                                                {badge.icon}
                                            </div>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-text-dim tracking-widest">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Success Milestones */}
                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h3 className="text-lg font-semibold mb-6">{t('recent_milestones')}</h3>
                            <div className="space-y-4">
                                {[
                                    { text: t('ms_completed'), time: t('ms_time_2h') },
                                    { text: t('ms_reached'), time: t('ms_yesterday') },
                                    { text: t('ms_streak'), time: t('ms_time_2d') }
                                ].map((m, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div>
                                            <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{m.text}</p>
                                            <p className="text-xs text-text-dim">{m.time}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-text-dim opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
