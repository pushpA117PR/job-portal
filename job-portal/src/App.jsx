import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

// Pages
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddJob from "./pages/AddJob";
import AppliedJobs from "./pages/AppliedJobs"; // ✅ added import
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content grows to fill space */}
      <main className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/applied" element={<AppliedJobs />} /> {/* ✅ added route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Add other routes here if needed */}
        </Routes>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default App;
