import { createFileRoute, Outlet } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/_auth/admin")({
  component: AdminComponent,
  beforeLoad: ({ context }) => {
    const user = context.auth.user;
    if (!user || (user.role !== "admin" && user.role !== "owner")) {
      throw new Error("Unauthorized");
    }
  },
});

function AdminComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}