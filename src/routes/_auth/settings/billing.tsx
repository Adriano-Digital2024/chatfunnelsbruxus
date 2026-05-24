import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/settings/billing")({
  beforeLoad: () => {
    throw redirect({ to: "/billing" });
  },
  component: () => null,
});
