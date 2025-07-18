// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';


export default function Register() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://smart-waste-lg2y.onrender.com/api/auth/register', formData);
      toast.success(t("register_success"));
      navigate('/login');
    } catch (err) {
       toast.error(t("register_failed"));
      
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div className="w-full bg-cover bg-center hidden lg:block" style={{ backgroundImage: "url('/register.png')" }}></div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t("register_title")}</h2>
          <p className="text-center text-sm text-gray-500 mb-6">{t("register_subtitle")}</p>

          <input
            type="text"
            name="name"
            placeholder={t("full_name")}
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder={t("password")}
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">{t("user")}</option>
            <option value="driver">{t("driver")}</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {t("register_button")}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
             {t("already_account")}{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              {t("login_here")}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
