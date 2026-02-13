
import React from 'react';
import { 
  LayoutDashboard, Cpu, Gamepad2, Layers, ShoppingBag, Gift, 
  UserCircle, Briefcase, Wallet, BarChart3, FileText, Activity, 
  PlayCircle, PieChart, CreditCard, Nfc, Settings, LogOut, ChevronDown 
} from 'lucide-react';
import { ExtendedTranslationStrings } from '../translations';
import { User } from '../types';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openMenus: string[];
  toggleSubmenu: (id: string) => void;
  user: User;
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isSidebarOpen, activeTab, setActiveTab, openMenus, toggleSubmenu, user, t, isRtl, onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: t.mainDashboard },
    { id: 'customer_view', icon: <UserCircle size={18} />, label: t.customerDashboard },
    { id: 'cards', icon: <Nfc size={18} />, label: t.cards },
    { id: 'devices', icon: <Cpu size={18} />, label: t.deviceManagement },
    { id: 'games_cat', icon: <Gamepad2 size={18} />, label: t.gamesAndCategories },
    { id: 'pos', icon: <ShoppingBag size={18} />, label: t.pos },
    { id: 'gifts', icon: <Gift size={18} />, label: t.giftPackages },
    { id: 'customers', icon: <UserCircle size={18} />, label: t.customers },
    { id: 'staff', icon: <Briefcase size={18} />, label: t.staff },
    { 
      id: 'finance', 
      icon: <Wallet size={18} />, 
      label: t.finance,
      children: [
        { id: 'payments', label: t.payments, icon: <CreditCard size={14} /> },
      ]
    },
    { 
      id: 'reports', 
      icon: <BarChart3 size={18} />, 
      label: t.reports,
      children: [
        { id: 'sales_report', label: t.salesReport, icon: <FileText size={14} /> },
        { id: 'device_report', label: t.deviceReport, icon: <Activity size={14} /> },
        { id: 'game_sales_report', label: t.gameSalesReport, icon: <PlayCircle size={14} /> },
        { id: 'category_sales_report', label: t.categorySalesReport, icon: <PieChart size={14} /> },
      ]
    },
    { id: 'settings', icon: <Settings size={18} />, label: t.settings },
  ].filter(item => user.permissions?.includes(item.id));

  return (
    <aside className={`${isSidebarOpen ? 'w-72' : 'w-0 lg:w-20'} bg-white dark:bg-slate-900 border-${isRtl ? 'l' : 'r'} dark:border-slate-800 flex flex-col z-30 transition-all duration-300 shadow-xl lg:shadow-none overflow-hidden`}>
      <div className="h-20 flex-shrink-0 p-5 border-b dark:border-slate-800 flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg flex-shrink-0">N</div>
        {isSidebarOpen && <span className="font-black text-xl dark:text-white tracking-tight whitespace-nowrap">{t.parkName}</span>}
      </div>
      
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => item.children ? toggleSubmenu(item.id) : setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-indigo-600'}`}
            >
              <span className={`${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'}`}>{item.icon}</span>
              {isSidebarOpen && <span className="text-sm flex-1 text-start truncate">{item.label}</span>}
              {isSidebarOpen && item.children && <ChevronDown size={14} className={`transition-transform duration-300 ${openMenus.includes(item.id) ? 'rotate-180' : ''}`} />}
            </button>
            {isSidebarOpen && item.children && openMenus.includes(item.id) && (
              <div className={`mt-1 space-y-1 ${isRtl ? 'pr-6' : 'pl-6'} animate-in slide-in-from-top-1`}>
                {item.children.map(child => (
                  <button key={child.id} onClick={() => setActiveTab(child.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-start ${activeTab === child.id ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/10' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTab === child.id ? 'bg-indigo-500 scale-125' : 'bg-slate-300 dark:bg-slate-700'}`} />
                    <span className="text-xs font-medium">{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t dark:border-slate-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold">
          <LogOut size={18} /> {isSidebarOpen && <span className="text-sm">{t.logout}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
