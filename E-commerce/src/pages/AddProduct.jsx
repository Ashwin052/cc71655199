import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

function AddProduct() {
  const navigate = useNavigate();

  const handleAdd = (product) => {
    const existing = JSON.parse(localStorage.getItem('products')) || [];
    const updated = [...existing, product];
    localStorage.setItem('products', JSON.stringify(updated));
    navigate('/');
  };

  return <ProductForm onAdd={handleAdd} />;
}

export default AddProduct;