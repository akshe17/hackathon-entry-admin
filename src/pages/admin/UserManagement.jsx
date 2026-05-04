import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  Shield,
  Activity,
  RefreshCw,
  AlertCircle,
  UserCheck,
  UserX,
  User,
  DollarSign,
  Heart,
  AlertTriangle,
  Coffee,
  Utensils,
  Target,
  Calendar,
} from "lucide-react";

const NAVY = "#0a2366";
const BLUE = "#164bd4";

// Mock data with all Profile fields
const mockUsers = [
  {
    id: "1",
    email: "maria.santos@email.com",
    firstName: "Maria",
    middleName: "Cruz",
    lastName: "Santos",
    role: "INDIVIDUAL",
    age: 28,
    sex: "FEMALE",
    heightCm: 165,
    weightKg: 58.5,
    activityLevel: "Moderately Active",
    healthGoal: "Lose Weight",
    diaryPinHash: null,
    parentProfileId: null,
    incomeAmount: 45000,
    incomeFrequency: "monthly",
    incomeCurrency: "PHP",
    budgetAmount: 15000,
    budgetFrequency: "monthly",
    budgetCurrency: "PHP",
    allergies: ["shellfish", "peanuts"],
    foodPreferences: ["vegetarian", "low-carb"],
    dietRestrictions: ["no pork"],
    lastLoginAt: "2026-05-04T08:23:15Z",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2026-05-04T08:23:15Z",
    status: "active",
  },
  {
    id: "2",
    email: "john.reyes@email.com",
    firstName: "John",
    middleName: "Michael",
    lastName: "Reyes",
    role: "INDIVIDUAL",
    age: 34,
    sex: "MALE",
    heightCm: 178,
    weightKg: 82.0,
    activityLevel: "Active",
    healthGoal: "Build Muscle",
    diaryPinHash: "1234",
    parentProfileId: null,
    incomeAmount: 65000,
    incomeFrequency: "monthly",
    incomeCurrency: "PHP",
    budgetAmount: 20000,
    budgetFrequency: "monthly",
    budgetCurrency: "PHP",
    allergies: [],
    foodPreferences: ["high-protein"],
    dietRestrictions: [],
    lastLoginAt: "2026-05-04T09:15:22Z",
    createdAt: "2025-02-20T00:00:00Z",
    updatedAt: "2026-05-04T09:15:22Z",
    status: "active",
  },
  {
    id: "3",
    email: "anna.cruz@email.com",
    firstName: "Anna",
    middleName: "",
    lastName: "Cruz",
    role: "INDIVIDUAL",
    age: 25,
    sex: "FEMALE",
    heightCm: 160,
    weightKg: 55.0,
    activityLevel: "Lightly Active",
    healthGoal: "Maintain Weight",
    diaryPinHash: null,
    parentProfileId: "1",
    incomeAmount: 0,
    incomeFrequency: null,
    incomeCurrency: "PHP",
    budgetAmount: 0,
    budgetFrequency: null,
    budgetCurrency: "PHP",
    allergies: ["dairy"],
    foodPreferences: ["organic"],
    dietRestrictions: ["vegetarian"],
    lastLoginAt: "2026-05-02T14:30:00Z",
    createdAt: "2025-03-10T00:00:00Z",
    updatedAt: "2026-05-02T14:30:00Z",
    status: "inactive",
  },
  {
    id: "4",
    email: "carlos.mendoza@email.com",
    firstName: "Carlos",
    middleName: "Andres",
    lastName: "Mendoza",
    role: "INDIVIDUAL",
    age: 42,
    sex: "MALE",
    heightCm: 182,
    weightKg: 88.0,
    activityLevel: "Very Active",
    healthGoal: "Lose Weight",
    diaryPinHash: "5678",
    parentProfileId: null,
    incomeAmount: 85000,
    incomeFrequency: "monthly",
    incomeCurrency: "PHP",
    budgetAmount: 30000,
    budgetFrequency: "monthly",
    budgetCurrency: "PHP",
    allergies: [],
    foodPreferences: ["low-sodium"],
    dietRestrictions: ["diabetic-friendly"],
    lastLoginAt: "2026-05-04T07:45:00Z",
    createdAt: "2024-11-05T00:00:00Z",
    updatedAt: "2026-05-04T07:45:00Z",
    status: "active",
  },
  {
    id: "5",
    email: "lisa.garcia@email.com",
    firstName: "Lisa",
    middleName: "Marie",
    lastName: "Garcia",
    role: "ADMIN",
    age: 31,
    sex: "FEMALE",
    heightCm: 168,
    weightKg: 62.0,
    activityLevel: "Moderately Active",
    healthGoal: "Stay Healthy",
    diaryPinHash: null,
    parentProfileId: null,
    incomeAmount: 120000,
    incomeFrequency: "monthly",
    incomeCurrency: "PHP",
    budgetAmount: 40000,
    budgetFrequency: "monthly",
    budgetCurrency: "PHP",
    allergies: [],
    foodPreferences: [],
    dietRestrictions: [],
    lastLoginAt: "2026-05-04T11:20:00Z",
    createdAt: "2024-09-01T00:00:00Z",
    updatedAt: "2026-05-04T11:20:00Z",
    status: "active",
  },
  {
    id: "6",
    email: "pedro.torres@email.com",
    firstName: "Pedro",
    middleName: "",
    lastName: "Torres",
    role: "INDIVIDUAL",
    age: 23,
    sex: "MALE",
    heightCm: 175,
    weightKg: 70.0,
    activityLevel: "Active",
    healthGoal: "Build Muscle",
    diaryPinHash: null,
    parentProfileId: null,
    incomeAmount: 35000,
    incomeFrequency: "weekly",
    incomeCurrency: "PHP",
    budgetAmount: 10000,
    budgetFrequency: "weekly",
    budgetCurrency: "PHP",
    allergies: ["eggs"],
    foodPreferences: ["high-protein", "low-carb"],
    dietRestrictions: [],
    lastLoginAt: "2026-05-03T18:10:00Z",
    createdAt: "2025-06-15T00:00:00Z",
    updatedAt: "2026-05-03T18:10:00Z",
    status: "active",
  },
];

// Status Badge
function StatusBadge({ status }) {
  const isActive = status === "active";
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
        isActive
          ? "bg-green-50 border border-green-200 text-green-700"
          : "bg-red-50 border border-red-200 text-red-700"
      }`}
    >
      {isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
      {isActive ? "Active" : "Inactive"}
    </div>
  );
}

// Role Badge
function RoleBadge({ role }) {
  const isAdmin = role === "ADMIN";
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
        isAdmin
          ? "bg-gray-100 border border-gray-200 text-[#0a2366]"
          : "bg-blue-50 border border-blue-200 text-[#164bd4]"
      }`}
    >
      {isAdmin ? <Shield size={14} /> : <User size={14} />}
      {isAdmin ? "Admin" : "User"}
    </div>
  );
}

// User Modal
function UserModal({ opened, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    middleName: user?.middleName || "",
    lastName: user?.lastName || "",
    role: user?.role || "INDIVIDUAL",
    age: user?.age || "",
    sex: user?.sex || "MALE",
    heightCm: user?.heightCm || "",
    weightKg: user?.weightKg || "",
    activityLevel: user?.activityLevel || "",
    healthGoal: user?.healthGoal || "",
    incomeAmount: user?.incomeAmount || "",
    incomeFrequency: user?.incomeFrequency || "",
    incomeCurrency: user?.incomeCurrency || "PHP",
    budgetAmount: user?.budgetAmount || "",
    budgetFrequency: user?.budgetFrequency || "",
    budgetCurrency: user?.budgetCurrency || "PHP",
    allergies: user?.allergies?.join(", ") || "",
    foodPreferences: user?.foodPreferences?.join(", ") || "",
    dietRestrictions: user?.dietRestrictions?.join(", ") || "",
    status: user?.status || "active",
    diaryPinHash: user?.diaryPinHash || "",
    parentProfileId: user?.parentProfileId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      allergies: formData.allergies
        ? formData.allergies
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
        : [],
      foodPreferences: formData.foodPreferences
        ? formData.foodPreferences
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
        : [],
      dietRestrictions: formData.dietRestrictions
        ? formData.dietRestrictions
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
        : [],
      age: formData.age ? parseInt(formData.age) : null,
      heightCm: formData.heightCm ? parseInt(formData.heightCm) : null,
      weightKg: formData.weightKg ? parseFloat(formData.weightKg) : null,
      incomeAmount: formData.incomeAmount
        ? parseFloat(formData.incomeAmount)
        : null,
      budgetAmount: formData.budgetAmount
        ? parseFloat(formData.budgetAmount)
        : null,
    };
    onSave(processedData);
    onClose();
  };

  if (!opened) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-extrabold" style={{ color: NAVY }}>
            {user ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-4" style={{ color: NAVY }}>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4] transition-colors"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4] transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4] transition-colors"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-4" style={{ color: NAVY }}>
              Account Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                >
                  <option value="INDIVIDUAL">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Diary PIN (optional)
                </label>
                <input
                  type="password"
                  name="diaryPinHash"
                  value={formData.diaryPinHash}
                  onChange={handleChange}
                  placeholder="4-digit PIN"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
            </div>
            <div>
              <label
                className="text-xs font-semibold block mb-1.5"
                style={{ color: NAVY }}
              >
                Parent Profile ID (for dependents)
              </label>
              <input
                type="text"
                name="parentProfileId"
                value={formData.parentProfileId}
                onChange={handleChange}
                placeholder="Parent user ID"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
              />
            </div>
          </div>

          {/* Health Information */}
          <div className="mb-6">
            <h3
              className="text-sm font-bold mb-4 flex items-center gap-2"
              style={{ color: NAVY }}
            >
              <Heart size={16} /> Health Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Sex
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="heightCm"
                  value={formData.heightCm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="weightKg"
                  value={formData.weightKg}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Activity Level
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                >
                  <option value="">Select...</option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Lightly Active">Lightly Active</option>
                  <option value="Moderately Active">Moderately Active</option>
                  <option value="Active">Active</option>
                  <option value="Very Active">Very Active</option>
                </select>
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Health Goal
                </label>
                <select
                  name="healthGoal"
                  value={formData.healthGoal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                >
                  <option value="">Select...</option>
                  <option value="Lose Weight">Lose Weight</option>
                  <option value="Build Muscle">Build Muscle</option>
                  <option value="Maintain Weight">Maintain Weight</option>
                  <option value="Stay Healthy">Stay Healthy</option>
                  <option value="Improve Endurance">Improve Endurance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="mb-6">
            <h3
              className="text-sm font-bold mb-4 flex items-center gap-2"
              style={{ color: NAVY }}
            >
              <DollarSign size={16} /> Financial Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Income Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="incomeAmount"
                  value={formData.incomeAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Income Frequency
                </label>
                <select
                  name="incomeFrequency"
                  value={formData.incomeFrequency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                >
                  <option value="">Select...</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Income Currency
                </label>
                <input
                  type="text"
                  name="incomeCurrency"
                  value={formData.incomeCurrency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Budget Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="budgetAmount"
                  value={formData.budgetAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Budget Frequency
                </label>
                <select
                  name="budgetFrequency"
                  value={formData.budgetFrequency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                >
                  <option value="">Select...</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Budget Currency
                </label>
                <input
                  type="text"
                  name="budgetCurrency"
                  value={formData.budgetCurrency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
            </div>
          </div>

          {/* Dietary Information */}
          <div className="mb-6">
            <h3
              className="text-sm font-bold mb-4 flex items-center gap-2"
              style={{ color: NAVY }}
            >
              <Utensils size={16} /> Dietary Information
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Allergies (comma-separated)
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., peanuts, shellfish, dairy"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Food Preferences (comma-separated)
                </label>
                <input
                  type="text"
                  name="foodPreferences"
                  value={formData.foodPreferences}
                  onChange={handleChange}
                  placeholder="e.g., vegetarian, low-carb, high-protein"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold block mb-1.5"
                  style={{ color: NAVY }}
                >
                  Diet Restrictions (comma-separated)
                </label>
                <input
                  type="text"
                  name="dietRestrictions"
                  value={formData.dietRestrictions}
                  onChange={handleChange}
                  placeholder="e.g., no pork, no red meat, gluten-free"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
              style={{ color: NAVY }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
              }}
            >
              {user ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// User Detail Drawer
function UserDetailDrawer({ opened, onClose, user }) {
  if (!opened || !user) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-extrabold" style={{ color: NAVY }}>
            User Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Avatar and Name */}
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
              }}
            >
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </div>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>
              {user.firstName} {user.middleName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Status and Role */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">Status</p>
              <StatusBadge status={user.status} />
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">Role</p>
              <RoleBadge role={user.role} />
            </div>
          </div>

          {/* Basic Info */}
          <div className="mb-6">
            <h4
              className="text-sm font-bold mb-3 flex items-center gap-2"
              style={{ color: NAVY }}
            >
              <User size={14} /> Personal Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Age</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {user.age || "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Sex</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {user.sex || "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Height</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {user.heightCm ? `${user.heightCm} cm` : "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Weight</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {user.weightKg ? `${user.weightKg} kg` : "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Activity Level</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {user.activityLevel || "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Health Goal</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {user.healthGoal || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          {(user.incomeAmount || user.budgetAmount) && (
            <div className="mb-6">
              <h4
                className="text-sm font-bold mb-3 flex items-center gap-2"
                style={{ color: NAVY }}
              >
                <DollarSign size={14} /> Financial Information
              </h4>
              <div className="space-y-2">
                {user.incomeAmount && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500">Income</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: NAVY }}
                    >
                      {user.incomeCurrency} {user.incomeAmount.toLocaleString()}{" "}
                      / {user.incomeFrequency}
                    </span>
                  </div>
                )}
                {user.budgetAmount && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500">Budget</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: NAVY }}
                    >
                      {user.budgetCurrency} {user.budgetAmount.toLocaleString()}{" "}
                      / {user.budgetFrequency}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dietary Info */}
          {(user.allergies?.length > 0 ||
            user.foodPreferences?.length > 0 ||
            user.dietRestrictions?.length > 0) && (
            <div className="mb-6">
              <h4
                className="text-sm font-bold mb-3 flex items-center gap-2"
                style={{ color: NAVY }}
              >
                <Utensils size={14} /> Dietary Information
              </h4>
              <div className="space-y-2">
                {user.allergies?.length > 0 && (
                  <div className="py-2">
                    <span className="text-xs text-gray-500 block mb-1">
                      Allergies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {user.allergies.map((a, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {user.foodPreferences?.length > 0 && (
                  <div className="py-2">
                    <span className="text-xs text-gray-500 block mb-1">
                      Food Preferences
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {user.foodPreferences.map((p, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {user.dietRestrictions?.length > 0 && (
                  <div className="py-2">
                    <span className="text-xs text-gray-500 block mb-1">
                      Diet Restrictions
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {user.dietRestrictions.map((r, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-full"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="mb-6">
            <h4
              className="text-sm font-bold mb-3 flex items-center gap-2"
              style={{ color: NAVY }}
            >
              <Calendar size={14} /> Account Dates
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Last Login</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {user.lastLoginAt ? formatDate(user.lastLoginAt) : "Never"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Joined</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {formatDate(user.createdAt)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs text-gray-500">Last Updated</span>
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {formatDate(user.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = `mailto:${user.email}`)}
            className="w-full py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            style={{ color: NAVY }}
          >
            <Mail size={14} /> Email User
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      !search ||
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "all" || user.role === roleFilter;
    const matchStatus = statusFilter === "all" || user.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "active" ? "inactive" : "active",
              updatedAt: new Date().toISOString(),
            }
          : u,
      ),
    );
  };

  const handleSaveUser = (formData) => {
    const now = new Date().toISOString();
    if (selectedUser) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, ...formData, updatedAt: now } : u,
        ),
      );
    } else {
      setUsers([
        ...users,
        {
          id: String(Date.now()),
          ...formData,
          lastLoginAt: null,
          createdAt: now,
          updatedAt: now,
        },
      ]);
    }
    setModalOpened(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1
              className="text-3xl font-extrabold flex items-center gap-3 mb-2"
              style={{ color: NAVY }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
                }}
              >
                <Users size={24} className="text-white" />
              </div>
              User Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage and oversee all user accounts
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedUser(null);
              setModalOpened(true);
            }}
            className="px-5 py-3 rounded-xl text-white font-bold flex items-center gap-2 transition-all hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
            }}
          >
            <Plus size={18} /> Add User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Users",
              value: stats.total,
              icon: Users,
              color: BLUE,
            },
            {
              label: "Active",
              value: stats.active,
              icon: CheckCircle,
              color: "#10b981",
            },
            {
              label: "Inactive",
              value: stats.inactive,
              icon: XCircle,
              color: "#dc2626",
            },
            {
              label: "Administrators",
              value: stats.admins,
              icon: Shield,
              color: NAVY,
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1.5">
                      {stat.label}
                    </p>
                    <p
                      className="text-2xl font-extrabold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <Icon size={24} color={stat.color} opacity={0.3} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
          >
            <option value="all">All Roles</option>
            <option value="INDIVIDUAL">Users</option>
            <option value="ADMIN">Administrators</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setRoleFilter("all");
              setStatusFilter("all");
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            style={{ color: NAVY }}
          >
            <RefreshCw size={14} /> Reset
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Last Login
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
                          }}
                        >
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </div>
                        <div>
                          <p
                            className="text-sm font-bold"
                            style={{ color: NAVY }}
                          >
                            {user.firstName} {user.middleName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>
                    <td
                      className="px-4 py-3 text-sm font-medium"
                      style={{ color: NAVY }}
                    >
                      {new Date(user.lastLoginAt).toLocaleDateString()}
                    </td>
                    <td
                      className="px-4 py-3 text-sm font-medium"
                      style={{ color: NAVY }}
                    >
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setDrawerOpened(true);
                          }}
                          className="p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                          style={{ color: BLUE }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setModalOpened(true);
                          }}
                          className="p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                          style={{ color: BLUE }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                          style={{
                            color:
                              user.status === "active" ? "#dc2626" : "#10b981",
                          }}
                        >
                          {user.status === "active" ? (
                            <UserX size={16} />
                          ) : (
                            <UserCheck size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center">
              <AlertCircle size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-500">
                No users found matching your filters
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-md text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? "text-white"
                        : "border border-gray-200 hover:border-[#164bd4]"
                    }`}
                    style={
                      currentPage === page
                        ? { background: BLUE }
                        : { color: NAVY }
                    }
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <UserModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <UserDetailDrawer
        opened={drawerOpened}
        onClose={() => {
          setDrawerOpened(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
}
