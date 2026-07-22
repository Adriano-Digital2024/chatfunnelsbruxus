import { createFileRoute, useNavigate, Link, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import useBoundStore from "@/stores/useBoundStore";
import { useTranslation } from "@/hooks/useTranslation";
import { isSuperAdmin } from "@/utils/superadmin";
import SectionHeader from "@/components/SectionHeader";
import SectionBody from "@/components/SectionBody";
import SectionItem from "@/components/SectionItem";
import { useOrganizations } from "@/queries/useOrganizations";
import { useCurrentAgents } from "@/queries/useAgents";
import { Building2, Users, Building, CreditCard, Unplug } from "lucide-react";

export const Route = createFileRoute("/_auth/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { translate: t } = useTranslation();
  const user = useBoundStore((state) => state.ui.user);
  const navigate = useNavigate();
  const { data: organizations } = useOrganizations();
  const { data: agents } = useCurrentAgents();

  const orgCount = organizations?.length ?? 0;
  const userCount = agents?.filter(a => a.user_id).length ?? 0;

  useEffect(() => {
    if (user && !isSuperAdmin(user.email)) {
      navigate({ to: "/conversations" });
    }
  }, [user]);

  if (!user || !isSuperAdmin(user.email)) return null;

  return (
    <>
      <SectionHeader title={t("Panel de Administración")} />
      <SectionBody>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-xl border border-border bg-card p-2 flex items-center gap-2">
            <div className="p-1 rounded-full bg-primary/10 shrink-0"><Building2 className="w-3 h-3 text-primary" /></div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                {t("Organizaciones")}
              </span>
              <span className="text-[12px] font-bold text-primary">{orgCount}</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-2 flex items-center gap-2">
            <div className="p-1 rounded-full bg-primary/10 shrink-0"><Users className="w-3 h-3 text-primary" /></div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                {t("Usuarios")}
              </span>
              <span className="text-[12px] font-bold text-primary">{userCount}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <SectionItem
            title={t("Usuarios")}
            aside={<div className="p-1 rounded-full bg-primary/10"><Users className="w-3 h-3 text-primary" /></div>}
            onClick={() => navigate({ to: "/admin/users" })}
          />
          <SectionItem
            title={t("Organizaciones")}
            aside={<div className="p-1 rounded-full bg-primary/10"><Building className="w-3 h-3 text-primary" /></div>}
            onClick={() => navigate({ to: "/admin/organizations" })}
          />
          <SectionItem
            title={t("Suscripciones")}
            aside={<div className="p-1 rounded-full bg-primary/10"><CreditCard className="w-3 h-3 text-primary" /></div>}
            onClick={() => navigate({ to: "/admin/subscriptions" })}
          />
          <SectionItem
            title={t("WhatsApps")}
            aside={<div className="p-1 rounded-full bg-primary/10"><Unplug className="w-3 h-3 text-primary" /></div>}
            onClick={() => navigate({ to: "/admin/whatsapps" })}
          />
        </div>

        {/* Outlet for child routes */}
        <Outlet />
      </SectionBody>
    </>
  );
}