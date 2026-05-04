// Settings.jsx
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
  Key,
  Fingerprint,
  Check,
  X,
  Edit,
} from "lucide-react";

const NAVY = "#0a2366";
const BLUE = "#164bd4";

// Mock current user data
const mockCurrentUser = {
  id: "1",
  email: "maria.santos@email.com",
  firstName: "Maria",
  middleName: "Cruz",
  lastName: "Santos",
  role: "INDIVIDUAL",
  avatar: null,
  createdAt: "2025-01-15T00:00:00Z",
};

function Settings() {
  const [user, setUser] = useState(mockCurrentUser);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    middleName: user.middleName || "",
    lastName: user.lastName,
    email: user.email,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [savedChanges, setSavedChanges] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setErrorMessage("");
    setSavedChanges(false);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    setTimeout(() => {
      setUser({
        ...user,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
      });
      setLoading(false);
      setSavedChanges(true);
      setEditMode(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        setSavedChanges(false);
      }, 3000);
    }, 800);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    setTimeout(() => {
      if (passwordData.currentPassword !== "current123") {
        setErrorMessage("Current password is incorrect");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccessMessage("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 800);
  };

  const handleCancelEdit = () => {
    setFormData({
      firstName: user.firstName,
      middleName: user.middleName || "",
      lastName: user.lastName,
      email: user.email,
    });
    setEditMode(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: NAVY }}>
            Account Settings
          </h1>
          <p className="text-gray-500">
            Manage your profile information and security settings
          </p>
        </div>

        {/* Large Portrait SVG Image */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/profile.svg"
            alt="Girl customizing her profile portrait"
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl flex items-center gap-3 max-w-2xl mx-auto">
            <CheckCircle size={20} className="text-green-600" />
            <p className="text-sm text-green-700 flex-1">{successMessage}</p>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-600 hover:text-green-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 max-w-2xl mx-auto">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-sm text-red-700 flex-1">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-600 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-200 w-fit">
            <button
              onClick={() => {
                setActiveTab("profile");
                setEditMode(false);
              }}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === "profile"
                  ? "text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              style={activeTab === "profile" ? { background: BLUE } : {}}
            >
              <User size={16} />
              Profile Information
            </button>
            <button
              onClick={() => {
                setActiveTab("password");
                setEditMode(false);
              }}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === "password"
                  ? "text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              style={activeTab === "password" ? { background: BLUE } : {}}
            >
              <Lock size={16} />
              Security
            </button>
          </div>
        </div>

        {/* Profile Settings */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-2xl mx-auto">
            <div className="px-8 pt-8 pb-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: NAVY }}>
                    Personal Information
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Update your personal details
                  </p>
                </div>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
                      color: "white",
                    }}
                  >
                    <Edit size={16} /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleProfileSubmit}
                      disabled={loading}
                      className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-md disabled:opacity-50"
                      style={{
                        background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
                        color: "white",
                      }}
                    >
                      {loading ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save size={16} /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="px-8 py-6">
              {savedChanges && (
                <div className="mb-6 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <span className="text-sm text-green-700">
                    Changes saved successfully!
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="text-sm font-semibold mb-2 block"
                      style={{ color: NAVY }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleProfileChange}
                      disabled={!editMode}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#164bd4] transition-all ${
                        editMode
                          ? "border-gray-200 bg-white"
                          : "border-gray-100 bg-gray-50 text-gray-600"
                      } ${errors.firstName ? "border-red-400 focus:border-red-500" : ""}`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-sm font-semibold mb-2 block"
                      style={{ color: NAVY }}
                    >
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleProfileChange}
                      disabled={!editMode}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#164bd4] transition-all ${
                        editMode
                          ? "border-gray-200 bg-white"
                          : "border-gray-100 bg-gray-50 text-gray-600"
                      }`}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="text-sm font-semibold mb-2 block"
                    style={{ color: NAVY }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleProfileChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#164bd4] transition-all ${
                      editMode
                        ? "border-gray-200 bg-white"
                        : "border-gray-100 bg-gray-50 text-gray-600"
                    } ${errors.lastName ? "border-red-400 focus:border-red-500" : ""}`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="text-sm font-semibold mb-2 block"
                    style={{ color: NAVY }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleProfileChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#164bd4] transition-all ${
                        editMode
                          ? "border-gray-200 bg-white"
                          : "border-gray-100 bg-gray-50 text-gray-600"
                      } ${errors.email ? "border-red-400 focus:border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Changing your email will require verification
                  </p>
                </div>

                {!editMode && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Shield size={14} />
                      <span>
                        Last updated: {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "password" && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Change Password Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${BLUE}10` }}
                  >
                    <Key size={20} style={{ color: BLUE }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: NAVY }}>
                      Change Password
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Update your password to keep your account secure
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="px-8 py-6 space-y-5">
                  <div>
                    <label
                      className="text-sm font-semibold mb-2 block"
                      style={{ color: NAVY }}
                    >
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#164bd4] pr-10 ${
                          errors.currentPassword
                            ? "border-red-400"
                            : "border-gray-200"
                        }`}
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-sm font-semibold mb-2 block"
                      style={{ color: NAVY }}
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#164bd4] pr-10 ${
                          errors.newPassword
                            ? "border-red-400"
                            : "border-gray-200"
                        }`}
                        placeholder="Enter new password (min. 6 characters)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.newPassword}
                      </p>
                    )}
                    {passwordData.newPassword && !errors.newPassword && (
                      <div className="mt-2 h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${Math.min((passwordData.newPassword.length / 20) * 100, 100)}%`,
                            background: `linear-gradient(90deg, ${BLUE}, ${NAVY})`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-sm font-semibold mb-2 block"
                      style={{ color: NAVY }}
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#164bd4] pr-10 ${
                          errors.confirmPassword
                            ? "border-red-400"
                            : "border-gray-200"
                        }`}
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-8 py-5 bg-gray-50 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-lg text-white font-semibold flex items-center gap-2 transition-all hover:shadow-lg disabled:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
                    }}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Lock size={18} />
                    )}
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-8 py-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${BLUE}10` }}
                    >
                      <Fingerprint size={20} style={{ color: BLUE }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div
              className="rounded-2xl border border-red-200 overflow-hidden"
              style={{ background: "#fff5f5" }}
            >
              <div className="px-8 py-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100">
                    <AlertCircle size={20} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-700">
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-600 mt-1 mb-4">
                      Once you delete your account, there is no going back. All
                      your data will be permanently removed.
                    </p>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you absolutely sure you want to delete your account? This action cannot be undone.",
                          )
                        ) {
                          console.log("Delete account");
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
