import { useAuth } from './context/AuthProvider';
import { useLanguage } from './context/LanguageProvider';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

function App() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="h-screen bg-bg-main flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-dim text-sm font-medium animate-pulse">{t('processing')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main text-text-main antialiased selection:bg-primary/20 selection:text-primary">
      {user ? <Dashboard /> : <LoginPage />}
    </div>
  );
}

export default App;
