import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function AdminMetrics() {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/metrics");
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed to load metrics", err);
      }
    };
    fetchMetrics();
  }, []);

  if (!metrics) return <div className="p-6 text-center">{t("admin_metrics.loading")}</div>;


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t("admin_metrics.heading")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title={t("admin_metrics.total_pickups")} value={metrics.totalPickups} color="bg-blue-500" />
        <MetricCard title={t("admin_metrics.completed_pickups")} value={metrics.completedPickups} color="bg-green-500" />
        <MetricCard title={t("admin_metrics.pending_pickups")} value={metrics.pendingPickups} color="bg-yellow-500" />
        <MetricCard title={t("admin_metrics.total_complaints")} value={metrics.totalComplaints} color="bg-red-500" />
        <MetricCard title={t("admin_metrics.resolved_complaints")} value={metrics.resolvedComplaints} color="bg-teal-500" />
        <MetricCard title={t("admin_metrics.unresolved_complaints")} value={metrics.unresolvedComplaints} color="bg-orange-500" />
      </div>
    </div>
  );
}

function MetricCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${color}`}>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
