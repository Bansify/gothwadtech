import React, { useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { appHref } from '../data/apps';
import type { AppEntry } from '../data/apps';

const AppLogo: React.FC<{ app: AppEntry }> = ({ app }) => {
  const [failed, setFailed] = useState(false);
  const Icon = app.icon;
  if (app.logoSrc && !failed) {
    return (
      <img
        src={app.logoSrc}
        alt={`${app.name} logo`}
        width={56}
        height={56}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-14 h-14 rounded-2xl object-contain bg-white ring-1 ring-zinc-200 dark:ring-zinc-800 shrink-0"
      />
    );
  }
  return (
    <div className={`w-14 h-14 rounded-2xl ${app.accent} flex items-center justify-center shrink-0`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
  );
};

/** One app, one row: logo, name, one-line summary, link and the action button. */
export const AppRow: React.FC<{ app: AppEntry }> = ({ app }) => {
  const href = appHref(app);
  const isAndroid = app.platform === 'android';

  return (
    <li className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-[#0494f4]/50 hover:shadow-sm transition">
      <div className="flex items-center gap-4 p-4 sm:p-5">
        <AppLogo app={app} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-zinc-900 dark:text-white truncate">{app.name}</h3>
            {app.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0494f4]/10 text-[#0494f4] border border-[#0494f4]/20">
                {app.badge}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
              {isAndroid ? 'Android' : 'Web'}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 truncate">{app.summary}</p>
          {href && (
            <a href={href} className="mt-1 inline-block text-xs text-zinc-500 hover:text-[#0494f4] truncate max-w-full" rel="noopener">
              {isAndroid ? `github.com/Bansify/${app.repo}` : href.replace('https://', '')}
            </a>
          )}
        </div>

        {href && (
          <a
            href={href}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#0494f4] hover:bg-[#0384db] text-white text-sm font-semibold px-4 py-2 transition"
            {...(isAndroid ? { download: '' } : { rel: 'noopener' })}
          >
            {isAndroid ? <Download className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
            {isAndroid ? 'Download' : 'Open'}
          </a>
        )}
      </div>
    </li>
  );
};
