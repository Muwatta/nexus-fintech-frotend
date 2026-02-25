import React, { useEffect, useState } from "react";
import api from "../api/api";

interface User {
  id: number;
  username: string;
  balance: number;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("/admin/users/").then((r) => setUsers(r.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Username</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>₦{u.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
