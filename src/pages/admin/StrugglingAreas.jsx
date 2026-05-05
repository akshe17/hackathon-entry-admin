// StrugglingAreas.jsx - Using Tailwind CSS and Lucide React
import React, { useState, useEffect } from "react";
import {
  TrendingDown,
  RefreshCw,
  Eye,
  User,
  Activity,
  Apple,
  Dumbbell,
  Droplet,
  Moon,
  Brain,
  AlertCircle,
  Clock,
  Calendar,
  Plus,
  Target,
  Edit,
  Trash2,
  Filter,
  Mail,
  X,
  CheckCircle,
  AlertTriangle,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock data
const mockUsers = [
  {
    id: "1",
    firstName: "Emma",
    lastName: "Smith",
    email: "emma.smith@example.com",
    role: "CHILD",
    age: 12,
    status: "active",
    strugglingAreas: [
      {
        category: "nutrition",
        score: 45,
        weakConcepts: ["High sugar intake", "Irregular meals", "Low protein"],
        recentData: [
          { date: "2024-12-01", score: 48 },
          { date: "2024-11-30", score: 45 },
          { date: "2024-11-29", score: 42 },
        ],
      },
      {
        category: "fitness",
        score: 38,
        weakConcepts: ["Low activity", "Inconsistent workouts"],
        recentData: [
          { date: "2024-12-01", score: 40 },
          { date: "2024-11-30", score: 38 },
          { date: "2024-11-29", score: 35 },
        ],
      },
    ],
    overallWellnessScore: 42,
    lastActive: "2024-12-01T16:45:00Z",
    foodScans: [
      {
        id: "f1",
        productName: "Soda",
        score: 30,
        createdAt: "2024-12-01T12:00:00Z",
      },
    ],
    workoutLogs: [
      {
        id: "w1",
        title: "Walk",
        durationMinutes: 15,
        createdAt: "2024-11-30T08:00:00Z",
      },
    ],
    diaryEntries: [
      {
        id: "d1",
        moodTag: "TIRED",
        entry: "Feeling tired all day",
        createdAt: "2024-12-01T20:00:00Z",
      },
    ],
    interventionPlans: [],
  },
  {
    id: "2",
    firstName: "Liam",
    lastName: "Smith",
    email: "liam.smith@example.com",
    role: "CHILD",
    age: 8,
    status: "active",
    strugglingAreas: [
      {
        category: "hydration",
        score: 35,
        weakConcepts: ["Low water intake", "Prefers sugary drinks"],
        recentData: [
          { date: "2024-12-01", score: 35 },
          { date: "2024-11-30", score: 38 },
        ],
      },
      {
        category: "sleep",
        score: 40,
        weakConcepts: ["Irregular schedule", "Late bedtime"],
        recentData: [
          { date: "2024-12-01", score: 42 },
          { date: "2024-11-30", score: 40 },
        ],
      },
    ],
    overallWellnessScore: 38,
    lastActive: "2024-12-01T10:15:00Z",
    foodScans: [],
    workoutLogs: [],
    diaryEntries: [],
    interventionPlans: [],
  },
  {
    id: "3",
    firstName: "Sophia",
    lastName: "Garcia",
    email: "sophia.garcia@example.com",
    role: "CHILD",
    age: 10,
    status: "active",
    strugglingAreas: [
      {
        category: "mental",
        score: 30,
        weakConcepts: ["High stress", "Anxiety symptoms"],
        recentData: [
          { date: "2024-12-01", score: 32 },
          { date: "2024-11-30", score: 30 },
        ],
      },
    ],
    overallWellnessScore: 35,
    lastActive: "2024-12-01T17:30:00Z",
    foodScans: [],
    workoutLogs: [],
    diaryEntries: [
      {
        id: "d2",
        moodTag: "ANXIOUS",
        entry: "Feeling nervous about school",
        createdAt: "2024-12-01T19:00:00Z",
      },
    ],
    interventionPlans: [],
  },
];

const categoryConfig = {
  nutrition: {
    icon: Apple,
    label: "Nutrition",
    color: "green",
    bgLight: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
  },
  fitness: {
    icon: Dumbbell,
    label: "Fitness",
    color: "blue",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
  },
  hydration: {
    icon: Droplet,
    label: "Hydration",
    color: "cyan",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-700",
  },
  sleep: {
    icon: Moon,
    label: "Sleep",
    color: "indigo",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
  },
  mental: {
    icon: Brain,
    label: "Mental Health",
    color: "purple",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
  },
};

const getScoreColor = (score) => {
  if (score >= 70) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBg = (score) => {
  if (score >= 70) return "bg-green-100";
  if (score >= 50) return "bg-yellow-100";
  return "bg-red-100";
};

const getScoreProgressColor = (score) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatFullDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function StrugglingAreas() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterScoreRange, setFilterScoreRange] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const showMessage = (message, type = "success") => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
      showMessage("Data refreshed successfully", "success");
    }, 500);
  };

  const addInterventionPlan = (userId, plan) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              interventionPlans: [
                ...(user.interventionPlans || []),
                {
                  ...plan,
                  id: Date.now(),
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : user,
      ),
    );
    showMessage("Intervention plan created successfully", "success");
  };

  const updateInterventionPlanStatus = (userId, planId, status) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              interventionPlans: user.interventionPlans.map((plan) =>
                plan.id === planId ? { ...plan, status } : plan,
              ),
            }
          : user,
      ),
    );
    showMessage("Plan status updated", "success");
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filterCategory ||
      user.strugglingAreas.some((area) => area.category === filterCategory);
    let matchesScore = true;
    if (filterScoreRange === "critical")
      matchesScore = user.overallWellnessScore < 40;
    else if (filterScoreRange === "warning")
      matchesScore =
        user.overallWellnessScore >= 40 && user.overallWellnessScore < 60;
    else if (filterScoreRange === "good")
      matchesScore = user.overallWellnessScore >= 60;
    return matchesSearch && matchesCategory && matchesScore;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "score")
      return a.overallWellnessScore - b.overallWellnessScore;
    if (sortBy === "name")
      return `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
      );
    if (sortBy === "age") return (a.age || 0) - (b.age || 0);
    return 0;
  });

  const stats = {
    critical: users.filter((u) => u.overallWellnessScore < 40).length,
    warning: users.filter(
      (u) => u.overallWellnessScore >= 40 && u.overallWellnessScore < 60,
    ).length,
    good: users.filter((u) => u.overallWellnessScore >= 60).length,
    total: users.length,
    avgScore: Math.round(
      users.reduce((sum, u) => sum + u.overallWellnessScore, 0) /
        (users.length || 1),
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      {showNotification && (
        <div
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white animate-in slide-in-from-right"
          style={{
            backgroundColor:
              showNotification.type === "success" ? "#22c55e" : "#3b82f6",
          }}
        >
          {showNotification.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span className="text-sm">{showNotification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <TrendingDown size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Struggling Areas
                </h1>
                <p className="text-sm text-gray-500">
                  Identify users needing intervention in specific wellness
                  categories
                </p>
              </div>
            </div>
            <button
              onClick={fetchData}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          {/* Stats Cards - All White */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-5">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle size={14} className="text-red-500" />
                <p className="text-xs text-gray-500">Critical (&lt;40)</p>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {stats.critical}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <Activity size={14} className="text-yellow-500" />
                <p className="text-xs text-gray-500">Warning (40-60)</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.warning}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <Award size={14} className="text-green-500" />
                <p className="text-xs text-gray-500">Good (60+)</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.good}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <Users size={14} className="text-blue-500" />
                <p className="text-xs text-gray-500">Total Users</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <Activity size={14} className="text-purple-500" />
                <p className="text-xs text-gray-500">Avg Wellness</p>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {stats.avgScore}
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <div className="relative flex-1">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="score">Sort by Score (Lowest First)</option>
                <option value="name">Sort by Name (A-Z)</option>
                <option value="age">Sort by Age (Youngest First)</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="fitness">Fitness</option>
                  <option value="hydration">Hydration</option>
                  <option value="sleep">Sleep</option>
                  <option value="mental">Mental Health</option>
                </select>
                <select
                  value={filterScoreRange}
                  onChange={(e) => setFilterScoreRange(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">All Scores</option>
                  <option value="critical">Critical (&lt;40)</option>
                  <option value="warning">Warning (40-60)</option>
                  <option value="good">Good (60+)</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setFilterCategory("");
                  setFilterScoreRange("");
                  setSearchTerm("");
                  setSortBy("score");
                }}
                className="mt-3 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {sortedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onInspect={() => {
                    setSelectedUser(user);
                    setShowDetails(true);
                  }}
                />
              ))}
            </div>
            {sortedUsers.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Users size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">
                  No users found matching criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* User Detail Modal */}
      {showDetails && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setShowDetails(false)}
          onAddIntervention={addInterventionPlan}
          onUpdateStatus={updateInterventionPlanStatus}
        />
      )}
    </div>
  );
}

// UserCard Component
function UserCard({ user, onInspect }) {
  const getTopStrugglingArea = () => {
    if (!user.strugglingAreas.length) return null;
    return user.strugglingAreas.reduce(
      (lowest, area) => (area.score < lowest.score ? area : lowest),
      user.strugglingAreas[0],
    );
  };

  const topArea = getTopStrugglingArea();
  const topConfig = topArea ? categoryConfig[topArea.category] : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={16} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-xs text-gray-500">
              {user.role} • {user.age} years
            </p>
          </div>
        </div>
        <button
          onClick={onInspect}
          className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center gap-1"
        >
          <Eye size={12} /> Inspect
        </button>
      </div>

      <div className="p-4">
        {/* Overall Score */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Overall Wellness</span>
            <span
              className={`font-semibold ${getScoreColor(user.overallWellnessScore)}`}
            >
              {user.overallWellnessScore}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getScoreProgressColor(user.overallWellnessScore)}`}
              style={{ width: `${user.overallWellnessScore}%` }}
            />
          </div>
        </div>

        {/* Top Struggling Area */}
        {topArea && topConfig && (
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle size={12} className="text-red-500" />
              <span className="text-xs font-medium text-gray-700">
                Top Struggling Area
              </span>
            </div>
            <div
              className={`p-2 rounded-lg ${topConfig.bgLight} border ${topConfig.borderColor}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <topConfig.icon size={14} className={topConfig.textColor} />
                  <span className="text-sm font-medium">{topConfig.label}</span>
                </div>
                <span
                  className={`text-sm font-bold ${getScoreColor(topArea.score)}`}
                >
                  {topArea.score}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {topArea.weakConcepts.slice(0, 2).map((concept, i) => (
                  <span
                    key={i}
                    className="text-xs px-1.5 py-0.5 bg-white rounded-full text-gray-600 border border-gray-200"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Areas */}
        <div className="space-y-1.5 mb-3">
          {user.strugglingAreas.map((area) => {
            const config = categoryConfig[area.category];
            return (
              <div
                key={area.category}
                className="flex justify-between items-center text-xs"
              >
                <div className="flex items-center gap-1.5">
                  <config.icon size={12} className={config.textColor} />
                  <span className="text-gray-600">{config.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreProgressColor(area.score)}`}
                      style={{ width: `${area.score}%` }}
                    />
                  </div>
                  <span className={`font-medium ${getScoreColor(area.score)}`}>
                    {area.score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-gray-100 flex justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={10} />
            <span>Active: {formatDate(user.lastActive)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-0.5">
              <Apple size={10} /> {user.foodScans?.length || 0}
            </span>
            <span className="flex items-center gap-0.5">
              <Dumbbell size={10} /> {user.workoutLogs?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// UserDetailModal Component
function UserDetailModal({ user, onClose, onAddIntervention, onUpdateStatus }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4 text-white rounded-t-xl sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm opacity-90">{user.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6 sticky top-[73px] bg-white z-10">
            <div className="flex gap-6">
              {["overview", "struggling", "activity", "interventions"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-1 py-3 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "overview" && "Overview"}
                    {tab === "struggling" && "Struggling Areas"}
                    {tab === "activity" && "Recent Activity"}
                    {tab === "interventions" &&
                      `Interventions (${user.interventionPlans?.length || 0})`}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "overview" && <OverviewTab user={user} />}
            {activeTab === "struggling" && <StrugglingAreasTab user={user} />}
            {activeTab === "activity" && <RecentActivityTab user={user} />}
            {activeTab === "interventions" && (
              <InterventionsTab
                user={user}
                onAddIntervention={() => setShowPlanModal(true)}
                onEditPlan={(plan) => {
                  setEditingPlan(plan);
                  setShowPlanModal(true);
                }}
                onUpdateStatus={onUpdateStatus}
              />
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => setShowPlanModal(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={14} /> Create Intervention Plan
            </button>
          </div>
        </div>
      </div>

      {/* Intervention Plan Modal */}
      {showPlanModal && (
        <InterventionPlanModal
          user={user}
          editingPlan={editingPlan}
          onClose={() => {
            setShowPlanModal(false);
            setEditingPlan(null);
          }}
          onSave={(plan) => {
            if (editingPlan) {
              onUpdateStatus(user.id, editingPlan.id, plan.status);
            } else {
              onAddIntervention(user.id, plan);
            }
            setShowPlanModal(false);
            setEditingPlan(null);
          }}
        />
      )}
    </>
  );
}

// Overview Tab
function OverviewTab({ user }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Activity size={16} className="text-blue-600" />
          Wellness Overview
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Overall Wellness Score</span>
          <span
            className={`text-2xl font-bold ${getScoreColor(user.overallWellnessScore)}`}
          >
            {user.overallWellnessScore}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full ${getScoreProgressColor(user.overallWellnessScore)}`}
            style={{ width: `${user.overallWellnessScore}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {user.strugglingAreas.map((area) => {
            const config = categoryConfig[area.category];
            return (
              <div
                key={area.category}
                className="bg-white rounded-lg p-2 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1">
                    <config.icon size={12} className={config.textColor} />
                    <span className="text-xs font-medium">{config.label}</span>
                  </div>
                  <span
                    className={`text-sm font-bold ${getScoreColor(area.score)}`}
                  >
                    {area.score}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreProgressColor(area.score)}`}
                    style={{ width: `${area.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Account Info
          </h4>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Status:</strong>{" "}
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                {user.status}
              </span>
            </p>
            <p>
              <strong>Last Active:</strong> {formatFullDate(user.lastActive)}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Activity Summary
          </h4>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Food Scans:</strong> {user.foodScans?.length || 0}
            </p>
            <p>
              <strong>Workouts:</strong> {user.workoutLogs?.length || 0}
            </p>
            <p>
              <strong>Journal Entries:</strong> {user.diaryEntries?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Struggling Areas Tab
function StrugglingAreasTab({ user }) {
  return (
    <div className="space-y-4">
      {user.strugglingAreas.map((area) => {
        const config = categoryConfig[area.category];
        return (
          <div
            key={area.category}
            className={`rounded-lg border ${config.borderColor} overflow-hidden`}
          >
            <div
              className={`${config.bgLight} px-4 py-3 border-b ${config.borderColor}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <config.icon size={16} className={config.textColor} />
                  <h3 className="font-semibold text-gray-900">
                    {config.label}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-lg font-bold ${getScoreColor(area.score)}`}
                  >
                    {area.score}
                  </span>
                  <span className="text-xs text-gray-400">/100</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Weak Concepts Identified:
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {area.weakConcepts.map((concept, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200"
                  >
                    {concept}
                  </span>
                ))}
              </div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Recent Trend:
              </h4>
              <div className="space-y-2">
                {area.recentData
                  .slice()
                  .reverse()
                  .map((data, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-500">
                        {formatDate(data.date)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getScoreProgressColor(data.score)}`}
                            style={{ width: `${data.score}%` }}
                          />
                        </div>
                        <span className={getScoreColor(data.score)}>
                          {data.score}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Recent Activity Tab
function RecentActivityTab({ user }) {
  const hasActivity =
    user.foodScans?.length > 0 ||
    user.workoutLogs?.length > 0 ||
    user.diaryEntries?.length > 0;

  if (!hasActivity) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Activity size={48} className="mx-auto text-gray-300 mb-3" />
        <p>No recent activity found for this user</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {user.foodScans?.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-green-50 px-4 py-2 border-b border-green-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Apple size={14} className="text-green-600" /> Recent Food Scans
            </h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Score
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {user.foodScans.map((scan) => (
                <tr key={scan.id}>
                  <td className="px-4 py-2 text-sm">{scan.productName}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${getScoreBg(scan.score)} ${getScoreColor(scan.score)}`}
                    >
                      {scan.score}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {formatDate(scan.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {user.workoutLogs?.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 px-4 py-2 border-b border-blue-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Dumbbell size={14} className="text-blue-600" /> Recent Workouts
            </h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Duration
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {user.workoutLogs.map((workout) => (
                <tr key={workout.id}>
                  <td className="px-4 py-2 text-sm">{workout.title}</td>
                  <td className="px-4 py-2 text-sm">
                    {workout.durationMinutes} min
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {formatDate(workout.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {user.diaryEntries?.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-purple-50 px-4 py-2 border-b border-purple-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Brain size={14} className="text-purple-600" /> Recent Journal
              Entries
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {user.diaryEntries.map((entry) => (
              <div key={entry.id} className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      entry.moodTag === "HAPPY"
                        ? "bg-green-100 text-green-700"
                        : entry.moodTag === "TIRED"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.moodTag}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {entry.entry.substring(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Interventions Tab
function InterventionsTab({
  user,
  onAddIntervention,
  onEditPlan,
  onUpdateStatus,
}) {
  const plans = user.interventionPlans || [];

  if (plans.length === 0) {
    return (
      <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-200">
        <Target size={48} className="mx-auto text-blue-400 mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Intervention Plans
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Create a personalized intervention plan for this user
        </p>
        <button
          onClick={onAddIntervention}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 inline-flex items-center gap-2"
        >
          <Plus size={14} /> Create Plan
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={onAddIntervention}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 inline-flex items-center gap-2"
        >
          <Plus size={14} /> New Plan
        </button>
      </div>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-blue-600" />
              <h3 className="font-semibold text-gray-900">{plan.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  plan.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : plan.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {plan.status === "in-progress"
                  ? "In Progress"
                  : plan.status === "completed"
                    ? "Completed"
                    : "Planned"}
              </span>
              <select
                value={plan.status}
                onChange={(e) =>
                  onUpdateStatus(user.id, plan.id, e.target.value)
                }
                className="text-xs border border-gray-300 rounded-lg px-2 py-1"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => onEditPlan(plan)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Edit size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Focus Areas:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {plan.focusAreas.map((area, i) => {
                const config = categoryConfig[area];
                return config ? (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 rounded-full ${config.bgLight} ${config.textColor}`}
                  >
                    {config.label}
                  </span>
                ) : null;
              })}
            </div>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Actions:</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              {plan.actions.map((action, i) => (
                <li key={i} className="text-sm text-gray-600">
                  {action}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-gray-100 flex gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={10} /> Created: {formatFullDate(plan.createdAt)}
            </span>
            {plan.dueDate && (
              <span className="flex items-center gap-1">
                <Clock size={10} /> Due: {formatFullDate(plan.dueDate)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Intervention Plan Modal
function InterventionPlanModal({ user, editingPlan, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: editingPlan?.title || `Intervention Plan for ${user.firstName}`,
    focusAreas: editingPlan?.focusAreas || [],
    actions: editingPlan?.actions || [""],
    dueDate: editingPlan?.dueDate || "",
    status: editingPlan?.status || "planned",
    notes: editingPlan?.notes || "",
  });

  const availableCategories = Object.keys(categoryConfig).filter((cat) =>
    user.strugglingAreas.some((area) => area.category === cat),
  );

  const toggleFocusArea = (area) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const updateAction = (idx, value) => {
    const newActions = [...formData.actions];
    newActions[idx] = value;
    setFormData((prev) => ({ ...prev, actions: newActions }));
  };

  const addAction = () =>
    setFormData((prev) => ({ ...prev, actions: [...prev.actions, ""] }));
  const removeAction = (idx) =>
    setFormData((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== idx),
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, actions: formData.actions.filter((a) => a.trim()) });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingPlan
              ? "Edit Intervention Plan"
              : "Create Intervention Plan"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Areas *
              </label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((cat) => {
                  const config = categoryConfig[cat];
                  const isSelected = formData.focusAreas.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => toggleFocusArea(cat)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                        isSelected
                          ? `${config.bgLight} border ${config.borderColor} ${config.textColor}`
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <config.icon size={12} />
                      {config.label}
                    </button>
                  );
                })}
              </div>
              {formData.focusAreas.length === 0 && (
                <p className="text-xs text-red-500 mt-1">
                  Select at least one focus area
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Items
              </label>
              <div className="space-y-2">
                {formData.actions.map((action, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={action}
                      onChange={(e) => updateAction(idx, e.target.value)}
                      placeholder={`Action ${idx + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.actions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAction(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAction}
                  className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <Plus size={14} /> Add Action
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional notes..."
              />
            </div>
          </div>
          <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formData.focusAreas.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingPlan ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
