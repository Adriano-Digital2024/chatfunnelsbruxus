import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import DashboardStats from "@/components/admin/DashboardStats";

export const Route = createFileRoute("/_auth/admin/")({
  component: () => {
    return <DashboardStats />;
  },
});
