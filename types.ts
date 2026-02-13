
export type Language = 'en' | 'fa';
export type Theme = 'light' | 'dark';

export enum UserRole {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  MANAGER = 'manager',
  CUSTOMER = 'customer'
}

export interface UserPermission {
  id: string;
  label: string;
  category: 'menu' | 'action';
}

export interface UserGroup {
  id: string;
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  groupId?: string;
  permissions?: string[]; // Individual permissions
  isActive: boolean;
}

export interface GiftPackage {
  id: number;
  fromAmount: string;
  toAmount: string;
  giftType: 'fixed' | 'percentage';
  giftValue: string;
  isActive: boolean;
}

export interface TranslationStrings {
  loginTitle: string;
  loginSubtitle: string;
  phoneLabel: string;
  passwordLabel: string;
  rememberMe: string;
  forgotPassword: string;
  loginBtn: string;
  welcome: string;
  dashboard: string;
  tickets: string;
  users: string;
  settings: string;
  logout: string;
  fullscreen: string;
  exitFullscreen: string;
  errorLogin: string;
}