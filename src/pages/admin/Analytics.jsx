// Analytics.jsx - All filters consolidated below stats cards
import React, { useState } from "react";
import {
  TrendingUp,
  Users,
  Activity,
  ArrowUp,
  ArrowDown,
  Download,
  RefreshCw,
  UserCheck,
  Heart,
  Target,
  DollarSign,
  Filter,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Eye,
  Calendar,
  Clock,
  Zap,
  Award,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const NAVY = "#0a2366";
const BLUE = "#164bd4";

// Mock analytics data
const analyticsData = {
  totalUsers: 1247,
  activeUsers: 982,
  newUsersThisMonth: 156,
  userGrowth: 12.5,
  roleDistribution: {
    Individual: 845,
    Parent: 234,
    Child: 128,
    Admin: 5,
    Caregiver: 35,
  },
  demographics: {
    ageGroups: [
      { range: "18-24", count: 245 },
      { range: "25-34", count: 412 },
      { range: "35-44", count: 289 },
      { range: "45-54", count: 178 },
      { range: "55+", count: 123 },
    ],
    sexDistribution: [
      { name: "Male", value: 587 },
      { name: "Female", value: 660 },
    ],
    activityLevels: [
      { name: "Sedentary", value: 234 },
      { name: "Lightly Active", value: 356 },
      { name: "Moderately Active", value: 389 },
      { name: "Active", value: 198 },
      { name: "Very Active", value: 70 },
    ],
    healthGoals: [
      { name: "Lose Weight", value: 412 },
      { name: "Build Muscle", value: 289 },
      { name: "Maintain Weight", value: 234 },
      { name: "Stay Healthy", value: 198 },
    ],
  },
  financial: {
    averageIncome: 52340,
    averageBudget: 18750,
    incomeDistribution: [
      { range: "$0-25k", count: 234 },
      { range: "$25-50k", count: 412 },
      { range: "$50-75k", count: 289 },
      { range: "$75-100k", count: 178 },
      { range: "$100k+", count: 134 },
    ],
  },
  healthMetrics: {
    averageBMI: 24.8,
    averageWellnessScore: 71.4,
    bmiDistribution: [
      { name: "Underweight", value: 89 },
      { name: "Normal", value: 523 },
      { name: "Overweight", value: 412 },
      { name: "Obese", value: 223 },
    ],
    wellnessScoreDistribution: [
      { name: "Excellent", value: 324 },
      { name: "Good", value: 456 },
      { name: "Fair", value: 312 },
      { name: "Poor", value: 155 },
    ],
  },
  engagement: {
    weeklyActiveUsers: 789,
    monthlyActiveUsers: 982,
    averageSessionTime: 8.4,
    retentionRate: 67.3,
    dailyActiveUsers: 345,
  },
  growthTrends: {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    users: [845, 892, 934, 978, 1023, 1078, 1124, 1167, 1198, 1223, 1241, 1247],
  },
};

const growthData = analyticsData.growthTrends.months.map((month, index) => ({
  month,
  users: analyticsData.growthTrends.users[index],
}));
const roleData = Object.entries(analyticsData.roleDistribution).map(
  ([name, value]) => ({ name, value }),
);
const ageData = analyticsData.demographics.ageGroups;
const activityData = analyticsData.demographics.activityLevels;
const healthGoalsData = analyticsData.demographics.healthGoals;
const wellnessData = analyticsData.healthMetrics.wellnessScoreDistribution;
const bmiData = analyticsData.healthMetrics.bmiDistribution;
const incomeData = analyticsData.financial.incomeDistribution;

const COLORS = [
  BLUE,
  NAVY,
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];
const BMI_COLORS = ["#10b981", BLUE, "#f59e0b", "#ef4444"];
const WELLNESS_COLORS = ["#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        <div className="text-sm text-blue-600">
          {payload[0].value.toLocaleString()} users
        </div>
      </div>
    );
  }
  return null;
};

// Stat Card Component
function StatCard({ title, value, trend, trendValue, subtitle, icon: Icon }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 p-4 transition-all hover:shadow-md hover:border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {title}
        </div>
        {Icon && (
          <Icon
            size={14}
            className="text-gray-300 group-hover:text-blue-500 transition-colors"
          />
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="flex items-center gap-2 mt-1">
        <div
          className={`flex items-center gap-0.5 text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}
        >
          {trend === "up" ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
          <span className="font-medium">{trendValue}</span>
        </div>
        <div className="text-xs text-gray-400">vs last month</div>
      </div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );
}

// Metric Card Component
function MetricCard({ label, value, change, icon: Icon, subtitle }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100 hover:border-gray-200 transition-all">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-gray-400">{label}</div>
        {Icon && <Icon size={12} className="text-gray-300" />}
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      {subtitle && (
        <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>
      )}
      {change !== undefined && (
        <div
          className={`flex items-center gap-0.5 text-xs mt-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          {change >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
          {Math.abs(change)}% from last month
        </div>
      )}
    </div>
  );
}

// Section Header Component
function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-blue-600" />}
        <div>
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30d");
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  // Filter options
  const dateOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "1y", label: "Last year" },
  ];

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "Individual", label: "Individual" },
    { value: "Parent", label: "Parent" },
    { value: "Child", label: "Child" },
    { value: "Caregiver", label: "Caregiver" },
  ];

  const ageOptions = [
    { value: "all", label: "All Ages" },
    { value: "18-24", label: "18-24" },
    { value: "25-34", label: "25-34" },
    { value: "35-44", label: "35-44" },
    { value: "45-54", label: "45-54" },
    { value: "55+", label: "55+" },
  ];

  const activityOptions = [
    { value: "all", label: "All Levels" },
    { value: "Sedentary", label: "Sedentary" },
    { value: "Lightly Active", label: "Lightly Active" },
    { value: "Moderately Active", label: "Moderately Active" },
    { value: "Active", label: "Active" },
    { value: "Very Active", label: "Very Active" },
  ];

  // Filtered data based on selections
  const filteredRoleData =
    roleFilter === "all"
      ? roleData
      : roleData.filter((d) => d.name === roleFilter);

  const filteredAgeData =
    ageFilter === "all"
      ? ageData
      : ageData.filter((d) => d.range === ageFilter);

  const filteredActivityData =
    activityFilter === "all"
      ? activityData
      : activityData.filter((d) => d.name === activityFilter);

  // Get date range label
  const getDateRangeLabel = () => {
    const option = dateOptions.find((opt) => opt.value === dateRange);
    return option ? option.label : "Last 30 days";
  };

  // Clear all filters
  const clearAllFilters = () => {
    setDateRange("30d");
    setRoleFilter("all");
    setAgeFilter("all");
    setActivityFilter("all");
  };

  const hasActiveFilters =
    dateRange !== "30d" ||
    roleFilter !== "all" ||
    ageFilter !== "all" ||
    activityFilter !== "all";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header - No filters here */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BarChart3 size={14} className="text-white" />
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900">
                  Analytics Dashboard
                </div>
                <div className="text-xs text-gray-400">
                  Monitor platform performance and user insights
                </div>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={loading}
              className="px-2.5 py-1 bg-gray-900 text-white rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : (
                <Download size={12} />
              )}
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <StatCard
            title="TOTAL USERS"
            value={analyticsData.totalUsers.toLocaleString()}
            trend="up"
            trendValue="+12.5%"
            subtitle="+156 new this month"
            icon={Users}
          />
          <StatCard
            title="ACTIVE USERS"
            value={analyticsData.activeUsers.toLocaleString()}
            trend="up"
            trendValue="+5.2%"
            subtitle={`${Math.round((analyticsData.activeUsers / analyticsData.totalUsers) * 100)}% of total`}
            icon={Activity}
          />
          <StatCard
            title="AVG WELLNESS SCORE"
            value={analyticsData.healthMetrics.averageWellnessScore}
            trend="up"
            trendValue="+2.1"
            subtitle="Out of 100"
            icon={Heart}
          />
          <StatCard
            title="RETENTION RATE"
            value={`${analyticsData.engagement.retentionRate}%`}
            trend="up"
            trendValue="+3.4%"
            subtitle="vs last month"
            icon={UserCheck}
          />
        </div>

        {/* Consolidated Filter Bar - Below Stats Cards */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <div className="text-xs font-medium text-gray-700">Filters:</div>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <X size={12} />
                Clear all
              </button>
            )}
          </div>

          {/* Filter Row - All filters in one row */}
          <div className="flex flex-wrap gap-3">
            {/* Date Range Filter */}
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <Users size={12} className="text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Filter */}
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-gray-400" />
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Filter */}
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-gray-400" />
              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {activityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
              {dateRange !== "30d" && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                  Date: {getDateRangeLabel()}
                  <button
                    onClick={() => setDateRange("30d")}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </div>
              )}
              {roleFilter !== "all" && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                  Role: {roleFilter}
                  <button
                    onClick={() => setRoleFilter("all")}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </div>
              )}
              {ageFilter !== "all" && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                  Age: {ageFilter}
                  <button
                    onClick={() => setAgeFilter("all")}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </div>
              )}
              {activityFilter !== "all" && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                  Activity: {activityFilter}
                  <button
                    onClick={() => setActivityFilter("all")}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Growth - Line Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
          <SectionHeader
            title="User Growth"
            subtitle={`Monthly user acquisition trends (${getDateRangeLabel()})`}
            icon={TrendingUp}
          />
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke={BLUE}
                strokeWidth={3}
                dot={{ fill: BLUE, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Total Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Role Distribution - Pie Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="User Roles"
              subtitle={`Distribution by account type (${roleFilter !== "all" ? `Filtered: ${roleFilter}` : "All roles"})`}
              icon={Users}
            />
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={filteredRoleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    percent > 0.05
                      ? `${name}: ${(percent * 100).toFixed(0)}%`
                      : ""
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {filteredRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Age Distribution - Bar Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="Age Distribution"
              subtitle={`Users by age group (${ageFilter !== "all" ? `Filtered: ${ageFilter}` : "All ages"})`}
              icon={Calendar}
            />
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={filteredAgeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="range"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={BLUE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Gender Distribution */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="Gender Distribution"
              subtitle="User demographics by gender"
            />
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.demographics.sexDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {analyticsData.demographics.sexDistribution.map(
                    (entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ),
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Levels */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="Activity Levels"
              subtitle={`User engagement intensity (${activityFilter !== "all" ? `Filtered: ${activityFilter}` : "All levels"})`}
              icon={Zap}
            />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={filteredActivityData}
                layout="vertical"
                margin={{ left: 80 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill={BLUE} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health & Wellness Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Health Goals */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="Health Goals"
              subtitle="Primary wellness objectives"
              icon={Target}
            />
            <div className="space-y-3">
              {healthGoalsData.map((goal, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{goal.name}</span>
                    <span className="font-medium text-gray-900">
                      {goal.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-purple-500"
                      style={{ width: `${(goal.value / 412) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wellness Scores */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="Wellness Scores"
              subtitle="Overall health assessment"
              icon={Award}
            />
            <div className="space-y-3">
              {wellnessData.map((score, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{score.name}</span>
                    <span className="font-medium text-gray-900">
                      {score.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(score.value / 456) * 100}%`,
                        backgroundColor:
                          WELLNESS_COLORS[idx % WELLNESS_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BMI & Financial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* BMI Distribution */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="BMI Distribution"
              subtitle="Body Mass Index categories"
              icon={Activity}
            />
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={bmiData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  dataKey="value"
                >
                  {bmiData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BMI_COLORS[index % BMI_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <span className="text-sm text-gray-600">Average BMI</span>
              <span className="text-lg font-bold text-gray-900">
                {analyticsData.healthMetrics.averageBMI}
              </span>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <SectionHeader
              title="Financial Overview"
              subtitle="Income distribution and budget metrics"
              icon={DollarSign}
            />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="range"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-0.5">
                  Average Income
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ${analyticsData.financial.averageIncome.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-0.5">
                  Average Budget
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ${analyticsData.financial.averageBudget.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <SectionHeader
            title="User Engagement"
            subtitle={`Platform usage and retention metrics (${getDateRangeLabel()})`}
            icon={Activity}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <MetricCard
              label="Daily Active Users"
              value={analyticsData.engagement.dailyActiveUsers.toLocaleString()}
              change={3.2}
              icon={Eye}
            />
            <MetricCard
              label="Weekly Active Users"
              value={analyticsData.engagement.weeklyActiveUsers.toLocaleString()}
              change={2.1}
              icon={Users}
            />
            <MetricCard
              label="Average Session Time"
              value={`${analyticsData.engagement.averageSessionTime}m`}
              change={0.8}
              icon={Clock}
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Monthly Active Users</span>
                <span className="font-bold text-gray-900">
                  {analyticsData.engagement.monthlyActiveUsers.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(analyticsData.engagement.monthlyActiveUsers / analyticsData.totalUsers) * 100}%`,
                    backgroundColor: BLUE,
                  }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {Math.round(
                  (analyticsData.engagement.monthlyActiveUsers /
                    analyticsData.totalUsers) *
                    100,
                )}
                % of total user base
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Retention Rate (30 days)</span>
                <span className="font-bold text-gray-900">
                  {analyticsData.engagement.retentionRate}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${analyticsData.engagement.retentionRate}%`,
                    backgroundColor: "#10b981",
                  }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Users returning after 30 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
