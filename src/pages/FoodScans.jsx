// FoodScans.jsx - User View
import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  AlertCircle,
  TrendingUp,
  Utensils,
  CheckCircle,
  XCircle,
  Calendar,
  Filter,
  BarChart3,
  Clock,
  Info,
} from "lucide-react";

const NAVY = "#0a2366";
const BLUE = "#164bd4";

// Mock data for user's own scans
const mockScans = [
  {
    id: "1",
    productName: "Pancit Canton Original",
    barcode: "480123456789",
    calories: 330,
    proteinGrams: 9,
    fatGrams: 12,
    sodiumMg: 480,
    score: 52,
    supportLevel: "Low",
    wellnessImpact: "High sodium content",
    betterAlternatives: ["Whole wheat pasta", "Brown rice noodles"],
    createdAt: "2026-05-04T08:23:15Z",
  },
  {
    id: "2",
    productName: "Nova Country Cheddar",
    barcode: "480987654321",
    calories: 140,
    proteinGrams: 2,
    fatGrams: 7,
    sodiumMg: 200,
    score: 45,
    supportLevel: "Low",
    wellnessImpact: "High in saturated fat",
    betterAlternatives: ["Baked chips", "Nuts", "Fresh popcorn"],
    createdAt: "2026-05-03T14:30:00Z",
  },
  {
    id: "3",
    productName: "Quaker Oats",
    barcode: "750123456789",
    calories: 150,
    proteinGrams: 5,
    fatGrams: 3,
    sodiumMg: 0,
    score: 88,
    supportLevel: "High",
    wellnessImpact: "Excellent source of fiber",
    betterAlternatives: [],
    createdAt: "2026-05-02T07:15:00Z",
  },
  {
    id: "4",
    productName: "Coca-Cola",
    barcode: "490123456789",
    calories: 140,
    proteinGrams: 0,
    fatGrams: 0,
    sodiumMg: 30,
    score: 35,
    supportLevel: "Low",
    wellnessImpact: "High sugar content",
    betterAlternatives: ["Sparkling water", "Infused water", "Unsweetened tea"],
    createdAt: "2026-05-01T12:45:00Z",
  },
  {
    id: "5",
    productName: "Garden Salad",
    barcode: null,
    calories: 85,
    proteinGrams: 4,
    fatGrams: 3,
    sodiumMg: 120,
    score: 92,
    supportLevel: "High",
    wellnessImpact: "Nutrient-dense meal",
    betterAlternatives: [],
    createdAt: "2026-04-30T19:00:00Z",
  },
];

function FoodScans() {
  const [scans, setScans] = useState(mockScans);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedScan, setSelectedScan] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate stats for user
  const stats = {
    total: scans.length,
    highSupport: scans.filter((s) => s.supportLevel === "High").length,
    lowSupport: scans.filter((s) => s.supportLevel === "Low").length,
    avgScore: Math.round(
      scans.reduce((sum, s) => sum + s.score, 0) / scans.length,
    ),
    totalCalories: scans.reduce((sum, s) => sum + s.calories, 0),
    thisWeek: scans.filter((s) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(s.createdAt) > weekAgo;
    }).length,
  };

  // Filter scans
  const filteredScans = scans.filter((scan) => {
    const matchesSearch =
      search === "" ||
      scan.productName.toLowerCase().includes(search.toLowerCase());

    const matchesLevel =
      filterLevel === "all" || scan.supportLevel === filterLevel;

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "week" &&
        new Date(scan.createdAt) > new Date(Date.now() - 7 * 86400000)) ||
      (dateFilter === "month" &&
        new Date(scan.createdAt) > new Date(Date.now() - 30 * 86400000));

    return matchesSearch && matchesLevel && matchesDate;
  });

  const handleDeleteScan = (id) => {
    if (window.confirm("Are you sure you want to delete this scan?")) {
      setScans(scans.filter((s) => s.id !== id));
      if (selectedScan?.id === id) {
        setShowDetails(false);
        setSelectedScan(null);
      }
    }
  };

  const handleViewDetails = (scan) => {
    setSelectedScan(scan);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Thinking SVG */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <img
              src="/images/thinking.svg"
              alt="Thinking about food choices"
              className="w-16 h-16"
            />
            <div>
              <h1
                className="text-3xl font-bold flex items-center gap-3 mb-2"
                style={{ color: NAVY }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
                  }}
                >
                  <Utensils size={24} className="text-white" />
                </div>
                My Food Scans
              </h1>
              <p className="text-gray-500">
                Track your nutrition and discover healthier alternatives
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={14} />
              <span>
                Last scan: {new Date(scans[0]?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Scans</p>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>
                  {stats.total}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +{stats.thisWeek} this week
                </p>
              </div>
              <Utensils size={20} color={NAVY} opacity={0.3} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">Avg Wellness Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.avgScore}
                </p>
                <p className="text-xs text-gray-500 mt-1">out of 100</p>
              </div>
              <BarChart3 size={20} color="#10b981" opacity={0.3} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">Healthy Choices</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.highSupport}
                </p>
                <p className="text-xs text-gray-500 mt-1">High support items</p>
              </div>
              <CheckCircle size={20} color="#10b981" opacity={0.3} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">Needs Improvement</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.lowSupport}
                </p>
                <p className="text-xs text-gray-500 mt-1">Low support items</p>
              </div>
              <AlertCircle size={20} color="#f59e0b" opacity={0.3} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Search Products
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
                />
              </div>
            </div>
            <div className="w-40">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Support Level
              </label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
              >
                <option value="all">All Levels</option>
                <option value="High">High Support</option>
                <option value="Medium">Medium Support</option>
                <option value="Low">Low Support</option>
              </select>
            </div>
            <div className="w-40">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Date Range
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#164bd4]"
              >
                <option value="all">All Time</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            {(search || filterLevel !== "all" || dateFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilterLevel("all");
                  setDateFilter("all");
                }}
                className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                style={{ color: NAVY }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Scans Grid */}
        {filteredScans.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <img
              src="/images/thinking.svg"
              alt="No scans found"
              className="w-32 h-32 mx-auto mb-4 opacity-50"
            />
            <AlertCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No food scans found</p>
            <p className="text-sm text-gray-400">
              Start scanning products to track your nutrition
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScans.map((scan) => (
              <div
                key={scan.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg" style={{ color: NAVY }}>
                        {scan.productName}
                      </h3>
                      {scan.barcode && (
                        <p className="text-xs text-gray-400 mt-1">
                          Barcode: {scan.barcode}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleViewDetails(scan)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        style={{ color: BLUE }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteScan(scan.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Score and Support Level */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Wellness Score
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 rounded-lg text-sm font-bold ${
                          scan.score >= 70
                            ? "bg-green-100 text-green-700"
                            : scan.score >= 50
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {scan.score}/100
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Support Level
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                          scan.supportLevel === "High"
                            ? "bg-green-100 text-green-700"
                            : scan.supportLevel === "Medium"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {scan.supportLevel === "High" ? (
                          <CheckCircle size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {scan.supportLevel}
                      </span>
                    </div>
                  </div>

                  {/* Nutrition Info */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="text-sm font-bold" style={{ color: NAVY }}>
                        {scan.calories}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="text-sm font-bold" style={{ color: NAVY }}>
                        {scan.proteinGrams}g
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Fat</p>
                      <p className="text-sm font-bold" style={{ color: NAVY }}>
                        {scan.fatGrams}g
                      </p>
                    </div>
                  </div>

                  {/* Wellness Impact */}
                  {scan.wellnessImpact && (
                    <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-700 flex items-start gap-1">
                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                        <span>{scan.wellnessImpact}</span>
                      </p>
                    </div>
                  )}

                  {/* Better Alternatives */}
                  {scan.betterAlternatives.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                        <TrendingUp size={12} />
                        Healthier Alternatives:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {scan.betterAlternatives.map((alt, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {new Date(scan.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedScan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                Product Details
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-xl mb-2" style={{ color: NAVY }}>
                {selectedScan.productName}
              </h4>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    Nutrition Facts
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Calories</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: NAVY }}
                      >
                        {selectedScan.calories}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Protein</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: NAVY }}
                      >
                        {selectedScan.proteinGrams}g
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Fat</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: NAVY }}
                      >
                        {selectedScan.fatGrams}g
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Sodium</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: NAVY }}
                      >
                        {selectedScan.sodiumMg}mg
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    Wellness Score
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-2xl font-bold ${
                        selectedScan.score >= 70
                          ? "text-green-600"
                          : selectedScan.score >= 50
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {selectedScan.score}/100
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                        selectedScan.supportLevel === "High"
                          ? "bg-green-100 text-green-700"
                          : selectedScan.supportLevel === "Medium"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedScan.supportLevel === "High" ? (
                        <CheckCircle size={12} />
                      ) : (
                        <XCircle size={12} />
                      )}
                      {selectedScan.supportLevel} Support
                    </span>
                  </div>
                </div>

                {selectedScan.wellnessImpact && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      Impact
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedScan.wellnessImpact}
                    </p>
                  </div>
                )}

                {selectedScan.betterAlternatives.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      Better Alternatives
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedScan.betterAlternatives.map((alt, idx) => (
                        <span
                          key={idx}
                          className="text-sm px-3 py-1 bg-green-50 text-green-700 rounded-full"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="w-full px-4 py-2 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)`,
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodScans;
