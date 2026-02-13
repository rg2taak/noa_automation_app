
import React from 'react';
import { Menu, Maximize, Languages, Moon, Sun, Calendar, ChevronDown, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { User, Language, Theme } from '../types';
import { ExtendedTranslationStrings } from '../translations';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  lang: Language;
  toggleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;
  user: User;
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: (open: boolean) => void;
  profileRef: React.RefObject<HTMLDivElement>;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isSidebarOpen, setIsSidebarOpen, isFullscreen, toggleFullscreen, 
  lang, toggleLanguage, theme, toggleTheme, user, t, isRtl, 
  isProfileMenuOpen, setIsProfileMenuOpen, profileRef, onLogout
}) => {
  
  const getCurrentDate = () => {
    const now = new Date();
    if (lang === 'fa') {
      return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { 
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
      }).format(now);
    }
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    }).format(now);
  };

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400">
          <Menu size={22} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-lg font-black text-slate-900 dark:text-white leading-none">{t.parkName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Calendar size={12} className="text-indigo-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{getCurrentDate()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800">
          <button onClick={toggleFullscreen} title={t.fullscreen} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all text-slate-600 dark:text-slate-400">
            <Maximize size={18}/>
          </button>
          <button onClick={toggleLanguage} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all text-slate-600 dark:text-slate-400 text-xs font-bold uppercase flex items-center gap-2">
            <Languages size={18}/>{lang}
          </button>
          <button onClick={toggleTheme} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all text-slate-600 dark:text-slate-400">
            {theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}
          </button>
        </div>
        
        <div className="relative" ref={profileRef}>
          <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            <div className="w-10 h-10 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 bg-white shadow-sm overflow-hidden p-0.5">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} className="w-full h-full rounded-lg" alt="User" />
            </div>
            <div className={`hidden md:flex flex-col items-start ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="text-xs font-black dark:text-white leading-none">{user.name}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{user.role}</span>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isProfileMenuOpen && (
            <div className={`absolute top-full mt-3 ${isRtl ? 'left-0' : 'right-0'} w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2`}>
              <div className="px-5 py-3 border-b dark:border-slate-800 mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.profile}</p>
                <p className="text-sm font-bold dark:text-white truncate mt-1">{user.phone}</p>
              </div>
              
              <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <UserIcon size={16} className="text-indigo-500" />
                {t.profile}
              </button>
              
              <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Settings size={16} className="text-indigo-500" />
                {t.settings}
              </button>

              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />

              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                <LogOut size={16} />
                {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
