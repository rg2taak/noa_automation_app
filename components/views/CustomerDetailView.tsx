
import React from 'react';
import { ArrowLeft, User, Mail, Smartphone, ShoppingBag, CreditCard, Activity, Calendar, TrendingUp, BarChart3, Clock } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface CustomerRecord {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  totalSpent: string;
}

interface CustomerDetailViewProps {
  customer: CustomerRecord;
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onBack: () => void;
}

const CustomerDetailView: React.FC<CustomerDetailViewProps> = ({ customer, t, isRtl, onBack }) => {
  const stats = [
    { label: t.totalPurchases, value: customer.totalSpent, unit: t.currency, icon: <ShoppingBag size={20}/>, color: 'indigo' },
    { label: t.visitsCount, value: isRtl ? '۲۸' : '28', unit: isRtl ? 'بار' : 'Visits', icon: <Activity size={20}/>, color: 'emerald' },
    { label: t.activeCredits, value: isRtl ? '۱۲۵,۰۰۰' : '125,000', unit: t.currency, icon: <CreditCard size={20}/>, color: 'blue' },
    { label: t.lastVisit, value: isRtl ? '۲ روز پیش' : '2 days ago', unit: '', icon: <Clock size={20}/>, color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className={`flex items-center justify-between gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 shadow-sm transition-all"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <div>
            <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.customerDetails}</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">{customer.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border dark:border-slate-800 shadow-sm overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <User size={120} className="text-indigo-600" />
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-[2rem] border-4 border-slate-50 dark:border-slate-800 bg-white shadow-xl overflow-hidden mb-4 p-1">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.phone}`} className="w-full h-full rounded-[1.5rem]" alt="Customer" />
              </div>
              <h3 className="text-xl font-black dark:text-white">{customer.name}</h3>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{isRtl ? 'مشتری طلایی' : 'Golden Customer'}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800/60 flex items-center gap-4">
                <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <Smartphone size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.customerPhone}</p>
                  <p className="text-sm font-black dark:text-white mt-0.5">{customer.phone}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800/60 flex items-center gap-4">
                <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.customerEmail}</p>
                  <p className="text-sm font-black dark:text-white mt-0.5 truncate max-w-[150px]">{customer.email || '---'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/30">
            <TrendingUp size={32} className="mb-4 text-indigo-200" />
            <h4 className="text-lg font-black">{t.performance}</h4>
            <p className="text-xs text-indigo-100 mt-2 leading-relaxed">
              {isRtl 
                ? 'نمودار فعالیت و علاقه مندی‌های این مشتری به زودی در این بخش نمایش داده خواهد شد.' 
                : 'Activity charts and interests for this customer will be displayed here soon.'}
            </p>
          </div>
        </div>

        {/* Right: Stats and Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border dark:border-slate-800 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-2xl flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <h3 className="text-xl font-black dark:text-white">{stat.value}</h3>
                      <span className="text-[9px] font-bold text-slate-400">{stat.unit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <BarChart3 size={22} className="text-indigo-600" />
                <h3 className="text-lg font-black dark:text-white uppercase tracking-widest">{t.customerPerformance}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? '۱۲ ماه اخیر' : 'Last 12 Months'}</span>
              </div>
            </div>

            <div className="h-64 flex items-end gap-3 px-4">
              {[30, 45, 25, 60, 80, 55, 40, 90, 70, 45, 50, 65].map((v, i) => (
                <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-xl relative group cursor-pointer hover:bg-indigo-600/30 transition-all" style={{ height: `${v}%` }}>
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {v}%
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-6 px-4 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailView;
