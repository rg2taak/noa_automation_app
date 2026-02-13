
import React, { useState, useEffect, useRef } from 'react';
import { User, UserGroup, Language, Theme, UserRole, GiftPackage } from '../types';
import { translations, ExtendedTranslationStrings } from '../translations';
import { Activity, ArrowLeft, User as UserIcon, Shield, RefreshCw, AlertTriangle, CloudOff } from 'lucide-react';

// Services
import categoryService from '../services/categoryService';
import gameService from '../services/gameService';
import customerService from '../services/customerService';

// Modular Layout Components
import Sidebar from './Sidebar';
import Header from './Header';

// Modular Views
import AdminDashboard from './views/AdminDashboard';
import CustomerDashboard from './views/CustomerDashboard';
import DeviceManagement from './views/DeviceManagement';
import GameAndCategoryManagement from './views/GameAndCategoryManagement';
import GiftPackageManagement from './views/GiftPackageManagement';
import CustomerManagement from './views/CustomerManagement';
import CustomerDetailView from './views/CustomerDetailView';
import StaffManagement from './views/StaffManagement';
import Settings from './views/Settings';
import POSView from './views/POSView';

// New Report Views
import SalesReport from './views/SalesReport';
import DeviceReport from './views/DeviceReport';
import GameSalesReport from './views/GameSalesReport';
import CategorySalesReport from './views/CategorySalesReport';

// Modals
import DeviceEditModal from './modals/DeviceEditModal';
import CategoryAddModal from './modals/CategoryAddModal';
import GameAddModal from './modals/GameAddModal';
import GiftPackageModal from './modals/GiftPackageModal';
import CustomerModal from './modals/CustomerModal';
import CustomerPurchasesModal from './modals/CustomerPurchasesModal';
import StaffUserModal from './modals/StaffUserModal';
import UserGroupModal from './modals/UserGroupModal';

interface DashboardProps {
  user: User;
  t: ExtendedTranslationStrings;
  lang: Language;
  theme: Theme;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, t, lang, theme, isFullscreen, toggleFullscreen, toggleLanguage, toggleTheme, onLogout 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(user.role === UserRole.CUSTOMER ? 'customer_view' : 'dashboard');
  const [openMenus, setOpenMenus] = useState<string[]>(['reports']);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [staffUsers, setStaffUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [giftPackages, setGiftPackages] = useState<GiftPackage[]>([]);

  // View States
  const [deviceSearch, setDeviceSearch] = useState('');
  const [gamesCatSearch, setGamesCatSearch] = useState('');
  const [giftPkgSearch, setGiftPkgSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  
  // Modal States
  const [isEditDeviceModalOpen, setIsEditDeviceModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isGiftPkgModalOpen, setIsGiftPkgModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPurchasesModalOpen, setIsPurchasesModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  
  const [editingDevice, setEditingDevice] = useState<any | null>(null);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [editingGame, setEditingGame] = useState<any | null>(null);
  const [editingGiftPkg, setEditingGiftPkg] = useState<GiftPackage | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [viewingPurchasesCustomer, setViewingPurchasesCustomer] = useState<any | null>(null);
  const [viewingCustomerDetail, setViewingCustomerDetail] = useState<any | null>(null);
  const [editingStaffUser, setEditingStaffUser] = useState<any | null>(null);
  const [editingGroup, setEditingGroup] = useState<any | null>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === 'fa';

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setIsDemoMode(false);
    try {
      // Trying real connection to Swagger API at 194.33.105.203:3000
      const [catsRes, gamesRes] = await Promise.all([
        categoryService.getAll(),
        gameService.getAll()
      ]);
      setCategories(catsRes.data);
      setGames(gamesRes.data);
      
      try {
        const customersRes = await customerService.getAll();
        setCustomers(customersRes.data);
      } catch(e) { console.warn('Customer Service endpoint not available'); }
    } catch (err) {
      console.warn('Network Error or Server Down - Switching to Demo Mode');
      setIsDemoMode(true);
      // Mock Fallback Data
      setCategories([{ id: 1, name: isRtl ? 'بازی‌های هیجانی' : 'Thrill Rides', image: 'https://images.unsplash.com/photo-1513889953751-09e946f82f13?auto=format&fit=crop&q=80&w=400', gamesCount: 1 }]);
      setGames([{ id: 1, name: isRtl ? 'ترن هوایی مگا' : 'Mega Coaster', description: 'تجربه هیجان واقعی در ارتفاع', category: isRtl ? 'بازی‌های هیجانی' : 'Thrill Rides', time: '03:00', status: 'active', price: '45,000', image: 'https://images.unsplash.com/photo-1513889953751-09e946f82f13?auto=format&fit=crop&q=80&w=400' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const toggleSubmenu = (id: string) => {
    setOpenMenus(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // CATEGORY ACTIONS
  const handleSaveCategory = async (cat: any) => {
    try {
      if (editingCategory) {
        const res = await categoryService.update(editingCategory.id, cat);
        setCategories(categories.map(c => c.id === editingCategory.id ? res.data : c));
      } else {
        const res = await categoryService.create(cat);
        setCategories([...categories, res.data]);
      }
      setIsCategoryModalOpen(false);
    } catch (err) {
      if (isDemoMode) {
        setCategories(prev => editingCategory ? prev.map(c => c.id === editingCategory.id ? {...cat, id: editingCategory.id} : c) : [...prev, {...cat, id: Math.random()}]);
        setIsCategoryModalOpen(false);
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      if (isDemoMode) setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  // GAME ACTIONS
  const handleSaveGame = async (game: any) => {
    try {
      if (editingGame) {
        const res = await gameService.update(editingGame.id, game);
        setGames(games.map(g => g.id === editingGame.id ? res.data : g));
      } else {
        const res = await gameService.create(game);
        setGames([...games, res.data]);
      }
      setIsGameModalOpen(false);
    } catch (err) {
      if (isDemoMode) {
        setGames(prev => editingGame ? prev.map(g => g.id === editingGame.id ? {...game, id: editingGame.id} : g) : [...prev, {...game, id: Math.random()}]);
        setIsGameModalOpen(false);
      }
    }
  };

  const handleDeleteGame = async (id: number) => {
    try {
      await gameService.delete(id);
      setGames(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      if (isDemoMode) setGames(prev => prev.filter(g => g.id !== id));
    }
  };

  // CUSTOMER ACTIONS
  const handleSaveCustomer = async (customer: any) => {
    try {
      if (editingCustomer) {
        const res = await customerService.update(editingCustomer.id, customer);
        setCustomers(customers.map(c => c.id === editingCustomer.id ? res.data : c));
      } else {
        const res = await customerService.create(customer);
        setCustomers([...customers, res.data]);
      }
      setIsCustomerModalOpen(false);
    } catch (err) {
      if (isDemoMode) {
        setCustomers(prev => editingCustomer ? prev.map(c => c.id === editingCustomer.id ? {...customer, id: editingCustomer.id} : c) : [...prev, {...customer, id: Math.random(), totalSpent: '0'}]);
        setIsCustomerModalOpen(false);
      }
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      await customerService.delete(id);
      setCustomers(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      if (isDemoMode) setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSaveStaff = (user: User) => {
    setStaffUsers(prev => editingStaffUser ? prev.map(u => u.id === editingStaffUser.id ? { ...user, id: editingStaffUser.id } : u) : [...prev, { ...user, id: String(Math.random()) }]);
    setIsStaffModalOpen(false);
  };

  const handleSaveGroup = (group: UserGroup) => {
    setGroups(prev => editingGroup ? prev.map(g => g.id === editingGroup.id ? { ...group, id: editingGroup.id } : g) : [...prev, { ...group, id: String(Math.random()) }]);
    setIsGroupModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} openMenus={openMenus} toggleSubmenu={toggleSubmenu} user={user} t={t} isRtl={isRtl} onLogout={onLogout} />

      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} lang={lang} toggleLanguage={toggleLanguage} theme={theme} toggleTheme={toggleTheme} user={user} t={t} isRtl={isRtl} isProfileMenuOpen={isProfileMenuOpen} setIsProfileMenuOpen={setIsProfileMenuOpen} profileRef={profileRef} onLogout={onLogout} />

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <AdminDashboard t={t} isRtl={isRtl} onNavigate={setActiveTab} isLoading={isLoading} />}
            {activeTab === 'customer_view' && <CustomerDashboard t={t} isRtl={isRtl} userName={user.name} />}
            {activeTab === 'devices' && <DeviceManagement t={t} isRtl={isRtl} search={deviceSearch} setSearch={setDeviceSearch} devices={devices} onEdit={(d) => { setEditingDevice(d); setIsEditDeviceModalOpen(true); }} onDelete={(id) => setDevices(prev => prev.filter(d => d.id !== id))} />}
            {activeTab === 'games_cat' && (
              <GameAndCategoryManagement 
                t={t} isRtl={isRtl} search={gamesCatSearch} setSearch={setGamesCatSearch} 
                categories={categories} games={games} 
                isLoading={isLoading} isDemoMode={isDemoMode} onRefresh={fetchData}
                onAddCategory={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }} 
                onEditCategory={(c) => { setEditingCategory(c); setIsCategoryModalOpen(true); }} 
                onDeleteCategory={handleDeleteCategory} 
                onAddGame={() => { setEditingGame(null); setIsGameModalOpen(true); }} 
                onEditGame={(g) => { setEditingGame(g); setIsGameModalOpen(true); }} 
                onDeleteGame={handleDeleteGame} 
              />
            )}
            {activeTab === 'pos' && <POSView t={t} isRtl={isRtl} games={games} categories={categories} isLoading={isLoading} />}
            {activeTab === 'gifts' && <GiftPackageManagement t={t} isRtl={isRtl} search={giftPkgSearch} setSearch={setGiftPkgSearch} giftPackages={giftPackages} onAdd={() => { setEditingGiftPkg(null); setIsGiftPkgModalOpen(true); }} onEdit={(pkg) => { setEditingGiftPkg(pkg); setIsGiftPkgModalOpen(true); }} onDelete={(id) => setGiftPackages(prev => prev.filter(p => p.id !== id))} />}
            {activeTab === 'customers' && <CustomerManagement t={t} isRtl={isRtl} search={customerSearch} setSearch={setCustomerSearch} customers={customers} onAdd={() => { setEditingCustomer(null); setIsCustomerModalOpen(true); }} onEdit={(c) => { setEditingCustomer(c); setIsCustomerModalOpen(true); }} onView={(c) => { setViewingCustomerDetail(c); setActiveTab('customer_detail'); }} onViewPurchases={(c) => { setViewingPurchasesCustomer(c); setIsPurchasesModalOpen(true); }} onDelete={handleDeleteCustomer} />}
            {activeTab === 'customer_detail' && viewingCustomerDetail && <CustomerDetailView customer={viewingCustomerDetail} t={t} isRtl={isRtl} onBack={() => setActiveTab('customers')} />}
            {activeTab === 'staff' && <StaffManagement t={t} isRtl={isRtl} users={staffUsers} groups={groups} onAddUser={() => { setEditingStaffUser(null); setIsStaffModalOpen(true); }} onEditUser={(u) => { setEditingStaffUser(u); setIsStaffModalOpen(true); }} onAddGroup={() => { setEditingGroup(null); setIsGroupModalOpen(true); }} onEditGroup={(g) => { setEditingGroup(g); setIsGroupModalOpen(true); }} />}
            {activeTab === 'sales_report' && <SalesReport t={t} isRtl={isRtl} />}
            {activeTab === 'device_report' && <DeviceReport t={t} isRtl={isRtl} />}
            {activeTab === 'game_sales_report' && <GameSalesReport t={t} isRtl={isRtl} />}
            {activeTab === 'category_sales_report' && <CategorySalesReport t={t} isRtl={isRtl} />}
            {activeTab === 'settings' && <Settings t={t} isRtl={isRtl} />}
          </div>
        </div>

        {isEditDeviceModalOpen && editingDevice && <DeviceEditModal device={editingDevice} t={t} isRtl={isRtl} onClose={() => setIsEditDeviceModalOpen(false)} onSave={(d) => { setDevices(prev => prev.map(item => item.id === d.id ? d : item)); setIsEditDeviceModalOpen(false); }} setDevice={setEditingDevice} />}
        {isCategoryModalOpen && <CategoryAddModal category={editingCategory} t={t} isRtl={isRtl} onClose={() => setIsCategoryModalOpen(false)} onSave={handleSaveCategory} />}
        {isGameModalOpen && <GameAddModal game={editingGame} categories={categories} t={t} isRtl={isRtl} onClose={() => setIsGameModalOpen(false)} onSave={handleSaveGame} />}
        {isGiftPkgModalOpen && <GiftPackageModal giftPackage={editingGiftPkg} t={t} isRtl={isRtl} onClose={() => setIsGiftPkgModalOpen(false)} onSave={(p) => { setGiftPackages(prev => editingGiftPkg ? prev.map(item => item.id === editingGiftPkg.id ? {...p, id: editingGiftPkg.id} : item) : [...prev, {...p, id: Math.random()}]); setIsGiftPkgModalOpen(false); }} />}
        {isCustomerModalOpen && <CustomerModal customer={editingCustomer} t={t} isRtl={isRtl} onClose={() => setIsCustomerModalOpen(false)} onSave={handleSaveCustomer} />}
        {isStaffModalOpen && <StaffUserModal user={editingStaffUser} groups={groups} t={t} isRtl={isRtl} onClose={() => setIsStaffModalOpen(false)} onSave={handleSaveStaff} />}
        {isGroupModalOpen && <UserGroupModal group={editingGroup} t={t} isRtl={isRtl} onClose={() => setIsGroupModalOpen(false)} onSave={handleSaveGroup} />}
        {isPurchasesModalOpen && viewingPurchasesCustomer && <CustomerPurchasesModal customerName={viewingPurchasesCustomer.name} purchases={[]} t={t} isRtl={isRtl} onClose={() => setIsPurchasesModalOpen(false)} />}
      </main>
    </div>
  );
};

export default Dashboard;
