// FamilyRelationshipManager.jsx
import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Link as LinkIcon,
  Unlink,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Edit2,
  RefreshCw,
  Plus,
  X,
  AlertCircle,
  Eye,
  User,
  Users2,
  TreePine,
  Network,
  LayoutGrid,
  Send,
  MessageCircle,
  BadgeCheck,
  UserPlus as UserPlusIcon,
  Loader2,
  CheckCircle,
  Info,
  ChevronRight,
  List,
  Share2,
  Download,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Shield,
  Baby,
  HeartHandshake,
  Award,
  Activity,
  Heart,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Cake,
  Briefcase,
  GraduationCap,
  Target,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Role configurations with flat colors (no gradients)
const ROLE_CONFIG = {
  PARENT: {
    icon: Shield,
    color: "#7C3AED",
    bgLight: "#F5F3FF",
    badgeColor: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200",
  },
  CHILD: {
    icon: Baby,
    color: "#059669",
    bgLight: "#ECFDF5",
    badgeColor: "bg-green-100 text-green-700",
    borderColor: "border-green-200",
  },
  INDIVIDUAL: {
    icon: User,
    color: "#3B82F6",
    bgLight: "#EFF6FF",
    badgeColor: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
  },
  CAREGIVER: {
    icon: HeartHandshake,
    color: "#EA580C",
    bgLight: "#FFF7ED",
    badgeColor: "bg-orange-100 text-orange-700",
    borderColor: "border-orange-200",
  },
};

// Mock data with all roles
const mockProfiles = [
  // PARENTS
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    role: "PARENT",
    age: 42,
    sex: "MALE",
    occupation: "Software Engineer",
    location: "New York, NY",
    joinDate: "2024-01-15T10:00:00Z",
    lastActive: "2024-12-01T15:30:00Z",
    status: "active",
    wellnessScore: 85,
    weeklyActivity: 320,
    children: [
      { id: "3", firstName: "Emma", lastName: "Smith", role: "CHILD", age: 12 },
      { id: "4", firstName: "Liam", lastName: "Smith", role: "CHILD", age: 8 },
    ],
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarah.smith@example.com",
    phone: "+1 (555) 123-4568",
    role: "PARENT",
    age: 40,
    sex: "FEMALE",
    occupation: "Doctor",
    location: "New York, NY",
    joinDate: "2024-01-15T10:00:00Z",
    lastActive: "2024-12-01T14:20:00Z",
    status: "active",
    wellnessScore: 92,
    weeklyActivity: 450,
    children: [
      { id: "3", firstName: "Emma", lastName: "Smith", role: "CHILD", age: 12 },
      { id: "4", firstName: "Liam", lastName: "Smith", role: "CHILD", age: 8 },
    ],
  },
  {
    id: "6",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 456-7890",
    role: "PARENT",
    age: 38,
    sex: "FEMALE",
    occupation: "Architect",
    location: "Miami, FL",
    joinDate: "2024-02-10T10:00:00Z",
    lastActive: "2024-12-01T12:00:00Z",
    status: "active",
    wellnessScore: 86,
    weeklyActivity: 310,
    children: [
      {
        id: "7",
        firstName: "Sofia",
        lastName: "Garcia",
        role: "CHILD",
        age: 10,
      },
    ],
  },

  // CHILDREN
  {
    id: "3",
    firstName: "Emma",
    lastName: "Smith",
    email: "emma.smith@example.com",
    role: "CHILD",
    age: 12,
    sex: "FEMALE",
    interests: ["Art", "Music", "Swimming"],
    school: "Lincoln Middle School",
    grade: 7,
    joinDate: "2024-01-20T10:00:00Z",
    lastActive: "2024-12-01T16:45:00Z",
    status: "active",
    wellnessScore: 78,
    weeklyActivity: 180,
    parentProfile: {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      role: "PARENT",
    },
  },
  {
    id: "4",
    firstName: "Liam",
    lastName: "Smith",
    email: "liam.smith@example.com",
    role: "CHILD",
    age: 8,
    sex: "MALE",
    interests: ["Soccer", "Video Games", "Reading"],
    school: "Sunset Elementary",
    grade: 3,
    joinDate: "2024-01-20T10:00:00Z",
    lastActive: "2024-12-01T10:15:00Z",
    status: "active",
    wellnessScore: 82,
    weeklyActivity: 210,
    parentProfile: {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      role: "PARENT",
    },
  },
  {
    id: "7",
    firstName: "Sofia",
    lastName: "Garcia",
    email: "sofia.garcia@example.com",
    role: "CHILD",
    age: 10,
    sex: "FEMALE",
    interests: ["Dancing", "Painting"],
    school: "Coral Way Elementary",
    grade: 5,
    joinDate: "2024-02-15T10:00:00Z",
    lastActive: "2024-12-01T17:30:00Z",
    status: "active",
    wellnessScore: 84,
    weeklyActivity: 195,
    parentProfile: {
      id: "6",
      firstName: "Maria",
      lastName: "Garcia",
      role: "PARENT",
    },
  },

  // INDIVIDUALS
  {
    id: "5",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 987-6543",
    role: "INDIVIDUAL",
    age: 35,
    sex: "MALE",
    occupation: "Teacher",
    location: "Los Angeles, CA",
    joinDate: "2024-02-01T10:00:00Z",
    lastActive: "2024-11-30T20:00:00Z",
    status: "active",
    wellnessScore: 70,
    weeklyActivity: 150,
    healthGoal: "Weight Management",
  },
  {
    id: "8",
    firstName: "Jennifer",
    lastName: "Lee",
    email: "jennifer.lee@example.com",
    phone: "+1 (555) 111-2222",
    role: "INDIVIDUAL",
    age: 28,
    sex: "FEMALE",
    occupation: "Marketing Specialist",
    location: "Chicago, IL",
    joinDate: "2024-03-10T10:00:00Z",
    lastActive: "2024-12-01T09:00:00Z",
    status: "active",
    wellnessScore: 88,
    weeklyActivity: 300,
    healthGoal: "Stress Reduction",
  },

  // CAREGIVERS
  {
    id: "9",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 444-5555",
    role: "CAREGIVER",
    age: 45,
    sex: "MALE",
    occupation: "Professional Caregiver",
    location: "Boston, MA",
    joinDate: "2024-03-01T10:00:00Z",
    lastActive: "2024-12-01T13:00:00Z",
    status: "active",
    wellnessScore: 90,
    weeklyActivity: 280,
    specialization: "Elder Care",
  },
  {
    id: "10",
    firstName: "Patricia",
    lastName: "Davis",
    email: "patricia.davis@example.com",
    phone: "+1 (555) 777-8888",
    role: "CAREGIVER",
    age: 38,
    sex: "FEMALE",
    occupation: "Nurse",
    location: "Seattle, WA",
    joinDate: "2024-02-20T10:00:00Z",
    lastActive: "2024-12-01T11:30:00Z",
    status: "active",
    wellnessScore: 95,
    weeklyActivity: 350,
    specialization: "Child Care",
  },
];

const FamilyRelationshipManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("tree");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showUnlinkModal, setShowUnlinkModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFamilies, setExpandedFamilies] = useState(new Set());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
      3000,
    );
  };

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      setProfiles(mockProfiles);
      calculateStats(mockProfiles);
      setLoading(false);
      showNotification("Data refreshed successfully", "success");
    }, 500);
  };

  const calculateStats = (data) => {
    const parents = data.filter((p) => p.role === "PARENT");
    const children = data.filter((p) => p.role === "CHILD");
    const individuals = data.filter((p) => p.role === "INDIVIDUAL");
    const caregivers = data.filter((p) => p.role === "CAREGIVER");

    const families = new Map();
    parents.forEach((parent) => {
      if (parent.children?.length)
        families.set(parent.id, parent.children.length);
    });

    const unlinkedChildren = children.filter((c) => !c.parentProfile);
    const activeUsers = data.filter((p) => p.status === "active").length;

    setStats({
      totalFamilies: families.size,
      totalParents: parents.length,
      totalChildren: children.length,
      totalIndividuals: individuals.length,
      totalCaregivers: caregivers.length,
      averageChildrenPerFamily:
        families.size > 0
          ? (
              Array.from(families.values()).reduce((a, b) => a + b, 0) /
              families.size
            ).toFixed(1)
          : 0,
      unlinkedChildren: unlinkedChildren.length,
      activeUsers,
      totalUsers: data.length,
      avgWellnessScore: Math.round(
        data.reduce((sum, p) => sum + (p.wellnessScore || 0), 0) / data.length,
      ),
    });
  };

  const [stats, setStats] = useState({
    totalFamilies: 0,
    totalParents: 0,
    totalChildren: 0,
    totalIndividuals: 0,
    totalCaregivers: 0,
    averageChildrenPerFamily: 0,
    unlinkedChildren: 0,
    activeUsers: 0,
    totalUsers: 0,
    avgWellnessScore: 0,
  });

  const getWellnessColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getAllFamilies = () => {
    const families = [];
    const processedParents = new Set();

    profiles.forEach((profile) => {
      if (profile.role === "PARENT" && !processedParents.has(profile.id)) {
        families.push({ parent: profile, children: profile.children || [] });
        processedParents.add(profile.id);
      } else if (
        profile.role === "CHILD" &&
        profile.parentProfile &&
        !processedParents.has(profile.parentProfile.id)
      ) {
        const parent = profiles.find((p) => p.id === profile.parentProfile.id);
        if (parent) {
          families.push({ parent, children: [profile] });
          processedParents.add(parent.id);
        }
      }
    });
    return families;
  };

  const handleLink = async () => {
    setLoading(true);
    setTimeout(() => {
      showNotification(
        `Linked ${selectedChild?.firstName} to ${selectedParent?.firstName}`,
        "success",
      );
      setShowLinkModal(false);
      setSelectedParent(null);
      setSelectedChild(null);
      setLoading(false);
      fetchData();
    }, 500);
  };

  const handleUnlink = async () => {
    setLoading(true);
    setTimeout(() => {
      showNotification(`Removed relationship`, "info");
      setShowUnlinkModal(false);
      fetchData();
    }, 500);
  };

  // Family Card Component
  const FamilyCard = ({ family, index }) => {
    const isExpanded = expandedFamilies.has(family.parent.id);
    const roleConfig = ROLE_CONFIG[family.parent.role];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <button
          onClick={() => {
            if (isExpanded) {
              const newSet = new Set(expandedFamilies);
              newSet.delete(family.parent.id);
              setExpandedFamilies(newSet);
            } else {
              setExpandedFamilies(
                new Set([...expandedFamilies, family.parent.id]),
              );
            }
          }}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              {React.createElement(roleConfig.icon, {
                size: 18,
                className: "text-blue-600",
              })}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">
                {family.parent.firstName} {family.parent.lastName}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{family.parent.role}</span>
                <span>•</span>
                <span>{family.children?.length || 0} children</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart
                size={12}
                className={getWellnessColor(family.parent.wellnessScore)}
              />
              <span className="text-sm font-medium">
                {family.parent.wellnessScore}
              </span>
            </div>
            <ChevronRight
              size={16}
              className={`transform transition-transform duration-200 ${isExpanded ? "rotate-90" : ""} text-gray-400`}
            />
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="p-5">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Parent Details */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield size={14} className="text-gray-400" />
                      Parent Details
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {family.parent.firstName} {family.parent.lastName}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Mail size={10} className="text-gray-400" />
                            <p className="text-xs text-gray-500">
                              {family.parent.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-500">Occupation</p>
                          <p className="font-medium">
                            {family.parent.occupation || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="font-medium">
                            {family.parent.location || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Children Section */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Baby size={14} className="text-gray-400" />
                      Children ({family.children?.length || 0})
                    </h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {family.children?.map((child) => (
                        <div
                          key={child.id}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Baby size={14} className="text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {child.firstName} {child.lastName}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span>{child.age} years</span>
                                  <span>•</span>
                                  <span>Grade {child.grade}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setSelectedProfile(child);
                                  setShowDetailsModal(true);
                                }}
                                className="p-1.5 hover:bg-white rounded transition-colors"
                                title="View Details"
                              >
                                <Eye size={12} className="text-gray-500" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedParent(family.parent);
                                  setSelectedChild(child);
                                  setShowUnlinkModal(true);
                                }}
                                className="p-1.5 hover:bg-white rounded transition-colors"
                                title="Remove Link"
                              >
                                <Unlink size={12} className="text-red-400" />
                              </button>
                            </div>
                          </div>
                          {child.interests && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {child.interests.map((interest, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-600"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedParent(family.parent);
                      setShowLinkModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <UserPlus size={14} />
                    Add Child
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle size={14} />
                    Send Message
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // List View Component
  const ListView = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "User",
                "Role",
                "Contact",
                "Family",
                "Wellness",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedProfiles.map((profile, idx) => {
              const roleConfig = ROLE_CONFIG[profile.role];
              return (
                <motion.tr
                  key={profile.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.01 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        {React.createElement(roleConfig.icon, {
                          size: 14,
                          className: "text-blue-600",
                        })}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {profile.firstName} {profile.lastName}
                        </p>
                        <p className="text-xs text-gray-400">{profile.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${roleConfig.badgeColor}`}
                    >
                      {profile.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {profile.phone && (
                      <span className="text-xs">{profile.phone}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {profile.role === "PARENT" &&
                      profile.children?.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Users size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {profile.children.length} children
                          </span>
                        </div>
                      )}
                    {profile.role === "CHILD" && profile.parentProfile && (
                      <div className="flex items-center gap-1">
                        <LinkIcon size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {profile.parentProfile.firstName}{" "}
                          {profile.parentProfile.lastName}
                        </span>
                      </div>
                    )}
                    {profile.role === "CHILD" && !profile.parentProfile && (
                      <span className="text-xs text-yellow-600">
                        Not linked
                      </span>
                    )}
                    {profile.role === "INDIVIDUAL" && (
                      <span className="text-xs text-gray-400">Independent</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Heart
                        size={10}
                        className={getWellnessColor(profile.wellnessScore)}
                      />
                      <span className="text-xs font-medium">
                        {profile.wellnessScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${profile.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                      />
                      <span className="text-xs text-gray-600 capitalize">
                        {profile.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setSelectedProfile(profile);
                          setShowDetailsModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="View"
                      >
                        <Eye size={12} />
                      </button>
                      {profile.role === "PARENT" && (
                        <button
                          onClick={() => {
                            setSelectedParent(profile);
                            setShowLinkModal(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Add Child"
                        >
                          <UserPlus size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Matrix View Component
  const MatrixView = () => {
    const parents = profiles.filter((p) => p.role === "PARENT");
    const children = profiles.filter((p) => p.role === "CHILD");
    const individuals = profiles.filter((p) => p.role === "INDIVIDUAL");

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={16} className="text-blue-600" />
            Parent-Child Relationships
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {parents.map((parent) => (
              <div
                key={parent.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Shield size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {parent.firstName} {parent.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {parent.children?.map((child) => (
                    <span
                      key={child.id}
                      className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full"
                    >
                      {child.firstName}
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedParent(parent);
                      setShowLinkModal(true);
                    }}
                    className="text-xs px-2 py-0.5 border border-dashed border-gray-300 rounded-full text-gray-500 hover:border-blue-400 hover:text-blue-600"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-yellow-600" />
              Unlinked Children (
              {children.filter((c) => !c.parentProfile).length})
            </h3>
            <div className="space-y-2">
              {children
                .filter((c) => !c.parentProfile)
                .map((child) => (
                  <div
                    key={child.id}
                    className="bg-white rounded-lg p-2 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {child.firstName} {child.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{child.age} years</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedChild(child);
                        setShowLinkModal(true);
                      }}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Link to Parent
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User size={16} className="text-blue-600" />
              Independent Users ({individuals.length})
            </h3>
            <div className="space-y-2">
              {individuals.map((individual) => (
                <div key={individual.id} className="bg-white rounded-lg p-2">
                  <p className="font-medium text-sm">
                    {individual.firstName} {individual.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {individual.occupation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Link Modal Component
  const LinkModal = () => (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowLinkModal(false)}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Link Family Member
          </h2>
          <button
            onClick={() => setShowLinkModal(false)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent/Guardian
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={selectedParent?.id || ""}
              onChange={(e) =>
                setSelectedParent(profiles.find((p) => p.id === e.target.value))
              }
            >
              <option value="">Select parent...</option>
              {profiles
                .filter((p) => p.role === "PARENT")
                .map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.firstName} {parent.lastName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Child
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={selectedChild?.id || ""}
              onChange={(e) =>
                setSelectedChild(profiles.find((p) => p.id === e.target.value))
              }
            >
              <option value="">Select child...</option>
              {profiles
                .filter(
                  (p) =>
                    p.role === "CHILD" &&
                    (!p.parentProfile ||
                      p.parentProfile.id !== selectedParent?.id),
                )
                .map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.firstName} {child.lastName} ({child.age} years)
                  </option>
                ))}
            </select>
          </div>

          {selectedParent && selectedChild && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                Link{" "}
                <strong>
                  {selectedChild.firstName} {selectedChild.lastName}
                </strong>{" "}
                as child of
                <strong>
                  {" "}
                  {selectedParent.firstName} {selectedParent.lastName}
                </strong>
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={() => setShowLinkModal(false)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleLink}
            disabled={!selectedParent || !selectedChild}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Link Family Member
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Details Modal
  const ProfileDetailsModal = () => (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowDetailsModal(false)}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {selectedProfile && (
          <>
            <div className="bg-blue-600 px-5 py-4 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  {React.createElement(
                    ROLE_CONFIG[selectedProfile.role]?.icon || User,
                    { size: 20, className: "text-white" },
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {selectedProfile.firstName} {selectedProfile.lastName}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {selectedProfile.role}
                    </span>
                    <span className="text-sm opacity-90">
                      {selectedProfile.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <Heart size={14} className="mx-auto mb-1 text-red-400" />
                  <p className="text-xs text-gray-500">Wellness</p>
                  <p className="text-base font-bold">
                    {selectedProfile.wellnessScore || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <Activity size={14} className="mx-auto mb-1 text-blue-400" />
                  <p className="text-xs text-gray-500">Weekly Activity</p>
                  <p className="text-base font-bold">
                    {selectedProfile.weeklyActivity || 0} min
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <Clock size={14} className="mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-base font-bold capitalize">
                    {selectedProfile.status}
                  </p>
                </div>
              </div>

              <div className="border-t pt-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  Personal Information
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Cake size={12} className="text-gray-400" />
                    {selectedProfile.age || "N/A"} years old
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-gray-400" />
                    {selectedProfile.location || "N/A"}
                  </div>
                  {selectedProfile.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-gray-400" />
                      {selectedProfile.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-gray-400" />
                    Joined{" "}
                    {new Date(selectedProfile.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {selectedProfile.role === "CHILD" && (
                <div className="bg-green-50 rounded-lg p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">
                    School Information
                  </h3>
                  <p className="text-sm">
                    <strong>School:</strong> {selectedProfile.school || "N/A"}
                  </p>
                  <p className="text-sm">
                    <strong>Grade:</strong> {selectedProfile.grade || "N/A"}
                  </p>
                  {selectedProfile.interests && (
                    <div className="mt-2">
                      <strong>Interests:</strong>{" "}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProfile.interests.map((i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 bg-white rounded-full"
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  Family Connection
                </h3>
                {selectedProfile.role === "PARENT" &&
                  selectedProfile.children?.length > 0 && (
                    <p className="text-sm">
                      {selectedProfile.children.length} children
                    </p>
                  )}
                {selectedProfile.role === "CHILD" &&
                  selectedProfile.parentProfile && (
                    <p className="text-sm">
                      Parent: {selectedProfile.parentProfile.firstName}{" "}
                      {selectedProfile.parentProfile.lastName}
                    </p>
                  )}
                {selectedProfile.role === "INDIVIDUAL" && (
                  <p className="text-sm text-gray-500">No family connections</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50"
              >
                Close
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Send Message
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Add Unlink Modal
  const UnlinkModalComponent = () => (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowUnlinkModal(false)}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Remove Relationship
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Unlink{" "}
              <strong>
                {selectedChild?.firstName} {selectedChild?.lastName}
              </strong>{" "}
              from{" "}
              <strong>
                {selectedParent?.firstName} {selectedParent?.lastName}
              </strong>
              ?
            </p>
            <p className="text-xs text-gray-500">
              The child's account will become independent.
            </p>
          </div>
        </div>
        <div className="flex gap-2 p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={() => setShowUnlinkModal(false)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUnlink}
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
          >
            Remove Link
          </button>
        </div>
      </div>
    </div>
  );

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      `${profile.firstName} ${profile.lastName} ${profile.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || profile.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || profile.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "name")
      comparison = `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
      );
    if (sortBy === "age") comparison = (a.age || 0) - (b.age || 0);
    if (sortBy === "wellness")
      comparison = (b.wellnessScore || 0) - (a.wellnessScore || 0);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const exportData = () => {
    const data = JSON.stringify(profiles, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `family-relationships-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Data exported successfully", "success");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg text-white text-sm ${notif.type === "success" ? "bg-green-600" : "bg-blue-600"}`}
            >
              {notif.type === "success" ? (
                <CheckCircle size={14} />
              ) : (
                <Info size={14} />
              )}
              <span>{notif.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Users2 size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Family Relationship Manager
                </h1>
                <p className="text-sm text-gray-500">
                  Manage parents, children, individuals, and caregivers
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={exportData}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50"
              >
                <Download size={14} /> Export
              </button>
              <button
                onClick={fetchData}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50"
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin" : ""}
                />{" "}
                Refresh
              </button>
              <button
                onClick={() => setShowLinkModal(true)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-blue-700"
              >
                <UserPlus size={14} /> Link Family
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mt-5">
            {[
              { label: "Families", value: stats.totalFamilies, color: "blue" },
              { label: "Parents", value: stats.totalParents, color: "purple" },
              { label: "Children", value: stats.totalChildren, color: "green" },
              {
                label: "Individuals",
                value: stats.totalIndividuals,
                color: "blue",
              },
              {
                label: "Caregivers",
                value: stats.totalCaregivers,
                color: "orange",
              },
              {
                label: "Avg Wellness",
                value: stats.avgWellnessScore,
                color: "pink",
              },
              {
                label: "Active",
                value: `${stats.activeUsers}/${stats.totalUsers}`,
                color: "teal",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50"
              >
                <Filter size={14} /> Filters{" "}
                {showFilters ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>

              <div className="flex bg-gray-100 rounded-lg p-0.5">
                {[
                  { id: "tree", icon: TreePine, label: "Family Tree" },
                  { id: "list", icon: List, label: "List View" },
                  { id: "matrix", icon: LayoutGrid, label: "Matrix" },
                ].map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setSelectedView(view.id)}
                    className={`p-1.5 rounded-md transition-all ${selectedView === view.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                  >
                    {React.createElement(view.icon, { size: 14 })}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                  className="p-1.5 rounded hover:bg-white"
                >
                  <ZoomOut size={12} />
                </button>
                <span className="text-xs w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))}
                  className="p-1.5 rounded hover:bg-white"
                >
                  <ZoomIn size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="all">All Roles</option>
                      <option value="PARENT">Parents</option>
                      <option value="CHILD">Children</option>
                      <option value="INDIVIDUAL">Individuals</option>
                      <option value="CAREGIVER">Caregivers</option>
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button
                      onClick={() => {
                        setFilterRole("all");
                        setFilterStatus("all");
                        setSortBy("name");
                        setSearchTerm("");
                      }}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            transition: "transform 0.2s",
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 size={32} className="animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              {selectedView === "tree" && (
                <div className="space-y-3">
                  {getAllFamilies().map((family, idx) => (
                    <FamilyCard
                      key={family.parent.id}
                      family={family}
                      index={idx}
                    />
                  ))}
                  {getAllFamilies().length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                      <Users2
                        size={48}
                        className="mx-auto text-gray-300 mb-3"
                      />
                      <h3 className="text-base font-semibold text-gray-900">
                        No Families Found
                      </h3>
                      <button
                        onClick={() => setShowLinkModal(true)}
                        className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm"
                      >
                        Create First Family
                      </button>
                    </div>
                  )}
                </div>
              )}
              {selectedView === "list" && <ListView />}
              {selectedView === "matrix" && <MatrixView />}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showLinkModal && <LinkModal />}
      {showUnlinkModal && <UnlinkModalComponent />}
      {showDetailsModal && <ProfileDetailsModal />}
    </div>
  );
};

export default FamilyRelationshipManager;
