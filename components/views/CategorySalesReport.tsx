
import React from 'react';
import { PieChart, Layers, Download, Search, Info, ArrowUpRight } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface CategorySalesReportProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
}

const CategorySalesReport: React.FC<CategorySalesReportProps> = ({ t, isRtl }) => {
  const categories = [
    { name: isRtl ? 'بازی‌های هیجانی' : 'Thrill Rides', share: 62, revenue: '۴۵,۰۰۰,۰۰۰', games: 12 },
    { name: isRtl ? 'بازی‌های کودک' : 'Kids Zone', share: 22, revenue: '۱۸,۲۰۰,۰۰۰', games: 8 },
    { name: isRtl ? 'واقعیت مجازی' : 'Virtual Reality', share: 12, revenue: '۹,۵۰۰,۰۰۰', games: 5 },
    { name: isRtl ? 'دیگر' : 'Others', share: 4, revenue: '۳,۶۰۰,۰۰۰', games: 15 },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.categorySalesReport}</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">{isRtl ? 'تفکیک درآمد و سهم بازار هر دسته‌بندی به صورت هوشمند' : 'Revenue breakdown and market share by category'}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 font-black text-sm hover:bg-slate-50 shadow-sm transition-all">
            <Download size={20} className="text-indigo-600" /> <span>{t.exportExcel}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <div className="flex items-center gap-3 mb-12 w-full">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600"><PieChart size={22} /></div>
            <h3 className="text-sm font-black dark:text-white uppercase tracking-widest">{isRtl ? 'سهم بازار بلیت' : 'Ticket Market Share'}</h3>
          </div>
          
          <div className="relative w-52 h-52 mb-12">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="104" cy="104" r="88" stroke="currentColor" strokeWidth="24" fill="transparent" className="text-indigo-600" strokeDasharray="552.9" strokeDashoffset="210" />
              <circle cx="104" cy="104" r="88" stroke="currentColor" strokeWidth="24" fill="transparent" className="text-emerald-500" strokeDasharray="552.9" strokeDashoffset="420" />
              <circle cx="104" cy="104" r="88" stroke="currentColor" strokeWidth="24" fill="transparent" className="text-amber-400" strokeDasharray="552.9" strokeDashoffset="480" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black dark:text-white">۱۰۰٪</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{isRtl ? 'کل تراکنش' : 'Total'}</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            {categories.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-amber-400' : 'bg-slate-300'}`} />
                  <span className="text-xs font-black text-slate-600 dark:text-slate-300">{c.name}</span>
                </div>
                <span className="text-sm font-black dark:text-white">{c.share}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.slice(0, 2).map((c, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                  <Layers size={120} />
                </div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest">{c.name}</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 font-black text-[10px]">
                    <ArrowUpRight size={14} /> +۱۸٪
                  </div>
                </div>
                <div className="space-y-2 relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'درآمد کل دسته‌بندی' : 'Total Category Revenue'}</p>
                  <h3 className="text-3xl font-black dark:text-white">{c.revenue} <span className="text-xs font-bold text-slate-400 mr-2">{t.currency}</span></h3>
                </div>
                <div className="mt-8 flex items-center gap-2 relative z-10">
                  <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-500 uppercase">{c.games} {t.games}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="text-sm font-black dark:text-white uppercase tracking-widest">{isRtl ? 'مقایسه عملکرد مالی دسته‌ها' : 'Performance Benchmarking'}</h3>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm"><Info size={16} className="text-slate-400" /></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                    <th className="py-6 px-8 text-start">{isRtl ? 'نام دسته' : 'Category'}</th>
                    <th className="py-6 px-4 text-start">{isRtl ? 'درآمد کل' : 'Revenue'}</th>
                    <th className="py-6 px-4 text-start">{isRtl ? 'تعداد بازی' : 'Games'}</th>
                    <th className="py-6 px-8 text-center">{isRtl ? 'سهم نسبی' : 'Share'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {categories.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-5 px-8 text-sm font-black dark:text-white">{c.name}</td>
                      <td className="py-5 px-4 text-sm font-black text-emerald-600">{c.revenue}</td>
                      <td className="py-5 px-4 text-sm font-bold text-slate-500">{c.games}</td>
                      <td className="py-5 px-8 text-center">
                        <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
                          <div className={`h-full ${i === 0 ? 'bg-indigo-500' : 'bg-emerald-500'}`} style={{ width: `${c.share}%` }} />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 mt-1.5 inline-block">{c.share}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySalesReport;
