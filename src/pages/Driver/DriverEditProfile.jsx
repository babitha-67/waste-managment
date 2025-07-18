import React, { useState } from "react";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";



export default function DriverEditProfile() {
  const { t } = useTranslation();
  const driver = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    name: driver.name,
    email: driver.email,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const res = await axios.put(
        `https://smart-waste-lg2y.onrender.com/api/driver/profile/${driver._id}`,
        updateData
      );

      
      toast.success(t("driver_edit_profile.success"))
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      
      toast.error(t("driver_edit_profile.error"))
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t("driver_edit_profile.title")}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("driver_edit_profile.full_name")}</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("driver_edit_profile.email_address")}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("driver_edit_profile.new_password")}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("driver_edit_profile.password_placeholder")}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow"
          >
            {t("driver_edit_profile.save_changes")}
          </button>
        </form>
      </div>
    </div>
  );
}
