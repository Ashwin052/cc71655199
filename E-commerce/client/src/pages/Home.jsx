import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import AIAssistant from "../components/AIAssistant";

function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchProducts = async (q = "") => {
    const res = await fetch(`/api/products?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <SearchBar setQuery={setQuery} />
      <ProductForm
        refresh={fetchProducts}
        editing={editing}
        setEditing={setEditing}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
            refresh={fetchProducts}
            onEdit={setEditing}
          />
        ))}
      </div>
      <AIAssistant />
    </div>
  );
}

export default Home;