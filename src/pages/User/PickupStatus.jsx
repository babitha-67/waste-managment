import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, XCircle, Loader2, MapPin, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function PickupStatus() {
  const [pickups, setPickups] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await axios.get(`https://smart-waste-lg2y.onrender.com/api/pickups/user/${user._id}`);
        setPickups(res.data);
      } catch (err) {
        toast.error(t('pickup_status_user.error_loading'))
      }
    };
    if (user?._id) fetchPickups();
  }, [user]);

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { icon: <Clock className="w-4 h-4 mr-1" />, label: t("pickup_status_user.pending")},
      completed: { icon: <CheckCircle className="w-4 h-4 mr-1" />, label: t("pickup_status_user.completed") },
      rejected: { icon: <XCircle className="w-4 h-4 mr-1" />, label: t("pickup_status_user.rejected") },
      assigned: { icon: <CheckCircle className="w-4 h-4 mr-1" />, label: t("pickup_status_user.labels.assigned") }
    };

    const current = statusMap[status.toLowerCase()] || { icon: null, label: status };

    return (
      <span className="inline-flex items-center text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-300 capitalize">
        {current.icon}
        {current.label}
      </span>
    );
  };

  const translateLabel = (key) => t(`pickup_status_user.labels.${key}`, key);

const translateCategory = (category) => translateLabel(category);
const translateUrgency = (urgency) => translateLabel(urgency);
const translateStatus = (status) => translateLabel(status);


  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-green-600" />
          {t("pickup_status_user.title")}
        </h2>

        {pickups.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-lg">
            <Loader2 className="animate-spin mx-auto mb-4" />
            {t("pickup_status_user.no_requests")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pickups.map((pickup) => (
              <div
                key={pickup._id}
                className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden transition hover:shadow-md"
              >
                {pickup.image && (
                  <img
                    src={`https://smart-waste-lg2y.onrender.com/uploads/${pickup.image}`}
                    alt="pickup"
                    className="h-44 w-full object-cover"
                  />
                )}

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {pickup.location}
                  </h3>

                  <p className="text-sm text-gray-600">
                    <strong>{t("pickup_status_user.category")}:</strong>  {translateCategory(pickup.category)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>{t("pickup_status_user.urgency")}:</strong> {translateUrgency(pickup.urgency)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>{t("pickup_status_user.status")}:</strong> {getStatusBadge(pickup.status)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t("pickup_status_user.submitted")}: {new Date(pickup.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
