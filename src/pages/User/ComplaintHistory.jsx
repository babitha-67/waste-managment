import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, MapPin, Clock, FileImage } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  useEffect(() => {
    if (!user?._id) return;

    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`https://smart-waste-lg2y.onrender.com/api/complaints/user/${user._id}`);
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };

    fetchComplaints();
  }, [user]);

  const normalizeKey = (str) => str?.toLowerCase().replace(/\s+/g, "_");
const translateComplaintType = (type) =>
  t(`complaint_history.labels.${normalizeKey(type)}`, type);



  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          {t("complaint_history.title")}
        </h2>

        {complaints.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">{t("complaint_history.no_complaints")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {complaints.map((comp) => (
              <div
                key={comp._id}
                className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm uppercase tracking-wide">
                    <AlertCircle className="w-4 h-4" />
                    {translateComplaintType(comp.type)}
                  </div>

                  <p className="text-gray-700 text-sm">{comp.description}</p>

                  {comp.locationText && (
                    <p className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{comp.locationText}</span>
                    </p>
                  )}

                  <p className="text-sm text-gray-600">
                    <strong>{t("complaint_history.status")}:</strong>{" "}
                    <span className="inline-block bg-gray-100 border border-gray-300 px-3 py-1 rounded-full text-xs text-gray-800 capitalize">
                      {t(`complaint_history.${comp.status?.toLowerCase() || "pending"}`)}
                    </span>
                  </p>

                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(comp.createdAt).toLocaleString()}
                  </p>

                  {comp.userImage && (
                    <div className="pt-2">
                      <img
                        src={`https://smart-waste-lg2y.onrender.com/uploads/${comp.userImage}`}
                        alt="Complaint"
                        className="w-full h-40 object-cover rounded-md border"
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
