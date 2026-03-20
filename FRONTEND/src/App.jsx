import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Home
import HomePageDark from './Home/HomePageDark';
import HomePageLight from './Home/HomePageLight';

// Home Pages
import AboutPageDark from './Home/AboutPageDark';
import AboutPageLight from './Home/AboutPageLight';
import FeaturePageDark from './Home/FeaturePageDark';
import FeaturePageLight from './Home/FeaturePageLight';

// Admin
import AdminDashboardDark from './Admin/AdminDashboardDark';
import AdminDashboardLight from './Admin/AdminDashboardLight';

// Global
import GlobalStyles from './GlobalStyles';

function App() {
  const [isLight, setIsLight] = useState(false);

  return (
    <Router>
      <GlobalStyles />
      <Routes>

        {/* ─── HOME ─── */}
        <Route path="/" element={
          isLight
            ? <HomePageLight key="light" toggleTheme={() => setIsLight(false)} />
            : <HomePageDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />

        {/* ─── HOME PAGES ─── */}
        <Route path="/about" element={
          isLight
            ? <AboutPageLight key="light" toggleTheme={() => setIsLight(false)} />
            : <AboutPageDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />
        <Route path="/features" element={
          isLight
            ? <FeaturePageLight key="light" toggleTheme={() => setIsLight(false)} />
            : <FeaturePageDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />

        {/* ─── ADMIN ─── */}
        <Route path="/admin" element={
          isLight
            ? <AdminDashboardLight key="light" toggleTheme={() => setIsLight(false)} />
            : <AdminDashboardDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />

        {/* ─── SUPPLIER ─── */}
        {/* coming soon */}

        {/* ─── CUSTOMER ─── */}
        {/* coming soon */}

      </Routes>
    </Router>
  );
}

export default App;