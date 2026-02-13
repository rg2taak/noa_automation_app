
import React, { useState } from 'react';
// Fix: Added XCircle to the imports from lucide-react
import { X, Save, User as UserIcon, Smartphone, Shield, CheckCircle2, XCircle, LayoutDashboard, Cpu, Gamepad2, ShoppingBag, Gift, Users, Wallet, BarChart3, Settings } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';
import { User, UserGroup, UserRole } from '../../types';

interface StaffUserModalProps {
  user: Partial<User> | null;
  groups: UserGroup[];
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
}

const StaffUserModal: React.FC<StaffUserModalProps> = ({ user, groups, t, isRtl, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<User>>(
    user || { name: '', phone: '', groupId: groups[0]?.id || '', permissions: [], isActive: true, role: UserRole.OPERATOR }
  );

  const permissionList = [
    { id: 'dashboard', label: t.mainDashboard, icon: <LayoutDashboard size={16}/> },
    { id: 'customer_view', label: t.customerDashboard, icon: <UserIcon size={16}/> },
    { id: 'devices', label: t.deviceManagement, icon: <Cpu size={16}/> },
    { id: 'games_cat', label: t.gamesAndCategories, icon: <Gamepad2 size={16}/> },
    { id: 'pos', label: t.pos, icon: <ShoppingBag size={16}/> },
    { id: 'gifts', label: t.giftPackages, icon: <Gift size={16}/> },
    { id: 'customers', label: t.customers, icon: <Users size={16}/> },
    { id: 'staff', label: t.staff, icon: <Shield size={16}/> },
    { id: 'finance', label: t.finance, icon: <Wallet size={16}/> },
    { id: 'reports', label: t.reports, icon: <BarChart3 size={16}/> },
    { id: 'settings', label: t.settings, icon: <Settings size={16}/> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const togglePermission = (id: string) => {
    const current = formData.permissions || [];
    if (current.includes(id)) {
      setFormData({...formData, permissions: current.filter(p => p !== id)});
    } else {
      setFormData({...formData, permissions: [...current, id]});
    }
  };

  const inputClass = `w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold`;
  const iconClass = `absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <UserIcon size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white">{user?.id ? t.editCustomer : t.addStaff}</h3>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.customerName}</label>
              <div className="relative group">
                <UserIcon className={iconClass} size={18} />
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClass} placeholder={isRtl ? 'نام و نام خانوادگی...' : 'Full Name...'} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.customerPhone}</label>
              <div className="relative group">
                <Smartphone className={iconClass} size={18} />
                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputClass} placeholder="0912..." />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.selectGroup}</label>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                className={`flex items-center gap-2 text-xs font-black transition-all ${formData.isActive ? 'text-emerald-500' : 'text-slate-300'}`}
              >
                {formData.isActive ? <CheckCircle2 size={16}/> : <XCircle size={16}/>}
                {t.activeStatus}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {groups.map(group => (
                <button 
                  key={group.id} 
                  type="button" 
                  onClick={() => setFormData({...formData, groupId: group.id})}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.groupId === group.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400 hover:border-indigo-300'}`}
                >
                  <Shield size={20} />
                  <span className="text-xs font-black">{group.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t dark:border-slate-800">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.individualPermissions}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {permissionList.map(perm => (
                <button 
                  key={perm.id} 
                  type="button" 
                  onClick={() => togglePermission(perm.id)}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-[10px] font-black transition-all ${formData.permissions?.includes(perm.id) ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400'}`}
                >
                  {perm.icon}
                  {perm.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-4">
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

export default StaffUserModal;
