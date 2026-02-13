
import React from 'react';
import { Gamepad2, TrendingUp, Trophy, Download, Search, Filter } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface GameSalesReportProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
}

const GameSalesReport: React.FC<GameSalesReportProps> = ({ t, isRtl }) => {
  const games = [
    { rank: 1, name: isRtl ? 'ترن هوایی مگا' : 'Mega Coaster', sales: '۸,۴۰۰,۰۰۰', count: 186, growth: '+۲۲٪' },
    { rank: 2, name: isRtl ? 'واقعیت مجازی' : 'VR Experience', sales: '۶,۲۰۰,۰۰۰', count: 124, growth: '+۱۵٪' },
    { rank: 3, name: isRtl ? 'ماشین کوبنده' : 'Bumper Cars', sales: '۴,۵۰۰,۰۰۰', count: 150, growth: '+۸٪' },
    { rank: 4, name: isRtl ? 'سقوط آزاد' : 'Free Fall', sales: '۳,۱۰۰,۰۰۰', count: 62, growth: '-۲٪' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.gameSalesReport}</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">{isRtl ? 'رتبه‌بندی و تحلیل محبوبیت بازی‌ها بر اساس درآمد و بلیت' : 'Ranking and popularity analysis of park games'}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
            <input type="text" placeholder={isRtl ? 'جستجو...' : 'Search...'} className={`w-full py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white text-sm font-bold shadow-sm`} />
          </div>
          <button className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 shadow-sm transition-all">
            <Download size={20} className="text-emerald-500" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
            <Filter size={20} /> <span>{isRtl ? 'فیلتر دسته‌بندی' : 'Filter'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/30 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <Trophy size={140} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">{isRtl ? 'پرفروش‌ترین ماه' : 'Best of Month'}</span>
            <h3 className="text-2xl font-black mt-4 leading-tight">{isRtl ? 'ترن هوایی مگا' : 'Mega Coaster'}</h3>
            <div className="mt-10 flex items-baseline gap-2">
              <span className="text-4xl font-black">۱۸۶</span>
              <span className="text-xs font-bold opacity-80 uppercase tracking-widest">{isRtl ? 'بلیت' : 'Tickets'}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">{isRtl ? 'توزیع سهم فروش' : 'Sales Distribution'}</h4>
            <div className="space-y-6">
              {[
                { name: isRtl ? 'هیجانی' : 'Thrill', p: 65, color: 'bg-indigo-500' },
                { name: isRtl ? 'کودک' : 'Kids', p: 25, color: 'bg-emerald-500' },
                { name: isRtl ? 'دیگر' : 'Other', p: 10, color: 'bg-slate-300' },
              ].map((s, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-black mb-2 dark:text-slate-300">
                    <span>{s.name}</span>
                    <span>{s.p}%</span>
                  </div>
                  <div className="h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: `${s.p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
             <div className="flex items-center gap-3">
               <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600"><TrendingUp size={20} /></div>
               <h3 className="text-sm font-black dark:text-white uppercase tracking-widest">{isRtl ? 'عملکرد بازی‌ها به تفکیک' : 'Game Sales Leaderboard'}</h3>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                  <th className="py-6 px-8 text-start w-20">#</th>
                  <th className="py-6 px-4 text-start">{isRtl ? 'نام بازی' : 'Game Name'}</th>
                  <th className="py-6 px-4 text-start">{isRtl ? 'درآمد کل' : 'Revenue'}</th>
                  <th className="py-6 px-4 text-start">{isRtl ? 'تعداد فروش' : 'Sales'}</th>
                  <th className="py-6 px-8 text-center">{isRtl ? 'تغییرات' : 'Growth'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {games.map((game) => (
                  <tr key={game.rank} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-5 px-8">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${game.rank === 1 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        {game.rank}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-sm font-black dark:text-white">{game.name}</td>
                    <td className="py-5 px-4 text-sm font-black text-indigo-600">{game.sales} {t.currency}</td>
                    <td className="py-5 px-4 text-sm font-bold text-slate-500">{game.count}</td>
                    <td className="py-5 px-8 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black ${game.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        <TrendingUp size={12} className={game.growth.startsWith('+') ? '' : 'rotate-180'} />
                        {game.growth}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSalesReport;
