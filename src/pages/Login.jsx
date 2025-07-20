// Login.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../authprovider";



export default function Login() {  
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
   const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://smart-waste-lg2y.onrender.com/api/auth/login", formData);
    login(res.data.user, res.data.token); // update context and localStorage
    toast.success(t('login_success'));
    const role = res.data.user.role;
    setTimeout(() => {
      if (role === "admin") navigate("/admin");
      else if (role === "driver") navigate("/driver");
      else navigate("/user");
    }, 1500);
  } catch (err) {
    toast.error(t('login_error'));
  }
};

const changeLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div className="w-full bg-cover bg-center hidden lg:block" style={{ backgroundImage: "url('/smart_waste.png')" }}>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

    
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t("login_title")}</h2>
          <p className="text-center text-sm text-gray-500 mb-6">{t("login_subtitle")}</p>

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
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {t("login_button")}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            {t("no_account")}{" "}
            <a href="/register" className="text-blue-600 font-medium hover:underline">
              {t("register_here")}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}