
import React, { useState } from 'react';
import { X, ShoppingBag, Calendar, CreditCard, ChevronDown, Gamepad2, ReceiptText } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface PurchaseItem {
  name: string;
  price: string;
}

interface Purchase {
  id: string;
  date: string;
  cardNumber: string;
  amount: string;
  items?: PurchaseItem[];
  rechargeDetail?: string;
}

interface CustomerPurchasesModalProps {
  customerName: string;
  purchases: Purchase[];
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onClose: () => void;
}

const CustomerPurchasesModal: React.FC<CustomerPurchasesModalProps> = ({ 
  customerName, purchases, t, isRtl, onClose 
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white leading-tight">{t.purchaseHistory}</h3>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{customerName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl border dark:border-slate-800 overflow-hidden">
              <table className="w-full" dir={isRtl ? 'rtl' : 'ltr'}>
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                    <th className="py-5 px-6 text-start">{t.purchaseDate}</th>
                    <th className="py-5 px-6 text-start">{t.cardNumber}</th>
                    <th className="py-5 px-6 text-start">{t.rechargeAmount}</th>
                    <th className="py-5 px-6 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {purchases.map((purchase) => (
                    <React.Fragment key={purchase.id}>
                      <tr className="hover:bg-white dark:hover:bg-slate-800/20 transition-colors group">
                        <td className="py-5 px-6 text-sm font-bold dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            {purchase.date}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-sm font-mono font-bold text-slate-500">
                          <div className="flex items-center gap-2">
                            <CreditCard size={14} className="text-slate-400" />
                            {purchase.cardNumber}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-sm font-black text-emerald-600">
                          {purchase.amount} {t.currency}
                        </td>
                        <td className="py-5 px-6 text-center">
                          <button 
                            onClick={() => toggleExpand(purchase.id)}
                            className={`flex items-center gap-2 mx-auto px-4 py-2 rounded-xl text-[11px] font-black transition-all ${expandedId === purchase.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 hover:bg-indigo-100'}`}
                          >
                            <ReceiptText size={14} />
                            {t.viewDetails}
                            <ChevronDown size={14} className={`transition-transform duration-300 ${expandedId === purchase.id ? 'rotate-180' : ''}`} />
                          </button>
                        </td>
                      </tr>
                      {expandedId === purchase.id && (
                        <tr className="bg-indigo-50/30 dark:bg-indigo-950/10">
                          <td colSpan={4} className="p-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-inner animate-in slide-in-from-top-2">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                                  {purchase.items ? <Gamepad2 size={16}/> : <CreditCard size={16}/>}
                                </div>
                                <h4 className="text-xs font-black dark:text-white uppercase tracking-widest">
                                  {purchase.items ? t.itemsPurchased : t.rechargeAmount}
                                </h4>
                              </div>
                              
                              {purchase.items ? (
                                <div className="space-y-3">
                                  {purchase.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0 border-slate-50 dark:border-slate-800">
                                      <span className="text-sm font-bold dark:text-slate-400">{item.name}</span>
                                      <span className="text-sm font-black text-indigo-600">{item.price} {t.currency}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex justify-between items-center py-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl px-4">
                                  <span className="text-sm font-bold text-slate-500">{t.rechargeAmount}:</span>
                                  <span className="text-lg font-black text-emerald-600">{purchase.amount} {t.currency}</span>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="p-8 border-t dark:border-slate-800 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-8 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-black rounded-2xl transition-all"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPurchasesModal;
