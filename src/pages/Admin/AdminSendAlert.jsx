import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function AdminSendAlert() {
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("all");
  const [recipientId, setRecipientId] = useState("");
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get("https://smart-waste-lg2y.onrender.com/api/admin/users").then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("https://smart-waste-lg2y.onrender.com/api/admin/alerts", {
        message,
        recipientType,
        recipientId: recipientId || null,
      });
      
      toast.success(t('send_alert.success'))
      setMessage("");
    } catch (err) {
      
      toast.error(t('send_alert.error'))
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("send_alert.title")}</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 mb-4"
        rows={4}
        placeholder={t("send_alert.message_placeholder")}
      />

      <div className="mb-4">
        <label className="mr-2 font-semibold">{t("send_alert.send_to")}</label>
        <select
          value={recipientType}
          onChange={(e) => {
            setRecipientType(e.target.value);
            setRecipientId("");
          }}
          className="border p-1"
        >
          <option value="all">{t("send_alert.all")}</option>
          <option value="user">{t("send_alert.specific_user")}</option>
          <option value="driver">{t("send_alert.specific_driver")}</option>
        </select>
      </div>

      {(recipientType === "user" || recipientType === "driver") && (
        <div className="mb-4">
          <label className="mr-2">{t("send_alert.select_recipient")}:</label>
          <select
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="border p-1"
          >
            <option value="">{t("send_alert.select_option")}</option>
            {users
              .filter((u) => u.role === recipientType)
              .map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
          </select>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {t("send_alert.button")}
      </button>
    </div>
  );
}
