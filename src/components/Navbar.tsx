import React from "react";
import { Link } from "react-router-dom";

interface Props {
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ onLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg border-b-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <span className="text-3xl">🏦</span>
          <div>
            <div className="text-2xl font-bold text-white group-hover:text-blue-200 transition">
              Nexus
            </div>
            <div className="text-xs text-blue-200">Fintech Platform</div>
          </div>
        </Link>
        <div className="flex items-center space-x-8">
          <Link
            to="/dashboard"
            className="text-white hover:text-blue-200 font-semibold transition flex items-center gap-2"
          >
            <span>📊</span> Dashboard
          </Link>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition transform hover:scale-105"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
