import { useEffect, useState } from "react";

function SearchBar({ setQuery }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setQuery(input), 300);
    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <div className="p-4 bg-gray-100">
      <input
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default SearchBar;