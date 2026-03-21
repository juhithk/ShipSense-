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
import ShipmentsPageDark from './Admin/Shipments/ShipmentsPageDark';
import ShipmentsPageLight from './Admin/Shipments/ShipmentsPageLight';
import AddShipmentDark from './Admin/Shipments/AddShipmentDark';
import AddShipmentLight from './Admin/Shipments/AddShipmentLight';
import DelayCodesPageDark from './Admin/DelayCodes/DelayCodesPageDark';
import DelayCodesPageLight from './Admin/DelayCodes/DelayCodesPageLight';
import AddDelayCodeDark from './Admin/DelayCodes/AddDelayCodeDark';
import AddDelayCodeLight from './Admin/DelayCodes/AddDelayCodeLight';
import UserManagementPageDark from './Admin/Users/UserManagementPageDark';
import UserManagementPageLight from './Admin/Users/UserManagementPageLight';
import AddUserDark from './Admin/Users/AddUserDark';
import AddUserLight from './Admin/Users/AddUserLight';
import ReportsPageDark from './Admin/Reports/ReportsPageDark';
import ReportsPageLight from './Admin/Reports/ReportsPageLight';

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

        {/* ─── ADMIN PAGES ─── */}
        <Route path="/admin/shipments" element={
          isLight
            ? <ShipmentsPageLight key="light" toggleTheme={() => setIsLight(false)} />
            : <ShipmentsPageDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />
        <Route path="/admin/add-shipment" element={
          isLight
            ? <AddShipmentLight key="light" toggleTheme={() => setIsLight(false)} />
            : <AddShipmentDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />
        <Route path="/admin/delay-codes" element={
          isLight
            ? <DelayCodesPageLight key="light" toggleTheme={() => setIsLight(false)} />
            : <DelayCodesPageDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />
        <Route path="/admin/add-delay-code" element={
          isLight
            ? <AddDelayCodeLight key="light" toggleTheme={() => setIsLight(false)} />
            : <AddDelayCodeDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />
        <Route path="/admin/user-management" element={
          isLight
            ? <UserManagementPageLight key="light" toggleTheme={() => setIsLight(false)} />
            : <UserManagementPageDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />
        <Route path="/admin/add-user" element={
          isLight
            ? <AddUserLight key="light" toggleTheme={() => setIsLight(false)} />
            : <AddUserDark key="dark" toggleTheme={() => setIsLight(true)} />
        } />
        <Route path="/admin/reports" element={
          isLight
            ? <ReportsPageLight key="light" toggleTheme={() => setIsLight(false)} />
            : <ReportsPageDark key="dark" toggleTheme={() => setIsLight(true)} />
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