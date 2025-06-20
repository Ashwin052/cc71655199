function ProductCard({ _id, name, description, price, offer, imageUrl, refresh, onEdit }) {
  const discountedPrice = offer > 0 ? price - (price * offer) / 100 : price;

  const deleteProduct = async () => {
    await fetch(`/api/products/${_id}`, { method: "DELETE" });
    refresh("");
  };

  return (
    <div className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 p-4 rounded-lg bg-white flex flex-col justify-between">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}

      {offer > 0 && (
        <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-300 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm mb-2">
          🎉 {offer}% OFF
        </span>
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      {offer > 0 ? (
        <div className="mb-3">
          <p className="text-sm text-gray-500 line-through">₹{price}</p>
          <p className="text-xl font-bold text-green-600">
            ₹{discountedPrice.toFixed(2)}
          </p>
        </div>
      ) : (
        <p className="text-xl font-semibold text-blue-700 mb-3">₹{price}</p>
      )}

      <div className="flex gap-2">
        <button
          onClick={deleteProduct}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow"
        >
          Delete
        </button>
        <button
          onClick={() =>
            onEdit({ _id, name, description, price, offer, imageUrl })
          }
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded shadow"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default ProductCard;