import React from "react";
import type { Notification } from "../types/notification";

const NotificationsPanel: React.FC<{
  items: Notification[];
}> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔔</span>
        <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
        <span className="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
          {items.filter((n) => !n.read).length}
        </span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No notifications</p>
        ) : (
          items.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-lg border-l-4 transition ${
                n.read
                  ? "bg-gray-50 border-gray-300"
                  : "bg-blue-50 border-blue-500"
              }`}
            >
              <p className="text-sm font-medium text-gray-800">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(n.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
