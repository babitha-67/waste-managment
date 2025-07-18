import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapPicker from "../../components/MapPicker";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";



export default function RaiseComplaint() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    pickupId: "",
    type: "Missed Pickup",
    description: "",
    image: null,
  });
  const [fileName, setFileName] = useState("");


  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  setFormData({ ...formData, image: file });
  setFileName(file ? file.name : "");
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error(t('raise_complaint.not_logged_in'))
      return;
    }

    try {
      const data = new FormData();
      data.append("userId", user._id);
      data.append("pickupId", formData.pickupId);
      data.append("type", formData.type);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);
      if (locationText) data.append("locationText", locationText);

      await axios.post("https://smart-waste-lg2y.onrender.com/api/complaints", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(t('raise_complaint.success'))
      navigate("/user");
    } catch (error) {
      console.error(error);
      toast.error(t('raise_complaint.fail'))
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {t('raise_complaint.title')}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">

          {/* Complaint Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('raise_complaint.complaint_type')}</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Missed Pickup">{t('raise_complaint.missed_pickup')}</option>
              <option value="Improper Handling">{t('raise_complaint.improper_handling')}</option>
              <option value="Other">{t('raise_complaint.other')}</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('raise_complaint.description')}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Map Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('raise_complaint.select_location')}</label>
            <MapPicker
              onLocationChange={(loc) => {
                setLocation(loc);
                setLocationText(loc.text);
              }}
            />
            {location && (
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder={t('raise_complaint.enter_address')}
                required
                className="mt-3 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('raise_complaint.upload_photo')}
            </label>
            <label className="block mt-1 w-full cursor-pointer text-blue-700 border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-blue-50">
  {fileName || t('raise_complaint.no_file_chosen')}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />
</label>

          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition font-semibold text-lg"
            >
              {t('raise_complaint.submit_btn')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
