
import React, { useState } from 'react';
import { Search, Download, Edit2, Trash2, CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface Device {
  id: number;
  name: string;
  price: string;
  type: 'deductive' | 'timed' | 'timedList';
  useGift: boolean;
  status: 'active' | 'maintenance' | 'offline';
}

interface DeviceManagementProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  search: string;
  setSearch: (s: string) => void;
  devices: Device[];
  onEdit: (d: Device) => void;
  onDelete: (id: number) => void;
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({ t, isRtl, search, setSearch, devices, onEdit, onDelete }) => {
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
  
  const filtered = devices.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  const confirmDelete = () => {
    if (deviceToDelete) {
      onDelete(deviceToDelete.id);
      setDeviceToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.deviceManagement}</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium leading-relaxed">{t.deviceSubtitle}</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
            <input 
              type="text" 
              placeholder={t.searchDevice}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white text-sm font-bold shadow-sm`}
            />
          </div>
          
          <button 
            className="flex items-center gap-2 px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            <Download size={18} className="text-emerald-500" />
            <span className="hidden md:inline">{t.exportExcel}</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                <th className="text-start py-6 px-6">{t.deviceId}</th>
                <th className="text-start py-6 px-6">{t.deviceName}</th>
                <th className="text-start py-6 px-6">{t.devicePrice}</th>
                <th className="text-start py-6 px-6">{t.deviceType}</th>
                <th className="text-center py-6 px-6">{t.useGift}</th>
                <th className="text-center py-6 px-6">{t.deviceStatus}</th>
                <th className="text-center py-6 px-6">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((device) => (
                <tr key={device.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="py-6 px-6 text-xs font-bold text-slate-400 font-mono">{device.id}</td>
                  <td className="py-6 px-6 text-sm font-black dark:text-white">{device.name}</td>
                  <td className="py-6 px-6 text-sm font-black text-indigo-600">{device.price} {t.currency}</td>
                  <td className="py-6 px-6">
                    <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-[10px] font-black text-indigo-600 uppercase">{t[device.type]}</span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    {device.useGift ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : <XCircle size={18} className="text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${device.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${device.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {t[device.status]}
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => onEdit(device)} 
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                      >
                        <Edit2 size={16}/>
                      </button>
                      <button 
                        onClick={() => setDeviceToDelete(device)} 
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
            <div className="py-20 text-center text-slate-400 font-bold">
              {isRtl ? 'هیچ دستگاهی یافت نشد' : 'No devices found'}
            </div>
          )}
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {deviceToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in" onClick={() => setDeviceToDelete(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black dark:text-white mb-2">
                {isRtl ? 'تأیید حذف دستگاه' : 'Confirm Deletion'}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                {isRtl 
                  ? `آیا از حذف دائمی دستگاه «${deviceToDelete.name}» اطمینان دارید؟ این عملیات قابل بازگشت نیست.` 
                  : `Are you sure you want to permanently delete "${deviceToDelete.name}"? This action cannot be undone.`}
              </p>
              
              <div className="flex gap-4 mt-10">
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-95"
                >
                  {isRtl ? 'بله، حذف شود' : 'Yes, Delete'}
                </button>
                <button 
                  onClick={() => setDeviceToDelete(null)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setDeviceToDelete(null)}
              className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} p-2 text-slate-400 hover:text-red-500 transition-all`}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceManagement;
