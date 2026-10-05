import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalSearchModal from './components/GlobalSearchModal';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetails from './pages/ToolDetails';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#051A14] text-slate-900 dark:text-emerald-50 font-sans selection:bg-emerald-500/20 dark:selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-200 transition-colors duration-200">
          <Header />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/:toolId" element={<ToolDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:categoryName" element={<Categories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <GlobalSearchModal />
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}
