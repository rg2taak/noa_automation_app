
import React, { useState } from 'react';
import { X, Save, Gamepad2, Layers, Clock, Wallet, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface Game {
  id?: number;
  name: string;
  description: string;
  category: string;
  time: string;
  status: 'active' | 'inactive';
  image: string;
  price: string;
}

interface Category {
  id: number;
  name: string;
}

interface GameAddModalProps {
  game: Game | null;
  categories: Category[];
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onClose: () => void;
  onSave: (game: any) => void;
}

const GameAddModal: React.FC<GameAddModalProps> = ({ game, categories, t, isRtl, onClose, onSave }) => {
  const [formData, setFormData] = useState<Game>(
    game || { 
      name: '', description: '', category: categories[0]?.name || '', 
      time: '05:00', status: 'active', image: '', price: '' 
    }
  );

  const defaultImage = `https://api.dicebear.com/7.x/shapes/svg?seed=${formData.name || 'game'}&backgroundColor=6366f1`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, image: formData.image || defaultImage });
  };

  const inputClass = `w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold`;
  const iconClass = `absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Gamepad2 size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white">{game ? (isRtl ? 'ویرایش بازی' : 'Edit Game') : (isRtl ? 'بازی جدید' : 'New Game')}</h3>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.deviceName}</label>
              <div className="relative group">
                <Gamepad2 className={iconClass} size={18} />
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClass} placeholder={isRtl ? 'نام بازی...' : 'Game Name...'} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.gameCategory}</label>
              <div className="relative group">
                <Layers className={iconClass} size={18} />
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className={`${inputClass} appearance-none`}>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.gameDescription}</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className="w-full p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold min-h-[100px]"
                placeholder={isRtl ? 'توضیحات کوتاه بازی...' : 'Short description...'}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.gameTime}</label>
              <div className="relative group">
                <Clock className={iconClass} size={18} />
                <input type="text" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className={inputClass} placeholder="05:00" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.devicePrice}</label>
              <div className="relative group">
                <Wallet className={iconClass} size={18} />
                <input required type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className={inputClass} placeholder="45,000" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.gameImage}</label>
              <div className="relative group">
                <ImageIcon className={iconClass} size={18} />
                <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className={inputClass} placeholder="URL..." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.deviceStatus}</label>
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, status: 'active'})}
                  className={`flex-1 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all ${formData.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-transparent'}`}
                >
                  <CheckCircle size={18}/> {t.active}
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, status: 'inactive'})}
                  className={`flex-1 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all ${formData.status === 'inactive' ? 'bg-red-50 text-red-600 border-2 border-red-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-transparent'}`}
                >
                  <AlertCircle size={18}/> {t.inactive}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t dark:border-slate-800 flex gap-4">
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

export default GameAddModal;
