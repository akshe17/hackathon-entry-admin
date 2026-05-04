import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Container,
  SimpleGrid,
  Paper,
  Stack,
  Group,
  Text,
  Title,
  Badge,
  Button,
  Box,
  Divider,
  ThemeIcon,
  Progress,
  Table,
  Avatar,
  ActionIcon,
  Menu as MantineMenu,
} from "@mantine/core";
import {
  Activity,
  Users,
  FileText,
  TrendingUp,
  UserCheck,
  UserX,
  Calendar,
  Clock,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  Server,
  Cpu,
  HardDrive,
  Zap,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const NAVY = "#0a2366";
const BLUE = "#164bd4";
const LIGHT = "#f8faff";

// ── Mock Admin Data ─────────────────────────────────────────────────────────────────

const adminStats = {
  totalUsers: 1247,
  activeUsers: 982,
  inactiveUsers: 265,
  newUsersToday: 23,
  totalScans: 4521,
  scansThisWeek: 843,
  avgWellnessScore: 71.4,
  totalDiaryEntries: 3892,
  entriesThisWeek: 567,
};

const userGrowthData = {
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
};

const recentUsers = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    joinDate: "2026-05-04",
    status: "active",
    wellnessScore: 82,
    scans: 23,
    diaryEntries: 12,
  },
  {
    id: 2,
    name: "John Reyes",
    email: "john.reyes@email.com",
    joinDate: "2026-05-03",
    status: "active",
    wellnessScore: 67,
    scans: 8,
    diaryEntries: 5,
  },
  {
    id: 3,
    name: "Anna Cruz",
    email: "anna.cruz@email.com",
    joinDate: "2026-05-02",
    status: "inactive",
    wellnessScore: 45,
    scans: 2,
    diaryEntries: 1,
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    email: "carlos.m@email.com",
    joinDate: "2026-05-01",
    status: "active",
    wellnessScore: 91,
    scans: 34,
    diaryEntries: 18,
  },
  {
    id: 5,
    name: "Lisa Garcia",
    email: "lisa.garcia@email.com",
    joinDate: "2026-04-30",
    status: "active",
    wellnessScore: 76,
    scans: 15,
    diaryEntries: 9,
  },
];

const systemLogs = [
  {
    id: 1,
    action: "User Login",
    user: "maria.santos@email.com",
    timestamp: "2026-05-04 08:23:15",
    status: "success",
    ip: "192.168.1.45",
  },
  {
    id: 2,
    action: "Scan Product",
    user: "john.reyes@email.com",
    timestamp: "2026-05-04 09:15:22",
    status: "success",
    ip: "192.168.1.23",
  },
  {
    id: 3,
    action: "Failed Login",
    user: "unknown@email.com",
    timestamp: "2026-05-04 10:02:34",
    status: "failed",
    ip: "45.67.89.12",
  },
  {
    id: 4,
    action: "Update Profile",
    user: "anna.cruz@email.com",
    timestamp: "2026-05-04 11:45:18",
    status: "success",
    ip: "192.168.1.67",
  },
  {
    id: 5,
    action: "Export Data",
    user: "admin@healthapp.com",
    timestamp: "2026-05-04 12:30:05",
    status: "success",
    ip: "192.168.1.1",
  },
];

const activityByHour = {
  hours: ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
  scans: [45, 89, 156, 234, 198, 167, 143, 98, 56],
  logins: [67, 123, 198, 245, 213, 178, 145, 112, 78],
};

const wellnessDistribution = {
  labels: ["Excellent (80-100)", "Good (60-79)", "Fair (40-59)", "Poor (0-39)"],
  counts: [324, 456, 312, 155],
  colors: ["#16a34a", BLUE, "#f59e0b", "#dc2626"],
};

const scanTrends = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  scans: [124, 156, 143, 178, 212, 98, 76],
};

// ── Chart Configs ─────────────────────────────────────────────────────────────

function useUserGrowthChart() {
  return useMemo(
    () => ({
      options: {
        chart: {
          type: "area",
          toolbar: { show: false },
          sparkline: { enabled: false },
          background: "transparent",
          fontFamily: "Inter, sans-serif",
        },
        colors: [NAVY, BLUE, "#93b4f0"],
        stroke: { curve: "smooth", width: 2 },
        fill: {
          type: "gradient",
          gradient: { shadeIntensity: 0.1, opacityFrom: 0.3, opacityTo: 0.05 },
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories: userGrowthData.months,
          labels: { style: { colors: "#9ca3af", fontSize: "11px" } },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          labels: { style: { colors: "#9ca3af", fontSize: "11px" } },
          title: {
            text: "Total Users",
            style: { color: "#9ca3af", fontSize: "11px" },
          },
        },
        grid: { borderColor: "#f0f3fa", strokeDashArray: 4 },
        tooltip: { theme: "light", style: { fontFamily: "Inter, sans-serif" } },
      },
      series: [{ name: "Total Users", data: userGrowthData.users }],
    }),
    [],
  );
}

function useActivityChart() {
  return useMemo(
    () => ({
      options: {
        chart: {
          type: "line",
          toolbar: { show: false },
          background: "transparent",
          fontFamily: "Inter, sans-serif",
        },
        colors: [NAVY, "#0ea5e9"],
        stroke: { curve: "smooth", width: [2, 2] },
        fill: { type: "solid" },
        dataLabels: { enabled: false },
        xaxis: {
          categories: activityByHour.hours,
          labels: { style: { colors: "#9ca3af", fontSize: "11px" } },
        },
        yaxis: { labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
        grid: { borderColor: "#f0f3fa", strokeDashArray: 4 },
        legend: {
          position: "top",
          fontSize: "12px",
          labels: { colors: "#374151" },
        },
        tooltip: { theme: "light" },
      },
      series: [
        { name: "Scans", data: activityByHour.scans },
        { name: "Logins", data: activityByHour.logins },
      ],
    }),
    [],
  );
}

function useWellnessDonut() {
  return useMemo(
    () => ({
      options: {
        chart: {
          type: "donut",
          background: "transparent",
          fontFamily: "Inter, sans-serif",
        },
        colors: wellnessDistribution.colors,
        labels: wellnessDistribution.labels,
        dataLabels: { enabled: false },
        legend: {
          position: "bottom",
          fontSize: "11px",
          fontFamily: "Inter, sans-serif",
          labels: { colors: "#374151" },
        },
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "Users",
                  fontSize: "12px",
                  color: "#9ca3af",
                  formatter: () => `${adminStats.totalUsers}`,
                },
              },
            },
          },
        },
        stroke: { width: 0 },
        tooltip: { theme: "light" },
      },
      series: wellnessDistribution.counts,
    }),
    [],
  );
}

function useScanTrendChart() {
  return useMemo(
    () => ({
      options: {
        chart: {
          type: "bar",
          toolbar: { show: false },
          background: "transparent",
          fontFamily: "Inter, sans-serif",
        },
        colors: [BLUE],
        plotOptions: { bar: { borderRadius: 4, columnWidth: "60%" } },
        dataLabels: { enabled: false },
        xaxis: {
          categories: scanTrends.days,
          labels: { style: { colors: "#9ca3af", fontSize: "11px" } },
        },
        yaxis: { labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
        grid: { borderColor: "#f0f3fa", strokeDashArray: 4 },
        tooltip: { theme: "light" },
      },
      series: [{ name: "Scans", data: scanTrends.scans }],
    }),
    [],
  );
}

// ── Stats Card ─────────────────────────────────────────────────────────────

function StatsCard({ title, value, icon, color, trend, trendValue }) {
  return (
    <Paper
      p="md"
      radius="md"
      style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}
    >
      <Group justify="space-between" mb="xs">
        <Text
          size="xs"
          c="dimmed"
          fw={600}
          style={{ textTransform: "uppercase", letterSpacing: "0.07em" }}
        >
          {title}
        </Text>
        <ThemeIcon
          size={30}
          radius="md"
          style={{ backgroundColor: color + "14", color }}
        >
          {icon}
        </ThemeIcon>
      </Group>
      <Text
        fw={800}
        style={{
          fontSize: "1.8rem",
          color: NAVY,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </Text>
      {trend && (
        <Group gap={4} mt={6}>
          {trend === "up" ? (
            <TrendingUp size={12} color="#16a34a" />
          ) : (
            <TrendingUp
              size={12}
              color="#dc2626"
              style={{ transform: "rotate(180deg)" }}
            />
          )}
          <Text
            size="xs"
            style={{
              color: trend === "up" ? "#16a34a" : "#dc2626",
              fontWeight: 600,
            }}
          >
            {trendValue}
          </Text>
          <Text size="xs" c="dimmed">
            vs last week
          </Text>
        </Group>
      )}
    </Paper>
  );
}

// ── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const config = {
    active: { color: "#16a34a", bg: "#16a34a14", label: "Active" },
    inactive: { color: "#dc2626", bg: "#dc262614", label: "Inactive" },
    success: { color: "#16a34a", bg: "#16a34a14", label: "Success" },
    failed: { color: "#dc2626", bg: "#dc262614", label: "Failed" },
  };
  const c = config[status] || config.active;
  return (
    <Badge
      size="xs"
      style={{ backgroundColor: c.bg, color: c.color, fontWeight: 600 }}
    >
      {c.label}
    </Badge>
  );
}

// ── Main Admin Dashboard ─────────────────────────────────────────────────────

export default function AdminDashboard() {
  const userGrowth = useUserGrowthChart();
  const activityChart = useActivityChart();
  const wellnessDonut = useWellnessDonut();
  const scanTrend = useScanTrendChart();

  const activePercentage = Math.round(
    (adminStats.activeUsers / adminStats.totalUsers) * 100,
  );
  const scanCompletion = Math.round((adminStats.scansThisWeek / 1000) * 100);

  return (
    <Box style={{ backgroundColor: LIGHT, minHeight: "100vh" }}>
      {/* ── Header ── */}
      <Box
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f3fa",
          padding: "28px 32px 0",
        }}
      >
        <Group justify="space-between" align="flex-end" wrap="wrap" gap="md">
          <Stack gap={6} pb={24}>
            <Text
              size="xs"
              c="dimmed"
              fw={600}
              style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Admin Dashboard ·{" "}
              {new Date().toLocaleDateString("en-PH", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            <Title
              order={2}
              style={{
                color: NAVY,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
              }}
            >
              System Overview
            </Title>
            <Group gap="sm" mt={4}>
              <Box
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#eff4ff",
                  border: "1px solid #dbeafe",
                  borderRadius: 20,
                  padding: "4px 12px",
                }}
              >
                <Server size={12} color={BLUE} />
                <Text size="xs" style={{ color: BLUE, fontWeight: 600 }}>
                  All Systems Operational
                </Text>
              </Box>
              <Box
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#f8faff",
                  border: "1px solid #e8ecf5",
                  borderRadius: 20,
                  padding: "4px 12px",
                }}
              >
                <ShieldCheck size={12} color="#16a34a" />
                <Text size="xs" c="dimmed" fw={500}>
                  Admin Access: Full
                </Text>
              </Box>
            </Group>
          </Stack>

          {/* Quick actions */}
          <Group pb={24} gap="sm">
            <Button
              size="sm"
              variant="light"
              radius="md"
              leftSection={<Download size={14} />}
              style={{ backgroundColor: "#eff4ff", color: BLUE }}
            >
              Export Report
            </Button>
            <Button
              size="sm"
              variant="light"
              radius="md"
              leftSection={<Filter size={14} />}
              style={{
                backgroundColor: "#f8faff",
                color: NAVY,
                border: "1px solid #e8ecf5",
              }}
            >
              Filter
            </Button>
          </Group>
        </Group>

        {/* Tab strip */}
        <Box
          style={{
            marginLeft: -32,
            marginRight: -32,
            borderTop: "1px solid #f0f3fa",
          }}
        >
          <Group gap={0} style={{ overflowX: "auto" }}>
            {[
              { icon: <Activity size={15} />, label: "Overview", active: true },
              { icon: <Users size={15} />, label: "Users", active: false },
              {
                icon: <FileText size={15} />,
                label: "System Logs",
                active: false,
              },
              { icon: <Server size={15} />, label: "Analytics", active: false },
            ].map(({ icon, label, active }, i) => (
              <Box
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 24px",
                  color: active ? NAVY : "#9ca3af",
                  fontWeight: active ? 700 : 500,
                  fontSize: 13,
                  borderRight: "1px solid #f0f3fa",
                  borderBottom: active
                    ? `2px solid ${NAVY}`
                    : "2px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s",
                  userSelect: "none",
                }}
              >
                {icon}
                {label}
              </Box>
            ))}
          </Group>
        </Box>
      </Box>

      <Container size="xl" py="xl" px="lg">
        {/* ── Stats Row ── */}
        <SimpleGrid cols={{ base: 2, md: 4, lg: 6 }} spacing="md" mb="md">
          <StatsCard
            title="Total Users"
            value={adminStats.totalUsers.toLocaleString()}
            icon={<Users size={16} />}
            color={NAVY}
            trend="up"
            trendValue="+12%"
          />
          <StatsCard
            title="Active Users"
            value={adminStats.activeUsers.toLocaleString()}
            icon={<UserCheck size={16} />}
            color="#16a34a"
            trend="up"
            trendValue="+5%"
          />
          <StatsCard
            title="Total Scans"
            value={adminStats.totalScans.toLocaleString()}
            icon={<Activity size={16} />}
            color={BLUE}
            trend="up"
            trendValue="+18%"
          />
          <StatsCard
            title="Avg Score"
            value={adminStats.avgWellnessScore}
            icon={<TrendingUp size={16} />}
            color="#f59e0b"
            trend="up"
            trendValue="+2%"
          />
          <StatsCard
            title="Diary Entries"
            value={adminStats.totalDiaryEntries.toLocaleString()}
            icon={<FileText size={16} />}
            color="#a855f7"
            trend="up"
            trendValue="+8%"
          />
          <StatsCard
            title="New Today"
            value={adminStats.newUsersToday}
            icon={<UserX size={16} />}
            color="#0ea5e9"
            trend="up"
            trendValue="+3"
          />
        </SimpleGrid>

        {/* ── System Health Row ── */}
        <SimpleGrid cols={{ base: 1, lg: 4 }} spacing="md" mb="md">
          <Paper
            p="md"
            radius="md"
            style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}
          >
            <Group gap="sm" mb="xs">
              <Server size={14} color={NAVY} />
              <Text size="xs" fw={700} style={{ color: NAVY }}>
                Server Status
              </Text>
            </Group>
            <Text fw={800} style={{ fontSize: "1.2rem", color: "#16a34a" }}>
              Operational
            </Text>
            <Text size="xs" c="dimmed" mt={2}>
              99.97% uptime last 30d
            </Text>
          </Paper>

          <Paper
            p="md"
            radius="md"
            style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}
          >
            <Group gap="sm" mb="xs">
              <Cpu size={14} color={NAVY} />
              <Text size="xs" fw={700} style={{ color: NAVY }}>
                CPU Usage
              </Text>
            </Group>
            <Text fw={800} style={{ fontSize: "1.2rem", color: BLUE }}>
              34%
            </Text>
            <Progress value={34} size={4} radius="xl" color={BLUE} mt={6} />
          </Paper>

          <Paper
            p="md"
            radius="md"
            style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}
          >
            <Group gap="sm" mb="xs">
              <HardDrive size={14} color={NAVY} />
              <Text size="xs" fw={700} style={{ color: NAVY }}>
                Storage
              </Text>
            </Group>
            <Text fw={800} style={{ fontSize: "1.2rem", color: BLUE }}>
              156GB / 500GB
            </Text>
            <Progress value={31} size={4} radius="xl" color={BLUE} mt={6} />
          </Paper>

          <Paper
            p="md"
            radius="md"
            style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}
          >
            <Group gap="sm" mb="xs">
              <Zap size={14} color={NAVY} />
              <Text size="xs" fw={700} style={{ color: NAVY }}>
                API Calls Today
              </Text>
            </Group>
            <Text fw={800} style={{ fontSize: "1.2rem", color: BLUE }}>
              8,432
            </Text>
            <Text size="xs" c="dimmed" mt={2}>
              +18% vs yesterday
            </Text>
          </Paper>
        </SimpleGrid>

        {/* ── Primary Charts ── */}
        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md" mb="md">
          {/* User Growth */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
            <Group justify="space-between" mb="md">
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>
                  User Growth
                </Text>
                <Text size="xs" c="dimmed">
                  Total registered users over time
                </Text>
              </Box>
              <Badge
                size="sm"
                style={{ backgroundColor: "#eff4ff", color: BLUE }}
              >
                +12.5% growth
              </Badge>
            </Group>
            <ReactApexChart
              options={userGrowth.options}
              series={userGrowth.series}
              type="area"
              height={260}
            />
          </Paper>

          {/* Activity by Hour */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
            <Group justify="space-between" mb="md">
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>
                  User Activity
                </Text>
                <Text size="xs" c="dimmed">
                  Scans & logins by hour
                </Text>
              </Box>
              <Button
                size="xs"
                variant="light"
                radius="md"
                style={{ backgroundColor: "#eff4ff", color: BLUE }}
              >
                Live
              </Button>
            </Group>
            <ReactApexChart
              options={activityChart.options}
              series={activityChart.series}
              type="line"
              height={260}
            />
          </Paper>
        </SimpleGrid>

        {/* ── Secondary Charts ── */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mb="md">
          {/* Wellness Distribution */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
            <Group justify="space-between" mb="md">
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>
                  Wellness Score Distribution
                </Text>
                <Text size="xs" c="dimmed">
                  User health scores breakdown
                </Text>
              </Box>
            </Group>
            <SimpleGrid cols={2} spacing={0}>
              <ReactApexChart
                options={wellnessDonut.options}
                series={wellnessDonut.series}
                type="donut"
                height={220}
              />
              <Stack gap="sm" justify="center" pl="md">
                {wellnessDistribution.labels.map((label, i) => (
                  <Group key={label} justify="space-between">
                    <Group gap="xs">
                      <Box
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 3,
                          backgroundColor: wellnessDistribution.colors[i],
                        }}
                      />
                      <Text size="xs" c="dimmed">
                        {label}
                      </Text>
                    </Group>
                    <Text size="xs" fw={700} style={{ color: NAVY }}>
                      {wellnessDistribution.counts[i]} users
                    </Text>
                  </Group>
                ))}
                <Divider color="#f0f3fa" />
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">
                    Average Score
                  </Text>
                  <Text size="xs" fw={800} style={{ color: NAVY }}>
                    {adminStats.avgWellnessScore}
                  </Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Paper>

          {/* Scan Trends */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
            <Group justify="space-between" mb="md">
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>
                  Scan Activity
                </Text>
                <Text size="xs" c="dimmed">
                  Product scans this week
                </Text>
              </Box>
              <Badge
                size="sm"
                style={{ backgroundColor: "#eff4ff", color: BLUE }}
              >
                {adminStats.scansThisWeek} total
              </Badge>
            </Group>
            <ReactApexChart
              options={scanTrend.options}
              series={scanTrend.series}
              type="bar"
              height={240}
            />
            <Box mt="md" pt="md" style={{ borderTop: "1px solid #f0f3fa" }}>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Weekly goal progress
                </Text>
                <Text size="xs" fw={700} style={{ color: NAVY }}>
                  {scanCompletion}%
                </Text>
              </Group>
              <Progress
                value={scanCompletion}
                size={6}
                radius="xl"
                color={BLUE}
                mt={6}
              />
            </Box>
          </Paper>
        </SimpleGrid>

        {/* ── Users Table ── */}
        <Paper
          radius="md"
          p="xl"
          style={{ border: "1px solid #e8ecf5" }}
          mb="md"
        >
          <Group justify="space-between" mb="lg">
            <Group gap="sm">
              <ThemeIcon
                size={30}
                radius="md"
                style={{ backgroundColor: "#eff4ff", color: BLUE }}
              >
                <Users size={14} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>
                  Recent Users
                </Text>
                <Text size="xs" c="dimmed">
                  Latest registered users
                </Text>
              </Box>
            </Group>
            <Button
              size="xs"
              variant="light"
              radius="md"
              style={{ backgroundColor: "#eff4ff", color: BLUE }}
              leftSection={<Eye size={12} />}
            >
              View All Users
            </Button>
          </Group>

          <Table striped highlightOnHover withRowBorders={false}>
            <thead>
              <tr>
                <th>
                  <Text size="xs" c="dimmed" fw={600}>
                    User
                  </Text>
                </th>
                <th>
                  <Text size="xs" c="dimmed" fw={600}>
                    Join Date
                  </Text>
                </th>
                <th>
                  <Text size="xs" c="dimmed" fw={600}>
                    Status
                  </Text>
                </th>
                <th>
                  <Text size="xs" c="dimmed" fw={600}>
                    Wellness Score
                  </Text>
                </th>
                <th>
                  <Text size="xs" c="dimmed" fw={600}>
                    Scans
                  </Text>
                </th>
                <th>
                  <Text size="xs" c="dimmed" fw={600}>
                    Diary
                  </Text>
                </th>
                <th>
                  <Text size="xs" c="dimmed" fw={600}>
                    Actions
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Group gap="sm">
                      <Avatar
                        size={32}
                        radius="xl"
                        style={{
                          backgroundColor: NAVY,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Box>
                        <Text size="sm" fw={600} style={{ color: NAVY }}>
                          {user.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {user.email}
                        </Text>
                      </Box>
                    </Group>
                  </td>
                  <td>
                    <Text size="xs" style={{ color: NAVY }}>
                      {user.joinDate}
                    </Text>
                  </td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td>
                    <Group gap="xs">
                      <div
                        className={`w-2 h-2 rounded-full ${user.wellnessScore >= 70 ? "bg-green-500" : user.wellnessScore >= 50 ? "bg-blue-500" : "bg-red-500"}`}
                      ></div>
                      <Text size="sm" fw={600} style={{ color: NAVY }}>
                        {user.wellnessScore}
                      </Text>
                    </Group>
                  </td>
                  <td>
                    <Text size="sm" style={{ color: NAVY }}>
                      {user.scans}
                    </Text>
                  </td>
                  <td>
                    <Text size="sm" style={{ color: NAVY }}>
                      {user.diaryEntries}
                    </Text>
                  </td>
                  <td>
                    <MantineMenu position="bottom-end" withArrow>
                      <MantineMenu.Target>
                        <ActionIcon variant="subtle" size="sm">
                          <MoreVertical size={14} />
                        </ActionIcon>
                      </MantineMenu.Target>
                      <MantineMenu.Dropdown>
                        <MantineMenu.Item leftSection={<Eye size={12} />}>
                          View Profile
                        </MantineMenu.Item>
                        <MantineMenu.Item leftSection={<Edit size={12} />}>
                          Edit User
                        </MantineMenu.Item>
                        <MantineMenu.Item
                          leftSection={<Trash2 size={12} />}
                          color="red"
                        >
                          Suspend User
                        </MantineMenu.Item>
                      </MantineMenu.Dropdown>
                    </MantineMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Box mt="md" pt="md" style={{ borderTop: "1px solid #f4f6fc" }}>
            <Button
              fullWidth
              size="xs"
              variant="subtle"
              rightSection={<ChevronRight size={12} />}
              style={{ color: "#9ca3af" }}
            >
              Load more users
            </Button>
          </Box>
        </Paper>

        {/* ── System Logs ── */}
        <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
          <Group justify="space-between" mb="lg">
            <Group gap="sm">
              <ThemeIcon
                size={30}
                radius="md"
                style={{ backgroundColor: "#eff4ff", color: BLUE }}
              >
                <FileText size={14} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>
                  System Activity Logs
                </Text>
                <Text size="xs" c="dimmed">
                  Recent system events
                </Text>
              </Box>
            </Group>
            <Button
              size="xs"
              variant="light"
              radius="md"
              style={{ backgroundColor: "#eff4ff", color: BLUE }}
              leftSection={<Download size={12} />}
            >
              Export Logs
            </Button>
          </Group>

          <Stack gap="sm">
            {systemLogs.map((log, i) => (
              <Box
                key={log.id}
                style={{
                  padding: "12px",
                  borderRadius: 6,
                  backgroundColor: LIGHT,
                  border: "1px solid #f0f3fa",
                }}
              >
                <Group justify="space-between" wrap="wrap">
                  <Group gap="md">
                    {log.status === "success" ? (
                      <CheckCircle2 size={14} color="#16a34a" />
                    ) : (
                      <XCircle size={14} color="#dc2626" />
                    )}
                    <Box>
                      <Text size="sm" fw={600} style={{ color: NAVY }}>
                        {log.action}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {log.user} · {log.ip}
                      </Text>
                    </Box>
                  </Group>
                  <Group gap="md">
                    <Text size="xs" c="dimmed">
                      {log.timestamp}
                    </Text>
                    <StatusBadge status={log.status} />
                  </Group>
                </Group>
              </Box>
            ))}
          </Stack>

          <Box mt="md" pt="md" style={{ borderTop: "1px solid #f4f6fc" }}>
            <Button
              fullWidth
              size="xs"
              variant="subtle"
              rightSection={<ChevronRight size={12} />}
              style={{ color: "#9ca3af" }}
            >
              View all system logs
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
