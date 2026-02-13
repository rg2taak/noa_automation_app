
import React from 'react';
import { Cpu, Activity, Download, Settings, Clock, AlertTriangle } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface DeviceReportProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
}

const DeviceReport: React.FC<DeviceReportProps> = ({ t, isRtl }) => {
  const devices = [
    { name: isRtl ? 'ترن هوایی' : 'Roller Coaster', usage: 88, sessions: 142, downtime: '۰٪', status: 'healthy' },
    { name: isRtl ? 'ماشین کوبنده' : 'Bumper Cars', usage: 65, sessions: 98, downtime: '۵٪', status: 'warning' },
    { name: isRtl ? 'واقعیت مجازی' : 'VR Zone', usage: 92, sessions: 210, downtime: '۲٪', status: 'healthy' },
    { name: isRtl ? 'سینما ۵ بعدی' : '5D Cinema', usage: 45, sessions: 56, downtime: '۱۲٪', status: 'maintenance' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.deviceReport}</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">{isRtl ? 'گزارش کارکرد فنی و بهره‌وری دستگاه‌های شهربازی' : 'Technical performance and productivity report of devices'}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 font-black text-sm hover:bg-slate-50 shadow-sm transition-all">
            <Download size={20} className="text-emerald-500" /> <span>{t.exportExcel}</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
            <Settings size={20} /> <span>{isRtl ? 'مدیریت دستگاه‌ها' : 'Device Settings'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {devices.map((dev, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dev.status === 'healthy' ? 'bg-emerald-50 text-emerald-600' : dev.status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                <Cpu size={28} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'بهره‌وری' : 'Usage'}</span>
                <span className={`text-xl font-black ${dev.status === 'healthy' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>{dev.usage}%</span>
              </div>
            </div>
            <h3 className="text-lg font-black dark:text-white mb-2">{dev.name}</h3>
            <div className="space-y-4 mt-8">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                <span>{isRtl ? 'دفعات استفاده' : 'Sessions'}</span>
                <span className="text-slate-900 dark:text-slate-200">{dev.sessions}</span>
              </div>
              <div className="h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${dev.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${dev.usage}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600"><Activity size={24} /></div>
              <h3 className="text-xl font-black dark:text-white">{isRtl ? 'تحلیل زمانی فعالیت دستگاه‌ها' : 'Active Sessions Analytics'}</h3>
            </div>
          </div>
          <div className="h-64 flex items-end gap-3 px-4">
            {[20, 35, 45, 30, 60, 85, 95, 100, 90, 75, 40, 25].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-600/10 rounded-t-xl relative group cursor-pointer hover:bg-indigo-600/30 transition-all" style={{ height: `${h}%` }}>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase">{i + 8}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/20 shadow-xl shadow-amber-500/5">
            <div className="flex items-center gap-4 text-amber-600 mb-6">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-sm"><AlertTriangle size={24} /></div>
              <h4 className="text-xl font-black">{isRtl ? 'هشدار فنی' : 'Tech Alert'}</h4>
            </div>
            <p className="text-sm font-bold text-amber-700 dark:text-amber-400 leading-relaxed">
              {isRtl ? 'دستگاه سینما ۵ بعدی به ۸۵٪ حد مجاز کارکرد خود رسیده است. سرویس فنی دوره‌ای در ۲۴ ساعت آینده الزامی است.' : '5D Cinema device has reached its 85% limit. Service required within 24 hours.'}
            </p>
            <button className="mt-8 w-full py-4 bg-amber-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition-all uppercase tracking-widest">{isRtl ? 'رزرو سرویس فنی' : 'Schedule Service'}</button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
            <h4 className="w-full text-xs font-black dark:text-white uppercase tracking-widest mb-8">{isRtl ? 'سلامت کل اکوسیستم' : 'Ecosystem Health'}</h4>
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray="452.4" strokeDashoffset="90.5" className="text-indigo-600" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black dark:text-white">۸۰٪</span>
                <span className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? 'نرمال' : 'Stable'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceReport;
