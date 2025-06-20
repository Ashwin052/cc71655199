import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800">{product.productName}</h2>
      <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
      <p className="text-gray-700"><strong>Price:</strong> ₹{product.price}</p>
      <p className="text-gray-600"><strong>Description:</strong> {product.description}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/edit/${product.id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
