import React from 'react';

const ProductCard = ({ product, onDetailsClick, onEditClick }) => (
  <div className="col-md-3 mb-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.coutuDescription}</h5>
        <p className="card-text">
          Code: {product.coutuCode}<br />
          Size: {product.size}<br />
          Units per Case: {product.unitsPerCase}
        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => onDetailsClick(product.id)}>
            Détails
          </button>
          <button className="btn btn-warning" onClick={() => onEditClick(product.id)}>
            Modifier
          </button>
          <button className="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;