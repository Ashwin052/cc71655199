// src/pages/EditProduct.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const found = stored.find(p => p.id === parseInt(id));
    if (!found) return navigate('/');
    setProduct(found);
  }, [id, navigate]);

  const handleUpdate = (updatedProduct) => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const updatedList = stored.map(p =>
      p.id === parseInt(id) ? updatedProduct : p
    );
    localStorage.setItem('products', JSON.stringify(updatedList));
    navigate('/');
  };

  return (
    <div>
      {product && (
        <ProductForm onAdd={handleUpdate} initialData={product} />
      )}
    </div>
  );
}

export default EditProduct;
