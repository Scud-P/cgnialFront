import React from 'react';

const ProductForm = ({ formValues, onChange, onSubmit, onCancel }) => (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-lg" style={{ width: '50%' }}>
      <div className="card-body">
        <h2 className="card-title text-center">Modifier le produit</h2>
        <form onSubmit={onSubmit}>
          {Object.keys(formValues).map((key) => (
            <div className="form-group" key={key}>
              <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              <input
                type="text"
                name={key}
                className="form-control"
                value={formValues[key] || ''}
                onChange={onChange}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary mt-3">
            Enregistrer
          </button>
          <button className="btn btn-secondary mt-3 ml-2" onClick={onCancel}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default ProductForm;
