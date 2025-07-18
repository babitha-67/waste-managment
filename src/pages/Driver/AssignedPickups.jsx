import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Clock,
  Image,
  AlertTriangle,
  PackageCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function AssignedPickups() {
  const driver = JSON.parse(localStorage.getItem("user"));
  const [pickups, setPickups] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    fetchPickups();
    fetchComplaints();
  }, []);

  const fetchPickups = async () => {
    const res = await axios.get(
      `https://smart-waste-lg2y.onrender.com/api/pickups/assigned/${driver._id}`
    );
    setPickups(res.data);
  };

  const fetchComplaints = async () => {
    const res = await axios.get(
      `https://smart-waste-lg2y.onrender.com/api/admin/complaints/assigned/${driver._id}`
    );
    setComplaints(res.data);
  };

  const handleFileChange = (e, id) => {
    setSelectedImage({ ...selectedImage, [id]: e.target.files[0] });
  };

  const handleCompleteComplaint = async (complaintId) => {
    const formData = new FormData();
    formData.append("image", selectedImage[complaintId]);

    try {
      await axios.put(
        `https://smart-waste-lg2y.onrender.com/api/complaints/complete/${complaintId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(t("assigned_pickups.success"));
      fetchComplaints(); // refresh updated complaints
    } catch (err) {
      console.error("Failed to complete complaint:", err);
      toast.error(t("assigned_pickups.error"));
    }
  };

  const handleCompletePickup = async (pickupId) => {
    const formData = new FormData();
    formData.append("image", selectedImage[pickupId]);

    try {
      await axios.put(
        `https://smart-waste-lg2y.onrender.com/api/pickups/complete/${pickupId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(t("assigned_pickups.suc"));
      fetchPickups(); // Refresh updated pickups
    } catch (err) {
      console.error("Failed to complete pickup:", err);
      toast.error(t("assigned_pickups.err"));
    }
  };

  const translateCategory = (category) => {
    return t(`assigned_pickups.labels.${category}`, category);
  };

  const translateUrgency = (urgency) => {
    return t(`assigned_pickups.labels.${urgency}`, urgency);
  };

  const translateStatus = (status) => {
    return t(`assigned_pickups.labels.${status}`, status);
  };

  const translateComplaintType = (type) => {
    const key = type?.toLowerCase().replace(/\s+/g, "_");
    return t(`assigned_pickups.labels.${key}`, type);
  };


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {t("assigned_pickups.title")}
        </h1>

        {/* Pickups */}
        {pickups.length === 0 ? (
          <p className="text-gray-600">{t("assigned_pickups.no_pickups")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pickups.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow rounded-xl p-6 border"
              >
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />{" "}
                    {t("assigned_pickups.location")}:{" "}
                    <span className="ml-2 font-medium">{p.location}</span>
                  </p>
                  <p>
                    {t("assigned_pickups.category")}:{" "}
                    <span className="font-medium">
                      {translateCategory(p.category)}
                    </span>
                  </p>
                  <p>
                    {t("assigned_pickups.urgency")}:{" "}
                    <span className="font-medium">
                      {translateUrgency(p.urgency)}
                    </span>
                  </p>
                  <p>
                    {t("assigned_pickups.status")}:{" "}
                    <span className="capitalize font-semibold">
                      {translateStatus(p.status)}
                    </span>
                  </p>

                  {p.image && (
                    <div>
                      <p className="mt-2 text-sm text-gray-600">
                        {t("assigned_pickups.user_uploaded_image")}:
                      </p>
                      <img
                        src={`https://smart-waste-lg2y.onrender.com/uploads/${p.image}`}
                        alt="pickup"
                        className="w-32 mt-1 rounded border"
                      />
                    </div>
                  )}

                  {p.status !== "Completed" && (
                    <div className="mt-4 space-y-2">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        {t("assigned_pickups.upload_proof")}
                      </label>
                      <label className="relative cursor-pointer bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-md inline-block w-fit hover:bg-blue-100">
                        {selectedImage[p._id]?.name ||
                          t("assigned_pickups.choose_file")}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, p._id)}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </label>
                      <button
                        onClick={() => handleCompletePickup(p._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                      >
                        {t("assigned_pickups.mark_completed")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Complaints */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">
          {t("assigned_pickups.complaints_title")}
        </h2>

        {complaints.length === 0 ? (
          <p className="text-gray-600">{t("assigned_pickups.no_complaints")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map((c) => (
              <div
                key={c._id}
                className="bg-white shadow rounded-xl p-6 border"
              >
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />{" "}
                    {t("assigned_pickups.type")}:{" "}
                    <span className="ml-2 font-medium">{translateComplaintType(c.type)}</span>
                  </p>
                  <p>
                    {t("assigned_pickups.description")}:{" "}
                    <span>{c.description}</span>
                  </p>
                  <p>
                    {t("assigned_pickups.location")}:{" "}
                    <span className="font-medium">{c.locationText}</span>
                  </p>
                  <p>
                    {t("assigned_pickups.status")}:{" "}
                    <span className="capitalize font-semibold">
                      {translateStatus(c.status)}
                    </span>
                  </p>

                  {c.userImage && (
                    <div>
                      <p className="mt-2 text-sm text-gray-600">
                        {t("assigned_pickups.complaint_image")}:
                      </p>
                      <img
                        src={`https://smart-waste-lg2y.onrender.com/uploads/${c.userImage}`}
                        alt="complaint"
                        className="w-32 mt-1 rounded border"
                      />
                    </div>
                  )}

                  {c.status !== "Resolved" && (
                    <div className="mt-4 space-y-2">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        {t("assigned_pickups.upload_proof")}
                      </label>
                      <label className="relative cursor-pointer bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-md inline-block w-fit hover:bg-blue-100">
                        {selectedImage[c._id]?.name ||
                          t("assigned_pickups.choose_file")}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, c._id)}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </label>
                      <button
                        onClick={() => handleCompleteComplaint(c._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                      >
                        {t("assigned_pickups.mark_resolved")}
                      </button>
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
