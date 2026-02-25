import React, { useEffect, useState } from "react";

interface Props {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<Props> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "bg-gradient-to-r from-green-500 to-green-600"
      : "bg-gradient-to-r from-red-500 to-red-600";
  const icon = type === "success" ? "✅" : "❌";

  return (
    <div
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-bounce border-l-4 ${
        type === "success" ? "border-green-400" : "border-red-400"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Toast;
