import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const HomePage = lazy(() => import('./pages/HomePage'));
const ReceiptPage = lazy(() => import('./pages/ReceiptPage'));
const ScannerPage = lazy(() => import('./pages/ScannerPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const BetterBasketPage = lazy(() => import('./pages/BetterBasketPage'));
const CityImpactPage = lazy(() => import('./pages/CityImpactPage'));
const FamilyDashboardPage = lazy(() => import('./pages/FamilyDashboardPage'));
const ShopkeeperDashboardPage = lazy(() => import('./pages/ShopkeeperDashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const VoiceAssistantPage = lazy(() => import('./pages/VoiceAssistantPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-lime-900 text-emerald-50">
      <Navbar />
      <main>
        <Suspense fallback={<div className="p-6 text-center text-emerald-100">Loading experience...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/basket" element={<BetterBasketPage />} />
            <Route path="/city" element={<CityImpactPage />} />
            <Route path="/family" element={<FamilyDashboardPage />} />
            <Route path="/shopkeeper" element={<ShopkeeperDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/voice" element={<VoiceAssistantPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
