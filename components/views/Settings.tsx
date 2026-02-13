
import React, { useState } from 'react';
import { Info, Wallet, Palette, Save, Smartphone, Mail, Globe, MapPin, CheckCircle2, Image as ImageIcon, Check, Percent } from 'lucide-react';
import { ExtendedTranslationStrings } from '../../translations';

interface SettingsProps {
  t: ExtendedTranslationStrings;
  isRtl: boolean;
}

const Settings: React.FC<SettingsProps> = ({ t, isRtl }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'finance' | 'theme'>('info');

  // Form States
  const [parkInfo, setParkInfo] = useState({
    name: 'شهربازی نوآ',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    email: 'info@noapark.com',
    website: 'www.noapark.com',
    address: 'تهران، خیابان ولیعصر، مجتمع تجاری نوآ'
  });

  const [finance, setFinance] = useState({
    currency: 'toman',
    vat: 10 // مالیات پیش‌فرض ۱۰ درصد
  });

  const [theme, setTheme] = useState({
    showLogoTitle: true,
    themeColor: '#4f46e5',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Noa&backgroundColor=4f46e5'
  });

  const themeColors = [
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Slate', value: '#475569' },
    { name: 'Violet', value: '#8b5cf6' },
  ];

  const handleSave = () => {
    alert(isRtl ? 'تنظیمات با موفقیت ذخیره شد.' : 'Settings saved successfully.');
  };

  const inputClass = `w-full py-4 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-bold`;
  const iconClass = `absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">{t.settings}</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">{isRtl ? 'پیکربندی هویت و فرآیندهای شهربازی' : 'Configure park identity and processes'}</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Save size={20} /> <span>{t.saveSettings}</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-[1.5rem] w-fit">
        <button 
          onClick={() => setActiveTab('info')}
          className={`px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${activeTab === 'info' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <Info size={16} /> {t.parkInfo}
        </button>
        <button 
          onClick={() => setActiveTab('finance')}
          className={`px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${activeTab === 'finance' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <Wallet size={16} /> {t.financialSettings}
        </button>
        <button 
          onClick={() => setActiveTab('theme')}
          className={`px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${activeTab === 'theme' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <Palette size={16} /> {t.themeSettings}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10">
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.parkName}</label>
              <div className="relative group">
                <Info className={iconClass} size={18} />
                <input 
                  type="text" 
                  value={parkInfo.name} 
                  onChange={(e) => setParkInfo({...parkInfo, name: e.target.value})} 
                  className={inputClass} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.parkPhone}</label>
              <div className="relative group">
                <Smartphone className={iconClass} size={18} />
                <input 
                  type="text" 
                  value={parkInfo.phone} 
                  onChange={(e) => setParkInfo({...parkInfo, phone: e.target.value})} 
                  className={inputClass} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.parkEmail}</label>
              <div className="relative group">
                <Mail className={iconClass} size={18} />
                <input 
                  type="email" 
                  value={parkInfo.email} 
                  onChange={(e) => setParkInfo({...parkInfo, email: e.target.value})} 
                  className={inputClass} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.parkWebsite}</label>
              <div className="relative group">
                <Globe className={iconClass} size={18} />
                <input 
                  type="text" 
                  value={parkInfo.website} 
                  onChange={(e) => setParkInfo({...parkInfo, website: e.target.value})} 
                  className={inputClass} 
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.parkAddress}</label>
              <div className="relative group">
                <MapPin className={iconClass} size={18} />
                <input 
                  type="text" 
                  value={parkInfo.address} 
                  onChange={(e) => setParkInfo({...parkInfo, address: e.target.value})} 
                  className={inputClass} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in slide-in-from-top-4">
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.defaultCurrency}</label>
              <div className="grid grid-cols-1 gap-3">
                {['rial', 'toman', 'dollar'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setFinance({...finance, currency: curr})}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${finance.currency === curr ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:border-indigo-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet size={20} />
                      <span className="text-sm font-black">{(t as any)[curr]}</span>
                    </div>
                    {finance.currency === curr && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.vatPercentage}</label>
                <div className="relative group">
                  <Percent className={iconClass} size={18} />
                  <input 
                    type="number" 
                    value={finance.vat} 
                    onChange={(e) => setFinance({...finance, vat: parseInt(e.target.value) || 0})} 
                    className={inputClass} 
                    placeholder="10"
                  />
                </div>
                <p className="text-[10px] font-medium text-slate-400 px-2 mt-2 leading-relaxed">
                  {isRtl ? 'این درصد به طور خودکار به جمع فاکتور در صفحه صندوق اضافه خواهد شد.' : 'This percentage will be automatically added to the cart total in POS.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-10 animate-in slide-in-from-top-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.logo}</label>
                  <div className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700">
                    <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl border-4 border-white dark:border-slate-700 shadow-xl overflow-hidden flex-shrink-0">
                      <img src={theme.logo} alt="Park Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/20">
                        <ImageIcon size={14} /> {t.uploadLogo}
                      </button>
                      <p className="text-[10px] font-medium text-slate-400">{isRtl ? 'فرمت‌های پیشنهادی: PNG, SVG (حداکثر ۵۱۲ کیلوبایت)' : 'Recommended: PNG, SVG (Max 512KB)'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <div>
                    <p className="text-sm font-black dark:text-white">{t.showLogoTitle}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-1">{isRtl ? 'نمایش نام شهربازی در کنار لوگو در هدر' : 'Display park name next to logo in header'}</p>
                  </div>
                  <button 
                    onClick={() => setTheme({...theme, showLogoTitle: !theme.showLogoTitle})}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${theme.showLogoTitle ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isRtl ? (theme.showLogoTitle ? 'left-1' : 'left-7') : (theme.showLogoTitle ? 'right-1' : 'right-7')}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[11px) font-black text-slate-400 uppercase tracking-widest px-1">{t.themeColor}</label>
                <div className="grid grid-cols-3 gap-4">
                  {themeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTheme({...theme, themeColor: color.value})}
                      className={`h-20 rounded-2xl border-4 transition-all flex flex-col items-center justify-center gap-2 ${theme.themeColor === color.value ? 'border-indigo-600 shadow-lg' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value + '10' }}
                    >
                      <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: color.value }} />
                      <span className="text-[10px] font-black" style={{ color: color.value }}>{color.name}</span>
                      {theme.themeColor === color.value && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
