import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct'; // if editing is enabled
import bgImage from './assets/background.jpg'; // ✅ correct path

function App() {
  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <nav className="bg-blue-700 bg-opacity-80 px-6 py-4 text-white shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">E-Commerce</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-yellow-300">Home</Link>
              <Link to="/add" className="hover:text-yellow-300">Add Product</Link>
            </div>
          </div>
        </nav>

        <main className="p-6 min-h-[calc(100vh-5rem)] bg-transparent rounded-lg shadow-lg m-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
