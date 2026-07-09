import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ReceiptPage from './pages/ReceiptPage';
import ScannerPage from './pages/ScannerPage';
import ResultsPage from './pages/ResultsPage';
import BetterBasketPage from './pages/BetterBasketPage';
import CityImpactPage from './pages/CityImpactPage';
import FamilyDashboardPage from './pages/FamilyDashboardPage';
import ShopkeeperDashboardPage from './pages/ShopkeeperDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-lime-900 text-emerald-50">
      <Navbar />
      <main>
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
      </main>
    </div>
  );
}

export default App;
