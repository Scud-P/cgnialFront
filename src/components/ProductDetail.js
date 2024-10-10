import React from 'react';

const ProductDetail = ({ product, onBack, onEdit }) => (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-lg" style={{ width: '50%' }}>
      <div className="card-body">
        <h2 className="card-title text-center">Détails du produit</h2>
        <p className="card-text"><strong>Code:</strong> {product.coutuCode}</p>
        <p className="card-text"><strong>Description FR:</strong> {product.frenchDescription}</p>
        <p className="card-text"><strong>Description EN:</strong> {product.englishDescription}</p>
        <p className="card-text"><strong>Format:</strong> {product.size}</p>
        <p className="card-text"><strong>Unité de mesure:</strong> {product.uom}</p>
        <p className="card-text"><strong>Unité par caisse:</strong> {product.unitsPerCase}</p>
        <p className="card-text"><strong>Taille caisse:</strong> {product.caseSize}</p>
        <p className="card-text"><strong>UPC caisse:</strong> {product.caseUpc}</p>
        <p className="card-text"><strong>UPC unité:</strong> {product.unitUpc}</p>
        <p className="card-text"><strong>Code UNFI:</strong> {product.unfiCode}</p>
        <p className="card-text"><strong>Code Satau:</strong> {product.satauCode}</p>
        <p className="card-text"><strong>Code Puresource:</strong> {product.puresourceCode}</p>
        <div className="text-center">
          <button className="btn btn-secondary mt-3" onClick={onBack}>
            Retour aux produits
          </button>
          <button className="btn btn-warning mt-3" onClick={onEdit}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;
