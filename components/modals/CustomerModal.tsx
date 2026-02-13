
import React, { useState } from 'react';
import { X, Save, User, Mail, Smartphone, ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

interface CustomerModalProps {
  customer: Customer | null;
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onClose: () => void;
  onSave: (pkg: any) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, t, isRtl, onClose, onSave }) => {
  const [formData, setFormData] = useState<Customer>(
    customer || { name: '', email: '', phone: '' }
  );
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(!customer);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (showPasswordFields) {
      if (password !== confirmPassword) {
        setError(t.passwordsDoNotMatch);
        return;
      }
      if (password && password.length < 4) {
        setError(t.passwordMinLength);
        return;
      }
    }

    onSave({ ...formData, password });
  };

  const inputClass = `w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold`;
  const iconClass = `absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white">{customer ? t.editCustomer : t.addCustomer}</h3>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar" dir={isRtl ? 'rtl' : 'ltr'}>
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 text-xs font-bold animate-in shake duration-500">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.customerName}</label>
            <div className="relative group">
              <User className={iconClass} size={18} />
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClass} placeholder={isRtl ? 'نام کامل...' : 'Full Name...'} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.customerPhone}</label>
            <div className="relative group">
              <Smartphone className={iconClass} size={18} />
              <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputClass} placeholder="0912..." />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.customerEmail}</label>
            <div className="relative group">
              <Mail className={iconClass} size={18} />
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputClass} placeholder="example@mail.com" />
            </div>
          </div>

          {customer && (
            <div className="pt-2">
              <button 
                type="button" 
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className={`flex items-center gap-2 text-xs font-black transition-all ${showPasswordFields ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-500'}`}
              >
                <Lock size={16} />
                {t.changePassword}
              </button>
            </div>
          )}

          {showPasswordFields && (
            <div className="space-y-4 pt-4 border-t dark:border-slate-800 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.passwordLabel}</label>
                <div className="relative group">
                  <Lock className={iconClass} size={18} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••" required={!customer} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.confirmPasswordLabel}</label>
                <div className="relative group">
                  <Lock className={iconClass} size={18} />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} placeholder="••••" required={!customer} />
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20 flex items-start gap-3">
            <ShieldCheck size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-blue-600 leading-relaxed">
              {isRtl ? 'اطلاعات مشتری برای صدور فاکتور و اطلاع‌رسانی پاداش‌ها استفاده خواهد شد.' : 'Customer information will be used for invoicing and reward notifications.'}
            </p>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
              <Save size={18} /> {t.save}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl transition-all">
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
