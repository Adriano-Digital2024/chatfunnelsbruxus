import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/_auth/admin")({
  beforeLoad: ({ context }) => {
    const user = context?.auth?.user;
    if (!user || (user.role !== "admin" && user.role !== "owner")) {
      throw redirect({ to: "/conversations" });
    }
  },
  component: () => {
    return (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    );
  },
});
