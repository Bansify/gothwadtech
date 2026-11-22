import React, { useMemo, useState } from 'react';
import { Globe, Smartphone, ShieldCheck } from 'lucide-react';
import { PUBLIC_APPS, downloadUrl } from '../data/apps';
import type { Platform } from '../data/apps';
import { AppRow } from '../components/AppRow';
import { Breadcrumbs } from '../components/Breadcrumbs';

type Filter = 'all' | Platform;

const FILTERS: Array<{ id: Filter; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'all', label: 'All', icon: ShieldCheck },
  { id: 'web', label: 'Website', icon: Globe },
  { id: 'android', label: 'Android', icon: Smartphone },
];

export const EcosystemPage: React.FC<{ onNavigate?: (p: string) => void }> = () => {
  const [filter, setFilter] = useState<Filter>('all');

  const apps = useMemo(
    () => PUBLIC_APPS.filter((app) => (filter === 'all' ? true : app.platform === filter)),
    [filter],
  );

  const webCount = PUBLIC_APPS.filter((a) => a.platform === 'web').length;
  const androidCount = PUBLIC_APPS.filter((a) => a.platform === 'android').length;

  return (
    <div className="max-w-[880px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Breadcrumbs items={[{ name: 'Ecosystem', path: '/ecosystem' }]} />

      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          Ecosystem
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Every Bansify app, one list
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
          Web apps open in your browser. Android apps download the latest release directly. Everything
          signs in with the same Bansify Account.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const active = filter === f.id;
          const count = f.id === 'all' ? PUBLIC_APPS.length : f.id === 'web' ? webCount : androidCount;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold border transition ${
                active
                  ? 'bg-[#0494f4] text-white border-[#0494f4]'
                  : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              {f.label}
              <span className={active ? 'text-white/70' : 'text-zinc-400'}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 space-y-3">
        {apps.map((app) => (
          <AppRow key={`${app.platform}-${app.id}`} app={app} />
        ))}
      </ul>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-500">
        {downloadUrl({ ...PUBLIC_APPS.find((a) => a.platform === 'android')! }) ? 'Android builds are signed release APKs from each project’s latest GitHub release.' : ''}
      </p>
    </div>
  );
};
