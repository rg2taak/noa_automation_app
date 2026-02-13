
import React, { useState } from 'react';
import { X, Save, Gift, Wallet, TrendingUp, Percent, CheckCircle2, XCircle } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';
import { GiftPackage } from '../../types';

interface GiftPackageModalProps {
  giftPackage: GiftPackage | null;
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onClose: () => void;
  onSave: (pkg: any) => void;
}

const GiftPackageModal: React.FC<GiftPackageModalProps> = ({ giftPackage, t, isRtl, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<GiftPackage>>(
    giftPackage || { fromAmount: '', toAmount: '', giftType: 'fixed', giftValue: '', isActive: true }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = `w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold`;
  const iconClass = `absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Gift size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white">{giftPackage ? (isRtl ? 'ویرایش بسته' : 'Edit Package') : (isRtl ? 'بسته هدیه جدید' : 'New Gift Package')}</h3>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.fromAmount}</label>
              <div className="relative group">
                <Wallet className={iconClass} size={18} />
                <input required type="text" value={formData.fromAmount} onChange={(e) => setFormData({...formData, fromAmount: e.target.value})} className={inputClass} placeholder="0" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.toAmount}</label>
              <div className="relative group">
                <TrendingUp className={iconClass} size={18} />
                <input required type="text" value={formData.toAmount} onChange={(e) => setFormData({...formData, toAmount: e.target.value})} className={inputClass} placeholder="500,000" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.giftType}</label>
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, giftType: 'fixed'})}
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all ${formData.giftType === 'fixed' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-transparent'}`}
              >
                <Wallet size={18}/> {t.fixed}
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, giftType: 'percentage'})}
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all ${formData.giftType === 'percentage' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-transparent'}`}
              >
                <Percent size={18}/> {t.percentage}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.giftValue}</label>
            <div className="relative group">
              {formData.giftType === 'percentage' ? <Percent className={iconClass} size={18} /> : <Gift className={iconClass} size={18} />}
              <input required type="text" value={formData.giftValue} onChange={(e) => setFormData({...formData, giftValue: e.target.value})} className={inputClass} placeholder={formData.giftType === 'percentage' ? '10' : '50,000'} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.activeStatus}</label>
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, isActive: true})}
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all ${formData.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-transparent'}`}
              >
                <CheckCircle2 size={18}/> {t.active}
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, isActive: false})}
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all ${!formData.isActive ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-transparent'}`}
              >
                <XCircle size={18}/> {t.inactive}
              </button>
            </div>
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

export default GiftPackageModal;