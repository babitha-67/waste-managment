import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";


export default function AdminPickupStatus() {
  const [pickups, setPickups] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const { t } = useTranslation();


  useEffect(() => {
    fetchAllPickups();
    fetchAllComplaints();
  }, []);

  const fetchAllPickups = async () => {
    try {
      const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/all-pickups");
      setPickups(res.data);
    } catch (err) {
      console.error("Error loading pickups:", err);
    }
  };

  const fetchAllComplaints = async () => {
    try {
      const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error loading complaints:", err);
    }
  };

  const renderStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      resolved: "bg-blue-100 text-blue-800",
      assigned:"bg-orange-100 text-orange-800"
    };
    return (
      <span className={`px-3 py-1 text-sm rounded-full font-semibold ${statusMap[statusLower] || "bg-gray-200 text-gray-700"}`}>
         {t(`pickup_status.labels.${status}`, status)}
      </span>
    );
  };

  const translateCategory = (category) => {
  return t(`pickup_status.labels.${category}`, category);
};

const translateUrgency = (urgency) => {
  return t(`pickup_status.labels.${urgency}`, urgency);
};

const translateStatus = (status) => {
  return t(`pickup_status.labels.${status}`, status);
};

  const normalizeKey = (str) => str?.toLowerCase().replace(/\s+/g, "_");  
  const translateComplaintType = (type) => {
  return t(`pickup_status.labels.${normalizeKey(type)}`, type);
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        {t("pickup_status.heading")}
      </h1>

      {/* === PICKUPS SECTION === */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">{t("pickup_status.pickup_title")}</h2>
        {pickups.length === 0 ? (
          <p className="text-center text-gray-600">{t("pickup_status.no_pickups")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pickups.map((p) => (
              <div key={p._id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{p.location}</h3>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.category")}:</strong> {translateCategory(p.category)}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.urgency")}:</strong> {translateUrgency(p.urgency)}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.status")}:</strong> {renderStatusBadge(p.status)}</p>
<p className="text-sm text-gray-600 mb-2">
  <strong>{t("pickup_status.assigned_driver")}:</strong>{" "}
  {p.assignedDriver?.name ? p.assignedDriver.name : t("pickup_status.not_assigned")}
</p>
                <p className="text-xs text-gray-400 mt-1">{t("pickup_status.date")}: {new Date(p.createdAt).toLocaleString()}</p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {p.image && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t("pickup_status.user_uploaded")}</p>
                      <img src={`https://smart-waste-lg2y.onrender.com/uploads/${p.image}`} alt="pickup" className="w-full h-24 object-cover rounded border" />
                    </div>
                  )}
                  {p.completedImage && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t("pickup_status.completed_by_driver")}</p>
                      <img src={`https://smart-waste-lg2y.onrender.com/uploads/${p.completedImage}`} alt="completed" className="w-full h-24 object-cover rounded border" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* === COMPLAINTS SECTION === */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-700">{t("pickup_status.complaint_title")}</h2>
        {complaints.length === 0 ? (
          <p className="text-center text-gray-600">{t("pickup_status.no_complaints")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {complaints.map((c) => (
              <div key={c._id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-red-600 mb-2">{translateComplaintType(c.type)}</h3>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.user")}:</strong> {c.userId?.name || "Unknown"}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.description")}:</strong> {c.description}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.location")}:</strong> {c.locationText || "N/A"}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.status")}:</strong> {renderStatusBadge(c.status)}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>{t("pickup_status.assigned_driver")}:</strong>{" "} {c.assignedDriver?.name ? c.assignedDriver.name : t("pickup_status.not_assigned")}</p>
                <p className="text-xs text-gray-400 mt-1">{t("pickup_status.date")}: {new Date(c.createdAt).toLocaleString()}</p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {c.userImage && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t("pickup_status.user_uploaded")}</p>
                      <img src={`https://smart-waste-lg2y.onrender.com/uploads/${c.userImage}`} alt="complaint" className="w-full h-24 object-cover rounded border" />
                    </div>
                  )}
                  {c.resolvedImage && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t("pickup_status.resolved_image")}</p>
                      <img src={`https://smart-waste-lg2y.onrender.com/uploads/${c.resolvedImage}`} alt="resolved" className="w-full h-24 object-cover rounded border" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
