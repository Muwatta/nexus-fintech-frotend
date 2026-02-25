import React from "react";
import { Link } from "react-router-dom";

interface Props {
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold">Nexus Fintech</div>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={onLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
