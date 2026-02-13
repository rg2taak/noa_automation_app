
import React from 'react';
import { Search, Download, Plus, Edit2, Trash2, Layers, Gamepad2, Clock, CheckCircle2, XCircle, AlertTriangle, X, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface Category {
  id: number;
  name: string;
  image: string;
  gamesCount?: number;
}

interface Game {
  id: number;
  name: string;
  description: string;
  category: string;
  time: string;
  status: 'active' | 'inactive';
  image: string;
  price: string;
}

interface GameAndCategoryManagementProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  search: string;
  setSearch: (s: string) => void;
  categories: Category[];
  games: Game[];
  onAddCategory: () => void;
  onEditCategory: (cat: Category) => void;
  onDeleteCategory: (id: number) => void;
  onAddGame: () => void;
  onEditGame: (game: Game) => void;
  onDeleteGame: (id: number) => void;
  isLoading?: boolean;
  isDemoMode?: boolean;
  onRefresh?: () => void;
}

const GameAndCategoryManagement: React.FC<GameAndCategoryManagementProps> = ({ 
  t, isRtl, search, setSearch, categories, games, 
  onAddCategory, onEditCategory, onDeleteCategory, onAddGame, onEditGame, onDeleteGame,
  isLoading, isDemoMode, onRefresh
}) => {
  const [catToDelete, setCatToDelete] = useState<Category | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const filteredCats = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const filteredGames = games.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  const confirmDeleteCat = () => {
    if (catToDelete) {
      onDeleteCategory(catToDelete.id);
      setCatToDelete(null);
    }
  };

  const confirmDeleteGame = () => {
    if (gameToDelete) {
      onDeleteGame(gameToDelete.id);
      setGameToDelete(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      {/* Header & Connection Info */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.gamesAndCategories}</h2>
            {isDemoMode ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black border border-amber-200 dark:border-amber-800">
                <WifiOff size={12} /> {isRtl ? 'حالت آفلاین (دمو)' : 'OFFLINE MODE'}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black border border-emerald-200 dark:border-emerald-800">
                <Wifi size={12} className="animate-pulse" /> {isRtl ? 'متصل به سرور مرکزی' : 'CONNECTED TO SERVER'}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm font-medium">{isRtl ? 'مدیریت و پیکربندی بازی‌ها و دسته‌بندی‌های نوآ' : 'Configure and manage Noa games and categories'}</p>
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
          
          <button onClick={onRefresh} className={`p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm ${isLoading ? 'animate-spin' : ''}`}>
            <RefreshCw size={20} className="text-indigo-500" />
          </button>

          <button onClick={onAddCategory} className="flex items-center gap-2 px-5 py-3.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-2xl font-black text-sm transition-all hover:bg-indigo-200">
            <Layers size={18} /> <span>{t.addCategory}</span>
          </button>

          <button onClick={onAddGame} className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all">
            <Plus size={20} /> <span>{t.addGame}</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 px-1">
          <Layers size={22} className="text-indigo-500" />
          <h3 className="text-xl font-black dark:text-white">{t.categories}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 h-56 skeleton"></div>
            ))
          ) : (
            filteredCats.map((cat) => (
              <div key={cat.id} className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute bottom-3 ${isRtl ? 'right-4' : 'left-4'}`}>
                    <span className="text-[10px] font-black text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 uppercase tracking-tighter">
                      {cat.gamesCount || 0} {t.games}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
                  <span className="text-sm font-black dark:text-white truncate">{cat.name}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => onEditCategory(cat)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all"><Edit2 size={16}/></button>
                    <button onClick={() => setCatToDelete(cat)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Games List Table */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 px-1">
          <Gamepad2 size={22} className="text-indigo-500" />
          <h3 className="text-xl font-black dark:text-white">{t.gameList}</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-slate-800">
                  <th className="py-6 px-6 text-start">{isRtl ? 'نام بازی و جزئیات' : 'Game & Details'}</th>
                  <th className="py-6 px-6 text-start">{t.gameCategory}</th>
                  <th className="py-6 px-6 text-start">{t.gameTime}</th>
                  <th className="py-6 px-6 text-start">{t.devicePrice}</th>
                  <th className="py-6 px-6 text-center">{t.deviceStatus}</th>
                  <th className="py-6 px-6 text-center">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i}>
                      <td colSpan={6} className="py-6 px-6"><div className="h-10 w-full skeleton rounded-xl"></div></td>
                    </tr>
                  ))
                ) : (
                  filteredGames.map((game) => (
                    <tr key={game.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                            <img src={game.image} className="w-full h-full object-cover" alt={game.name} />
                          </div>
                          <div>
                            <p className="text-sm font-black dark:text-white leading-none">{game.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 line-clamp-1 max-w-[200px]">{game.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-[10px] font-black text-indigo-600 uppercase">{game.category}</span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <Clock size={14} /> {game.time}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm font-black text-emerald-600">{game.price} {t.currency}</td>
                      <td className="py-5 px-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${game.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                          {game.status === 'active' ? <CheckCircle2 size={12}/> : <XCircle size={12}/>}
                          {t[game.status]}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <div className="flex justify-center gap-1">
                          <button onClick={() => onEditGame(game)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"><Edit2 size={16}/></button>
                          <button onClick={() => setGameToDelete(game)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {!isLoading && filteredGames.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
                <Gamepad2 size={48} className="mb-4 opacity-10" />
                <p className="font-bold">{isRtl ? 'هیچ بازی در این بخش یافت نشد' : 'No games found in this category'}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Modals */}
      {(catToDelete || gameToDelete) && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in" onClick={() => { setCatToDelete(null); setGameToDelete(null); }} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black dark:text-white mb-2">{isRtl ? 'تأیید حذف دائمی' : 'Confirm Deletion'}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                {isRtl 
                  ? `آیا از حذف دائمی «${catToDelete?.name || gameToDelete?.name}» اطمینان دارید؟` 
                  : `Are you sure you want to delete "${catToDelete?.name || gameToDelete?.name}"?`}
              </p>
              
              <div className="flex gap-4 mt-10">
                <button 
                  onClick={catToDelete ? confirmDeleteCat : confirmDeleteGame}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-95"
                >
                  {isRtl ? 'بله، حذف شود' : 'Yes, Delete'}
                </button>
                <button 
                  onClick={() => { setCatToDelete(null); setGameToDelete(null); }}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
            <button onClick={() => { setCatToDelete(null); setGameToDelete(null); }} className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} p-2 text-slate-400 hover:text-red-500`}><X size={20}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

// React.useState is not defined implicitly in this scope, fixing imports
import { useState } from 'react';

export default GameAndCategoryManagement;
