import React, { useEffect, useState, useContext } from "react";
import { assets } from "../../assets/getAssets";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const roles = ["user", "seller", "admin"];

const ManageAllUsers = () => {
  const { allUsers, getAllUsers, updateUserData, loading, totalResults } = useContext(UserContext);

  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(3);

  const totalPages = Math.ceil(totalResults / limit);

  useEffect(() => {
    getAllUsers({
      page,
      limit,
      fields: "image,name,email,role,active",
    });
  }, [page]);

  const startEditing = (user) => {
    setEditUserId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
    });
  };

  const handleChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (userId) => {
    try {
      // Make sure active is boolean
      const updatedData = {
        ...editForm,
        active: editForm.active === "true" || editForm.active === true,
      };

      await updateUserData(userId, updatedData);
      toast.success("User updated", {
        position: "top-left",
        autoClose: 3000,
      });
      setEditUserId(null);

      // Refresh users list
      await getAllUsers({
        page,
        limit,
        fields: "image,name,email,role,active",
      });
    } catch {
      // Error already handled inside updateUserData
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="relative overflow-x-auto">
      {loading && <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center" />}

      <table className="min-w-[700px] w-full bg-white shadow-md rounded-2xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="p-4">Profile</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Active</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => {
            const isEditing = editUserId === user._id;

            return (
              <tr key={user._id} className="hover:bg-gray-50 border-b transition">
                <td className="p-3">
                  <img
                    src={user.image || assets.defaultUser}
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <select
                      value={editForm.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <select
                      value={String(editForm.active)}
                      onChange={(e) => handleChange("active", e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ) : (
                    String(user.active)
                  )}
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <button
                      onClick={() => handleSave(user._id)}
                      disabled={loading}
                      className={`px-3 py-1 rounded-full cursor-pointer text-white ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded ${
            page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }`}
        >
          Previous
        </button>

        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className={`px-4 py-2 rounded ${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageAllUsers;
