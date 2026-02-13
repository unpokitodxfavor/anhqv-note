# anhqv-note 🚀

**anhqv-note** es una aplicación de productividad de alta gama diseñada para gestionar notas, tareas y objetivos con una estética moderna y funcional. Combina la potencia de la inteligencia artificial con un diseño minimalista y dinámico para ayudarte a alcanzar tu máximo potencial.

---

## ✨ Características Principales

### 🧠 Editor Inteligente (AI Enhanced)
- **Simplificación con IA**: Utiliza inteligencia artificial para refinar y resumir tus notas complejas con un solo clic.
- **Formato Enriquecido**: Toolbar flotante para negritas, cursivas, listas, imágenes y enlaces.
- **Gestión de Etiquetas Sugeridas**: El sistema sugiere etiquetas basadas en tu contenido para mantener todo organizado.
- **Colaboración en Tiempo Real**: Visualiza quién más está trabajando en la nota contigo.

### 📊 Panel de Control Pro (Dashboard)
- **Momento Visual**: Gráficos dinámicos que muestran tu eficiencia y progreso diario.
- **Enfoque Diario**: Una lista curada de tus tareas más importantes con niveles de prioridad (Alta, Media, Baja).
- **Métricas de Rendimiento**: Seguimiento de tareas completadas y objetivos restantes para el día.

### 📈 Análisis de Productividad
- **Radar de Maestría**: Visualiza tus fortalezas en áreas críticas como Consistencia, Disciplina, Visión y Ejecución.
- **Mapa de Actividad (Heatmap)**: Registro visual de tu productividad durante los últimos 365 días.
- **Hitos y Logros**: Sistema de medallas y registro de hitos recientes para mantener la motivación.

### 🌍 Internacionalización Total
- Soporte completo para **Español** e **Inglés**.
- Cambio de idioma instantáneo desde la barra lateral.
- Formateo de fechas adaptado localmente.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 + TypeScript + Vite.
- **Estilos**: Tailwind CSS (Glassmorphism & Animaciones Premium).
- **Animaciones**: Framer Motion.
- **Iconografía**: Lucide React.
- **Gráficos**: Recharts.
- **Backend**: Firebase (Auth & Firestore).

---

## 🚀 Cómo Empezar

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/unpokitodxfavor/anhqv-note.git
   ```
2. Entra en el directorio:
   ```bash
   cd anhqv-note
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

### Configuración de Firebase
Crea un archivo en `src/services/firebase.ts` con tus credenciales de Firebase:

```typescript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### Ejecución en Desarrollo
```bash
npm run dev
```

---

## 🎨 Diseño y Estética
La aplicación utiliza un diseño **Glassmorphism** con:
- Fondos oscuros profundos ocupando colores HSL personalizados.
- Efectos de desenfoque de fondo (backdrop-blur).
- Animaciones suaves de entrada y micro-interacciones.

---

Desarrollado con ❤️ para optimizar tu visión y ejecución.
