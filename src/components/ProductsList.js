import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.js';
import ProductDetail from './ProductDetail.js';
import ProductForm from './ProductForm.js';
import { setFormValuesFromProduct } from '../utils/productUtils'; // Import the helper function

const API_URL = 'http://localhost:8080';

const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products/list`);
  return response.data;
};

const fetchProductDetails = async (id) => {
  const response = await axios.get(`${API_URL}/products/details/${id}`);
  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(`${API_URL}/products/update/${product.id}`, product);
  return response.data;
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    getProducts();
  }, []);

  const handleDetailsClick = async (id) => {
    const productDetails = await fetchProductDetails(id);
    setSelectedProduct(productDetails);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleEditClick = async (id) => {
    const productDetails = await fetchProductDetails(id); // Fetch details
    setSelectedProduct(productDetails); // Set selected product
    setFormValuesFromProduct(setFormValues, productDetails); // Call the imported function
    setIsEditing(true); // Set editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ ...formValues, id: selectedProduct.id });
      handleBackToList();
      setProducts(await fetchProducts()); // Update product list
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mt-4">
      {selectedProduct && !isEditing ? (
        <ProductDetail product={selectedProduct} onBack={handleBackToList} onEdit={handleEditClick} />
      ) : isEditing ? (
        <ProductForm 
          formValues={formValues} 
          onChange={handleInputChange} 
          onSubmit={handleFormSubmit} 
          onCancel={handleBackToList} 
        />
      ) : (
        <div className="row">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailsClick={handleDetailsClick}
              onEditClick={() => handleEditClick(product.id)} // Pass function for editing
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;