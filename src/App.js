import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsList from './components/ProductsList';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<h1>Produits</h1>} />
            <Route path="/products" element={<ProductsList />} /> {/* Display ProductsList on Products Page */}
            <Route path="/about" element={<h1>About Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;