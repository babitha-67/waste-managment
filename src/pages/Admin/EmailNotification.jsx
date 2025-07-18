import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function EmailNotification() {
  const [users, setUsers] = useState([]);
  const [emailData, setEmailData] = useState({
    toEmail: "",
    subject: "",
    message: ""
  });
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/users");
    setUsers(res.data);
  };
  
  const handleSend = async () => {
    try {
      await axios.post("https://smart-waste-lg2y.onrender.com/api/admin/send-email", emailData);
      
      toast.success(t('email_notification.success'))
      setEmailData({ toEmail: "", subject: "", message: "" });
    } catch (err) {
    
      toast.error(t('email_notification.error'))
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{t("email_notification.title")}</h2>

      <label className="block mb-2 text-gray-700">{t("email_notification.recipient")}:</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={emailData.toEmail}
        onChange={(e) => setEmailData({ ...emailData, toEmail: e.target.value })}
      >
        <option value="">{t("email_notification.select_recipient")}</option>
        {users
        .filter((u) => u.role !== "admin")
        .map((u) => (
          <option key={u._id} value={u.email}>
            {u.name} ({u.role})
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder={t("email_notification.subject")}
        className="w-full mb-4 p-2 border rounded"
        value={emailData.subject}
        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
      />

      <textarea
        rows="4"
        placeholder={t("email_notification.message")} 
        className="w-full mb-4 p-2 border rounded"
        value={emailData.message}
        onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t("email_notification.send")}
      </button>
    </div>
  );
}
