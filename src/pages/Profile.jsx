import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUserData, loading } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setImagePreview(user.image || "");
    }
  }, [user]);

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Submit profile updates (name, email, image)
  const submitProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (imageFile) formData.append("image", imageFile);

    try {
      await updateUserData(formData);
      toast.success("Profile updated", {
        position: "top-left",
        autoClose: 3000,
      });
      setImageFile(null);
    } catch {
      // Do nothing; error already handled inside updateUserData
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col gap-10">
        {/* Profile Section */}
        <section className="bg-white p-6 rounded-lg border-1 shadow-md">
          <h2 className="text-2xl mb-4 font-semibold text-center">Update Profile</h2>
          <form onSubmit={submitProfile} className="space-y-6 flex flex-col items-center">
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition"
              title="Click to change profile picture"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">No Image</div>
              )}
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <div className="absolute inset-0 bg-gray-500 bg-opacity-20 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-sm">
                Change
              </div>
            </label>

            <input
              type="text"
              placeholder="Name"
              className="w-full max-w-xs p-2 border rounded text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full max-w-xs p-2 border rounded text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 cursor-pointer w-50 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
            >
              Save Profile
            </button>
          </form>
        </section>

        {/* Password Section */}
        <section className="bg-white p-6 rounded-lg border-1 shadow-md">
          <h2 className="text-2xl mb-4 font-semibold">Change Password</h2>
          <form className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              className="w-full p-2 border rounded"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
            >
              Change Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Profile;
