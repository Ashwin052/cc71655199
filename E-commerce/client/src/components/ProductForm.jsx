import { useState, useEffect } from "react";

function ProductForm({ refresh, editing, setEditing }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    offer: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        description: editing.description,
        price: editing.price,
        offer: editing.offer || 0,
        image: null,
      });
      setPreview(editing.imageUrl);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        fd.append(key, value);
      }
    });

    if (editing) {
      await fetch(`/api/products/${editing._id}`, {
        method: "PUT",
        body: fd,
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        body: fd,
      });
    }

    refresh("");
    setForm({
      name: "",
      description: "",
      price: "",
      offer: "",
      image: null,
    });
    setPreview(null);
    setEditing(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow mb-4 flex flex-wrap gap-2"
    >
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Offer (%)"
        value={form.offer}
        onChange={(e) => setForm({ ...form, offer: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-16 h-16 object-cover rounded border"
        />
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editing ? "Update" : "Add"}
      </button>
      {editing && (
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setForm({
              name: "",
              description: "",
              price: "",
              offer: "",
              image: null,
            });
            setPreview(null);
          }}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;