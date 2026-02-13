
import React from 'react';
import { Plus, Wallet, Target, Users, BarChart3, TrendingUp, TrendingDown, ShoppingBag, ArrowUpRight, Gamepad, Cpu, Activity } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface AdminDashboardProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onNavigate: (tabId: string) => void;
  isLoading?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ t, isRtl, onNavigate, isLoading }) => {
  const adminStats = [
    { label: t.todaySales, value: isRtl ? '۴۵,۲۰۰,۰۰۰' : '45,200,000', diff: isRtl ? '+۱۵٪' : '+15%', isPositive: true, icon: <Wallet size={20} />, color: 'indigo' },
    { label: t.todaySalesCount, value: isRtl ? '۳۴۲' : '342', diff: isRtl ? '+۸٪' : '+8%', isPositive: true, icon: <Target size={20} />, color: 'emerald' },
    { label: t.todayCustomers, value: isRtl ? '۱۲۸' : '128', diff: isRtl ? '-۳٪' : '-3%', isPositive: false, icon: <Users size={20} />, color: 'blue' },
    { label: t.monthlyAvg, value: isRtl ? '۳۸,۵۰۰,۰۰۰' : '38,500,000', diff: isRtl ? '+۱۲٪' : '+12%', isPositive: true, icon: <BarChart3 size={20} />, color: 'amber' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-48 skeleton rounded-xl"></div>
            <div className="h-4 w-32 skeleton rounded-lg"></div>
          </div>
          <div className="h-12 w-32 skeleton rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 skeleton rounded-2xl"></div>
                <div className="w-10 h-4 skeleton rounded-lg"></div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-3 w-16 skeleton rounded-md"></div>
                <div className="h-8 w-24 skeleton rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-80 skeleton rounded-[2.5rem]"></div>
          <div className="h-80 skeleton rounded-[2.5rem]"></div>
        </div>
      </div>
    );
  }

  const recentSales = [
    { id: '#TR-8842', time: isRtl ? '۱۴:۴۵' : '14:45', customer: 'علیرضا راد', amount: isRtl ? '۴۵۰,۰۰۰' : '450,000' },
    { id: '#TR-8841', time: isRtl ? '۱۴:۳۲' : '14:32', customer: 'سارا کریمی', amount: isRtl ? '۱۲۰,۰۰۰' : '120,000' },
    { id: '#TR-8840', time: isRtl ? '۱۴:۲۰' : '14:20', customer: 'میهمان - کد ۵', amount: isRtl ? '۷۵,۰۰۰' : '75,000' },
  ];

  const topGames = [
    { name: isRtl ? 'ترن هوایی مگا' : 'Mega Coaster', amount: isRtl ? '۸,۴۰۰,۰۰۰' : '8,400,000', percentage: 85 },
    { name: isRtl ? 'ماشین کوبنده' : 'Bumper Cars', amount: isRtl ? '۴,۵۰۰,۰۰۰' : '4,500,000', percentage: 65 },
    { name: isRtl ? 'سقوط آزاد' : 'Free Fall', amount: isRtl ? '۳,۱۰۰,۰۰۰' : '3,100,000', percentage: 45 },
  ];

  const mostActiveDevices = [
    { name: isRtl ? 'واقعیت مجازی ۱' : 'VR Unit 1', count: isRtl ? '۸۵ بار' : '85 times', status: 'active' },
    { name: isRtl ? 'سینما ۵ بعدی' : '5D Cinema', count: isRtl ? '۷۲ بار' : '72 times', status: 'active' },
    { name: isRtl ? 'چرخ و فلک' : 'Ferris Wheel', count: isRtl ? '۴۸ بار' : 'active', status: 'maintenance' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.mainDashboard}</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">{t.welcome}</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-2 text-sm font-black transition-all active:scale-[0.98]">
          <Plus size={20} /> {t.addSale}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 bg-${stat.color}-50 dark:bg-${stat.color}-900/10 rounded-2xl flex items-center justify-center text-${stat.color}-600`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-black ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.diff}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Sales Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-lg font-black dark:text-white">{t.dailySalesChart}</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-[10px] font-bold text-slate-400">{t.currency}</span>
              </div>
            </div>
            <div className="h-48 flex items-end gap-3">
              {[40, 60, 45, 90, 75, 110, 95, 80, 65, 120, 100, 85].map((v, i) => (
                <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-lg relative group transition-all cursor-pointer hover:bg-indigo-600/20" style={{ height: `${v}%` }}>
                  <div className="absolute inset-x-0 top-0 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {v * 100}k
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sales Table */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-indigo-600" />
                <h3 className="text-lg font-black dark:text-white">{t.recentSales}</h3>
              </div>
              <button onClick={() => onNavigate('sales_report')} className="text-indigo-600 dark:text-indigo-400 text-xs font-black hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-4 py-2 rounded-xl transition-all flex items-center gap-2">
                {t.viewFullReport} <ArrowUpRight size={14} />
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                  <th className="text-start pb-4 px-2">{isRtl ? 'شناسه' : 'ID'}</th>
                  <th className="text-start pb-4 px-2">{isRtl ? 'مشتری' : 'Customer'}</th>
                  <th className="text-start pb-4 px-2">{isRtl ? 'مبلغ' : 'Amount'}</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale, i) => (
                  <tr key={i} className="border-b dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-4 px-2 text-xs font-bold text-slate-500">{sale.id}</td>
                    <td className="py-4 px-2 text-sm font-black dark:text-slate-200">{sale.customer}</td>
                    <td className="py-4 px-2 text-sm font-black text-emerald-600">{sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          {/* Top Selling Games */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Gamepad size={20} className="text-indigo-600" />
                <h3 className="text-lg font-black dark:text-white">{t.topSellingGames}</h3>
              </div>
              <button onClick={() => onNavigate('game_sales_report')} className="text-indigo-600 dark:text-indigo-400 text-[10px] font-black hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5">
                {t.viewFullReport} <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="space-y-7">
              {topGames.map((game, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="dark:text-slate-300">{game.name}</span>
                    <span className="text-indigo-600">{game.amount}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${game.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Active Devices */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Activity size={20} className="text-emerald-600" />
                <h3 className="text-lg font-black dark:text-white">{t.mostActiveDevices}</h3>
              </div>
              <button onClick={() => onNavigate('device_report')} className="text-indigo-600 dark:text-indigo-400 text-[10px] font-black hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5">
                {t.viewFullReport} <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="space-y-6">
              {mostActiveDevices.map((device, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${device.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} transition-all group-hover:scale-110`}>
                      <Cpu size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black dark:text-white leading-none">{device.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{device.count}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${device.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
