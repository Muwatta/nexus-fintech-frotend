// src/App.tsx
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;
