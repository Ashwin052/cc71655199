import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-gray-900 dark:to-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold tracking-tight">
        <Link to="/" className="hover:text-yellow-300 transition">MyShop</Link>
      </h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">Hello, <span className="font-medium">{user.name}</span></span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;