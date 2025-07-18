import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function PickupRequest() {
  const navigate = useNavigate();
const { t } = useTranslation();
  const [formData, setFormData] = useState({
    location: "",
    category: "Wet Waste",
  urgency: "Normal", 
    image: null,
  });
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  setFileName(file ? file.name : "");
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const userRaw = localStorage.getItem("user");
  if (!userRaw) {
    toast.error(t('pickup_request.not_logged_in'))
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
    if (!user._id) throw new Error();
  } catch {
    toast.error(t('pickup_request.not_logged_in'))
    return;
  }

  try {
    const data = new FormData();
    data.append("userId", user._id);
    data.append("location", formData.location);
    data.append("category", formData.category);
    data.append("urgency", formData.urgency);
    if (formData.image) data.append("image", formData.image);

    await axios.post("https://smart-waste-lg2y.onrender.com/api/pickups", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

   
    toast.success(t("pickup_request.success"))
    navigate("/user");
  } catch (error) {
    toast.error(t("pickup_request.error"))
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {t("pickup_request.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">{t("pickup_request.pickup_location")}</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">{t("pickup_request.waste_category")}</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Wet Waste">{t("pickup_request.wet_waste")}</option>
              <option value="Dry Waste">{t("pickup_request.dry_waste")}</option>
              <option value="Hazardous Waste">{t("pickup_request.hazardous_waste")}</option>

            </select>
          </div>

          {/* Urgency */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">{t("pickup_request.urgency_level")}</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Normal">{t("pickup_request.urgency_normal")}</option>
              <option value="High">{t("pickup_request.urgency_high")}</option>
            </select>
          </div>

          {/* Upload Image */}
          <div>
  <label className="block font-medium text-gray-700 mb-1">
    {t("pickup_request.upload_photo")}
  </label>

  <label className="block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer text-blue-600 hover:bg-blue-50">
    {fileName || t("pickup_request.no_file_chosen")}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        handleImageChange(e);
        setFileName(e.target.files[0]?.name || "");
      }}
      className="hidden"
    />
  </label>
</div>

        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {t("pickup_request.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
