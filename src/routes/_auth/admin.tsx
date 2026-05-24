import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import useBoundStore from "@/stores/useBoundStore";
import { useTranslation } from "@/hooks/useTranslation";
import { isSuperAdmin } from "@/utils/superadmin";
import SectionHeader from "@/components/SectionHeader";
import SectionBody from "@/components/SectionBody";
import { useOrganizations } from "@/queries/useOrganizations";
import { useSubscription } from "@/queries/useBilling";
import { useCurrentAgents } from "@/queries/useAgents";
import { Building2, Bot, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_auth/admin")({
  component: AdminPanel,
});

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 flex items-center gap-3">
      <div className="p-2 rounded-full bg-primary/10 shrink-0">{icon}</div>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
          {label}
        </span>
        <span className="text-[18px] font-bold text-primary">{value}</span>
      </div>
    </div>
  );
}

function AdminPanel() {
  const { translate: t } = useTranslation();
  const user = useBoundStore((state) => state.ui.user);
  const navigate = useNavigate();

  const { data: organizations } = useOrganizations();
  const { data: subscription } = useSubscription();
  const { data: agents } = useCurrentAgents();

  useEffect(() => {
    if (user && !isSuperAdmin(user.email)) {
      navigate({ to: "/conversations" });
    }
  }, [user]);

  if (!user || !isSuperAdmin(user.email)) return null;

  const planName = (subscription as any)?.plans?.name ?? "—";
  const subStatus = (subscription as any)?.status ?? null;

  return (
    <>
      <SectionHeader title="Admin" />

      <SectionBody className="gap-4">
        {/* Superadmin badge */}
        <div className="flex items-center gap-2 px-1 py-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Superadmin
          </span>
          <span className="ml-auto text-xs text-muted-foreground truncate max-w-[160px]">
            {user?.email}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<Building2 className="w-4 h-4 text-primary" />}
            label={t("Organizaciones")}
            value={organizations?.length ?? 0}
          />
          <StatCard
            icon={<Bot className="w-4 h-4 text-primary" />}
            label={t("Agentes")}
            value={agents?.length ?? 0}
          />
        </div>

        {/* Active subscription */}
        <div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium px-1 mb-2">
            {t("Suscripción activa")}
          </div>

          <div className="rounded-xl border border-border bg-card p-3 flex items-center justify-between gap-2">
            <span className="font-semibold text-sm">{planName}</span>
            {subStatus && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  subStatus === "active"
                    ? "bg-green-100 text-green-700"
                    : subStatus === "trialing"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {subStatus === "active"
                  ? t("Activo")
                  : subStatus === "trialing"
                  ? t("Período de prueba")
                  : subStatus}
              </span>
            )}
          </div>
        </div>

        {/* Organizations list */}
        <div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium px-1 mb-2">
            {t("Organizaciones")}
          </div>

          <div className="flex flex-col gap-1.5">
            {organizations && organizations.length > 0 ? (
              organizations.map((org) => (
                <div
                  key={org.id}
                  className="rounded-xl border border-border bg-card px-3 py-2.5 flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">{org.name}</span>
                    <span className="text-[10px] text-muted-foreground truncate">
                      {org.id}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                {t("Sin organizaciones")}
              </div>
            )}
          </div>
        </div>

        {/* Agents list */}
        {agents && agents.length > 0 && (
          <div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium px-1 mb-2">
              {t("Agentes")}
            </div>
            <div className="flex flex-col gap-1.5">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="rounded-xl border border-border bg-card px-3 py-2.5 flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">{agent.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {agent.ai ? "AI agent" : "Human agent"}{" "}
                      {(agent.extra as any)?.role ? `· ${(agent.extra as any).role}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-[10px] text-muted-foreground text-center pt-2 pb-4">
          Bruxus Admin · {new Date().toLocaleDateString()}
        </div>
      </SectionBody>
    </>
  );
}
