import React, { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Download,
  Filter,
  Search,
} from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface SalesReportProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  orders?: any[];
}

const SalesReport: React.FC<SalesReportProps> = ({ t, isRtl, orders = [] }) => {
  const [dateRange, setDateRange] = useState('today');

  const report = useMemo(() => {
    const hasRealOrders = Array.isArray(orders) && orders.length > 0;

    if (!hasRealOrders) {
      const fallbackRows = [
        { id: 'TR-9901', customer: 'Customer A', type: 'Recharge', amount: 500000, status: 'success' },
        { id: 'TR-9902', customer: 'Customer B', type: 'Ticket', amount: 120000, status: 'success' },
        { id: 'TR-9903', customer: 'Customer C', type: 'Buffet', amount: 45000, status: 'success' },
        { id: 'TR-9904', customer: 'Customer D', type: 'Recharge', amount: 1000000, status: 'failed' },
      ];
      const total = fallbackRows.reduce((sum, row) => sum + row.amount, 0);
      return {
        total,
        avg: Math.round(total / fallbackRows.length),
        failed: fallbackRows.filter((row) => row.status === 'failed').length,
        rows: fallbackRows.map((row) => ({
          ...row,
          amountText: row.amount.toLocaleString(),
        })),
      };
    }

    const normalized = orders.map((o: any) => {
      const amount = Number(o.totalPaidAmount || 0);
      return {
        id: String(o.id),
        customer: `User-${String(o.userId || '').slice(0, 8)}`,
        type: (o.orderGames?.length ?? 0) > 1 ? 'Multi Game' : 'Game',
        amount,
        status: o.status === 'PAIED' ? 'success' : 'failed',
      };
    });

    const total = normalized.reduce((sum: number, row: any) => sum + row.amount, 0);
    return {
      total,
      avg: normalized.length ? Math.round(total / normalized.length) : 0,
      failed: normalized.filter((row: any) => row.status === 'failed').length,
      rows: normalized.map((row: any) => ({
        ...row,
        amountText: row.amount.toLocaleString(),
      })),
    };
  }, [orders]);

  const summary = [
    { label: t.todaySales, value: report.total.toLocaleString(), trend: '--', up: true },
    { label: isRtl ? 'Avg Transaction' : 'Avg Transaction', value: report.avg.toLocaleString(), trend: '--', up: true },
    { label: isRtl ? 'Failed Trans' : 'Failed Trans', value: report.failed.toLocaleString(), trend: '--', up: false },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.salesReport}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 font-black text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Download size={20} className="text-emerald-500" /> <span>{t.exportExcel}</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
            <Filter size={20} /> <span>Advanced Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-indigo-600">
              <Calendar size={22} />
              <span className="text-sm font-black uppercase tracking-widest">Date Range</span>
            </div>
            <div className="space-y-3">
              {['today', 'yesterday', 'this_week', 'this_month'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`w-full text-start px-5 py-4 rounded-2xl text-xs font-black transition-all ${dateRange === range ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {range.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/30">
            <BarChart3 size={40} className="mb-4 text-indigo-200" />
            <h4 className="text-xl font-black">Total Revenue</h4>
            <div className="mt-6">
              <span className="text-3xl font-black">{report.total.toLocaleString()}</span>
              <span className="text-xs font-medium mr-2">{t.currency}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {summary.map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-xl font-black dark:text-white">{item.value}</h3>
                  <div className={`flex items-center gap-1 text-[10px] font-black ${item.up ? 'text-emerald-500' : 'text-red-500'}`}>
                    {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {item.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="font-black dark:text-white text-sm uppercase tracking-widest">Transactions</h3>
              <div className="relative w-full sm:w-64">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" placeholder="Search..." />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                    <th className="py-6 px-8 text-start">ID</th>
                    <th className="py-6 px-4 text-start">Customer</th>
                    <th className="py-6 px-4 text-start">Type</th>
                    <th className="py-6 px-4 text-start">Amount</th>
                    <th className="py-6 px-8 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {report.rows.map((row: any) => (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-5 px-8 text-xs font-mono font-bold text-slate-400">{row.id}</td>
                      <td className="py-5 px-4 text-sm font-black dark:text-slate-200">{row.customer}</td>
                      <td className="py-5 px-4 text-xs font-bold text-slate-500">{row.type}</td>
                      <td className="py-5 px-4 text-sm font-black text-indigo-600">{row.amountText}</td>
                      <td className="py-5 px-8 text-center">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${row.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {row.status}
                        </span>
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

export default SalesReport;
