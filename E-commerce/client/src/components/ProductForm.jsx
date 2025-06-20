import { useState, useEffect } from 'react';

function ProductForm({ onAdd, initialData }) {
  const [form, setForm] = useState({
    productName: '',
    category: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.productName || !form.price) return alert('Product name and price are required');
    onAdd({ ...form, id: form.id || Date.now() });  // Keep ID if editing
    setForm({ productName: '', category: '', price: '', description: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded-xl max-w-md mx-auto border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        {initialData ? 'Edit Product' : 'Add Product'}
      </h2>

      <input
        name="productName"
        value={form.productName}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Product Name"
        required
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Category"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        type="number"
        className="w-full p-2 border border-gray-300 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Price"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Description"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
      >
        {initialData ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;
