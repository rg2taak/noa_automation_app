
import React, { useState } from 'react';
import { Search, Plus, Download, Edit2, Trash2, Gift, TrendingUp, AlertTriangle, X, CheckCircle2, XCircle } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';
import { GiftPackage } from '../../types';

interface GiftPackageManagementProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  search: string;
  setSearch: (s: string) => void;
  giftPackages: GiftPackage[];
  onAdd: () => void;
  onEdit: (pkg: GiftPackage) => void;
  onDelete: (id: number) => void;
}

const GiftPackageManagement: React.FC<GiftPackageManagementProps> = ({ 
  t, isRtl, search, setSearch, giftPackages, onAdd, onEdit, onDelete 
}) => {
  const [pkgToDelete, setPkgToDelete] = useState<GiftPackage | null>(null);
  
  const filtered = giftPackages.filter(p => p.fromAmount.includes(search) || p.toAmount.includes(search));

  const confirmDelete = () => {
    if (pkgToDelete) {
      onDelete(pkgToDelete.id);
      setPkgToDelete(null);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      {/* Header Section - Matched with GameAndCategoryManagement style */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.giftPackages}</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">{t.giftPackageSubtitle}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
            <input 
              type="text" 
              placeholder={t.searchDevice}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white text-sm font-bold shadow-sm`}
            />
          </div>
          
          <button className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={20} className="text-emerald-500" />
          </button>

          <button onClick={onAdd} className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
            <Plus size={20} /> <span>{t.addGiftPackage}</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                <th className="py-6 px-6 text-start">{t.fromAmount}</th>
                <th className="py-6 px-6 text-start">{t.toAmount}</th>
                <th className="py-6 px-6 text-start">{t.giftType}</th>
                <th className="py-6 px-6 text-start">{t.giftValue}</th>
                <th className="py-6 px-6 text-center">{t.activeStatus}</th>
                <th className="py-6 px-6 text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="py-6 px-6 text-sm font-black dark:text-white">{pkg.fromAmount} {t.currency}</td>
                  <td className="py-6 px-6 text-sm font-black dark:text-white">{pkg.toAmount} {t.currency}</td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${pkg.giftType === 'percentage' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                        {pkg.giftType === 'percentage' ? <TrendingUp size={14}/> : <Gift size={14}/>}
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{t[pkg.giftType]}</span>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <span className={`text-sm font-black ${pkg.giftType === 'percentage' ? 'text-blue-600' : 'text-emerald-600'}`}>
                      {pkg.giftValue}{pkg.giftType === 'percentage' ? '٪' : ` ${t.currency}`}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black ${pkg.isActive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                      {pkg.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {pkg.isActive ? t.active : t.inactive}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => onEdit(pkg)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">
                        <Edit2 size={16}/>
                      </button>
                      <button 
                        onClick={() => setPkgToDelete(pkg)}
                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700">
              <Gift size={48} className="mb-4 opacity-20" />
              <p className="font-bold">{isRtl ? 'هیچ بسته‌ای یافت نشد' : 'No packages found'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {pkgToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in" onClick={() => setPkgToDelete(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black dark:text-white mb-2">
                {isRtl ? 'تأیید حذف بسته هدیه' : 'Confirm Package Deletion'}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                {isRtl 
                  ? `آیا از حذف بسته‌ی هدیه برای مبالغ «${pkgToDelete.fromAmount} تا ${pkgToDelete.toAmount}» اطمینان دارید؟ این عملیات قابل بازگشت نیست.` 
                  : `Are you sure you want to delete the gift package for "${pkgToDelete.fromAmount} to ${pkgToDelete.toAmount}"? This action cannot be undone.`}
              </p>
              
              <div className="flex gap-4 mt-10">
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-rose-600/20 transition-all active:scale-95"
                >
                  {isRtl ? 'بله، حذف شود' : 'Yes, Delete'}
                </button>
                <button 
                  onClick={() => setPkgToDelete(null)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setPkgToDelete(null)}
              className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} p-2 text-slate-400 hover:text-rose-500 transition-all`}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftPackageManagement;
