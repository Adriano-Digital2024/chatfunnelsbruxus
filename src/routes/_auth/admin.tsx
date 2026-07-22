import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import useBoundStore from "@/stores/useBoundStore";
import { isSuperAdmin } from "@/utils/superadmin";

export const Route = createFileRoute("/_auth/admin")({
  beforeLoad: () => {
    const user = useBoundStore.getState().ui.user;
    if (!user || !isSuperAdmin(user.email)) {
      throw redirect({ to: "/conversations" });
    }
  },
  component: AdminComponent,
});

function AdminComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
