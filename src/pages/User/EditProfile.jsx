import React, { useState } from "react";
import axios from "axios";
import { UserIcon, MailIcon, LockIcon } from "lucide-react"; 
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "", // optional
  });
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://smart-waste-lg2y.onrender.com/api/users/${user._id}`, formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(t("edit_profile.update_success"))
    } catch (err) {
      toast.error(t("edit_profile.update_error"))
    }
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-10">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">{t("edit_profile.title")}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">{t("edit_profile.full_name")}</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">{t("edit_profile.email_address")}</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MailIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">{t("edit_profile.new_password")}</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {t("edit_profile.save_changes")}
          </button>
        </form>
      </div>
    </div>
  );
}
