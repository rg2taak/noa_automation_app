
import { TranslationStrings } from './types';

export interface ExtendedTranslationStrings extends TranslationStrings {
  invalidPhone: string;
  requiredField: string;
  passwordMinLength: string;
  profile: string;
  parkName: string;
  deviceManagement: string;
  gamesAndCategories: string;
  categories: string;
  games: string;
  pos: string;
  giftPackages: string;
  customers: string;
  cards: string;
  staff: string;
  finance: string;
  payments: string;
  reports: string;
  salesReport: string;
  deviceReport: string;
  gameSalesReport: string;
  categorySalesReport: string;
  // Customer Stats
  purchasedCards: string;
  totalPurchases: string;
  totalGifts: string;
  usedGamesList: string;
  activeCredits: string;
  // Admin Stats
  customerDashboard: string;
  mainDashboard: string;
  todaySales: string;
  yesterdayDiff: string;
  todaySalesCount: string;
  todayCustomers: string;
  monthlyAvg: string;
  topSellingGames: string;
  mostActiveDevices: string;
  dailySalesChart: string;
  recentSales: string;
  viewFullReport: string;
  // Device Management
  deviceId: string;
  deviceName: string;
  devicePrice: string;
  deviceType: string;
  useGift: string;
  deviceStatus: string;
  actions: string;
  searchDevice: string;
  exportExcel: string;
  options: string;
  active: string;
  maintenance: string;
  offline: string;
  inactive: string;
  yes: string;
  no: string;
  addNewDevice: string;
  deviceSubtitle: string;
  // Device Modal
  editDevice: string;
  save: string;
  cancel: string;
  deductive: string;
  timed: string;
  timedList: string;
  deviceTimeMinutes: string;
  alarmTimeSeconds: string;
  interCardIntervalSeconds: string;
  giftUsage: string;
  // New
  viewRewards: string;
  recharge: string;
  addSale: string;
  goldenGiftPack: string;
  goldenGiftSubtitle: string;
  currency: string;
  // Games & Categories New Keys
  addCategory: string;
  addGame: string;
  gameDescription: string;
  gameCategory: string;
  gameTime: string;
  gameImage: string;
  gameList: string;
  // Gift Packages
  addGiftPackage: string;
  fromAmount: string;
  toAmount: string;
  giftType: string;
  giftValue: string;
  fixed: string;
  percentage: string;
  giftPackageSubtitle: string;
  // Customers
  addCustomer: string;
  editCustomer: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalSpent: string;
  customerSubtitle: string;
  // Purchase History
  purchaseHistory: string;
  purchaseDate: string;
  cardNumber: string;
  rechargeAmount: string;
  viewDetails: string;
  gameDetails: string;
  itemsPurchased: string;
  // Profile/Detail View
  viewProfile: string;
  customerDetails: string;
  backToList: string;
  confirmPasswordLabel: string;
  changePassword: string;
  performance: string;
  customerPerformance: string;
  visitsCount: string;
  lastVisit: string;
  passwordsDoNotMatch: string;
  // Staff & Permissions
  staffList: string;
  userGroups: string;
  addStaff: string;
  addGroup: string;
  groupName: string;
  permissions: string;
  menuAccess: string;
  actionAccess: string;
  selectGroup: string;
  individualPermissions: string;
  activeStatus: string;
  // Settings
  parkInfo: string;
  financialSettings: string;
  themeSettings: string;
  parkPhone: string;
  parkEmail: string;
  parkWebsite: string;
  parkAddress: string;
  defaultCurrency: string;
  rial: string;
  toman: string;
  dollar: string;
  logo: string;
  showLogoTitle: string;
  themeColor: string;
  uploadLogo: string;
  saveSettings: string;
  vatPercentage: string;
  // POS Specific
  posSubtitle: string;
  addToCart: string;
  shoppingCart: string;
  quantity: string;
  unitPrice: string;
  subtotal: string;
  addDiscount: string;
  removeDiscount: string;
  totalItems: string;
  taxAmount: string;
  finalTotal: string;
  completePayment: string;
  rechargeCard: string;
  giftCredit: string;
  emptyCart: string;
  gameDetailsTitle: string;
  allCategories: string;
  // New Discount Modal Keys
  applyDiscount: string;
  discountAmount: string;
  discountPercentage: string;
  discountValueLabel: string;
  paymentAndRecharge: string;
}

export const translations: Record<'en' | 'fa', ExtendedTranslationStrings> = {
  en: {
    loginTitle: 'Login',
    loginSubtitle: 'Noa Amusement Park Automation',
    phoneLabel: 'Mobile Number',
    passwordLabel: 'Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    loginBtn: 'Login',
    welcome: 'Welcome back',
    dashboard: 'Dashboard',
    tickets: 'Ticket Management',
    users: 'Staff Control',
    settings: 'Settings',
    logout: 'Logout',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    errorLogin: 'Invalid credentials. Use 09123456789 / 1234.',
    invalidPhone: 'Please enter a valid mobile number (e.g. 0912...)',
    requiredField: 'This field is required',
    passwordMinLength: 'Password must be at least 4 characters',
    profile: 'Profile',
    parkName: 'Noa Amusement Park',
    deviceManagement: 'Device Management',
    gamesAndCategories: 'Games & Categories',
    categories: 'Categories',
    games: 'Games',
    pos: 'Point of Sale',
    giftPackages: 'Gift Packages',
    customers: 'Customers',
    cards: 'Cards',
    staff: 'Staff',
    finance: 'Finance',
    payments: 'Payments',
    reports: 'Reports',
    salesReport: 'Sales Report',
    deviceReport: 'Device Usage Report',
    gameSalesReport: 'Game Sales Report',
    categorySalesReport: 'Category Sales Report',
    purchasedCards: 'Purchased Cards',
    totalPurchases: 'Total Purchases',
    totalGifts: 'Total Gifts',
    usedGamesList: 'Used Games List',
    activeCredits: 'Active Credits',
    customerDashboard: 'Customer Dashboard',
    mainDashboard: 'Main Dashboard',
    todaySales: 'Today\'s Sales',
    yesterdayDiff: 'vs Yesterday',
    todaySalesCount: 'Sales Count',
    todayCustomers: 'Today\'s Customers',
    monthlyAvg: 'Monthly Average',
    topSellingGames: 'Top Selling Games',
    mostActiveDevices: 'Most Active Devices',
    dailySalesChart: 'Daily Sales (Current Month)',
    recentSales: 'Today\'s Sales List',
    viewFullReport: 'View Full Report',
    deviceId: 'Device ID',
    deviceName: 'Device Name',
    devicePrice: 'Price',
    deviceType: 'Type',
    useGift: 'Gift Support',
    deviceStatus: 'Status',
    actions: 'Actions',
    searchDevice: 'Search...',
    exportExcel: 'Export Excel',
    options: 'Options',
    active: 'Active',
    maintenance: 'Maintenance',
    offline: 'Offline',
    inactive: 'Inactive',
    yes: 'Enabled',
    no: 'Disabled',
    addNewDevice: 'Add New Device',
    deviceSubtitle: 'List of deductive devices.',
    editDevice: 'Edit Device',
    save: 'Save Changes',
    cancel: 'Cancel',
    deductive: 'Deductive',
    timed: 'Timed',
    timedList: 'Timed List',
    deviceTimeMinutes: 'Device Time (Min)',
    alarmTimeSeconds: 'Alarm Time (Sec)',
    interCardIntervalSeconds: 'Card Interval (Sec)',
    giftUsage: 'Support Gift Credits',
    viewRewards: 'View Rewards',
    recharge: 'Recharge Card',
    addSale: 'New Sale',
    goldenGiftPack: 'Golden Gift Pack',
    goldenGiftSubtitle: 'Get $100 bonus for every $500 recharge.',
    currency: 'Toman',
    addCategory: 'Add Category',
    addGame: 'Add Game',
    gameDescription: 'Description',
    gameCategory: 'Category',
    gameTime: 'Time',
    gameImage: 'Image',
    gameList: 'Games List',
    addGiftPackage: 'Add Gift Package',
    fromAmount: 'From Amount',
    toAmount: 'To Amount',
    giftType: 'Gift Type',
    giftValue: 'Gift Value',
    fixed: 'Fixed Amount',
    percentage: 'Percentage',
    giftPackageSubtitle: 'Manage automatic recharge bonuses.',
    addCustomer: 'Add Customer',
    editCustomer: 'Edit Customer',
    customerName: 'Customer Name',
    customerEmail: 'Email Address',
    customerPhone: 'Phone Number',
    totalSpent: 'Total Purchases',
    customerSubtitle: 'View and manage park customer profiles.',
    purchaseHistory: 'Purchase History',
    purchaseDate: 'Purchase Date',
    cardNumber: 'Card Number',
    rechargeAmount: 'Recharge Amount',
    viewDetails: 'View Details',
    gameDetails: 'Game Details',
    itemsPurchased: 'Items Purchased',
    viewProfile: 'View Profile',
    customerDetails: 'Customer Details',
    backToList: 'Back to List',
    confirmPasswordLabel: 'Confirm Password',
    changePassword: 'Change Password',
    performance: 'Performance',
    customerPerformance: 'Customer Performance Analysis',
    visitsCount: 'Visits Count',
    lastVisit: 'Last Visit',
    passwordsDoNotMatch: 'Passwords do not match',
    staffList: 'Staff List',
    userGroups: 'User Groups',
    addStaff: 'Add Staff Member',
    addGroup: 'Create New Group',
    groupName: 'Group Name',
    permissions: 'Permissions',
    menuAccess: 'Menu Access',
    actionAccess: 'Action Permissions',
    selectGroup: 'Select User Group',
    individualPermissions: 'Individual Override Permissions',
    activeStatus: 'Account Status',
    parkInfo: 'Park Information',
    financialSettings: 'Financial Settings',
    themeSettings: 'Theme Settings',
    parkPhone: 'Phone Number',
    parkEmail: 'Email Address',
    parkWebsite: 'Website',
    parkAddress: 'Address',
    defaultCurrency: 'Default Currency',
    rial: 'Rial',
    toman: 'Toman',
    dollar: 'Dollar',
    logo: 'Logo',
    showLogoTitle: 'Show Logo with Title',
    themeColor: 'App Theme Color',
    uploadLogo: 'Upload Logo',
    saveSettings: 'Save Settings',
    vatPercentage: 'VAT Percentage (%)',
    posSubtitle: 'Record orders and recharge cards',
    addToCart: 'Add to Cart',
    shoppingCart: 'Shopping Cart',
    quantity: 'Qty',
    unitPrice: 'Price',
    subtotal: 'Amount',
    addDiscount: 'Add Discount',
    removeDiscount: 'Remove Discount',
    totalItems: 'Total Items',
    taxAmount: 'VAT (10%)',
    finalTotal: 'Total Payable',
    rechargeCard: 'Recharge Card',
    completePayment: 'Complete Payment',
    giftCredit: 'Gift Credit',
    emptyCart: 'Cart is empty',
    gameDetailsTitle: 'Game Information',
    allCategories: 'All Categories',
    applyDiscount: 'Apply Discount',
    discountAmount: 'Discount Amount',
    discountPercentage: 'Discount Percentage (%)',
    discountValueLabel: 'Value',
    paymentAndRecharge: 'Payment & Recharge Card'
  },
  fa: {
    loginTitle: 'ورود',
    loginSubtitle: 'اتوماسیون شهربازی نوآ',
    phoneLabel: 'شماره موبایل',
    passwordLabel: 'رمز عبور',
    rememberMe: 'مرا به خاطر بسپار',
    forgotPassword: 'فراموشی رمز عبور؟',
    loginBtn: 'ورود',
    welcome: 'خوش آمدید',
    dashboard: 'پیشخوان اصلی',
    tickets: 'مدیریت بلیط',
    users: 'کنترل کاربران',
    settings: 'تنظیمات',
    logout: 'خروج',
    fullscreen: 'تمام صفحه',
    exitFullscreen: 'خروج از تمام صفحه',
    errorLogin: 'اطلاعات صحیح نیست. از ۱۲۳۴ / ۰۹۱۲۳۴۵۶۷۸۹ استفاده کنید.',
    invalidPhone: 'لطفاً یک شماره موبایل معتبر وارد کنید (مثلاً ...۰۹۱۲)',
    requiredField: 'این فیلد الزامی است',
    passwordMinLength: 'رمز عبور باید حداقل ۴ کاراکتر باشد',
    profile: 'پروفایل کاربر',
    parkName: 'شهربازی نوآ',
    deviceManagement: 'مدیریت دستگاه‌ها',
    gamesAndCategories: 'بازی‌ها و دسته‌بندی',
    categories: 'دسته‌بندی‌ها',
    games: 'بازی‌ها',
    pos: 'صندوق فروش',
    giftPackages: 'بسته‌های هدیه',
    customers: 'مشتریان',
    cards: 'کارت‌ها',
    staff: 'کارکنان',
    finance: 'مالی',
    payments: 'پرداخت‌ها',
    reports: 'گزارشات',
    salesReport: 'گزارش فروش',
    deviceReport: 'گزارش کارکرد دستگاه‌ها',
    gameSalesReport: 'گزارش فروش بازی‌ها',
    categorySalesReport: 'گزارش فروش دسته‌بندی',
    purchasedCards: 'تعداد کارت‌های خریداری شده',
    totalPurchases: 'مجموع خریدها',
    totalGifts: 'مجموع هدیه‌ها',
    usedGamesList: 'لیست بازی‌های استفاده شده',
    activeCredits: 'اعتبار فعال',
    customerDashboard: 'پیشخوان مشتری',
    mainDashboard: 'پیشخوان اصلی',
    todaySales: 'فروش امروز',
    yesterdayDiff: 'نسبت به دیروز',
    todaySalesCount: 'تعداد فروش امروز',
    todayCustomers: 'مشتریان امروز',
    monthlyAvg: 'میانگین درآمد ماه',
    topSellingGames: 'پرفروش‌ترین بازی‌ها',
    mostActiveDevices: 'پرکارترین دستگاه‌ها',
    dailySalesChart: 'نمودار فروش روزانه ماه جاری',
    recentSales: 'لیست فروش امروز',
    viewFullReport: 'مشاهده گزارش کامل',
    deviceId: 'شناسه دستگاه',
    deviceName: 'نام دستگاه',
    devicePrice: 'قیمت دستگاه',
    deviceType: 'تایپ دستگاه',
    useGift: 'استفاده از هدیه',
    deviceStatus: 'وضعیت دستگاه',
    actions: 'عملیات',
    searchDevice: 'جستجو...',
    exportExcel: 'خروجی اکسل',
    options: 'گزینه‌ها',
    active: 'فعال',
    maintenance: 'در دست تعمیر',
    offline: 'غیرفعال',
    inactive: 'غیرفعال',
    yes: 'دارد',
    no: 'ندارد',
    addNewDevice: 'افزودن دستگاه جدید',
    deviceSubtitle: 'لیست دستگاه‌های کاهنده.',
    editDevice: 'ویرایش اطلاعات دستگاه',
    save: 'ذخیره تغییرات',
    cancel: 'انصراف',
    deductive: 'کاهنده',
    timed: 'زمانی',
    timedList: 'زمانی لیستی',
    deviceTimeMinutes: 'زمان دستگاه (دقیقه)',
    alarmTimeSeconds: 'زمان آلارم (ثانیه)',
    interCardIntervalSeconds: 'فاصله بین دو کارت (ثانیه)',
    giftUsage: 'قابلیت استفاده از شارژ هدیه',
    viewRewards: 'مشاهده جوایز',
    recharge: 'شارژ مجدد کارت',
    addSale: 'ثبت فروش جدید',
    goldenGiftPack: 'بسته هدیه طلایی',
    goldenGiftSubtitle: 'با هر ۵۰۰ هزار تومان شارژ، ۱۰۰ هزار تومان هدیه بگیرید.',
    currency: 'تومان',
    addCategory: 'افزودن دسته‌بندی',
    addGame: 'افزودن بازی',
    gameDescription: 'توضیحات',
    gameCategory: 'دسته‌بندی',
    gameTime: 'زمان بازی',
    gameImage: 'تصویر بازی',
    gameList: 'لیست بازی‌ها',
    addGiftPackage: 'افزودن بسته هدیه',
    fromAmount: 'از مبلغ',
    toAmount: 'تا مبلغ',
    giftType: 'نوع هدیه',
    giftValue: 'درصد/مبلغ هدیه',
    fixed: 'مبلغ ثابت',
    percentage: 'درصدی',
    giftPackageSubtitle: 'مدیریت پاداش‌های شارژ خودکار.',
    addCustomer: 'افزودن مشتری جدید',
    editCustomer: 'ویرایش مشتری',
    customerName: 'نام مشتری',
    customerEmail: 'آدرس ایمیل',
    customerPhone: 'تلفن',
    totalSpent: 'کل خریدها',
    customerSubtitle: 'مشاهده و مدیریت پروفایل مشتریان شهربازی.',
    purchaseHistory: 'تاریخچه خریدها',
    purchaseDate: 'تاریخ خرید',
    cardNumber: 'شماره کارت',
    rechargeAmount: 'مبلغ شارژ',
    viewDetails: 'مشاهده جزئیات',
    gameDetails: 'جزئیات بازی‌ها',
    itemsPurchased: 'آیتم‌های خریداری شده',
    viewProfile: 'نمایش پروفایل',
    customerDetails: 'جزئیات مشتری',
    backToList: 'بازگشت به لیست',
    confirmPasswordLabel: 'تکرار رمز عبور',
    changePassword: 'تغییر رمز عبور',
    performance: 'عملکرد',
    customerPerformance: 'تحلیل عملکرد مشتری',
    visitsCount: 'تعداد دفعات مراجعه',
    lastVisit: 'آخرین مراجعه',
    passwordsDoNotMatch: 'رمز عبور و تکرار آن یکسان نیستند',
    staffList: 'لیست کارکنان',
    userGroups: 'گروه‌های کاربری',
    addStaff: 'افزودن کاربر جدید',
    addGroup: 'ایجاد گروه جدید',
    groupName: 'نام گروه',
    permissions: 'دسترسی‌ها',
    menuAccess: 'دسترسی به منوها',
    actionAccess: 'دسترسی به عملیات',
    selectGroup: 'انتخاب گروه کاربری',
    individualPermissions: 'دسترسی‌های اختصاصی کاربر',
    activeStatus: 'وضعیت حساب کاربری',
    parkInfo: 'اطلاعات بازیگاه و شهربازی',
    financialSettings: 'تنظیمات مالی',
    themeSettings: 'تنظیمات تم برنامه',
    parkPhone: 'شماره تلفن',
    parkEmail: 'آدرس ایمیل',
    parkWebsite: 'وب‌سایت',
    parkAddress: 'آدرس شهربازی',
    defaultCurrency: 'ارز پیش‌فرض',
    rial: 'ریال',
    toman: 'تومان',
    dollar: 'دلار',
    logo: 'لوگو',
    showLogoTitle: 'نمایش لوگو با عنوان بازیگاه',
    themeColor: 'رنگ تم برنامه',
    uploadLogo: 'بارگذاری لوگو',
    saveSettings: 'ذخیره تنظیمات',
    vatPercentage: 'درصد مالیات ارزش افزوده (%)',
    posSubtitle: 'ثبت سفارش بازی و شارژ کارت مشتری',
    addToCart: 'افزودن به سبد',
    shoppingCart: 'سبد خرید',
    quantity: 'تعداد',
    unitPrice: 'قیمت',
    subtotal: 'مبلغ',
    addDiscount: 'افزودن تخفیف',
    removeDiscount: 'حذف تخفیف',
    totalItems: 'تعداد آیتم‌ها',
    taxAmount: 'مالیات (۱۰٪)',
    finalTotal: 'مبلغ قابل پرداخت',
    rechargeCard: 'شارژ کارت',
    completePayment: 'پرداخت نهایی',
    giftCredit: 'اعتبار هدیه',
    emptyCart: 'سبد خرید خالی است',
    gameDetailsTitle: 'مشخصات بازی',
    allCategories: 'همه دسته‌بندی‌ها',
    applyDiscount: 'اعمال تخفیف',
    discountAmount: 'مبلغ تخفیف',
    discountPercentage: 'درصد تخفیف (%)',
    discountValueLabel: 'مقدار',
    paymentAndRecharge: 'پرداخت و شارژ کارت'
  }
};
