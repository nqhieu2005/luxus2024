import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LuxusInterior from './components/home';
import About from './components/about';
import CompanyInfo from './components/contact';
import Housing from './components/housing';
import CommercialList from './components/commercial';
import OfficeList from './components/office';
import LoginPage from './admin/login';
import ProductDetail from './components/housingDetails';
import CommercialDetail from './components/commerrcialDetails';
import OfficeDetail from './components/officeDetails';
import Login from './admin/login';
import AdminHome from './admin/adminPage';
import AddProduct from './admin/addProduct';
import NotFound from './admin/notfound';
import AddHome from './admin/addHome';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LuxusInterior />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<CompanyInfo />} />
          <Route path='/housing' element={<Housing />} />
          <Route path='/commercial' element={<CommercialList />} />
          <Route path='/office' element={<OfficeList />} />
          <Route path='/admin' element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/commercial/:id" element={<CommercialDetail />} />
          <Route path="/office/:id" element={<OfficeDetail />} />

          {/* Bảo vệ các trang admin */}
          <Route path="/admin" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="/admin/home" 
            element={isAuthenticated ? <AdminHome /> : <Navigate to="/admin" replace />} 
          />
          <Route 
            path="/admin/add/homes" 
            element={isAuthenticated ? <AddHome /> : <Navigate to="/admin" replace />} 
          />
          <Route 
            path="/admin/add/:type" 
            element={isAuthenticated ? <AddProduct /> : <Navigate to="/admin" replace />} 
          />
      
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
