
import React, { useState, useEffect } from 'react';
import { User, Language, Theme, UserRole } from './types';
import { translations } from './translations';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('fa');
  const [theme, setTheme] = useState<Theme>('light');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => setLang(prev => (prev === 'en' ? 'fa' : 'en'));
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleLogin = (phone: string, role: UserRole) => {
    // Define default permissions based on role
    let permissions: string[] = [];
    if (role === UserRole.ADMIN) {
      permissions = ['dashboard', 'customer_view', 'cards', 'devices', 'games_cat', 'pos', 'gifts', 'customers', 'staff', 'finance', 'reports', 'settings'];
    } else if (role === UserRole.CUSTOMER) {
      permissions = ['customer_view', 'cards'];
    } else if (role === UserRole.OPERATOR) {
      permissions = ['dashboard', 'customer_view', 'cards', 'pos', 'customers'];
    }

    // Fix: Added isActive: true to satisfy the User interface requirement
    setUser({
      id: '1',
      name: role === UserRole.ADMIN ? 'مدیریت سیستم' : 'مشتری گرامی',
      phone,
      role,
      permissions,
      isActive: true
    });
  };

  const handleLogout = () => setUser(null);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${lang === 'fa' ? 'font-fa' : 'font-en'}`}>
      {!user ? (
        <Login 
          t={t} 
          lang={lang} 
          theme={theme}
          onLogin={handleLogin} 
          toggleLanguage={toggleLanguage} 
          toggleTheme={toggleTheme}
        />
      ) : (
        <Dashboard 
          user={user} 
          t={t} 
          lang={lang}
          theme={theme}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          toggleLanguage={toggleLanguage} 
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;
