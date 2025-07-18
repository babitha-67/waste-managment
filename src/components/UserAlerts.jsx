import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function UserAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    if (!user) return;
    try {
      const res = await axios.get(
        `https://smart-waste-lg2y.onrender.com/api/admin/alerts/${user.role}/${user._id}`
      );
      setAlerts(res.data);
    } catch (err) {
      console.error("Error loading alerts", err);
    }
  };
  const markAsRead = async () => {
  try {
    await axios.put(`https://smart-waste-lg2y.onrender.com/api/admin/alerts/mark-read/${user._id}`);
    setAlerts([]); // Clear UI after marking
  } catch (err) {
    console.error("Failed to mark as read", err);
  }
};

  return (
    <div className="relative inline-block text-left mr-4">
      {/* Bell icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative focus:outline-none"
      >
        <Bell className="w-8 h-8 text-gray-700 hover:text-blue-600 transition" />
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
            {alerts.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl shadow-xl bg-white ring-1 ring-gray-200 overflow-hidden">
          <div className="p-3 font-semibold border-b text-gray-700 flex justify-between items-center">
      {t("user_alerts.title")}
  {alerts.length > 0 && (
    <button
      onClick={markAsRead}
      className="text-sm text-blue-600 hover:underline"
    >
     {t("user_alerts.mark_read")}
    </button>
  )}
</div>


          <div className="max-h-96 overflow-y-auto custom-scroll">
            {alerts.length === 0 ? (
              <div className="px-4 py-6 text-gray-500 text-center">{t("user_alerts.no_alerts")}</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <li
                    key={alert._id}
                    className="px-4 py-3 hover:bg-gray-50 transition-all"
                  >
                    <p className="text-gray-800 text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
