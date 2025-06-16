import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800">{product.productName}</h2>
      <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
      <p className="text-gray-700"><strong>Price:</strong> ₹{product.price}</p>
      <p className="text-gray-600"><strong>Description:</strong> {product.description}</p>
    </div>
  );
}

export default ProductCard;
