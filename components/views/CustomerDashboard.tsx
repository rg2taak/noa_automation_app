
import React from 'react';
import { Plus, Nfc, Wallet, Gift, CreditCard, Gamepad } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface CustomerDashboardProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  userName: string;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ t, isRtl, userName }) => {
  const customerStats = [
    { label: t.purchasedCards, value: isRtl ? '۳' : '3', icon: <Nfc size={20} />, color: 'text-indigo-600' },
    { label: t.totalPurchases, value: isRtl ? '۴,۸۰۰,۰۰۰' : '4,800,000', unit: t.currency, icon: <Wallet size={20} />, color: 'text-emerald-600' },
    { label: t.totalGifts, value: isRtl ? '۸۵۰,۰۰۰' : '850,000', unit: t.currency, icon: <Gift size={20} />, color: 'text-amber-600' },
    { label: t.activeCredits, value: isRtl ? '۱,۲۰۰,۰۰۰' : '1,200,000', unit: t.currency, icon: <CreditCard size={20} />, color: 'text-blue-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.customerDashboard}</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">{t.welcome}, {userName}</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-2 text-sm font-black transition-all">
          <Plus size={20} /> {t.recharge}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerStats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-xl transition-all relative overflow-hidden">
            <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
              {/* Fix: Ensure icon is a valid React element and cast to accept size prop for cloneElement */}
              {React.isValidElement(stat.icon) && React.cloneElement(stat.icon as React.ReactElement<{ size?: number }>, { size: 80 })}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest z-10 relative">{stat.label}</p>
            <div className="mt-4 flex items-baseline gap-2 z-10 relative">
              <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
              <span className="text-[10px] font-bold text-slate-400">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600"><Gamepad size={20} /></div>
            <h3 className="text-lg font-black dark:text-white">{t.usedGamesList}</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                <th className="text-start pb-4 px-2">{isRtl ? 'بازی' : 'Game'}</th>
                <th className="text-start pb-4 px-2">{isRtl ? 'هزینه' : 'Cost'}</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3].map(i => (
                <tr key={i} className="border-b dark:border-slate-800 last:border-0 hover:bg-slate-50">
                  <td className="py-4 px-2 text-sm font-bold dark:text-slate-200">{isRtl ? 'ترن هوایی مگا' : 'Mega Coaster'}</td>
                  <td className="py-4 px-2 text-sm font-black text-indigo-600">۴۵,۰۰۰</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/30 flex flex-col justify-between">
          <div>
            <Gift size={32} className="mb-4 text-indigo-200" />
            <h4 className="text-xl font-black mb-2">{t.goldenGiftPack}</h4>
            <p className="text-xs text-indigo-100 leading-relaxed">{t.goldenGiftSubtitle}</p>
          </div>
          <button className="bg-white text-indigo-600 mt-8 py-3.5 rounded-2xl text-xs font-black hover:bg-indigo-50 transition-all uppercase">{t.viewRewards}</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
