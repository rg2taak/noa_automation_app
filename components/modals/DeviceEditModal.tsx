
import React from 'react';
import { X, Edit2, Save, Gamepad2, Wallet, Layers, Activity, Clock, Bell, ShieldAlert } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface Device {
  id: number;
  name: string;
  price: string;
  type: 'deductive' | 'timed' | 'timedList';
  useGift: boolean;
  status: 'active' | 'maintenance' | 'offline';
  deviceTime?: string;
  alarmTime?: string;
  interCardInterval: string;
}

interface DeviceEditModalProps {
  device: Device;
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onClose: () => void;
  onSave: (device: Device) => void;
  setDevice: React.Dispatch<React.SetStateAction<Device | null>>;
}

const DeviceEditModal: React.FC<DeviceEditModalProps> = ({ device, t, isRtl, onClose, onSave, setDevice }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(device);
  };

  const inputClass = `w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold`;
  const iconClass = `absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]`}>
        
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Edit2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white leading-tight">{t.editDevice}</h3>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{t.deviceId}: {device.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.deviceName}</label>
              <div className="relative group">
                <Gamepad2 className={iconClass} size={18} />
                <input type="text" value={device.name} onChange={(e) => setDevice({...device, name: e.target.value})} className={inputClass} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.devicePrice}</label>
              <div className="relative group">
                <Wallet className={iconClass} size={18} />
                <input type="text" value={device.price} onChange={(e) => setDevice({...device, price: e.target.value})} className={inputClass} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.deviceType}</label>
              <div className="relative">
                <Layers className={iconClass} size={18} />
                <select value={device.type} onChange={(e) => setDevice({...device, type: e.target.value as any})} className={`${inputClass} appearance-none`}>
                  <option value="deductive">{t.deductive}</option>
                  <option value="timed">{t.timed}</option>
                  <option value="timedList">{t.timedList}</option>
                </select>
                <ChevronDown size={14} className={`absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none`} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.deviceStatus}</label>
              <div className="relative">
                <Activity className={iconClass} size={18} />
                <select value={device.status} onChange={(e) => setDevice({...device, status: e.target.value as any})} className={`${inputClass} appearance-none`}>
                  <option value="active">{t.active}</option>
                  <option value="maintenance">{t.maintenance}</option>
                  <option value="offline">{t.offline}</option>
                </select>
                <ChevronDown size={14} className={`absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none`} />
              </div>
            </div>

            {(device.type === 'timed' || device.type === 'timedList') && (
              <>
                <div className="space-y-2 animate-in slide-in-from-top-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.deviceTimeMinutes}</label>
                  <div className="relative group">
                    <Clock className={iconClass} size={18} />
                    <input type="text" value={device.deviceTime || ''} onChange={(e) => setDevice({...device, deviceTime: e.target.value})} className={inputClass} />
                  </div>
                </div>
                <div className="space-y-2 animate-in slide-in-from-top-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.alarmTimeSeconds}</label>
                  <div className="relative group">
                    <Bell className={iconClass} size={18} />
                    <input type="text" value={device.alarmTime || ''} onChange={(e) => setDevice({...device, alarmTime: e.target.value})} className={inputClass} />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.interCardIntervalSeconds}</label>
              <div className="relative group">
                <ShieldAlert className={iconClass} size={18} />
                <input type="text" value={device.interCardInterval} onChange={(e) => setDevice({...device, interCardInterval: e.target.value})} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-700 self-end">
              <span className="text-sm font-black dark:text-slate-200">{t.giftUsage}</span>
              <button type="button" onClick={() => setDevice({...device, useGift: !device.useGift})} className={`relative w-12 h-6 rounded-full transition-all duration-300 ${device.useGift ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isRtl ? (device.useGift ? 'left-1' : 'left-7') : (device.useGift ? 'right-1' : 'right-7')}`} />
              </button>
            </div>
          </div>

          <div className="pt-8 border-t dark:border-slate-800 flex gap-4">
            <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
              <Save size={18} /> {t.save}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl transition-all">
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChevronDown = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

export default DeviceEditModal;
