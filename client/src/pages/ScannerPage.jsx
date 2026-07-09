import { useTranslation } from 'react-i18next';

export default function ScannerPage() {
  const { t } = useTranslation();
  const steps = [t('scanner.steps.upload'), t('scanner.steps.analyze'), t('scanner.steps.improve'), t('scanner.steps.savePlanet')];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-[32px] border border-emerald-800/70 bg-gradient-to-br from-emerald-950 via-emerald-900 to-lime-900 shadow-[0_30px_80px_rgba(2,44,34,0.45)]">
        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {t('scanner.banner')}
            </div>

            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t('scanner.heading')}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-emerald-100/80">
              {t('scanner.description')}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button className="rounded-full bg-emerald-500 px-5 py-3 font-medium text-white transition hover:scale-[1.02] hover:bg-emerald-400">
                {t('scanner.uploadButton')}
              </button>
              <button className="rounded-full border border-emerald-300/40 bg-white/5 px-5 py-3 font-medium text-emerald-100 backdrop-blur transition hover:bg-white/10">
                {t('scanner.sampleButton')}
              </button>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {steps.map((step, index) => (
                  <div key={`${step}-${index}`} className="flex items-center gap-2 text-sm text-emerald-100/80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/20 text-xs font-semibold text-emerald-200">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                    {index < steps.length - 1 && <span className="ml-1 text-emerald-400">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(74,222,128,0.22),_transparent_55%)]" />
            <div className="relative w-full max-w-md rounded-[28px] border border-emerald-400/20 bg-emerald-950/50 p-5 shadow-2xl shadow-emerald-950/60 backdrop-blur-xl">
              <div className="rounded-[24px] border border-emerald-800/70 bg-gradient-to-br from-emerald-900/90 to-lime-900/80 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-300">{t('scanner.livePreview')}</p>
                    <p className="text-lg font-semibold text-white">{t('scanner.scanStudio')}</p>
                  </div>
                  <div className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-200">
                    {t('scanner.matchedRate')}
                  </div>
                </div>

                <div className="relative h-56 overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_60%)]">
                  <div className="eco-orb absolute left-8 top-8 h-24 w-24 rounded-full bg-emerald-400/30 blur-2xl" />
                  <div className="eco-leaf absolute bottom-10 right-10 h-20 w-20 rotate-[-18deg] rounded-[60%_40%_60%_40%] bg-emerald-500/80" />
                  <div className="eco-leaf absolute bottom-8 left-10 h-16 w-16 rotate-[20deg] rounded-[60%_40%_60%_40%] bg-lime-400/70" />
                  <div className="absolute bottom-6 left-1/2 h-24 w-24 -translate-x-1/2 rounded-[50%_50%_46%_54%] border border-emerald-200/20 bg-white/10 backdrop-blur" />
                  <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-600/30 text-3xl shadow-lg shadow-emerald-900/30">
                    🌿
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-emerald-800/70 bg-emerald-950/60 p-4">
                  <div className="flex items-center justify-between text-sm text-emerald-100/80">
                    <span>{t('scanner.receiptRecognized')}</span>
                    <span className="font-semibold text-white">4 items</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-emerald-950">
                    <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-emerald-400 to-lime-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-300">
            🖼️
          </div>
          <h3 className="text-xl font-semibold text-white">{t('scanner.cards.imageTitle')}</h3>
          <p className="mt-2 text-sm text-emerald-100/70">{t('scanner.cards.imageDescription')}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-emerald-300">
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">JPG</span>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">PNG</span>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">JPEG</span>
          </div>
          <button className="mt-6 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20">
            {t('scanner.cards.uploadImage')}
          </button>
        </div>

        <div className="rounded-[24px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-300">
            📄
          </div>
          <h3 className="text-xl font-semibold text-white">{t('scanner.cards.pdfTitle')}</h3>
          <p className="mt-2 text-sm text-emerald-100/70">{t('scanner.cards.pdfDescription')}</p>
          <button className="mt-6 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20">
            {t('scanner.cards.uploadPdf')}
          </button>
        </div>

        <div className="rounded-[24px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-300">
            📷
          </div>
          <h3 className="text-xl font-semibold text-white">{t('scanner.cards.cameraTitle')}</h3>
          <p className="mt-2 text-sm text-emerald-100/70">{t('scanner.cards.cameraDescription')}</p>
          <div className="mt-5 flex h-32 items-center justify-center rounded-[20px] border border-dashed border-emerald-400/30 bg-emerald-900/40">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/15 text-2xl text-emerald-200">
              📷
            </div>
          </div>
          <button className="mt-5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20">
            {t('scanner.cards.openCamera')}
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">{t('scanner.manual.title')}</h3>
            <p className="mt-2 text-sm text-emerald-100/70">{t('scanner.manual.description')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20">
              {t('scanner.manual.addProduct')}
            </button>
            <button className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20">
              {t('scanner.manual.removeProduct')}
            </button>
            <button className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20">
              {t('scanner.manual.importSample')}
            </button>
            <button className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20">
              {t('scanner.manual.clearBill')}
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[20px] border border-emerald-800/70 bg-emerald-900/50">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-emerald-950/70 text-emerald-200">
                <tr>
                  <th className="px-4 py-3 font-medium">{t('scanner.manual.productName')}</th>
                  <th className="px-4 py-3 font-medium">{t('scanner.manual.category')}</th>
                  <th className="px-4 py-3 font-medium">{t('scanner.manual.quantity')}</th>
                  <th className="px-4 py-3 font-medium">{t('scanner.manual.price')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-emerald-800/70 text-emerald-100/80">
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderName1')} /></td>
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderCategory1')} /></td>
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderQuantity1')} /></td>
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderPrice1')} /></td>
                </tr>
                <tr className="border-t border-emerald-800/70 text-emerald-100/80">
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderName2')} /></td>
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderCategory2')} /></td>
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderQuantity2')} /></td>
                  <td className="px-4 py-3"><input className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none" placeholder={t('scanner.manual.placeholderPrice2')} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-300">OCR Preview Card</p>
              <h3 className="text-2xl font-semibold text-white">Receipt Preview</h3>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-200">
              Live
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-emerald-800/70 bg-emerald-900/60 p-4">
            <div className="h-44 rounded-[20px] border border-dashed border-emerald-400/30 bg-[radial-gradient(circle_at_top_left,_rgba(74,222,128,0.15),_transparent_50%)]" />
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <h3 className="text-2xl font-semibold text-white">Detected Products</h3>
          <div className="mt-5 space-y-3">
            {[
              ['Organic Milk', 'Dairy'],
              ['Local Apples', 'Fruit'],
              ['Refillable Soap', 'Household']
            ].map(([name, category]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-emerald-800/70 bg-emerald-900/50 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{name}</p>
                  <p className="text-sm text-emerald-100/70">{category}</p>
                </div>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                  Detected
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['OCR Confidence', '94%'],
              ['Number of Items', '4'],
              ['Status', 'Ready']
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full rounded-full bg-emerald-500 px-4 py-3 font-medium text-white transition hover:bg-emerald-400">
            Edit OCR Result
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur lg:p-8">
        <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-emerald-300">{t('scanner.analysisPreview.title')}</p>
            <h3 className="text-2xl font-semibold text-white">{t('scanner.analysisPreview.heading')}</h3>
          </div>
          <p className="text-sm text-emerald-100/70">{t('scanner.analysisPreview.description')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: t('scanner.analysisPreview.estimatedCarbon'), value: '2.4 kg', icon: '🌍', accent: 'from-emerald-500 to-lime-400' },
            { label: t('scanner.analysisPreview.healthScore'), value: '78/100', icon: '🩺', accent: 'from-green-500 to-emerald-400' },
            { label: t('scanner.analysisPreview.plasticScore'), value: '64/100', icon: '♻️', accent: 'from-lime-500 to-green-400' },
            { label: t('scanner.analysisPreview.pollutionScore'), value: '71/100', icon: '🌫️', accent: 'from-emerald-400 to-teal-400' }
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-emerald-800/70 bg-gradient-to-br from-emerald-900/80 to-emerald-950/80 p-5 shadow-inner shadow-emerald-950/40">
              <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-r ${item.accent} p-3 text-2xl shadow-lg`}>
                {item.icon}
              </div>
              <p className="text-sm text-emerald-300">{item.label}</p>
              <div className="mt-3 text-3xl font-semibold text-white animate-[pulse_2.8s_ease-in-out_infinite]">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { label: t('scanner.analysisPreview.ecoLifeScore'), value: 'A-', icon: '🌱' },
            { label: t('scanner.analysisPreview.treeEquivalent'), value: '3 trees', icon: '🌳' },
            { label: t('scanner.analysisPreview.moneySavedPotential'), value: '$12.40', icon: '💰' }
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-emerald-800/70 bg-emerald-900/50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-emerald-300">{item.label}</p>
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .eco-orb {
          animation: float 4s ease-in-out infinite;
        }
        .eco-leaf {
          animation: drift 5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(8deg); }
        }
      `}</style>
    </section>
  );
}
