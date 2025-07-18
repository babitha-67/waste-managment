import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const admin = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
           {t("admin_dashboard.welcome", { name: admin?.name })}
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {t("admin_dashboard.logout")}
        </button>
      </div>

      {/* Dashboard Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <Card title={t("admin_dashboard.dashboard_metrics")} onClick={() => navigate("/admin/metrics")} />
        <Card title={t("admin_dashboard.manage_users")} onClick={() => navigate("/admin/users")} />
        <Card title={t("admin_dashboard.assign_pickups")} onClick={() => navigate("/admin/assign-pickups")} />
        <Card title={t("admin_dashboard.pickup_status")} onClick={() => navigate("/admin/pickup-status")} />
        <Card title={t("admin_dashboard.view_complaints")} onClick={() => navigate("/admin/complaints")} />
        <Card title={t("admin_dashboard.send_alerts")} onClick={() => navigate("/admin/alerts")} />
        <Card title={t("admin_dashboard.send_email")} onClick={() => navigate("/admin/send-email")} />
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
