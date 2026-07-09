import { ArrowUpTrayIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ReceiptUploader({ demoLoaded, demoItems, onLoadDemo }) {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950 via-emerald-900/90 to-emerald-950/80 p-8 shadow-[0_25px_80px_rgba(3,20,13,0.35)]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
            <ArrowUpTrayIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('uploader.title')}</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">{t('uploader.heading')}</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onLoadDemo}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-500/25"
        >
          <SparklesIcon className="h-4 w-4" />
          {t('uploader.loadDemo')}
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-dashed border-emerald-400/40 bg-emerald-950/70 p-8 text-center text-emerald-100/80">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
            <ArrowUpTrayIcon className="h-8 w-8" />
          </div>
          <p className="mt-4 text-lg font-semibold text-white">{t('uploader.uploadArea')}</p>
          <p className="mt-2 text-sm text-emerald-100/70">{t('uploader.description')}</p>
        </div>

        <div className="rounded-[1.5rem] border border-emerald-700/40 bg-emerald-900/80 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">{t('uploader.previewTitle')}</p>
          <div className="mt-4 space-y-3">
            {demoLoaded ? (
              demoItems.map((item) => (
                <div key={item} className="rounded-2xl border border-emerald-700/40 bg-emerald-950/70 px-4 py-3 text-sm text-emerald-100/85">
                  {item}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/70 px-4 py-5 text-sm text-emerald-100/70">
                {t('uploader.previewPlaceholder')}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
