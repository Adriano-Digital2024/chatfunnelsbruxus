import { createFileRoute } from "@tanstack/react-router";
import OrganizationsManagement from "@/components/admin/OrganizationsManagement";

export const Route = createFileRoute("/_auth/admin/organizations")({
  component: OrganizationsManagement,
});