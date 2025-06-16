import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <nav className="bg-blue-600 shadow px-6 py-4 text-white">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">E-Commerce</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-yellow-200 transition-colors">Home</Link>
              <Link to="/add" className="hover:text-yellow-200 transition-colors">Add Product</Link>
            </div>
          </div>
        </nav>
        <main className="p-6 bg-gray-100 min-h-[calc(100vh-5rem)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );

  <div
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "C:\Users\ashwi\Documents\CC Project\E-commerce\src\assets" }}
>
  {/* Your nav, routes, etc. */}
</div>

}

export default App;
