import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(updated));
    setProducts(updated);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet.</p>
      ) : (
        products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default Home;
