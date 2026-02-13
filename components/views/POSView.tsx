
import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Plus, Minus, Trash2, Info, CreditCard, Percent, Gamepad2, X, CheckCircle2, Clock, Activity, ShieldCheck, Layers } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface Category {
  id: number;
  name: string;
  image?: string;
}

interface Game {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  time: string;
  status: 'active' | 'inactive';
}

interface CartItem extends Game {
  qty: number;
}

interface POSViewProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
  games: Game[];
  categories: Category[];
  isLoading?: boolean;
}

const POSView: React.FC<POSViewProps> = ({ t, isRtl, games, categories, isLoading }) => {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Discount States
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('percentage');
  const [discountValue, setDiscountValue] = useState<string>('0');
  const [appliedDiscount, setAppliedDiscount] = useState<{ type: 'fixed' | 'percentage', value: number }>({ type: 'percentage', value: 0 });

  const filteredGames = useMemo(() => {
    return games.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || g.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, search, selectedCategory]);

  const addToCart = (game: Game) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === game.id);
      if (existing) {
        return prev.map(item => item.id === game.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...game, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (!existing) return prev;
      
      const newQty = existing.qty + delta;
      
      if (newQty <= 0) {
        return prev.filter(item => item.id !== id);
      }
      
      return prev.map(item => item.id === id ? { ...item, qty: newQty } : item);
    });
  };

  const totals = useMemo(() => {
    const sub = cart.reduce((acc, item) => {
      const price = parseInt(item.price.replace(/,/g, ''));
      return acc + (price * item.qty);
    }, 0);
    
    let discountAmount = 0;
    if (appliedDiscount.type === 'percentage') {
      discountAmount = Math.round(sub * (appliedDiscount.value / 100));
    } else {
      discountAmount = appliedDiscount.value;
    }

    const netAmount = Math.max(0, sub - discountAmount);
    const tax = Math.round(netAmount * 0.10);
    const total = netAmount + tax;
    
    return { sub, tax, total, discountAmount, count: cart.reduce((acc, item) => acc + item.qty, 0) };
  }, [cart, appliedDiscount]);

  const formatPrice = (p: number) => p.toLocaleString() + ' ' + t.currency;

  const handleApplyDiscount = () => {
    setAppliedDiscount({
      type: discountType,
      value: parseInt(discountValue) || 0
    });
    setIsDiscountModalOpen(false);
  };

  const clearDiscount = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAppliedDiscount({ type: 'percentage', value: 0 });
    setDiscountValue('0');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 animate-in fade-in duration-500 min-h-[calc(100vh-100px)] -m-6 md:-m-8">
      
      {/* Products Section */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.pos}</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">{t.posSubtitle}</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
            <input 
              type="text" 
              placeholder={t.searchDevice}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white text-sm font-bold shadow-sm`}
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar mask-gradient-fade" dir={isRtl ? 'rtl' : 'ltr'}>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${!selectedCategory ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-indigo-600 border dark:border-slate-800'}`}
          >
            <Layers size={14} />
            {t.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${selectedCategory === cat.name ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-indigo-600 border dark:border-slate-800'}`}
            >
              <Gamepad2 size={14} />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 p-4 flex gap-4 items-center`}>
                <div className="w-24 h-24 skeleton rounded-2xl flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-3/4 skeleton rounded-lg"></div>
                  <div className="h-4 w-1/2 skeleton rounded-md"></div>
                </div>
              </div>
            ))
          ) : (
            filteredGames.map((game) => (
              <div 
                key={game.id} 
                className={`group bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 flex items-center p-4 gap-4 animate-in fade-in zoom-in-95 duration-300`}
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner bg-slate-100 dark:bg-slate-800">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer" onClick={() => addToCart(game)} />
                </div>

                <div className={`flex-1 flex flex-col justify-between h-20 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-black dark:text-white leading-tight line-clamp-1">{game.name}</h3>
                      <button onClick={() => setSelectedGame(game)} className="p-1 text-slate-300 hover:text-indigo-600 transition-all">
                        <Info size={14}/>
                      </button>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {game.category}
                    </span>
                  </div>
                  
                  <div className={`flex items-center justify-between mt-auto`}>
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                      {game.price} <span className="text-[8px] font-bold text-slate-400">{t.currency}</span>
                    </span>
                    <button 
                      onClick={() => addToCart(game)}
                      className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20 active:scale-90 transition-transform"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {!isLoading && filteredGames.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700">
              <Gamepad2 size={64} className="opacity-10 mb-4" />
              <p className="font-black">{isRtl ? 'بازی یافت نشد' : 'No games found'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cart Section - Reverted to Floating and Rounded Top */}
      <div 
        className={`w-full lg:w-[450px] bg-white dark:bg-slate-900 border-${isRtl ? 'r' : 'l'} dark:border-slate-800 shadow-2xl flex flex-col lg:mt-10 lg:rounded-t-[3rem] overflow-hidden`} 
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <ShoppingBag size={20} />
            </div>
            <h3 className="text-xl font-black dark:text-white tracking-tight">{t.shoppingCart}</h3>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border dark:border-slate-700">
            {cart.length} {isRtl ? 'ردیف' : 'Items'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 space-y-4 py-20">
              <ShoppingBag size={64} className="opacity-10" />
              <p className="font-black text-sm">{t.emptyCart}</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10 border-b dark:border-slate-700">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="py-3 px-6 text-start">{isRtl ? 'محصول' : 'Product'}</th>
                  <th className="py-3 px-2 text-center">{t.quantity}</th>
                  <th className="py-3 px-6 text-end">{t.subtotal}</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800">
                {cart.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                    <td className="py-4 px-6">
                      <p className="font-black dark:text-white leading-none text-xs">{item.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 mt-1">{item.price}</p>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-center gap-1.5 bg-white dark:bg-slate-900 rounded-lg p-0.5 border dark:border-slate-700 w-fit mx-auto">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><Minus size={10}/></button>
                        <span className="w-5 text-center text-xs font-black dark:text-white">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><Plus size={10}/></button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-end">
                      <span className="font-black text-indigo-600 dark:text-indigo-400 text-xs">
                        { (parseInt(item.price.replace(/,/g, '')) * item.qty).toLocaleString() }
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 border-t dark:border-slate-800 space-y-6">
          <div className="relative group">
            <button 
              onClick={() => setIsDiscountModalOpen(true)}
              className={`w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-dashed transition-all text-xs font-bold ${appliedDiscount.value > 0 ? 'border-emerald-500 text-emerald-600 shadow-lg shadow-emerald-500/5' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-600 hover:border-indigo-500'}`}
            >
              <div className="flex items-center gap-2"><Percent size={14}/> {appliedDiscount.value > 0 ? (isRtl ? 'تخفیف اعمال شده' : 'Discount Applied') : t.addDiscount}</div>
              {appliedDiscount.value > 0 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Plus size={14} />}
            </button>
            
            {/* Remove Discount Button Overlay */}
            {appliedDiscount.value > 0 && (
              <button 
                onClick={clearDiscount}
                className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-8 h-8 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm group-hover:scale-110`}
                title={t.removeDiscount}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>{t.totalItems}</span>
              <span>{totals.count}</span>
            </div>
            {appliedDiscount.value > 0 && (
              <div className="flex justify-between text-xs font-bold text-rose-500">
                <span>{isRtl ? 'مبلغ تخفیف' : 'Discount Amount'}</span>
                <span>-{formatPrice(totals.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>{t.taxAmount}</span>
              <span>{formatPrice(totals.tax)}</span>
            </div>
            <div className="pt-4 border-t dark:border-slate-800 flex justify-between items-center">
              <span className="text-sm font-black dark:text-white uppercase tracking-widest">{t.finalTotal}</span>
              <span className="text-2xl font-black text-indigo-600">{formatPrice(totals.total)}</span>
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-600/30 transition-all active:scale-95 group">
              <CreditCard size={24} className="group-hover:rotate-12 transition-transform" /> 
              {t.paymentAndRecharge}
            </button>
          </div>
        </div>
      </div>

      {/* Discount Modal */}
      {isDiscountModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in" onClick={() => setIsDiscountModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Percent size={20} />
                </div>
                <h3 className="text-lg font-black dark:text-white">{t.applyDiscount}</h3>
              </div>
              <button onClick={() => setIsDiscountModalOpen(false)} className="p-2 text-slate-400 hover:text-red-500 transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <button 
                  onClick={() => setDiscountType('percentage')}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${discountType === 'percentage' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {isRtl ? 'درصدی' : 'Percentage'}
                </button>
                <button 
                  onClick={() => setDiscountType('fixed')}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${discountType === 'fixed' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {isRtl ? 'مبلغ ثابت' : 'Fixed Amount'}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.discountValueLabel}</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className={`w-full py-4 px-6 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white text-xl font-black ${isRtl ? 'text-right' : 'text-left'}`}
                    placeholder="0"
                  />
                  <div className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm`}>
                    {discountType === 'percentage' ? '%' : t.currency}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleApplyDiscount}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
                >
                  {t.save}
                </button>
                <button 
                  onClick={() => setIsDiscountModalOpen(false)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl transition-all"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Details Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedGame(null)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="h-64 relative flex-shrink-0">
              <img src={selectedGame.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <button onClick={() => setSelectedGame(null)} className="absolute top-6 left-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-2xl text-white transition-all">
                <X size={24} />
              </button>
              <div className={`absolute bottom-6 px-8 flex justify-between items-end w-full ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase shadow-lg shadow-indigo-600/30">{selectedGame.category}</span>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase ${selectedGame.status === 'active' ? 'bg-emerald-50 text-white' : 'bg-rose-500 text-white'}`}>
                       {selectedGame.status === 'active' ? <CheckCircle2 size={12}/> : <Activity size={12}/>}
                       {selectedGame.status === 'active' ? (isRtl ? 'فعال' : 'Active') : (isRtl ? 'غیرفعال' : 'Inactive')}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-white mt-3 tracking-tight">{selectedGame.name}</h3>
                </div>
                <div className={`text-end ${isRtl ? 'text-left' : 'text-right'}`}>
                  <span className="text-2xl font-black text-white">{selectedGame.price}</span>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t.currency}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
              {/* Technical Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-[1.5rem] border dark:border-slate-800/60 flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'زمان بازی' : 'Game Time'}</p>
                    <p className="text-sm font-black dark:text-white mt-1">{selectedGame.time || '---'}</p>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-[1.5rem] border dark:border-slate-800/60 flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'تاییدیه فنی' : 'Technical OK'}</p>
                    <p className="text-sm font-black dark:text-white mt-1">{isRtl ? 'فعال' : 'Verified'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 px-1 text-indigo-600">
                  <Gamepad2 size={20} />
                  <h4 className="text-sm font-black uppercase tracking-widest">{t.gameDetailsTitle}</h4>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2rem] border dark:border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Info size={120} />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-bold leading-relaxed relative z-10">
                    {selectedGame.description || (isRtl ? 'توضیحات تکمیلی برای این بازی ثبت نشده است.' : 'No additional description available for this game.')}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => { addToCart(selectedGame); setSelectedGame(null); }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 text-lg group active:scale-95"
                >
                  <Plus size={24} className="group-hover:rotate-90 transition-transform" /> {t.addToCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default POSView;
