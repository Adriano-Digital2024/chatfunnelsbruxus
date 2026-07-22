import { createFileRoute } from "@tanstack/react-router";
import WhatsAppsManagement from "@/components/admin/WhatsAppsManagement";

export const Route = createFileRoute("/_auth/admin/whatsapps")({
  component: WhatsAppsManagement,
});
