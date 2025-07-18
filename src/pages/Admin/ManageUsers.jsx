import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user" });
  const { t } = useTranslation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("https://smart-waste-lg2y.onrender.com/api/admin/users");
    setUsers(res.data);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("manage_users.confirm_delete"))) return;
    await axios.delete(`https://smart-waste-lg2y.onrender.com/api/admin/users/${id}`);
    fetchUsers();
  };

  const handleUpdate = async () => {
    await axios.put(`https://smart-waste-lg2y.onrender.com/api/admin/users/${editingUser._id}`, formData);
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{t("manage_users.title")}</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-xl">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">{t("manage_users.name")}</th>
              <th className="p-3">{t("manage_users.email")}</th>
              <th className="p-3">{t("manage_users.role")}</th>
              <th className="p-3">{t("manage_users.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{t(`nav.${u.role}`)}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(u)} className="bg-blue-500 text-white px-3 py-1 rounded">{t("manage_users.edit")}</button>
                  <button onClick={() => handleDelete(u._id)} className="bg-red-500 text-white px-3 py-1 rounded">{t("manage_users.delete")}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{t("manage_users.edit_user")}</h2>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder={t("manage_users.placeholder_name")}
              className="border p-2 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder={t("manage_users.placeholder_email")}
              className="border p-2 rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <select
              className="border p-2 rounded"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">{t("nav.user")}</option>
              <option value="driver">{t("nav.driver")}</option>
              <option value="admin">{t("nav.admin")}</option>
            </select>
            <button onClick={handleUpdate} className="bg-green-600 text-white py-2 rounded">
              {t("manage_users.update")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
