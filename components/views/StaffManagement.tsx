
import React, { useState } from 'react';
import { Search, Plus, Download, Edit2, Trash2, Users, Shield, UserCheck, Smartphone, CheckCircle2, XCircle } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';
import { User, UserGroup } from '../../types';

interface StaffManagementProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  users: User[];
  groups: UserGroup[];
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onAddGroup: () => void;
  onEditGroup: (group: UserGroup) => void;
}

const StaffManagement: React.FC<StaffManagementProps> = ({ 
  t, isRtl, users, groups, onAddUser, onEditUser, onAddGroup, onEditGroup 
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'groups'>('users');
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));
  const filteredGroups = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      {/* Header Section - Matched with Unified Layout Style */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.staff}</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">{isRtl ? 'مدیریت کارکنان و سطوح دسترسی پیشرفته' : 'Manage staff members and advanced permissions'}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
            <input 
              type="text" 
              placeholder={t.searchDevice}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white text-sm font-bold shadow-sm`}
            />
          </div>

          <button className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={20} className="text-emerald-500" />
          </button>

          <button 
            onClick={activeTab === 'users' ? onAddUser : onAddGroup} 
            className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
          >
            <Plus size={20} /> <span>{activeTab === 'users' ? t.addStaff : t.addGroup}</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
        >
          <UserCheck size={18} /> {t.staffList}
        </button>
        <button 
          onClick={() => setActiveTab('groups')}
          className={`px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${activeTab === 'groups' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
        >
          <Shield size={18} /> {t.userGroups}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {activeTab === 'users' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                  <th className="py-6 px-6 text-start">{t.customerName}</th>
                  <th className="py-6 px-6 text-start">{t.customerPhone}</th>
                  <th className="py-6 px-6 text-start">{isRtl ? 'گروه کاربری' : 'Group'}</th>
                  <th className="py-6 px-6 text-center">{t.activeStatus}</th>
                  <th className="py-6 px-6 text-center">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <Users size={20} />
                        </div>
                        <span className="text-sm font-black dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-slate-500 font-mono font-bold text-xs">
                        <Smartphone size={14} /> {user.phone}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                        {groups.find(g => g.id === user.groupId)?.name || user.role}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black ${user.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        {user.isActive ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        {user.isActive ? t.active : t.inactive}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => onEditUser(user)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">
                          <Edit2 size={16}/>
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                  <th className="py-6 px-6 text-start">{t.groupName}</th>
                  <th className="py-6 px-6 text-start">{isRtl ? 'تعداد دسترسی' : 'Permissions'}</th>
                  <th className="py-6 px-6 text-start">{isRtl ? 'تعداد کاربران' : 'Members'}</th>
                  <th className="py-6 px-6 text-center">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                          <Shield size={20} />
                        </div>
                        <span className="text-sm font-black dark:text-white">{group.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-[10px] font-black text-indigo-600">{group.permissions.length} {isRtl ? 'دسترسی' : 'Perms'}</span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xs font-bold text-slate-500">{users.filter(u => u.groupId === group.id).length} {isRtl ? 'کاربر' : 'Users'}</span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => onEditGroup(group)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">
                          <Edit2 size={16}/>
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;
