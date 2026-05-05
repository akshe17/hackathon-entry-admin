// LogsPage.jsx - Complete logs page with Tailwind CSS and Lucide React
import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
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
  Download,
  Trash2,
  Settings,
  Shield,
  LogIn,
  LogOut,
  Edit,
  Plus,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  Target,
  Heart,
  MessageCircle,
  Share2,
  Upload,
  Download as DownloadIcon,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  Mail,
  Bell,
  Star,
  Flag,
  Globe,
  Server,
  Database,
  Cpu,
  Wifi,
  Battery,
  Zap,
  Thermometer,
  Wind,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
} from "lucide-react";

// Mock log data
const mockLogs = [
  {
    id: "1",
    timestamp: "2024-12-05T09:23:00Z",
    level: "INFO",
    category: "AUTH",
    action: "USER_LOGIN",
    userId: "user_123",
    userName: "Emma Smith",
    userRole: "CHILD",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0",
    details: {
      method: "email",
      success: true,
      loginType: "standard",
    },
    description: "User logged in successfully",
  },
  {
    id: "2",
    timestamp: "2024-12-05T08:15:00Z",
    level: "WARNING",
    category: "SECURITY",
    action: "FAILED_LOGIN_ATTEMPT",
    userId: "user_123",
    userName: "Emma Smith",
    userRole: "CHILD",
    ipAddress: "192.168.1.105",
    userAgent: "Chrome/120.0.0.0",
    details: {
      attempts: 3,
      reason: "invalid_password",
    },
    description: "Multiple failed login attempts detected",
  },
  {
    id: "3",
    timestamp: "2024-12-05T07:45:00Z",
    level: "ERROR",
    category: "SYSTEM",
    action: "API_ERROR",
    userId: null,
    userName: null,
    userRole: null,
    ipAddress: "internal",
    userAgent: "API Gateway",
    details: {
      endpoint: "/api/food-scan",
      statusCode: 500,
      error: "Database connection timeout",
    },
    description: "Food scan API returned server error",
  },
  {
    id: "4",
    timestamp: "2024-12-04T22:30:00Z",
    level: "INFO",
    category: "CONTENT",
    action: "FOOD_SCAN_CREATED",
    userId: "user_123",
    userName: "Emma Smith",
    userRole: "CHILD",
    ipAddress: "192.168.1.100",
    userAgent: "Mobile App/2.0",
    details: {
      productName: "Apple",
      score: 85,
      imageUrl: "/uploads/scan_123.jpg",
    },
    description: "New food scan added: Apple (Score: 85)",
  },
  {
    id: "5",
    timestamp: "2024-12-04T20:15:00Z",
    level: "INFO",
    category: "WELLNESS",
    action: "WORKOUT_LOGGED",
    userId: "user_124",
    userName: "Liam Smith",
    userRole: "CHILD",
    ipAddress: "192.168.1.101",
    userAgent: "Mobile App/2.0",
    details: {
      workoutType: "Cardio",
      duration: 30,
      caloriesBurned: 250,
    },
    description: "Workout logged: Cardio for 30 minutes",
  },
  {
    id: "6",
    timestamp: "2024-12-04T18:00:00Z",
    level: "CRITICAL",
    category: "SECURITY",
    action: "SUSPICIOUS_ACTIVITY",
    userId: "user_125",
    userName: "Unknown",
    userRole: null,
    ipAddress: "203.45.67.89",
    userAgent: "Unknown",
    details: {
      activity: "brute_force",
      requests: 150,
      timeframe: "5 minutes",
    },
    description: "Potential brute force attack detected",
  },
  {
    id: "7",
    timestamp: "2024-12-04T15:30:00Z",
    level: "INFO",
    category: "ADMIN",
    action: "ADMIN_ACTION",
    userId: "admin_001",
    userName: "Admin User",
    userRole: "ADMIN",
    ipAddress: "10.0.0.1",
    userAgent: "Chrome/120.0.0.0",
    details: {
      action: "update_user_role",
      targetUser: "user_126",
      oldRole: "INDIVIDUAL",
      newRole: "PARENT",
    },
    description: "Admin updated user role from INDIVIDUAL to PARENT",
  },
  {
    id: "8",
    timestamp: "2024-12-04T14:20:00Z",
    level: "WARNING",
    category: "PERFORMANCE",
    action: "SLOW_QUERY",
    userId: null,
    userName: null,
    userRole: null,
    ipAddress: "internal",
    userAgent: "Database",
    details: {
      query: "SELECT * FROM diary_entries WHERE profileId = ?",
      duration: 5200,
      threshold: 3000,
    },
    description: "Slow query detected (5.2 seconds)",
  },
  {
    id: "9",
    timestamp: "2024-12-04T12:00:00Z",
    level: "INFO",
    category: "SOCIAL",
    action: "INVITE_SENT",
    userId: "user_127",
    userName: "Maria Garcia",
    userRole: "PARENT",
    ipAddress: "192.168.1.102",
    userAgent: "Web App",
    details: {
      inviteCode: "INV-12345",
      invitedEmail: "friend@example.com",
      role: "CHILD",
    },
    description: "Account invite sent to friend@example.com",
  },
  {
    id: "10",
    timestamp: "2024-12-04T10:30:00Z",
    level: "ERROR",
    category: "DATABASE",
    action: "CONNECTION_FAILED",
    userId: null,
    userName: null,
    userRole: null,
    ipAddress: "internal",
    userAgent: "Database Pool",
    details: {
      error: "Connection pool exhausted",
      activeConnections: 100,
      maxConnections: 100,
    },
    description: "Database connection pool exhausted",
  },
];

const categoryConfig = {
  AUTH: {
    icon: Shield,
    label: "Authentication",
    color: "blue",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
  },
  SECURITY: {
    icon: Lock,
    label: "Security",
    color: "red",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
  },
  SYSTEM: {
    icon: Server,
    label: "System",
    color: "purple",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
  },
  CONTENT: {
    icon: FileText,
    label: "Content",
    color: "green",
    bgLight: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
  },
  WELLNESS: {
    icon: Heart,
    label: "Wellness",
    color: "pink",
    bgLight: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-700",
  },
  ADMIN: {
    icon: Settings,
    label: "Admin Actions",
    color: "indigo",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
  },
  PERFORMANCE: {
    icon: Activity,
    label: "Performance",
    color: "yellow",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
  },
  SOCIAL: {
    icon: Users,
    label: "Social",
    color: "cyan",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-700",
  },
  DATABASE: {
    icon: Database,
    label: "Database",
    color: "gray",
    bgLight: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
  },
};

const levelConfig = {
  INFO: {
    icon: Info,
    color: "blue",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  WARNING: {
    icon: AlertTriangle,
    color: "yellow",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
  },
  ERROR: {
    icon: XCircle,
    color: "red",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
  },
  CRITICAL: {
    icon: AlertCircle,
    color: "red",
    bgColor: "bg-red-200",
    textColor: "text-red-800",
  },
};

const actionIcons = {
  USER_LOGIN: LogIn,
  USER_LOGOUT: LogOut,
  FAILED_LOGIN_ATTEMPT: AlertTriangle,
  FOOD_SCAN_CREATED: Apple,
  WORKOUT_LOGGED: Dumbbell,
  ADMIN_ACTION: Shield,
  INVITE_SENT: Mail,
  API_ERROR: XCircle,
  SLOW_QUERY: Clock,
  CONNECTION_FAILED: Database,
  SUSPICIOUS_ACTIVITY: AlertCircle,
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState(new Set());
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const showMessage = (message, type = "success") => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const fetchLogs = async () => {
    setLoading(true);
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
      showMessage("Logs refreshed successfully", "success");
    }, 500);
  };

  const handleExport = () => {
    const exportData = filteredLogs.map((log) => ({
      id: log.id,
      timestamp: log.timestamp,
      level: log.level,
      category: log.category,
      action: log.action,
      user: log.userName,
      description: log.description,
      ipAddress: log.ipAddress,
    }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showMessage("Logs exported successfully", "success");
  };

  const handleBulkDelete = () => {
    if (selectedLogs.size === 0) return;
    setLogs((prev) => prev.filter((log) => !selectedLogs.has(log.id)));
    setSelectedLogs(new Set());
    showMessage(`${selectedLogs.size} logs deleted`, "success");
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.userName &&
        log.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || log.category === filterCategory;
    const matchesLevel = !filterLevel || log.level === filterLevel;

    let matchesDate = true;
    if (filterDateRange) {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      const days = parseInt(filterDateRange);
      const cutoff = new Date(now.setDate(now.getDate() - days));
      matchesDate = logDate >= cutoff;
    }

    return matchesSearch && matchesCategory && matchesLevel && matchesDate;
  });

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "timestamp")
      comparison = new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === "level") comparison = a.level.localeCompare(b.level);
    if (sortBy === "category")
      comparison = a.category.localeCompare(b.category);
    if (sortBy === "user")
      comparison = (a.userName || "").localeCompare(b.userName || "");
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const toggleLogSelection = (logId) => {
    const newSelected = new Set(selectedLogs);
    if (newSelected.has(logId)) {
      newSelected.delete(logId);
    } else {
      newSelected.add(logId);
    }
    setSelectedLogs(newSelected);
  };

  const toggleAllLogs = () => {
    if (selectedLogs.size === sortedLogs.length) {
      setSelectedLogs(new Set());
    } else {
      setSelectedLogs(new Set(sortedLogs.map((log) => log.id)));
    }
  };

  const stats = {
    total: logs.length,
    errors: logs.filter((l) => l.level === "ERROR" || l.level === "CRITICAL")
      .length,
    warnings: logs.filter((l) => l.level === "WARNING").length,
    info: logs.filter((l) => l.level === "INFO").length,
    last24h: logs.filter((l) => {
      const logDate = new Date(l.timestamp);
      const now = new Date();
      const yesterday = new Date(now.setDate(now.getDate() - 1));
      return logDate >= yesterday;
    }).length,
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
                <FileText size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">System Logs</h1>
                <p className="text-sm text-gray-500">
                  Monitor system activities, user actions, and security events
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50"
              >
                <Download size={14} /> Export
              </button>
              {selectedLogs.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-red-50"
                >
                  <Trash2 size={14} /> Delete ({selectedLogs.size})
                </button>
              )}
              <button
                onClick={fetchLogs}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50"
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin" : ""}
                />{" "}
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-5">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <FileText size={14} className="text-blue-500" />
                <p className="text-xs text-gray-500">Total Logs</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <XCircle size={14} className="text-red-500" />
                <p className="text-xs text-gray-500">Errors</p>
              </div>
              <p className="text-xl font-bold text-red-600">{stats.errors}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle size={14} className="text-yellow-500" />
                <p className="text-xs text-gray-500">Warnings</p>
              </div>
              <p className="text-xl font-bold text-yellow-600">
                {stats.warnings}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <Info size={14} className="text-blue-500" />
                <p className="text-xs text-gray-500">Info</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.info}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <Clock size={14} className="text-green-500" />
                <p className="text-xs text-gray-500">Last 24h</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.last24h}</p>
            </div>
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
                placeholder="Search by description, user, action..."
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
                <option value="timestamp">Sort by Time</option>
                <option value="level">Sort by Level</option>
                <option value="category">Sort by Category</option>
                <option value="user">Sort by User</option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                {sortOrder === "asc" ? "↑ Oldest First" : "↓ Newest First"}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">All Categories</option>
                  {Object.entries(categoryConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">All Levels</option>
                  <option value="INFO">Info</option>
                  <option value="WARNING">Warning</option>
                  <option value="ERROR">Error</option>
                  <option value="CRITICAL">Critical</option>
                </select>
                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">All Time</option>
                  <option value="1">Last 24 Hours</option>
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setFilterCategory("");
                  setFilterLevel("");
                  setFilterDateRange("");
                  setSearchTerm("");
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
            {/* Logs Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedLogs.size === sortedLogs.length &&
                            sortedLogs.length > 0
                          }
                          onChange={toggleAllLogs}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sortedLogs.map((log) => {
                      const LevelIcon = levelConfig[log.level]?.icon || Info;
                      const levelColor =
                        levelConfig[log.level]?.textColor || "text-gray-700";
                      const levelBg =
                        levelConfig[log.level]?.bgColor || "bg-gray-100";
                      const categoryConfig_item = categoryConfig[log.category];
                      const ActionIcon = actionIcons[log.action] || Activity;

                      return (
                        <tr
                          key={log.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedLogs.has(log.id)}
                              onChange={() => toggleLogSelection(log.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${levelBg} ${levelColor}`}
                            >
                              <LevelIcon size={10} />
                              {log.level}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            <div>{formatDate(log.timestamp)}</div>
                            <div className="text-xs text-gray-400">
                              {formatTime(log.timestamp)}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {categoryConfig_item && (
                              <span
                                className={`inline-flex items-center gap-1 text-xs ${categoryConfig_item.textColor}`}
                              >
                                <categoryConfig_item.icon size={12} />
                                {categoryConfig_item.label}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {log.userName ? (
                              <div className="flex items-center gap-1 text-sm">
                                <User size={12} className="text-gray-400" />
                                <span>{log.userName}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">
                                System
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-sm">
                              <ActionIcon size={12} className="text-gray-400" />
                              <span className="font-mono text-xs">
                                {log.action}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-md truncate">
                            {log.description}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setSelectedLog(log);
                                setShowDetails(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye size={14} className="text-gray-500" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {sortedLogs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No logs found matching criteria</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Log Detail Modal */}
      {showDetails && selectedLog && (
        <LogDetailModal
          log={selectedLog}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}

// Log Detail Modal Component
function LogDetailModal({ log, onClose }) {
  const LevelIcon = levelConfig[log.level]?.icon || Info;
  const levelColor = levelConfig[log.level]?.textColor || "text-gray-700";
  const levelBg = levelConfig[log.level]?.bgColor || "bg-gray-100";
  const categoryConfig_item = categoryConfig[log.category];
  const ActionIcon = actionIcons[log.action] || Activity;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${levelBg}`}>
              <LevelIcon size={20} className={levelColor} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Log Details
              </h2>
              <p className="text-sm text-gray-500">ID: {log.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <XCircle size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Timestamp</div>
              <div className="text-sm font-medium">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">IP Address</div>
              <div className="text-sm font-mono">{log.ipAddress}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">User Agent</div>
              <div className="text-sm">{log.userAgent}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">User</div>
              <div className="flex items-center gap-2">
                <User size={14} className="text-gray-400" />
                <span className="text-sm font-medium">
                  {log.userName || "System"}
                </span>
                {log.userRole && (
                  <span className="text-xs text-gray-400">
                    ({log.userRole})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Category & Action */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Category</div>
              <div className="flex items-center gap-2">
                {categoryConfig_item && (
                  <>
                    <categoryConfig_item.icon
                      size={16}
                      className={categoryConfig_item.textColor}
                    />
                    <span className="text-sm font-medium">
                      {categoryConfig_item.label}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Action</div>
              <div className="flex items-center gap-2">
                <ActionIcon size={16} className="text-gray-500" />
                <span className="text-sm font-mono">{log.action}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Description</div>
            <div className="text-sm">{log.description}</div>
          </div>

          {/* Details JSON */}
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
            <div className="text-xs text-gray-400 mb-2">
              Additional Details (JSON)
            </div>
            <pre className="text-xs text-green-400 font-mono">
              {JSON.stringify(log.details, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download size={14} /> Export This Log
          </button>
        </div>
      </div>
    </div>
  );
}
