import type { LucideIcon } from 'lucide-react';
import {
  Mail,
  Fingerprint,
  HardDrive,
  ShoppingBag,
  Video,
  Bot,
  MessageCircle,
  Send,
  Globe,
  MonitorSmartphone,
  Computer,
  Wifi,
  LayoutGrid,
  FileText,
  NotebookText,
  Users,
  CalendarDays,
  GraduationCap,
  Sparkles,
  Building2,
} from 'lucide-react';

export type Platform = 'web' | 'android';

export interface AppEntry {
  id: string;
  name: string;
  /** One line, shown under the name. */
  summary: string;
  platform: Platform;
  /** Web apps: where the button goes. */
  href?: string;
  /** Android: repo + release asset, so the APK downloads directly. */
  repo?: string;
  asset?: string;
  /** Real icon served by the app itself; falls back to `icon`. */
  logoSrc?: string;
  icon: LucideIcon;
  accent: string;
  /** Hidden from public listings (admin surfaces). */
  hidden?: boolean;
  badge?: string;
}

const ROOT = 'bansify.com';

/** A web app on its own subdomain. */
function web(id: string, name: string, summary: string, host: string, icon: LucideIcon, accent: string, extra: Partial<AppEntry> = {}): AppEntry {
  return {
    id,
    name,
    summary,
    platform: 'web',
    href: `https://${host}.${ROOT}`,
    logoSrc: `https://${host}.${ROOT}/icon-192.png`,
    icon,
    accent,
    ...extra,
  };
}

/** An Android app: the button downloads the latest release APK directly. */
function android(id: string, name: string, summary: string, repo: string, asset: string, icon: LucideIcon, accent: string, extra: Partial<AppEntry> = {}): AppEntry {
  return {
    id,
    name,
    summary,
    platform: 'android',
    repo,
    asset,
    icon,
    accent,
    ...extra,
  };
}

export const APPS: AppEntry[] = [
  // ——— Web ———
  web('accounts', 'Bansify Accounts', 'One identity, one sign-in for every Bansify product.', 'accounts', Fingerprint, 'bg-orange-500', { badge: 'Identity' }),
  web('mail', 'Bansify Mail', 'Fast webmail for your @bansify.com address.', 'mail', Mail, 'bg-[#0494f4]', { badge: 'Core' }),
  web('drive', 'Bansify Drive', 'Files, folders and sharing in the cloud.', 'drive', HardDrive, 'bg-emerald-500', { badge: 'Core' }),
  web('meet', 'Bansify Meet', 'Video meetings on the same account, no install needed.', 'meet', Video, 'bg-blue-600', { badge: 'Core' }),
  web('pay', 'Bansify Pay', 'Plans and add-ons that unlock more across the ecosystem.', 'pay', ShoppingBag, 'bg-[#0494f4]', { badge: 'Billing' }),
  web('ai', 'Bansify AI', 'One workspace for every AI model, on a single account.', 'ai', Bot, 'bg-violet-500'),
  web('browser', 'Bansify Browser', 'A sovereign browser for Android phones and TV.', 'browser', Globe, 'bg-sky-500'),
  web('gitplus', 'GitPlus', 'Read and manage your GitHub from the browser.', 'gitplus', FileText, 'bg-zinc-700'),
  web('ceo', 'Bansify CEO', 'A direct line to the people building Bansify.', 'ceo', Building2, 'bg-amber-500'),
  web('remotedesktop', 'Bansify Remote Desktop', 'Control your desktop from anywhere, peer to peer.', 'remotedesktop', MonitorSmartphone, 'bg-indigo-500'),
  web('pwparent', 'PW Parent', 'Attendance, marks and batches for parents.', 'pwparent', GraduationCap, 'bg-teal-500'),
  web('www', 'Official Website', 'Everything Bansify, in one place.', 'www', LayoutGrid, 'bg-[#0494f4]'),

  // ——— Android ———
  android('mailapp', 'Bansify Mail', 'The same inbox as webmail, on your phone.', 'mailapp', 'BansifyMail-v1.0.54-Release.apk', Mail, 'bg-[#0494f4]'),
  android('accountsapp', 'Bansify Accounts', 'Sign in once and manage every account on the device.', 'accountsapp', 'BansifyAccounts-v1.0.13-Release.apk', Fingerprint, 'bg-orange-500'),
  android('storeapp', 'Kiwi Store', 'Install and update apps, built for India.', 'storeapp', 'KiwiStore-v1.0.23-Release.apk', ShoppingBag, 'bg-emerald-500'),
  android('browserapp', 'Bansify Browser', 'Browser and TV launcher in one app.', 'browser', 'GothwadTVBrowser-v1.0.141-Release.apk', Globe, 'bg-sky-500'),
  android('launcher', 'Bansify Launcher', 'A TV-first launcher for your apps.', 'launcher', 'BansifyLauncher-v1.0.82-Release.apk', LayoutGrid, 'bg-indigo-500'),
  android('computer', 'Bansify Computer', 'A desktop-style workspace on Android.', 'computer', 'BansifyComputer-v1.0.23-Release.apk', Computer, 'bg-slate-600'),
  android('aiapp', 'Bansify AI', 'The AI studio, on your phone.', 'aiapp', 'BansifyAI-v1.0.2-Release.apk', Sparkles, 'bg-violet-500'),
  android('grixchatapp', 'Bansify Chat', 'Messaging and social, mobile first.', 'grixchatapp', 'BansifyChat-v1.0.7-Release.apk', MessageCircle, 'bg-pink-500'),
  android('indogramapp', 'Indogram', 'Photo sharing for the Bansify ecosystem.', 'indogramapp', 'Indogram-v1.0.15-Release.apk', Send, 'bg-rose-500'),
  android('manager', 'Bansify Manager', 'A file manager that understands your storage.', 'manager', 'GothwadManager-v1.0.16-Release.apk', HardDrive, 'bg-emerald-600'),
  android('internet', 'Bansify Internet', 'Browse, cast and mirror from your phone.', 'internet', 'GothwadTVBrowser-v1.0.141-Release.apk', Wifi, 'bg-sky-600'),
  android('pwparentapp', 'PW Parent', 'The parent app for attendance and marks.', 'pwparentapp', 'Parent-App-v1.0.8-Release.apk', GraduationCap, 'bg-teal-600'),
  android('educationapp', 'Bansify Education', 'Learning, tests and progress on mobile.', 'educationapp', 'GothwadTVBrowser-v1.0.5-Release.apk', NotebookText, 'bg-amber-600'),
  android('prepmateapp', 'PrepMate', 'Exam prep in your pocket.', 'prepmateapp', 'GothwadTVBrowser-v1.0.5-Release.apk', Users, 'bg-orange-600'),
  android('notesapp', 'Bansify Notes', 'Quick notes that sync with your account.', 'notesapp', 'BansifyNotes.apk', NotebookText, 'bg-yellow-600'),
  android('contactsapp', 'Bansify Contacts', 'Your address book, backed by Bansify.', 'contactsapp', 'BansifyContacts.apk', CalendarDays, 'bg-cyan-600'),
  android('driveapp', 'Bansify Drive', 'Your files on the go.', 'driveapp', 'BansifyDrive.apk', HardDrive, 'bg-emerald-700'),
];

/** Only what belongs on the public site: no admin or console surfaces. */
export const PUBLIC_APPS = APPS.filter((app) => !app.hidden);

export const WEB_APPS = PUBLIC_APPS.filter((app) => app.platform === 'web');
export const ANDROID_APPS = PUBLIC_APPS.filter((app) => app.platform === 'android');

/** Direct APK download — no GitHub page in between. */
export function downloadUrl(app: AppEntry): string | undefined {
  if (app.platform !== 'android' || !app.repo || !app.asset) return undefined;
  return `https://github.com/Bansify/${app.repo}/releases/latest/download/${app.asset}`;
}

export function appHref(app: AppEntry): string | undefined {
  return app.platform === 'web' ? app.href : downloadUrl(app);
}
