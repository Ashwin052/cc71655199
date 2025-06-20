// src/pages/EditProduct.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
        {["name", "description", "price", "imageUrl"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "price" ? "number" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="mb-4 w-full p-2 border rounded"
            required
          />
        ))}
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 w-full rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
