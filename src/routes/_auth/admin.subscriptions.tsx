import { createFileRoute } from "@tanstack/react-router";
import SubscriptionsManagement from "@/components/admin/SubscriptionsManagement";

export const Route = createFileRoute("/_auth/admin/subscriptions")({
  component: SubscriptionsManagement,
});
