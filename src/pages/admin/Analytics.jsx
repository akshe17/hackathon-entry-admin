// Analytics.jsx
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
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
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

// Transform data for recharts
const growthData = analyticsData.growthTrends.months.map((month, index) => ({
  month,
  users: analyticsData.growthTrends.users[index],
}));

const roleData = Object.entries(analyticsData.roleDistribution).map(
  ([name, value]) => ({
    name,
    value,
  }),
);

const ageData = analyticsData.demographics.ageGroups;

const activityData = analyticsData.demographics.activityLevels;

const healthGoalsData = analyticsData.demographics.healthGoals;

const wellnessData = analyticsData.healthMetrics.wellnessScoreDistribution;

const bmiData = analyticsData.healthMetrics.bmiDistribution;

const incomeData = analyticsData.financial.incomeDistribution;

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-blue-600">
          {payload[0].value.toLocaleString()} users
        </p>
      </div>
    );
  }
  return null;
};

// Stat Card Component
function StatCard({ title, value, trend, trendValue, subtitle, icon: Icon }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 transition-all hover:shadow-lg hover:border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        {Icon && (
          <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
            <Icon
              size={16}
              className="text-gray-400 group-hover:text-blue-600"
            />
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-2 mt-2">
        <div
          className={`flex items-center gap-0.5 text-xs font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          <span>{trendValue}</span>
        </div>
        <span className="text-xs text-gray-400">vs last month</span>
      </div>
      {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
    </div>
  );
}

// Metric Card Component
function MetricCard({ label, value, change, icon: Icon }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        {Icon && <Icon size={14} className="text-gray-400" />}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change !== undefined && (
        <div
          className={`flex items-center gap-1 text-xs mt-2 font-medium ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(change)}% from last month
        </div>
      )}
    </div>
  );
}

// Section Header Component
function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon size={18} className="text-blue-600" />}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

// Color palettes
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

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30d");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${BLUE}, ${NAVY})`,
                }}
              >
                <BarChart3 size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Monitor platform performance and user insights
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full lg:w-auto">
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {["7d", "30d", "90d", "1y"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      dateRange === range
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-all hover:border-gray-300"
              >
                <Filter size="16" />
                <span className="hidden sm:inline">Filters</span>
                {showFilters ? (
                  <ChevronUp size="16" />
                ) : (
                  <ChevronDown size="16" />
                )}
              </button>
              <button
                onClick={handleExport}
                disabled={loading}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw size="16" className="animate-spin" />
                ) : (
                  <Download size="16" />
                )}
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-5 p-5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All User Roles</option>
                  <option>Individual</option>
                  <option>Parent</option>
                  <option>Child</option>
                </select>
                <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Age Groups</option>
                  <option>18-24</option>
                  <option>25-34</option>
                  <option>35-44</option>
                  <option>45-54</option>
                  <option>55+</option>
                </select>
                <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Activity Levels</option>
                  <option>Sedentary</option>
                  <option>Lightly Active</option>
                  <option>Moderately Active</option>
                  <option>Active</option>
                  <option>Very Active</option>
                </select>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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

        {/* User Growth - Line Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm hover:shadow-md transition-shadow">
          <SectionHeader
            title="User Growth"
            subtitle="Monthly user acquisition trends"
            icon={TrendingUp}
          />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
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
                activeDot={{ r: 6, strokeWidth: 2 }}
                name="Total Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Role Distribution - Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="User Roles"
              subtitle="Distribution by account type"
              icon={Users}
            />
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Age Distribution - Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="Age Distribution"
              subtitle="Users by age group"
              icon={Calendar}
            />
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="range" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={BLUE} radius={[8, 8, 0, 0]}>
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Gender Distribution - Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="Gender Distribution"
              subtitle="User demographics by gender"
            />
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={analyticsData.demographics.sexDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
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

          {/* Activity Levels - Horizontal Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="Activity Levels"
              subtitle="User engagement intensity"
            />
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={activityData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill={BLUE} radius={[0, 8, 8, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health & Wellness Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Health Goals - Horizontal Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="Health Goals"
              subtitle="Primary wellness objectives"
              icon={Target}
            />
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={healthGoalsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Wellness Scores - Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="Wellness Scores"
              subtitle="Overall health assessment"
              icon={Heart}
            />
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={wellnessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill={BLUE} radius={[8, 8, 0, 0]}>
                  {wellnessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={WELLNESS_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BMI & Financial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* BMI Distribution - Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="BMI Distribution"
              subtitle="Body Mass Index categories"
              icon={Activity}
            />
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={bmiData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average BMI</span>
                <span className="text-xl font-bold text-gray-900">
                  {analyticsData.healthMetrics.averageBMI}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Overview - Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <SectionHeader
              title="Financial Overview"
              subtitle="Income distribution and budget metrics"
              icon={DollarSign}
            />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="range" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Average Income</p>
                <p className="text-xl font-bold text-gray-900">
                  ${analyticsData.financial.averageIncome.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Average Budget</p>
                <p className="text-xl font-bold text-gray-900">
                  ${analyticsData.financial.averageBudget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <SectionHeader
            title="User Engagement"
            subtitle="Platform usage and retention metrics"
            icon={Activity}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
              icon={Activity}
            />
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">
                  Monthly Active Users
                </span>
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
              <p className="text-xs text-gray-400 mt-1">
                {Math.round(
                  (analyticsData.engagement.monthlyActiveUsers /
                    analyticsData.totalUsers) *
                    100,
                )}
                % of total user base
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">
                  Retention Rate (30 days)
                </span>
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
              <p className="text-xs text-gray-400 mt-1">
                Users returning after 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
