
import React, { useState } from 'react';
import { Search, Plus, Download, Edit2, Trash2, User, Mail, Smartphone, ShoppingCart, Eye, AlertTriangle, X } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface CustomerRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalSpent: string;
}

interface CustomerManagementProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  search: string;
  setSearch: (s: string) => void;
  customers: CustomerRecord[];
  onAdd: () => void;
  onEdit: (customer: CustomerRecord) => void;
  onView: (customer: CustomerRecord) => void;
  onViewPurchases: (customer: CustomerRecord) => void;
  onDelete: (id: number) => void;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ 
  t, isRtl, search, setSearch, customers, onAdd, onEdit, onView, onViewPurchases, onDelete 
}) => {
  const [customerToDelete, setCustomerToDelete] = useState<CustomerRecord | null>(null);

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  const confirmDelete = () => {
    if (customerToDelete) {
      onDelete(customerToDelete.id);
      setCustomerToDelete(null);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      {/* Header Section - Matched with GameAndCategoryManagement style */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.customers}</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">{t.customerSubtitle}</p>
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
            <Plus size={20} /> <span>{t.addCustomer}</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                <th className="py-6 px-6 text-start">{t.customerName}</th>
                <th className="py-6 px-6 text-start">{t.customerEmail}</th>
                <th className="py-6 px-6 text-start">{t.customerPhone}</th>
                <th className="py-6 px-6 text-start">{t.totalSpent}</th>
                <th className="py-6 px-6 text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <User size={18} />
                      </div>
                      <span className="text-sm font-black dark:text-white">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Mail size={14} />
                      <span className="text-xs font-bold">{customer.email || '---'}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Smartphone size={14} />
                      <span className="text-xs font-mono font-bold tracking-wider">{customer.phone}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <button 
                      onClick={() => onViewPurchases(customer)}
                      className="flex items-center gap-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 px-3 py-1.5 rounded-xl transition-all border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/20"
                    >
                      <ShoppingCart size={14} />
                      <span className="text-sm font-black underline underline-offset-4 decoration-emerald-500/30">{customer.totalSpent} {t.currency}</span>
                    </button>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex justify-center gap-1">
                      <button 
                        onClick={() => onView(customer)} 
                        title={t.viewProfile}
                        className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all"
                      >
                        <Eye size={16}/>
                      </button>
                      <button 
                        onClick={() => onEdit(customer)} 
                        title={t.editCustomer}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                      >
                        <Edit2 size={16}/>
                      </button>
                      <button 
                        onClick={() => setCustomerToDelete(customer)}
                        title={isRtl ? 'حذف' : 'Delete'}
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
              <User size={48} className="mb-4 opacity-20" />
              <p className="font-bold">{isRtl ? 'هیچ مشتری یافت نشد' : 'No customers found'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {customerToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in" onClick={() => setCustomerToDelete(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black dark:text-white mb-2">
                {isRtl ? 'تأیید حذف مشتری' : 'Confirm Deletion'}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                {isRtl 
                  ? `آیا از حذف مشتری «${customerToDelete.name}» اطمینان دارید؟ تمامی سوابق این مشتری پاک خواهد شد و این عملیات قابل بازگشت نیست.` 
                  : `Are you sure you want to delete customer "${customerToDelete.name}"? All records will be removed and this action cannot be undone.`}
              </p>
              
              <div className="flex gap-4 mt-10">
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-rose-600/20 transition-all active:scale-95"
                >
                  {isRtl ? 'بله، حذف شود' : 'Yes, Delete'}
                </button>
                <button 
                  onClick={() => setCustomerToDelete(null)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setCustomerToDelete(null)}
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

export default CustomerManagement;
