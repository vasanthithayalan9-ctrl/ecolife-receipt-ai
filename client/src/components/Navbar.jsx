import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const links = [
    { to: '/', label: t('navbar.home') },
    { to: '/scanner', label: t('navbar.scanner') },
    { to: '/results', label: t('navbar.results') },
    { to: '/basket', label: t('navbar.basket') },
    { to: '/city', label: t('navbar.city') },
    { to: '/voice', label: t('navbar.voice') },
    { to: '/settings', label: t('navbar.settings') }
  ];

  return (
    <header className="border-b border-emerald-800/70 bg-emerald-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">{t('navbar.title')}</p>
          <h1 className="text-xl font-semibold text-white">{t('navbar.subtitle')}</h1>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm text-emerald-100/90">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${isActive ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-900/60'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
