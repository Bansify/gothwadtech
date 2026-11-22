import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const EcosystemPage = lazy(() => import('./pages/EcosystemPage').then((m) => ({ default: m.EcosystemPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((m) => ({ default: m.SolutionsPage })));
const DocsPage = lazy(() => import('./pages/DocsPage').then((m) => ({ default: m.DocsPage })));
const CompanyPage = lazy(() => import('./pages/CompanyPage').then((m) => ({ default: m.CompanyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

const ROUTES = ['home', 'ecosystem', 'products', 'solutions', 'docs', 'company', 'contact'];

const ROUTE_ALIASES: Record<string, string> = {
  '': 'home',
  '/': 'home',
  about: 'company',
  portfolio: 'ecosystem',
  browser: 'products',
  leadership: 'company',
};

import { parseAuthuserFromUrl, stripAuthuserPath, buildAccountSlotPath } from './config/brand';

function pageFromPathname(pathname: string): string {
  const clean = stripAuthuserPath(pathname);
  const seg = clean.split('/').filter(Boolean)[0]?.toLowerCase() ?? '';
  if (!seg) return 'home';
  const target = ROUTE_ALIASES[seg] ?? seg;
  return ROUTES.includes(target) ? target : 'home';
}

function pageFromHash(hash: string): string | null {
  const raw = hash.replace(/^#/, '').toLowerCase().trim();
  if (!raw) return null;
  const target = ROUTE_ALIASES[raw] ?? raw;
  return ROUTES.includes(target) ? target : null;
}

const pathForPage = (page: string) => {
  const base = page === 'home' ? '/' : `/${page}`;
  // Preserve /u/<n>/ slot like Gmail so authuser stays in URL (and for SSO header)
  try {
    const { authuser, hasExplicitSlot } = parseAuthuserFromUrl(window.location.pathname, window.location.search);
    if (hasExplicitSlot) return `${buildAccountSlotPath(authuser)}${base === '/' ? '' : base.slice(1)}`.replace(/\/\//g, '/') || '/';
  } catch {}
  return base;
};

type PageMeta = {
  title: string;
  description: string;
  ogType?: string;
  keywords?: string;
  breadcrumbs: { name: string; path: string }[];
  jsonLdExtra?: Record<string, unknown> | null;
};

// Exhaustive per-route meta — 55-60 char titles, 150-160 char descriptions, brand included
const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: 'Bansify — Official Website | Sovereign Software from India',
    description:
      'Official site of Bansify — Jaipur-based sovereign collective. One account for Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser, Education, AI & Docs.',
    keywords:
      'Bansify, bansify.com, gothwadtech official, Pawan Bansify, sovereign software India, Bansify Browser, Bansify Accounts',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  ecosystem: {
    title: 'Bansify Ecosystem — All Products & Direct Links | Bansify',
    description:
      'Browse the full Bansify ecosystem — Accounts, Mail, Drive, Meet, Tube, Browser, GrixChat, Indogram, Launcher, Education, AI & more with live links.',
    keywords:
      'Bansify ecosystem, Bansify products, bansify.com products, Bansify Mail, Bansify Drive, Bansify Tube, GrixChat, Indogram',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Ecosystem', path: '/ecosystem' },
    ],
    jsonLdExtra: {
      '@type': 'CollectionPage',
      name: 'Bansify Ecosystem Directory',
    },
  },
  products: {
    title: 'Products — Browser, GrixChat, Indogram | Bansify',
    description:
      'Sovereign apps by Bansify: Browser (11.8 MB, 75% less RAM), GrixChat (<15ms), Indogram (200k members) plus Mail, Drive, Meet & Tube.',
    keywords:
      'Bansify Browser, GrixChat, Indogram, sovereign browser India, Bansify products, Aatmanirbhar Bharat apps',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
    ],
  },
  solutions: {
    title: 'Solutions — School ERP, Restaurant POS & Enterprise | Bansify',
    description:
      'Solutions for Bharat: School ERP, Restaurant POS & ordering, Kirana billing & Khata, Business CRM & custom sovereign browser engines.',
    keywords:
      'Bansify solutions, school ERP India, restaurant POS, shop billing, business ERP, sovereign systems, Bansify solutions',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Solutions', path: '/solutions' },
    ],
  },
  docs: {
    title: 'Docs — Developer Documentation | Bansify',
    description:
      'Bansify developer docs: Accounts OAuth PKCE, Mail REST, Tube web, GrixChat, Meet, Cloudflare deploy — source-cited guides.',
    keywords:
      'Bansify docs, Bansify documentation, docs.bansify.com, Bansify Accounts OAuth, Bansify Mail API',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Docs', path: '/docs' },
    ],
  },
  company: {
    title: 'Company — Leadership & Aatmanirbhar Mission | Bansify',
    description:
      'About Bansify: mission to build sovereign tech for India. Leadership by Pawan Bansify & CEO Yuvkesh Meena from Jaipur, Rajasthan.',
    keywords:
      'Bansify company, Pawan Bansify, Yuvkesh Meena, about Bansify, Aatmanirbhar Bharat, Jaipur tech company',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Company', path: '/company' },
    ],
  },
  contact: {
    title: 'Contact — Talk to Bansify | Support & Business',
    description:
      'Contact Bansify: contact@bansify.com, +91 73399 04665 WhatsApp/Call. Business, support, help & media desks — reply in 2-4 hours.',
    keywords:
      'contact Bansify, Bansify phone, Bansify support, Bansify help, pawan@bansify.com, contact@bansify.com',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
};

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  let el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    const isLink = selector.startsWith('link');
    el = document.createElement(isLink ? 'link' : 'meta');
    if (isLink) {
      // infer rel from selector
      const relMatch = selector.match(/rel="([^"]+)"/);
      el.setAttribute('rel', relMatch?.[1] ?? 'canonical');
    } else {
      const name = selector.includes('property=') ? 'property' : 'name';
      const m = selector.match(/\[(?:name|property)="([^"]+)"\]/);
      const raw = m?.[1];
      if (raw) el.setAttribute(name, raw);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

function buildBreadcrumbJsonLd(breadcrumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://bansify.com/#breadcrumb',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `https://bansify.com${b.path}`,
    })),
  };
}

function buildWebPageJsonLd(page: string, meta: PageMeta, canonical: string) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': meta.jsonLdExtra?.['@type'] ?? 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': 'https://bansify.com/#website' },
    about: { '@id': 'https://bansify.com/#organization' },
    inLanguage: 'en-IN',
    datePublished: '2023-01-01T00:00:00+05:30',
    dateModified: '2026-10-24T00:00:00+05:30',
    primaryImageOfPage: { '@id': 'https://bansify.com/#logo' },
    breadcrumb: { '@id': 'https://bansify.com/#breadcrumb' },
    ...(meta.jsonLdExtra ?? {}),
  };
  // attach canonical breadcrumb id
  return base;
}

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-700 border-t-[#0494f4] rounded-full animate-spin" />
    </div>
  );
}

function AppContent() {
  const [activePage, setActivePage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const legacy = pageFromHash(window.location.hash);
      if (legacy) return legacy;
      return pageFromPathname(window.location.pathname);
    }
    return 'home';
  });

  const handleNavigate = (page: string) => {
    const norm = ROUTES.includes(page) ? page : 'home';
    setActivePage(norm);
    const path = pathForPage(norm);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const legacy = pageFromHash(window.location.hash);
    if (legacy) {
      window.history.replaceState({}, '', pathForPage(legacy));
      setActivePage(legacy);
    } else {
      setActivePage(pageFromPathname(window.location.pathname));
    }
    const sync = () => setActivePage(pageFromPathname(window.location.pathname));
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    const meta = PAGE_META[activePage] ?? PAGE_META.home;
    const canonical = `https://bansify.com${pathForPage(activePage)}`;
    const ogImage = 'https://bansify.com/assets/brand/og-image.png';

    // Core title & description
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    if (meta.keywords) setMeta('meta[name="keywords"]', 'content', meta.keywords);
    setMeta('meta[name="title"]', 'content', meta.title);

    // Canonical + hreflang
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('link[rel="alternate"][hreflang="x-default"]', 'href', canonical);
    setMeta('link[rel="alternate"][hreflang="en-IN"]', 'href', canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:image:secure_url"]', 'content', ogImage);
    setMeta('meta[property="og:updated_time"]', 'content', new Date().toISOString());

    // Twitter
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:url"]', 'content', canonical);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // Robots hints per route (all indexable; no noindex anywhere)
    setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('meta[name="googlebot"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // JSON-LD — WebPage + Breadcrumb for every route
    upsertJsonLd('ld-webpage-dynamic', buildWebPageJsonLd(activePage, meta, canonical));
    upsertJsonLd('ld-breadcrumb-dynamic', buildBreadcrumbJsonLd(meta.breadcrumbs));

    // Route-specific extra ItemList for ecosystem/products/docs to boost rich results
    if (activePage === 'ecosystem') {
      upsertJsonLd('ld-itemlist-ecosystem', {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${canonical}#products`,
        name: 'Bansify Ecosystem — All Products',
        description: 'Complete list of Bansify products: Accounts, Mail, Drive, Meet, Tube, Browser, GrixChat, Indogram, Launcher, Manager, Education, AI and more.',
        numberOfItems: 25,
        itemListElement: [
          'Accounts',
          'Mail',
          'Drive',
          'Meet',
          'Calendar',
          'Contacts',
          'Notes',
          'Store',
          'Tube',
          'GrixChat',
          'Indogram',
          'Browser',
          'Launcher',
          'Manager',
          'Remote Desktop',
          'Internet',
          'Computer',
          'Education',
          'ClashDrive',
          'AI Studio',
          'Docs',
          'CEO',
        ].map((name, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name,
          url: `https://bansify.com/ecosystem#${name.toLowerCase().replace(/\s/g, '-')}`,
        })),
      });
    } else {
      removeJsonLd('ld-itemlist-ecosystem');
    }

    if (activePage === 'contact') {
      upsertJsonLd('ld-contact', {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${canonical}#contactpage`,
        url: canonical,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': 'https://bansify.com/#website' },
        about: { '@id': 'https://bansify.com/#organization' },
      });
    } else {
      removeJsonLd('ld-contact');
    }

    if (activePage === 'company') {
      upsertJsonLd('ld-about', {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${canonical}#aboutpage`,
        url: canonical,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': 'https://bansify.com/#website' },
        about: { '@id': 'https://bansify.com/#organization' },
        mainEntity: { '@id': 'https://bansify.com/#organization' },
      });
    } else {
      removeJsonLd('ld-about');
    }
  }, [activePage]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#0494f4]/25 selection:text-[#0494f4] flex flex-col font-sans">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1 pt-[56px]">
        <Suspense fallback={<RouteFallback />}>
          {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {activePage === 'ecosystem' && <EcosystemPage />}
          {activePage === 'products' && <ProductsPage />}
          {activePage === 'solutions' && <SolutionsPage onNavigate={handleNavigate} />}
          {activePage === 'docs' && <DocsPage />}
          {activePage === 'company' && <CompanyPage onNavigate={handleNavigate} />}
          {activePage === 'contact' && <ContactPage />}
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
