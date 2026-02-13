
import React, { useState } from 'react';
import { Language, Theme, UserRole } from '../types';
import { ExtendedTranslationStrings } from '../translations';
import { Sun, Moon, Languages, Smartphone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginProps {
  t: ExtendedTranslationStrings;
  lang: Language;
  theme: Theme;
  onLogin: (phone: string, role: UserRole) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

type ErrorKey = keyof Pick<ExtendedTranslationStrings, 'invalidPhone' | 'requiredField' | 'passwordMinLength' | 'errorLogin'>;

const Login: React.FC<LoginProps> = ({ t, lang, theme, onLogin, toggleLanguage, toggleTheme }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: ErrorKey; password?: ErrorKey; form?: ErrorKey }>({});

  const isRtl = lang === 'fa';

  const toEnglishDigits = (str: string) => {
    return str.replace(/[۰-۹]/g, (d) => (d.charCodeAt(0) - 1776).toString())
              .replace(/[٠-٩]/g, (d) => (d.charCodeAt(0) - 1632).toString());
  };

  const validate = () => {
    const newErrors: { phone?: ErrorKey; password?: ErrorKey } = {};
    const phoneRegex = /^09\d{9}$/;
    
    if (!phone) {
      newErrors.phone = 'requiredField';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'invalidPhone';
    }

    if (!password) {
      newErrors.password = 'requiredField';
    } else if (password.length < 4) {
      newErrors.password = 'passwordMinLength';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setTimeout(() => {
      // Admin Check
      if (phone === '09123456789' && password === '1234') {
        onLogin(phone, UserRole.ADMIN);
      } 
      // Generic Customer Check (for demo)
      else if (password === '1111') {
        onLogin(phone, UserRole.CUSTOMER);
      }
      else {
        setErrors({ form: 'errorLogin' });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${isRtl ? 'font-fa' : 'font-en'}`}>
      <div className="absolute top-6 right-6 left-6 flex justify-between items-center z-20">
        <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <button 
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            type="button"
            onClick={toggleLanguage}
            className="h-10 px-3 flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all"
          >
            <Languages size={18} />
            <span className="text-xs font-bold uppercase">{lang}</span>
          </button>
        </div>
      </div>

      <div className="relative mt-20 w-full max-w-md">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
          <div className="w-32 h-32 rounded-full p-1.5 bg-slate-50 dark:bg-slate-950">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl">
              <img 
                src="https://api.dicebear.com/7.x/shapes/svg?seed=Noa&backgroundColor=4f46e5" 
                alt="Noa Logo" 
                className="w-full h-full object-cover bg-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-indigo-950/20 p-10 pt-20 border border-slate-100 dark:border-slate-800 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black dark:text-white mb-2">{t.loginTitle}</h1>
            <div className="w-12 h-1 bg-indigo-600 mx-auto mt-4 rounded-full opacity-50"></div>
          </div>

          <div className="mb-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Admin: 09123456789 / 1234
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              Customer: Any Number / 1111
            </p>
          </div>

          {errors.form && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-in fade-in zoom-in">
              <AlertCircle size={20} />
              <span>{t[errors.form]}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="space-y-1.5">
              <label className={`block text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest px-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t.phoneLabel}
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors`}>
                  <Smartphone size={18} />
                </div>
                <input
                  type="tel"
                  placeholder="09123456789"
                  value={phone}
                  onChange={(e) => {
                    const normalized = toEnglishDigits(e.target.value);
                    setPhone(normalized);
                    setErrors(prev => ({ ...prev, phone: undefined, form: undefined }));
                  }}
                  className={`w-full ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} py-4 bg-slate-50 dark:bg-slate-800/40 border ${errors.phone ? 'border-red-400 dark:border-red-900' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-lg font-medium`}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold px-2 mt-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={14} />
                  <span>{t[errors.phone]}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={`block text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest px-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t.passwordLabel}
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors`}>
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    const normalized = toEnglishDigits(e.target.value);
                    setPassword(normalized);
                    setErrors(prev => ({ ...prev, password: undefined, form: undefined }));
                  }}
                  className={`w-full ${isRtl ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12 text-left'} py-4 bg-slate-50 dark:bg-slate-800/40 border ${errors.password ? 'border-red-400 dark:border-red-900' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-lg font-medium`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'right-4'} flex items-center text-slate-400 hover:text-indigo-500 transition-colors`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold px-2 mt-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={14} />
                  <span>{t[errors.password]}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer w-5 h-5 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-slate-800 transition-all cursor-pointer appearance-none checked:bg-indigo-600 checked:border-indigo-600"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-bold group-hover:text-indigo-600 transition-colors">
                  {t.rememberMe}
                </span>
              </label>
              <button type="button" className="text-sm font-black text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                {t.forgotPassword}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:translate-y-[-2px] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-xl mt-4"
            >
              {loading ? (
                <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : t.loginBtn}
            </button>
          </form>

          <div className="mt-12 pt-6 border-t border-slate-50 dark:border-slate-800 w-full text-center">
              <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]">
                NOA AUTOMATION VERSION 2.0.0
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
