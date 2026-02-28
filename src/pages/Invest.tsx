import React from "react";
import { useNavigate } from "react-router-dom";

const Invest: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          📈 Invest (Coming Soon)
        </h1>
        <p className="text-gray-300 mb-8">
          This feature is under development. Stay tuned for investment
          opportunities!
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-300 underline hover:text-gray-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Invest;
