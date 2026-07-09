import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export default function CityMapPlaceholder() {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/75 p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">{t('cityMapPlaceholder.neighborhoodView')}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{t('cityMapPlaceholder.title')}</h3>
          <p className="mt-3 text-emerald-100/70">{t('cityMapPlaceholder.description')}</p>
        </div>
        <div className="relative min-h-[260px] flex-1 rounded-[1.75rem] border border-emerald-600/40 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_35%),linear-gradient(135deg,_rgba(20,83,45,0.9),_rgba(6,78,59,0.95))] p-6">
          <div className="absolute left-[15%] top-[20%] h-24 w-24 rounded-full border border-emerald-300/30 bg-emerald-400/15" />
          <div className="absolute right-[20%] top-[30%] h-20 w-20 rounded-full border border-lime-300/30 bg-lime-400/15" />
          <div className="absolute bottom-[18%] left-[30%] h-28 w-28 rounded-full border border-emerald-300/30 bg-emerald-500/10" />
          <div className="absolute bottom-[25%] right-[12%] h-16 w-16 rounded-full border border-emerald-300/30 bg-emerald-300/10" />
          <div className="absolute left-[35%] top-[45%] rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-white">{t('cityMapPlaceholder.highAdoptionZone')}</div>
          <div className="absolute bottom-[12%] right-[28%] flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-50">
            <MapPinIcon className="h-4 w-4" />
            {t('cityMapPlaceholder.communityHubs')}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
