import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import PortfolioSettingsPage from '@/pages/dashboard/PortfolioSettingsPage';
import GalleriesPage from '@/pages/dashboard/GalleriesPage';
import ImagesPage from '@/pages/dashboard/ImagesPage';
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import PublicPortfolioPage from '@/pages/portfolio/PublicPortfolioPage';
import GalleryPage from '@/pages/portfolio/GalleryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="portfolio" element={<PortfolioSettingsPage />} />
        <Route path="galleries" element={<GalleriesPage />} />
        <Route path="images" element={<ImagesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="/portfolio/:handle" element={<PublicPortfolioPage />} />
      <Route path="/portfolio/:handle/gallery/:id" element={<GalleryPage />} />
    </Routes>
  );
}
