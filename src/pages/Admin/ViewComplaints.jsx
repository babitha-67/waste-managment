import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchComplaints();
    fetchDrivers();
  }, []);

  const fetchComplaints = async () => {
    const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/complaints");
    setComplaints(res.data);
  };

  const fetchDrivers = async () => {
    const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/driver");
    setDrivers(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`https://smart-waste-lg2y.onrender.com/api/admin/complaints/${id}`, { status });
    fetchComplaints();
  };

  const assignDriver = async (complaintId, driverId) => {
    try {
      await axios.put(`https://smart-waste-lg2y.onrender.com/api/admin/complaints/assign/${complaintId}`, { driverId });
      
      toast.success(t('view_complaints.success'))
      fetchComplaints();
    } catch (err) {
      console.error("Error assigning driver:", err);
      toast.error(t('view_complaints.error'))

    }
  };

  const normalizeKey = (str) => str?.toLowerCase().replace(/\s+/g, "_");
const translateComplaintType = (type) =>
  t(`view_complaints.labels.${normalizeKey(type)}`, type);

const translateStatus = (status) => t(`view_complaints.labels.${status}`, status);


  const renderStatusBadge = (status) => {
    const colorMap = {
      Pending: "bg-yellow-100 text-yellow-800",
      Resolved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorMap[status] || "bg-gray-200 text-gray-700"}`}>
         {translateStatus(status)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {t("view_complaints.title")}
      </h1>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-600">{t("view_complaints.no_complaints")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {complaints.map((c) => (
            <div key={c._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-red-600 mb-2">{translateComplaintType(c.type)  || "Complaint"}</h2>

              <p className="text-sm text-gray-700">
                <strong>{t("view_complaints.user")}:</strong> {c.userId?.name || "N/A"}{" "}
                <span className="text-gray-500 text-xs">({c.userId?.email})</span>
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <strong>{t("view_complaints.description")}:</strong> {c.description}
              </p>

              {c.locationText && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>{t("view_complaints.location")}:</strong> {c.locationText}
                </p>
              )}

              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  <strong>{t("view_complaints.status")}:</strong> {renderStatusBadge(c.status)}
                </p>
              </div>

              {/* Driver Assignment */}
              {c.assignedDriver ? (
                <p className="text-sm text-blue-600 mt-2">
                 {t("view_complaints.assigned_to")}: <strong>{c.assignedDriver.name}</strong>
                </p>
              ) : (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("view_complaints.assign_driver_label")}:</label>
                  <select
                    onChange={(e) => assignDriver(c._id, e.target.value)}
                    defaultValue=""
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="" disabled>
                      {t("view_complaints.select_driver")}
                    </option>
                    {drivers.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              {c.status === "Pending"  && !c.assignedDriver && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => updateStatus(c._id, "Resolved")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    {t("view_complaints.mark_resolved")}
                  </button>
                  <button
                    onClick={() => updateStatus(c._id, "Rejected")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    {t("view_complaints.reject")}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
