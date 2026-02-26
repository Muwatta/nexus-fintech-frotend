import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { getToken, removeToken } from "../utils/auth";

const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBalance = async () => {
      const token = getToken();

      if (!token) {
        setError("Not authenticated. Please login again.");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        setError("");
        const res = await api.get("/accounts/balance/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // The API now returns { balance: number }
        setBalance(res.data.balance);
      } catch (err: any) {
        console.error("Dashboard loadBalance error:", err);

        const status = err?.response?.status;

        if (status === 401) {
          setError("Session expired or invalid token. Please login again.");
          removeToken();
          navigate("/login");
        } else if (status === 404) {
          setError("Endpoint not found. Confirm it exists in Django urls.py.");
        } else {
          setError(
            err?.response?.data?.error ||
              err?.response?.data?.detail ||
              err?.message ||
              "Failed to load account.",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadBalance();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="text-xl">Loading account...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="text-red-600 font-semibold">
          ❌ Backend Connection Error
        </div>
        <div className="text-sm mt-2">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="text-xl">Balance: ${balance ?? 0}</div>
    </div>
  );
};

export default Dashboard;
