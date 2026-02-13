export const translations = {
    en: {
        // Auth & General
        app_name: "anhqv-note",
        app_tagline: "Your high-end productivity companion.",
        login_google: "Continue with Google",
        login_facebook: "Continue with Facebook",
        login_footer: "New here? Experience the future of notes.",
        sign_out: "Sign Out",
        pro_member: "Pro Member",
        search_placeholder: "Search anything...",

        // Sidebar
        nav_dashboard: "Dashboard",
        nav_analytics: "Analytics",
        nav_tasks: "All Tasks",
        nav_projects: "Projects",

        // Dashboard
        greeting: "Good Morning",
        visual_momentum: "Visual Momentum",
        efficiency: "Efficiency",
        tasks_done: "Tasks Done",
        remaining_for_today: "remaining for today",
        from_yesterday: "from yesterday",
        life_balance: "Life Balance",
        todays_focus: "Today's Focus",
        add_task: "Add a task...",
        new_task: "New Task",
        new_goal: "New Goal",
        priority_label: "Priority",

        // Task Areas (Enfoques)
        area_work: "Work",
        area_learning: "Learning",
        area_personal: "Personal",

        // Priorities
        priority_high: "High",
        priority_med: "Med",
        priority_low: "Low",

        // Analytics
        performance_overview: "Performance Overview",
        productivity_architecture: "Productivity Architecture",
        current_streak: "Current Streak",
        goals_met: "Goals Met",
        rank: "Rank",
        deep_work: "Deep Work",
        days: "Days",
        this_month: "This month",
        goal_mastery: "Goal Mastery Radar",
        actual_performance: "Actual Performance",
        activity_heatmap: "Activity Heatmap",
        last_365_days: "Last 365 Days",
        unlocked_badges: "Unlocked Badges",
        recent_milestones: "Recent Milestones",
        less: "Less",
        more: "More",

        // Radar subjects
        sub_consistency: "Consistency",
        sub_complexity: "Complexity",
        sub_discipline: "Discipline",
        sub_vision: "Vision",
        sub_execution: "Execution",
        sub_balance: "Balance",

        // Milestones
        ms_completed: "Completed 'Vision 2026' Project",
        ms_reached: "Reached 90% Productivity Score",
        ms_streak: "10-day Consistency Streak",
        ms_time_2h: "2 hours ago",
        ms_yesterday: "Yesterday",
        ms_time_2d: "2 days ago",

        // Note Editor
        ai_simplify: "AI Simplify",
        processing: "Processing...",
        suggested_tags: "Suggested Tags",
        add_tag: "Add Tag",
        vision_momentum: "Vision Momentum",
        projected_growth: "Projected growth based on current tasks",
        start_writing: "Start writing your vision...",
        note_title_placeholder: "Note Title",
        vision_project: "Vision 2026",

        // Task titles (for demo)
        task_1: "Finalize anhqv-note implementation plan",
        task_2: "Research glassmorphic animation patterns",
        task_3: "Evening meditation & reflection",
    },
    es: {
        // Auth & General
        app_name: "anhqv-note",
        app_tagline: "Tu compañero de productividad de alta gama.",
        login_google: "Continuar con Google",
        login_facebook: "Continuar con Facebook",
        login_footer: "¿Nuevo aquí? Experimenta el futuro de las notas.",
        sign_out: "Cerrar Sesión",
        pro_member: "Miembro Pro",
        search_placeholder: "Buscar lo que sea...",

        // Sidebar
        nav_dashboard: "Panel Principal",
        nav_analytics: "Análisis",
        nav_tasks: "Todas las Tareas",
        nav_projects: "Proyectos",

        // Dashboard
        greeting: "Buen Día",
        visual_momentum: "Momento Visual",
        efficiency: "Eficiencia",
        tasks_done: "Tareas Hechas",
        remaining_for_today: "restantes hoy",
        from_yesterday: "desde ayer",
        life_balance: "Equilibrio Vital",
        todays_focus: "Enfoque de Hoy",
        add_task: "Añadir tarea...",
        new_task: "Nueva Tarea",
        new_goal: "Nuevo Objetivo",
        priority_label: "Prioridad",

        // Task Areas (Enfoques)
        area_work: "Trabajo",
        area_learning: "Aprendizaje",
        area_personal: "Personal",

        // Priorities
        priority_high: "Alta",
        priority_med: "Media",
        priority_low: "Baja",

        // Analytics
        performance_overview: "Resumen de Rendimiento",
        productivity_architecture: "Arquitectura de Productividad",
        current_streak: "Racha Actual",
        goals_met: "Metas Cumplidas",
        rank: "Rango",
        deep_work: "Trabajo Profundo",
        days: "Días",
        this_month: "Este mes",
        goal_mastery: "Radar de Maestría",
        actual_performance: "Rendimiento Actual",
        activity_heatmap: "Mapa de Actividad",
        last_365_days: "Últimos 365 Días",
        unlocked_badges: "Logros Desbloqueados",
        recent_milestones: "Hitos Recientes",
        less: "Menos",
        more: "Más",

        // Radar subjects
        sub_consistency: "Consistencia",
        sub_complexity: "Complejidad",
        sub_discipline: "Disciplina",
        sub_vision: "Visión",
        sub_execution: "Ejecución",
        sub_balance: "Balance",

        // Milestones
        ms_completed: "Proyecto 'Visión 2026' Completado",
        ms_reached: "90% de Puntuación de Productividad",
        ms_streak: "Racha de 10 días de Consistencia",
        ms_time_2h: "Hace 2 horas",
        ms_yesterday: "Ayer",
        ms_time_2d: "Hace 2 días",

        // Note Editor
        ai_simplify: "Simplificar con IA",
        processing: "Procesando...",
        suggested_tags: "Etiquetas Sugeridas",
        add_tag: "Añadir Etiqueta",
        vision_momentum: "Momento de Visión",
        projected_growth: "Crecimiento proyectado basado en tareas actuales",
        start_writing: "Empieza a escribir tu visión...",
        note_title_placeholder: "Título de la nota",
        vision_project: "Visión 2026",

        // Task titles (for demo)
        task_1: "Finalizar plan de implementación de anhqv-note",
        task_2: "Investigar patrones de animación glassmorphic",
        task_3: "Meditación y reflexión nocturna",
    }
};

export type Language = 'en' | 'es';
export type TranslationKey = keyof typeof translations['en'];
