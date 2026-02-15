# anhqv-note 🚀

**anhqv-note** es una aplicación de productividad de alta gama diseñada para gestionar notas, tareas y objetivos con una estética moderna y funcional. Combina la potencia de la inteligencia artificial con un diseño minimalista y dinámico para ayudarte a alcanzar tu máximo potencial.

---

## ✨ Características Principales

### 🚀 Momento Visual (Visual Momentum)
El concepto central de **anhqv-note**. No es solo una lista de tareas, es un centro de mando diseñado para darte un impulso constante:
- **Eficiencia Dinámica**: Un indicador en tiempo real de tu constancia completando tareas.
- **Victorias Diarias**: Un contador rápido de logros para gestionar tu energía y motivación.
- **Equilibrio Vital**: Gráfico visual que representa cómo divides tu tiempo entre **Trabajo**, **Aprendizaje** y **Vida Personal**, ayudándote a no descuidar ninguna área.

### 🧠 Editor Inteligente (AI Enhanced)
- **Simplificación con IA**: Refina y resume notas complejas con un solo clic.
- **Gestión de Etiquetas**: Sugerencias automáticas basadas en el contenido.
- **Formato Enriquecido**: Toolbar flotante para una edición premium.

### 🎯 Enfoque de Hoy (Today's Focus)
Centrado en la metodología de los "Big 3". Clasifica tus tareas críticas por prioridad (Alta, Media, Baja) para maximizar el impacto sin abrumarte.

### 📈 Análisis de Productividad
- **Radar de Maestría**: Mide habilidades como Disciplina, Visión y Ejecución.
- **Mapa de Actividad**: Visualiza tu consistencia a lo largo de los últimos 365 días.
- **Hitos y Logros**: Sistema de recompensas visuales para celebrar tu progreso.

### 🌐 Google Workspace Integration
Sincronización directa con **Google Calendar** y **Google Tasks** para que toda tu planificación esté unificada en un solo lugar.

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
