import { createFileRoute } from "@tanstack/react-router";
import UsersManagement from "@/components/admin/UsersManagement";

export const Route = createFileRoute("/_auth/admin/users")({
  component: UsersManagement,
});