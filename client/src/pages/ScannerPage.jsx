import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { products as productCatalog } from '../data/products';

const defaultRow = () => ({ name: '', category: '', quantity: '', price: '' });

const sampleDetectedProducts = [
  { name: 'Milk', category: 'Dairy' },
  { name: 'Plastic Bottle', category: 'Plastic' },
  { name: 'Soft Drink', category: 'Beverage' },
  { name: 'Chips', category: 'Packaged Food' }
];

const sampleBillRows = [
  { name: 'Milk', category: 'Dairy', quantity: '2', price: '60' },
  { name: 'Plastic Bottle', category: 'Plastic', quantity: '1', price: '20' },
  { name: 'Soft Drink', category: 'Beverage', quantity: '1', price: '45' },
  { name: 'Chips', category: 'Packaged Food', quantity: '1', price: '30' },
  { name: 'Rice', category: 'Grains', quantity: '2', price: '80' }
];

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function getMatchingProduct(name) {
  const normalized = normalizeText(name);
  return productCatalog.find((item) => normalizeText(item.name) === normalized || normalizeText(item.name).includes(normalized));
}

function buildAnalysis(products) {
  const items = products.map((row) => {
    const quantity = Number(row.quantity) || 0;
    const matching = getMatchingProduct(row.name);
    const carbonFactor = matching ? matching.carbonFactor : 1.2;
    const healthScore = matching ? matching.healthScore : 65;
    const pollutionScore = matching ? matching.pollutionScore : 40;
    const plasticScore = matching ? matching.plasticScore : 5;
    return {
      ...row,
      quantity,
      price: Number(row.price) || 0,
      carbonFactor,
      healthScore,
      pollutionScore,
      plasticScore,
      carbonTotal: Number((quantity * carbonFactor).toFixed(1))
    };
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0) || 1;
  const totalCarbon = Number(items.reduce((sum, item) => sum + item.carbonTotal, 0).toFixed(1));
  const healthScore = Math.round(items.reduce((sum, item) => sum + item.healthScore * item.quantity, 0) / totalQuantity);
  const pollutionScore = Math.round(items.reduce((sum, item) => sum + item.pollutionScore * item.quantity, 0) / totalQuantity);
  const plasticScore = Math.round(items.reduce((sum, item) => sum + item.plasticScore * item.quantity, 0) / totalQuantity);

  return {
    timestamp: Date.now(),
    items,
    summary: {
      totalCarbon,
      healthScore,
      pollutionScore,
      plasticScore,
      totalItems: items.length,
      totalQuantity
    }
  };
}

export default function ScannerPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const videoRef = useRef(null);
  const [previewType, setPreviewType] = useState('none');
  const [previewImage, setPreviewImage] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [detectedProducts, setDetectedProducts] = useState([]);
  const [ocrConfidence, setOcrConfidence] = useState('--');
  const [itemCount, setItemCount] = useState(0);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [manualRows, setManualRows] = useState([defaultRow()]);
  const [errors, setErrors] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [analyzing, setAnalyzing] = useState(false);

  const steps = [t('scanner.steps.upload'), t('scanner.steps.analyze'), t('scanner.steps.improve'), t('scanner.steps.savePlanet')];

  useEffect(() => {
    if (!cameraStream || !videoRef.current) return;
    videoRef.current.srcObject = cameraStream;
    videoRef.current.play().catch(() => {});
  }, [cameraStream]);

  useEffect(() => {
    if (!toast.message) return undefined;
    const timer = window.setTimeout(() => setToast({ message: '', type: '' }), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const previewLabel = useMemo(() => {
    if (previewType === 'image' && previewImage) return 'Receipt Image Preview';
    if (previewType === 'pdf' && pdfName) return `PDF Preview: ${pdfName}`;
    if (cameraActive) return 'Camera Preview';
    return 'Receipt Preview';
  }, [previewType, previewImage, pdfName, cameraActive]);

  const loadDetectedProducts = (products) => {
    setDetectedProducts(products);
    setOcrConfidence(`${80 + Math.floor(Math.random() * 16)}%`);
    setItemCount(products.length);
  };

  const handleFileError = (message) => {
    setToast({ message, type: 'error' });
  };

  const openImagePicker = () => {
    imageInputRef.current?.click();
  };

  const openPdfPicker = () => {
    pdfInputRef.current?.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      handleFileError('Please upload JPG, PNG, or JPEG images.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewType('image');
      setPreviewImage(reader.result);
      setPdfName('');
      loadDetectedProducts(sampleDetectedProducts);
      setToast({ message: 'Image uploaded and OCR simulated.', type: 'success' });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      handleFileError('Please upload a PDF document.');
      return;
    }

    setPreviewType('pdf');
    setPreviewImage('');
    setPdfName(file.name);
    loadDetectedProducts(sampleDetectedProducts);
    setToast({ message: 'PDF uploaded and products detected.', type: 'success' });
    event.target.value = '';
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    setCameraStream(null);
    setCameraActive(false);
  };

  const handleOpenCamera = async () => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setCameraActive(true);
      setPreviewType('camera');
      setPreviewImage('');
      setPdfName('');
      setToast({ message: 'Camera started. Capture your receipt.', type: 'success' });
    } catch (error) {
      handleFileError('Unable to access camera. Please allow camera permission or try again.');
    }
  };

  const handleCaptureReceipt = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    setPreviewType('image');
    setPreviewImage(imageData);
    stopCamera();
    loadDetectedProducts(sampleDetectedProducts);
    setToast({ message: 'Receipt captured from camera.', type: 'success' });
  };

  const handleAddProduct = () => {
    setManualRows((prev) => [...prev, defaultRow()]);
  };

  const handleRemoveProduct = () => {
    setManualRows((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleImportSampleBill = () => {
    setManualRows(sampleBillRows);
    setToast({ message: 'Sample bill imported.', type: 'success' });
  };

  const handleClearBill = () => {
    setManualRows([defaultRow()]);
    setToast({ message: 'Bill cleared. Ready for a new entry.', type: 'success' });
  };

  const handleEditOCRResult = () => {
    if (detectedProducts.length === 0) {
      handleFileError('No detected products available to edit.');
      return;
    }
    const rows = detectedProducts.map((product) => ({
      name: product.name,
      category: product.category,
      quantity: '1',
      price: ''
    }));
    setManualRows(rows.length ? rows : [defaultRow()]);
    setToast({ message: 'Detected products copied to manual entry.', type: 'success' });
  };

  const handleManualChange = (index, field, value) => {
    setManualRows((prev) => prev.map((row, idx) => (idx === index ? { ...row, [field]: value } : row)));
  };

  const validateManualRows = () => {
    const rowErrors = [];
    const filledRows = manualRows.filter((row) => row.name || row.category || row.quantity || row.price);

    if (filledRows.length === 0) {
      rowErrors.push('Please add at least one product before analyzing.');
    }

    filledRows.forEach((row, index) => {
      if (!row.name.trim()) {
        rowErrors.push(`Row ${index + 1}: Product name is required.`);
      }
      const quantityValue = Number(row.quantity);
      if (!Number.isInteger(quantityValue) || quantityValue <= 0) {
        rowErrors.push(`Row ${index + 1}: Quantity must be a positive whole number.`);
      }
    });

    return rowErrors;
  };

  const saveAnalysis = (analysis) => {
    try {
      localStorage.setItem('ecolife_analysis', JSON.stringify(analysis));
    } catch (err) {
      // Ignore localStorage failure.
    }
  };

  const handleAnalyze = () => {
    const validationErrors = validateManualRows();
    if (validationErrors.length) {
      setErrors(validationErrors);
      setToast({ message: 'Please fix the highlighted errors before analyzing.', type: 'error' });
      return;
    }
    setErrors([]);
    setAnalyzing(true);
    const filteredRows = manualRows.filter((row) => row.name || row.category || row.quantity || row.price);
    const analysis = buildAnalysis(filteredRows);
    setTimeout(() => {
      setAnalyzing(false);
      saveAnalysis(analysis);
      setToast({ message: 'Analysis complete and saved.', type: 'success' });
      navigate('/results');
    }, 1000);
  };

  const handleReset = () => {
    stopCamera();
    setPreviewType('none');
    setPreviewImage('');
    setPdfName('');
    setDetectedProducts([]);
    setOcrConfidence('--');
    setItemCount(0);
    setManualRows([defaultRow()]);
    setErrors([]);
    setToast({ message: 'Scanner reset and ready.', type: 'success' });
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('ecolife_draft', JSON.stringify(manualRows));
      setToast({ message: 'Draft saved successfully.', type: 'success' });
    } catch (error) {
      setToast({ message: 'Unable to save draft locally.', type: 'error' });
    }
  };

  const handleLoadDemoReceipt = () => {
    setPreviewType('none');
    setPreviewImage('');
    setPdfName('');
    loadDetectedProducts(sampleDetectedProducts);
    const analysis = buildAnalysis(sampleBillRows);
    saveAnalysis(analysis);
    setToast({ message: 'Demo receipt loaded and analyzed.', type: 'success' });
    navigate('/results');
  };

  const statusLabel = previewType === 'pdf' ? pdfName : previewType === 'image' && previewImage ? 'Receipt image loaded' : cameraActive ? 'Camera active' : 'No preview available';

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
              <button
                type="button"
                onClick={openImagePicker}
                className="rounded-full bg-emerald-500 px-5 py-3 font-medium text-white transition hover:scale-[1.02] hover:bg-emerald-400"
              >
                {t('scanner.uploadButton')}
              </button>
              <button
                type="button"
                onClick={handleLoadDemoReceipt}
                className="rounded-full border border-emerald-300/40 bg-white/5 px-5 py-3 font-medium text-emerald-100 backdrop-blur transition hover:bg-white/10"
              >
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
                    <span className="font-semibold text-white">{itemCount || 0} items</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-emerald-950">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400" style={{ width: ocrConfidence === '--' ? '4%' : ocrConfidence }} />
                  </div>
                  <div className="mt-2 text-xs text-emerald-100/70">{ocrConfidence === '--' ? 'OCR Confidence unavailable yet' : `OCR Confidence ${ocrConfidence}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.message && (
        <div className={`mt-8 rounded-2xl border px-4 py-3 ${toast.type === 'success' ? 'border-emerald-500/40 bg-emerald-950/80 text-emerald-100' : 'border-rose-500/40 bg-rose-950/80 text-rose-100'}`}>
          {toast.message}
        </div>
      )}

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
          <button
            type="button"
            onClick={openImagePicker}
            className="mt-6 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20"
          >
            {t('scanner.cards.uploadImage')}
          </button>
        </div>

        <div className="rounded-[24px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-300">
            📄
          </div>
          <h3 className="text-xl font-semibold text-white">{t('scanner.cards.pdfTitle')}</h3>
          <p className="mt-2 text-sm text-emerald-100/70">{t('scanner.cards.pdfDescription')}</p>
          <button
            type="button"
            onClick={openPdfPicker}
            className="mt-6 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20"
          >
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
          <button
            type="button"
            onClick={handleOpenCamera}
            className="mt-5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20"
          >
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
            <button
              type="button"
              onClick={handleAddProduct}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20"
            >
              {t('scanner.manual.addProduct')}
            </button>
            <button
              type="button"
              onClick={handleRemoveProduct}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20"
            >
              {t('scanner.manual.removeProduct')}
            </button>
            <button
              type="button"
              onClick={handleImportSampleBill}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20"
            >
              {t('scanner.manual.importSample')}
            </button>
            <button
              type="button"
              onClick={handleClearBill}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/20"
            >
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
                {manualRows.map((row, index) => (
                  <tr key={`row-${index}`} className="border-t border-emerald-800/70 text-emerald-100/80">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleManualChange(index, 'name', e.target.value)}
                        className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none"
                        placeholder={index === 0 ? t('scanner.manual.placeholderName1') : t('scanner.manual.placeholderName2')}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={row.category}
                        onChange={(e) => handleManualChange(index, 'category', e.target.value)}
                        className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none"
                        placeholder={index === 0 ? t('scanner.manual.placeholderCategory1') : t('scanner.manual.placeholderCategory2')}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleManualChange(index, 'quantity', e.target.value)}
                        className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none"
                        placeholder={index === 0 ? t('scanner.manual.placeholderQuantity1') : t('scanner.manual.placeholderQuantity2')}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.01"
                        value={row.price}
                        onChange={(e) => handleManualChange(index, 'price', e.target.value)}
                        className="w-full rounded-lg border border-emerald-800/70 bg-emerald-950/70 px-3 py-2 outline-none"
                        placeholder={index === 0 ? t('scanner.manual.placeholderPrice1') : t('scanner.manual.placeholderPrice2')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-950/80 p-4 text-sm text-rose-100">
            <p className="font-semibold">Please fix these issues:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errors.map((error, index) => (
                <li key={`error-${index}`}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className={`rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition ${analyzing ? 'opacity-70' : 'hover:bg-emerald-400'}`}
          >
            {analyzing ? 'Analyzing...' : t('scanner.buttons.analyzeReceipt')}
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="rounded-full border border-emerald-400/30 bg-emerald-900/50 px-5 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-900/70"
          >
            {t('scanner.buttons.saveDraft')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-rose-500/30 bg-rose-950/30 px-5 py-3 text-sm font-medium text-rose-100 transition hover:bg-rose-950/50"
          >
            {t('scanner.buttons.reset')}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-300">OCR Preview Card</p>
              <h3 className="text-2xl font-semibold text-white">{previewLabel}</h3>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-200">
              {cameraActive ? 'Camera' : 'Preview'}
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-emerald-800/70 bg-emerald-900/60 p-4">
            {cameraActive ? (
              <div className="relative h-72 overflow-hidden rounded-[20px] border border-dashed border-emerald-400/30 bg-black/20">
                <video ref={videoRef} className="h-full w-full object-cover" />
              </div>
            ) : previewType === 'image' && previewImage ? (
              <img src={previewImage} alt="Receipt preview" className="h-72 w-full rounded-[20px] object-cover" />
            ) : previewType === 'pdf' ? (
              <div className="flex h-72 flex-col items-center justify-center rounded-[20px] border border-dashed border-emerald-400/30 bg-emerald-950/60 text-center text-emerald-200">
                <p className="text-sm font-semibold">PDF Loaded</p>
                <p className="mt-2 text-xs text-emerald-400">{pdfName}</p>
              </div>
            ) : (
              <div className="flex h-72 items-center justify-center rounded-[20px] border border-dashed border-emerald-400/30 bg-[radial-gradient(circle_at_top_left,_rgba(74,222,128,0.15),_transparent_50%)] text-emerald-300">
                No receipt loaded yet.
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">OCR Confidence</p>
              <p className="mt-2 text-lg font-semibold text-white">{ocrConfidence}</p>
            </div>
            <div className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Number of Items</p>
              <p className="mt-2 text-lg font-semibold text-white">{itemCount}</p>
            </div>
            <div className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Status</p>
              <p className="mt-2 text-lg font-semibold text-white">{previewType !== 'none' ? 'Ready' : 'Waiting'}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cameraActive && (
              <button
                type="button"
                onClick={handleCaptureReceipt}
                className="rounded-full bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-400"
              >
                Capture Receipt
              </button>
            )}
            {cameraActive && (
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-full border border-emerald-400/30 bg-emerald-900/50 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-900/70"
              >
                Stop Camera
              </button>
            )}
            <button
              type="button"
              onClick={handleEditOCRResult}
              className="rounded-full bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-400"
            >
              Edit OCR Result
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-800/70 bg-emerald-950/60 p-6 shadow-lg shadow-emerald-950/30 backdrop-blur">
          <h3 className="text-2xl font-semibold text-white">Detected Products</h3>
          <div className="mt-5 space-y-3">
            {detectedProducts.length > 0 ? (
              detectedProducts.map((product) => (
                <div key={`${product.name}-${product.category}`} className="flex items-center justify-between rounded-2xl border border-emerald-800/70 bg-emerald-900/50 px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-sm text-emerald-100/70">{product.category}</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                    Detected
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-emerald-600/40 bg-emerald-950/50 px-4 py-6 text-center text-emerald-300">
                No detected products yet.
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">OCR Confidence</p>
              <p className="mt-2 text-lg font-semibold text-white">{ocrConfidence}</p>
            </div>
            <div className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Number of Items</p>
              <p className="mt-2 text-lg font-semibold text-white">{itemCount}</p>
            </div>
            <div className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Status</p>
              <p className="mt-2 text-lg font-semibold text-white">{previewType !== 'none' ? 'Ready' : 'Waiting'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEditOCRResult}
            className="mt-6 w-full rounded-full bg-emerald-500 px-4 py-3 font-medium text-white transition hover:bg-emerald-400"
          >
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
              <div className="mt-3 text-3xl font-semibold text-white animate-[pulse_2.8s_ease-in-out_infinite]">{item.value}</div>
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

      {analyzing && (
        <div className="mt-8 rounded-3xl border border-emerald-700/50 bg-emerald-950/70 p-6 shadow-lg shadow-emerald-950/40">
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20" />
              <div className="absolute inset-0 rounded-full border-t-4 border-emerald-400 animate-spin" />
              <div className="absolute h-12 w-12 rounded-full bg-emerald-500/20" />
              <div className="text-3xl">🌍</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-lime-400 [animation-delay:160ms]" />
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-emerald-300 [animation-delay:320ms]" />
            </div>
            <div>
              <p className="text-lg font-semibold text-emerald-50">Analyzing receipt...</p>
              <p className="mt-2 text-sm text-emerald-200/80">Please wait while we generate your results.</p>
            </div>
          </div>
        </div>
      )}

      <input ref={imageInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleImageUpload} />
      <input ref={pdfInputRef} type="file" accept="application/pdf" className="hidden" onChange={handlePdfUpload} />

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

