import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "@/hooks/useTranslation";
import SectionHeader from "@/components/SectionHeader";
import SectionBody from "@/components/SectionBody";
import { useSubscription } from "@/queries/useBilling";
import { CreditCard, Zap } from "lucide-react";

export const Route = createFileRoute("/_auth/settings/billing")({
  component: BillingSettings,
});

function BillingSettings() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const { data: subscription, isLoading } = useSubscription();

  const planName = (subscription as any)?.plans?.name ?? null;
  const tierName = (subscription as any)?.tiers?.name ?? null;
  const status = (subscription as any)?.status ?? null;

  return (
    <>
      <SectionHeader title={t("Facturación")} />

      <SectionBody className="gap-4">
        {isLoading ? (
          <div className="text-muted-foreground text-sm p-4 text-center">
            {t("Cargando...")}
          </div>
        ) : subscription ? (
          <div className="flex flex-col gap-4 pt-2">
            {/* Current plan card */}
            <div className="rounded-xl border border-border p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                <CreditCard className="w-4 h-4" />
                {t("Plan actual")}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[22px] font-bold text-primary">
                  {planName ?? tierName ?? t("Sin suscripción activa")}
                </span>
                {status && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    status === "active"
                      ? "bg-green-100 text-green-700"
                      : status === "trialing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {status === "active"
                      ? t("Activo")
                      : status === "trialing"
                      ? t("Período de prueba")
                      : status}
                  </span>
                )}
              </div>

              {tierName && planName !== tierName && (
                <div className="text-sm text-muted-foreground">{tierName}</div>
              )}
            </div>

            {/* AI Credits */}
            <div className="rounded-xl border border-border p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{t("Créditos IA")}</span>
                <span className="text-xs text-muted-foreground">
                  {t("Gerenciados pela plataforma via OpenRouter")}
                </span>
              </div>
            </div>

            {/* Manage / Upgrade */}
            <div className="flex flex-col gap-2">
              <button
                className="primary w-full"
                onClick={() => navigate({ to: "/pricing" })}
              >
                {t("Ver todos los planes")}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-2">
            <div className="rounded-xl border border-border p-6 flex flex-col items-center gap-3 text-center">
              <CreditCard className="w-10 h-10 text-muted-foreground" />
              <div className="text-[16px] font-medium">
                {t("Sin suscripción activa")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("Escolha um plano para ativar todos os recursos.")}
              </div>
              <button
                className="primary mt-2"
                onClick={() => navigate({ to: "/pricing" })}
              >
                {t("Ver todos los planes")}
              </button>
            </div>
          </div>
        )}
      </SectionBody>
    </>
  );
}
