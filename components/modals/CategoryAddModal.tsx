
import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Layers, Upload } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface Category {
  id?: number;
  name: string;
  image: string;
}

interface CategoryAddModalProps {
  category: Category | null;
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onClose: () => void;
  onSave: (cat: any) => void;
}

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({ category, t, isRtl, onClose, onSave }) => {
  const [formData, setFormData] = useState<Category>(
    category || { name: '', image: '' }
  );

  const defaultImage = `https://api.dicebear.com/7.x/shapes/svg?seed=${formData.name || 'default'}&backgroundColor=4f46e5`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic: If no image is provided, use the default one
    const finalData = {
      ...formData,
      image: formData.image || defaultImage
    };
    onSave(finalData);
  };

  const inputClass = `w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold`;
  const iconClass = `absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 flex flex-col overflow-hidden">
        
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white">{category ? (isRtl ? 'ویرایش دسته' : 'Edit Category') : (isRtl ? 'دسته جدید' : 'New Category')}</h3>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{isRtl ? 'نام دسته‌بندی' : 'Category Name'}</label>
            <div className="relative group">
              <Layers className={iconClass} size={18} />
              <input 
                type="text" 
                required
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className={inputClass} 
                placeholder={isRtl ? 'مثلاً: بازی‌های هیجانی' : 'e.g. Thrill Rides'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{isRtl ? 'لینک تصویر (اختیاری)' : 'Image URL (Optional)'}</label>
            <div className="relative group">
              <ImageIcon className={iconClass} size={18} />
              <input 
                type="text" 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
                className={inputClass} 
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center gap-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'پیش‌نمایش تصویر' : 'Image Preview'}</p>
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg">
              <img src={formData.image || defaultImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
            {!formData.image && <span className="text-[9px] font-bold text-indigo-500">{isRtl ? 'تصویر پیش‌فرض انتخاب شده' : 'Using default placeholder'}</span>}
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

export default CategoryAddModal;
