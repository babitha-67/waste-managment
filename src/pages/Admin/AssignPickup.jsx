import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function AssignPickup() {
  const [pickups, setPickups] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchPickups();
    fetchDrivers();
  }, []);

  const fetchPickups = async () => {
    const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/unassigned-pickups");
    setPickups(res.data);
  };

  const fetchDrivers = async () => {
    const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/driver");
    setDrivers(res.data);
  };

  const assignDriver = async (pickupId, driverId) => {
    await axios.put(`https://smart-waste-lg2y.onrender.com/api/admin/assign-driver/${pickupId}`, { driverId });
   
    toast.success(t('assign_pickup.success'))
    fetchPickups(); // refresh updated data
  };

  const translateCategory = (category) => {
  return t(`assign_pickup.labels.${category}`, category);
};

const translateUrgency = (urgency) => {
  return t(`assign_pickup.labels.${urgency}`, urgency);
};


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🚛 {t("assign_pickup.title")}
      </h1>

      {pickups.length === 0 ? (
        <p className="text-center text-gray-600">{t("assign_pickup.no_pickups")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pickups.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md p-5 transition"
            >
              <h2 className="text-lg font-semibold text-blue-700 mb-2">{p.location}</h2>

              <p className="text-sm text-gray-700">
                <strong>{t("assign_pickup.category")}:</strong> {translateCategory(p.category)}
              </p>
              <p className="text-sm text-gray-700">
                <strong>{t("assign_pickup.urgency")}:</strong> {translateUrgency(p.urgency)}
              </p>
              <p className="text-sm text-gray-700">
                <strong>{t("assign_pickup.date")}:</strong> {new Date(p.createdAt).toLocaleString()}
              </p>

              {/* Show user-uploaded image if available */}
              {p.image && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1 font-medium">{t("assign_pickup.user_image")}</p>
                  <img
                    src={`https://smart-waste-lg2y.onrender.com/uploads/${p.image}`}
                    alt="pickup"
                    className="w-28 h-28 object-cover rounded border"
                  />
                </div>
              )}

              {/* Assign driver dropdown */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("assign_pickup.assign_driver")}:
                </label>
                <select
                  onChange={(e) => assignDriver(p._id, e.target.value)}
                  defaultValue=""
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    {t("assign_pickup.select_driver")}
                  </option>
                  {drivers.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
