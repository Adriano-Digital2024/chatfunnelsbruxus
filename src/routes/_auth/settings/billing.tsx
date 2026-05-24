import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import SectionHeader from "@/components/SectionHeader";
import SectionBody from "@/components/SectionBody";
import SectionFooter from "@/components/SectionFooter";
import { useSubscription, useUsage, useTierLimits } from "@/queries/useBilling";
import { supabase } from "@/supabase/client";
import { CreditCard, Zap, Loader2, ExternalLink, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_auth/settings/billing")({
  component: BillingSettings,
});

function UsageBar({
  label,
  current,
  limit,
}: {
  label: string;
  current: number;
  limit: number;
}) {
  const pct = limit > 0 ? Math.min(100, Math.round((current / limit) * 100)) : 0;
  const isNearLimit = pct >= 80;
  const isOverLimit = pct >= 100;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground capitalize">{label}</span>
        <span
          className={`font-medium tabular-nums ${
            isOverLimit
              ? "text-destructive"
              : isNearLimit
              ? "text-yellow-600"
              : "text-foreground"
          }`}
        >
          {current.toLocaleString()} / {limit > 0 ? limit.toLocaleString() : "∞"}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isOverLimit
              ? "bg-destructive"
              : isNearLimit
              ? "bg-yellow-500"
              : "bg-primary"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function BillingSettings() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();

  const { data: subscription, isLoading } = useSubscription();
  const { data: usage } = useUsage("month");
  const { data: tierLimits } = useTierLimits();

  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  const planName = (subscription as any)?.plans?.name ?? null;
  const tierName = (subscription as any)?.tiers?.name ?? null;
  const status = (subscription as any)?.status ?? null;

  const statusLabel =
    status === "active"
      ? t("Activo")
      : status === "trialing"
      ? t("Período de prueba")
      : status ?? null;

  const statusColor =
    status === "active"
      ? "bg-green-100 text-green-700"
      : status === "trialing"
      ? "bg-blue-100 text-blue-700"
      : "bg-muted text-muted-foreground";

  async function handleManageSubscription() {
    setPortalError(null);
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-portal-session",
        { body: { return_url: window.location.href } }
      );
      if (error || !data?.url) {
        throw new Error(error?.message || "No portal URL returned");
      }
      window.location.href = data.url;
    } catch {
      setPortalError(t("Error al abrir el portal. Intentá de nuevo."));
      setPortalLoading(false);
    }
  }

  const hasUsageData =
    Array.isArray(tierLimits) && tierLimits.length > 0;

  return (
    <>
      <SectionHeader title={t("Facturación")} />

      <SectionBody className="gap-3">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm p-6">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("Cargando...")}
          </div>
        ) : subscription ? (
          <>
            {/* Current plan */}
            <div className="rounded-xl border border-border p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-medium uppercase tracking-wide">
                <CreditCard className="w-3.5 h-3.5" />
                {t("Plan actual")}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[20px] font-bold text-primary">
                  {planName ?? tierName ?? "—"}
                </span>
                {statusLabel && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}
                  >
                    {statusLabel}
                  </span>
                )}
              </div>

              {tierName && planName !== tierName && (
                <div className="text-sm text-muted-foreground">{tierName}</div>
              )}
            </div>

            {/* Usage dashboard */}
            {hasUsageData && (
              <div className="rounded-xl border border-border p-4 flex flex-col gap-3">
                <div className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  {t("Uso del mes actual")}
                </div>

                {(tierLimits as any[]).map((limit) => {
                  const productId = limit.product_id ?? limit.products?.id;
                  const productName =
                    limit.products?.name ?? limit.product_id ?? "—";
                  const usageRow = Array.isArray(usage)
                    ? usage.find(
                        (u: any) => u.product_id === productId
                      )
                    : null;
                  const currentVal = Number(
                    usageRow?.value ?? usageRow?.count ?? 0
                  );
                  const limitVal = Number(limit.limit ?? limit.value ?? 0);

                  return (
                    <UsageBar
                      key={productId ?? productName}
                      label={productName}
                      current={currentVal}
                      limit={limitVal}
                    />
                  );
                })}
              </div>
            )}

            {/* AI credits */}
            <div className="rounded-xl border border-border p-3 flex items-center gap-3">
              <div className="p-1.5 rounded-full bg-primary/10 shrink-0">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium">AI Credits</span>
                <span className="text-xs text-muted-foreground">
                  {t("Gerenciados pela plataforma via OpenRouter")}
                </span>
              </div>
            </div>

            {/* Error */}
            {portalError && (
              <div className="text-destructive text-sm rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2">
                {portalError}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                className="primary w-full flex items-center justify-center gap-2"
                onClick={() => navigate({ to: "/plans", hash: (h) => h! })}
              >
                <Sparkles className="w-4 h-4" />
                {t("Ver todos los planes")}
              </button>

              <button
                className="w-full border border-border rounded-full py-[8px] text-sm font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                onClick={handleManageSubscription}
                disabled={portalLoading}
              >
                {portalLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                {t("Gestionar suscripción")}
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-border p-6 flex flex-col items-center gap-3 text-center">
            <CreditCard className="w-10 h-10 text-muted-foreground" />
            <div className="text-[15px] font-medium">
              {t("Sin suscripción activa")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("Escolha um plano para ativar todos os recursos.")}
            </div>
            <button
              className="primary mt-1 flex items-center gap-2"
              onClick={() => navigate({ to: "/plans", hash: (h) => h! })}
            >
              <Sparkles className="w-4 h-4" />
              {t("Ver todos los planes")}
            </button>
          </div>
        )}
      </SectionBody>

      <SectionFooter>
        <p className="text-xs text-muted-foreground text-center">
          {t("Gestionar suscripción")} via Stripe.{" "}
          <span className="text-muted-foreground/70">
            Cancellations take effect at end of billing period.
          </span>
        </p>
      </SectionFooter>
    </>
  );
}
