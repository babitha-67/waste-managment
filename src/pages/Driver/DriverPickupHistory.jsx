import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Clock, CheckCircle, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DriverPickupHistory() {
  const driver = JSON.parse(localStorage.getItem("user"));
  const [pickups, setPickups] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchCompletedPickups();
    fetchResolvedComplaints();
  }, []);

  const fetchCompletedPickups = async () => {
    try {
      const res = await axios.get(`https://smart-waste-lg2y.onrender.com/api/pickups/completed/${driver._id}`);
      setPickups(res.data);
    } catch (err) {
      console.error("Error fetching pickup history", err);
    }
  };

  const fetchResolvedComplaints = async () => {
    try {
      const res = await axios.get(`https://smart-waste-lg2y.onrender.com/api/complaints/driver/${driver._id}/history`);
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaint history", err);
    }
  };

  const translateLabel = (key) => {
  return t(`driver_pickup_history.labels.${key}`, key);
};

const normalize = (text) => text?.toLowerCase().replace(/\s+/g, "_");

const translateCategory = (category) => translateLabel(category);
const translateUrgency = (urgency) => translateLabel(urgency);
const translateStatus = (status) => translateLabel(status);
const translateComplaintType = (type) => translateLabel(normalize(type));


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Pickup History */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("driver_pickup_history.completed_pickups")}</h1>
        {pickups.length === 0 ? (
          <p className="text-gray-500">{t("driver_pickup_history.no_completed_pickups")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pickups.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow p-6 border">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> {p.location}
                </h3>
                <div className="text-gray-600 space-y-1">
                  <p>{t("driver_pickup_history.category")}: <span className="font-medium">{translateCategory(p.category)}</span></p>
<p>{t("driver_pickup_history.urgency")}: <span className="font-medium">{translateUrgency(p.urgency)}</span></p>
<p>{t("driver_pickup_history.status")}: <span className="capitalize font-semibold">{translateStatus(p.status)}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {p.image && (
                    <div>
                      <p className="text-sm font-medium mb-1 flex items-center text-gray-700">
                        <Camera className="w-4 h-4 mr-1" /> {t("driver_pickup_history.user_image")}
                      </p>
                      <img
                        src={`https://smart-waste-lg2y.onrender.com/uploads/${p.image}`}
                        alt="pickup"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                  {p.completedImage && (
                    <div>
                      <p className="text-sm font-medium mb-1 flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-1" /> {t("driver_pickup_history.completed_image")}
                      </p>
                      <img
                        src={`https://smart-waste-lg2y.onrender.com/uploads/${p.completedImage}`}
                        alt="completed"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Complaint History */}
        <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6">{t("driver_pickup_history.resolved_complaints")}</h1>
        {complaints.length === 0 ? (
          <p className="text-gray-500">{t("driver_pickup_history.no_resolved_complaints")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map((c) => (
              <div key={c._id} className="bg-white rounded-xl shadow p-6 border">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{translateComplaintType(c.type)}</h3>
                <div className="text-gray-600 space-y-1">
                  <p>{t("driver_pickup_history.description")}: <span className="text-gray-700">{c.description}</span></p>
                  <p>{t("driver_pickup_history.location")}: <span className="font-medium">{c.locationText}</span></p>
                  <p>{t("driver_pickup_history.status")}: <span className="capitalize font-semibold">{translateStatus(c.status)}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {c.userImage && (
                    <div>
                      <p className="text-sm font-medium mb-1 flex items-center text-gray-700">
                        <Camera className="w-4 h-4 mr-1" /> {t("driver_pickup_history.user_image")}
                      </p>
                      <img
                        src={`https://smart-waste-lg2y.onrender.com/uploads/${c.userImage}`}
                        alt="complaint"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                  {c.resolvedImage && (
                    <div>
                      <p className="text-sm font-medium mb-1 flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-1" /> {t("driver_pickup_history.resolution_image")}
                      </p>
                      <img
                        src={`https://smart-waste-lg2y.onrender.com/uploads/${c.resolvedImage}`}
                        alt="resolution"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
