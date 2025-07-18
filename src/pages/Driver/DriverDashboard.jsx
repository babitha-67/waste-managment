import React from "react";
import { useNavigate } from "react-router-dom";
import UserAlerts from "../../components/UserAlerts";
import { useTranslation } from "react-i18next";


export default function DriverDashboard() {
  const driver = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { t } = useTranslation();


  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("driver_dashboard.welcome")} {driver?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <UserAlerts />
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
          {t("driver_dashboard.logout")}
        </button>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title={t("driver_dashboard.assigned_pickups")} onClick={() => navigate("/driver/pickups")} />
        <Card title={t("driver_dashboard.task_history")} onClick={() => navigate("/driver/history")} />
        <Card title={t("driver_dashboard.edit_profile")} onClick={() => navigate("/driver/profile")} />
      </div>
    </div>
  );
}

function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    </div>
  );
}
