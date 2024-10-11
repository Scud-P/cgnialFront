import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsList from './components/ProductsList';
import SalesMenu from './components/SalesMenu';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Use container-fluid to ensure full width */}
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<h1>Produits</h1>} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/sales" element={<SalesMenu />} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;