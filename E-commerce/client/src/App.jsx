import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import AIAssistant from "./components/AIAssistant";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-gray-900 dark:to-neutral-900 transition-colors duration-500">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <AIAssistant />
      </div>
    </AuthProvider>
  );
}

export default App;