import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Box,
  Stack,
  Text,
  UnstyledButton,
  Avatar,
  Divider,
  Group,
} from "@mantine/core";
import {
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { BrandName } from "../components/BrandName";

const NAVY = "#0a2366";

const NAV_ITEMS = [
  { icon: Activity, label: "Dashboard", href: "/admin/" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Users, label: "Relationships", href: "/admin/family" },
  { icon: FileText, label: "Analytics", href: "/admin/analytics" },
];

function NavItem({ icon: Icon, label, href, active, onClick }) {
  return (
    <UnstyledButton
      component={Link}
      to={href}
      onClick={onClick}
      className="group relative overflow-hidden transition-all duration-200"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 6,
        backgroundColor: active ? "#eff4ff" : "transparent",
        color: active ? NAVY : "#6b7280",
        fontWeight: active ? 600 : 400,
        fontSize: 14,
        transition: "background-color 0.15s, color 0.15s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "#f5f7ff";
          e.currentTarget.style.color = NAVY;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#6b7280";
        }
      }}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#0a2366] rounded-r"></div>
      )}
      <Icon
        size={16}
        className={
          active
            ? "text-[#0a2366]"
            : "group-hover:text-[#0a2366] transition-colors"
        }
      />
      {label}
      {active && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#0a2366] opacity-60"></div>
      )}
    </UnstyledButton>
  );
}

function Sidebar({ location, onClose }) {
  return (
    <Box
      className="relative shadow-xl shadow-gray-200/50"
      style={{
        width: 220,
        height: "100%",
        backgroundColor: "#fff",
        borderRight: "1px solid #f0f3fa",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        flexShrink: 0,
      }}
    >
      {/* Admin Badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-full border border-indigo-100">
          <Shield size={10} className="text-indigo-600" />
          <span className="text-[9px] font-semibold text-indigo-700 tracking-wide">
            ADMIN
          </span>
        </div>
      </div>

      {/* Brand */}
      <Group justify="space-between" align="center" mb={32} px={2}>
        <Text
          component={Link}
          to="/"
          fw={600}
          size="md"
          className="relative group"
          style={{
            color: NAVY,
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          <BrandName />
          <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#0a2366] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Text>
        {onClose && (
          <UnstyledButton
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-1 transition-all hover:rotate-90"
            style={{ color: "#9ca3af", lineHeight: 1 }}
          >
            <X size={18} />
          </UnstyledButton>
        )}
      </Group>

      {/* Nav */}
      <Stack gap={4} style={{ flex: 1 }}>
        <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Admin Controls
        </div>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={location.pathname === item.href}
            onClick={onClose}
          />
        ))}
      </Stack>

      <Divider color="#f0f3fa" my="md" />

      {/* Bottom */}
      <Stack gap={4}>
        <NavItem
          icon={Settings}
          label="Settings"
          href="/admin/settings"
          active={location.pathname === "/admin/settings"}
          onClick={onClose}
        />
        <UnstyledButton
          className="group transition-all duration-200 hover:bg-red-50"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 6,
            fontSize: 14,
            color: "#9ca3af",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          <LogOut
            size={16}
            className="group-hover:rotate-180 transition-transform duration-300"
          />
          Log out
        </UnstyledButton>
      </Stack>

      {/* User pill with admin indicator */}
      <Box
        mt="md"
        className="relative group hover:shadow-md transition-all duration-200"
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          backgroundColor: "#f8faff",
          border: "1px solid #e8ecf5",
        }}
      >
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white"></div>
        <Group gap="sm">
          <Avatar
            size={32}
            radius="xl"
            className="ring-2 ring-indigo-200 group-hover:ring-indigo-400 transition-all"
            style={{
              backgroundColor: NAVY,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            AD
          </Avatar>
          <Box style={{ overflow: "hidden" }}>
            <Text
              size="xs"
              fw={600}
              style={{
                color: NAVY,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Admin User
            </Text>
            <Text size="10px" style={{ color: "#9ca3af" }}>
              System Administrator
            </Text>
          </Box>
        </Group>
      </Box>
    </Box>
  );
}

export default function DashboardLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      className="bg-gradient-to-br from-gray-50 to-gray-100/50"
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      {/* Desktop sidebar */}
      <Box style={{ display: "none" }} visibleFrom="md">
        <Sidebar location={location} />
      </Box>
      <Box hiddenFrom="md" style={{ display: "none" }}>
        {/* placeholder so flex layout isn't broken on mobile */}
      </Box>

      {/* Desktop sidebar (CSS-only, avoids Mantine display issues) */}
      <Box className="dashboard-sidebar">
        <Sidebar location={location} />
      </Box>

      {/* Mobile overlay */}
      {mobileOpen && (
        <Box
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
          }}
        >
          <Sidebar location={location} onClose={() => setMobileOpen(false)} />
          <Box
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setMobileOpen(false)}
          />
        </Box>
      )}

      {/* Main area */}
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Mobile topbar with admin vibe */}
        <Box
          className="dashboard-topbar"
          style={{
            display: "none",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px",
            backgroundColor: "#fff",
            borderBottom: "1px solid #f0f3fa",
          }}
        >
          <UnstyledButton
            onClick={() => setMobileOpen(true)}
            className="hover:bg-gray-100 rounded-lg p-1 transition-all"
            style={{ color: NAVY, lineHeight: 1 }}
          >
            <Menu size={20} />
          </UnstyledButton>
          <Text
            fw={600}
            size="md"
            style={{ color: NAVY, letterSpacing: "-0.02em" }}
          >
            <BrandName />
          </Text>
          <div className="ml-auto flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-full">
            <Shield size={12} className="text-indigo-600" />
            <span className="text-[10px] font-semibold text-indigo-700">
              ADMIN
            </span>
          </div>
        </Box>

        <Box style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>

      <style>{`
        .dashboard-sidebar { display: flex; height: 100vh; position: sticky; top: 0; }
        .dashboard-topbar  { display: none; }
        @media (max-width: 768px) {
          .dashboard-sidebar { display: none; }
          .dashboard-topbar  { display: flex !important; }
        }
        
        /* Custom scrollbar for admin feel */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </Box>
  );
}
