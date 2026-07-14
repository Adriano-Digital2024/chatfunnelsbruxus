import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import SectionBody from "@/components/SectionBody";
import { useTranslation } from "@/hooks/useTranslation";
import { useSubscription } from "@/queries/useBilling";
import { supabase } from "@/supabase/client";
import { EDGE_FUNCTIONS } from "@/utils/edgeFunctions";


export const Route = createFileRoute("/_auth/plans")({
  component: PlansPage,
});

const plans = [
  {
    id: "pro",
    name: "Bruxus PRO",
    priceBRL: 199,
    priceUSD: 35,
    highlight: true,
    badge: "Most popular",
    features: [
      "50,000 messages/month",
      "5 WhatsApps connected",
      "10,000 contacts",
      "5 custom AI agents",
      "REST API + Webhooks",
      "RBAC up to 10 users",
      "WhatsApp support (4h)",
    ],
  },
  {
    id: "business",
    name: "Bruxus BUSINESS",
    priceBRL: 399,
    priceUSD: 70,
    highlight: false,
    badge: null,
    features: [
      "200,000 messages/month",
      "15 WhatsApps connected",
      "50,000 contacts",
      "20 custom AI agents",
      "REST API + Webhooks",
      "RBAC up to 50 users",
      "WhatsApp + Telegram support (2h)",
    ],
  },
  {
    id: "enterprise",
    name: "Bruxus ENTERPRISE",
    priceBRL: 799,
    priceUSD: 139,
    highlight: false,
    badge: null,
    features: [
      "1,000,000+ messages/month",
      "Unlimited WhatsApps",
      "Unlimited contacts",
      "Unlimited premium AI agents",
      "REST API + Webhooks",
      "Unlimited RBAC",
      "WhatsApp + Telegram (1h SLA 99.9%)",
      "Self-hosting + Onboarding",
    ],
  },
];

function PlansPage() {
  const { translate: t } = useTranslation();
  const [currency, setCurrency] = useState<"USD" | "BRL">("USD");
  const [checkingOut, setCheckingOut] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: subscription } = useSubscription();
  const currentPlanName = ((subscription as any)?.plans?.name ?? "").toLowerCase();

  function getPrice(plan: (typeof plans)[0]) {
    return currency === "USD"
      ? { main: `$${plan.priceUSD}`, sub: `≈ R$${plan.priceBRL}` }
      : { main: `R$${plan.priceBRL}`, sub: `≈ $${plan.priceUSD}` };
  }

  function isCurrentPlan(plan: (typeof plans)[0]) {
    return currentPlanName.includes(plan.id);
  }

  async function handleSelectPlan(planId: string) {
    setError(null);
    setCheckingOut(planId);
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        EDGE_FUNCTIONS.createCheckoutSession,
        {
          body: {
            plan: planId,
            success_url: `${window.location.origin}/billing`,
            cancel_url: `${window.location.origin}/plans`,
          },
        }
      );
      if (fnError || !data?.url) {
        throw new Error(fnError?.message || "No checkout URL returned");
      }
      window.location.href = data.url;
    } catch {
      setError(t("Error al iniciar el pago. Intentá de nuevo."));
      setCheckingOut(null);
    }
  }

  return (
    <>
      <SectionHeader title={t("Planes")} />

      <SectionBody>
        {/* Currency toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-full p-1 w-fit mb-2">
          {(["USD", "BRL"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                currency === c
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {error && (
          <div className="text-destructive text-sm rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {plans.map((plan) => {
            const { main, sub } = getPrice(plan);
            const isCurrent = isCurrentPlan(plan);
            const isLoading = checkingOut === plan.id;

            return (
              <div
                key={plan.id}
                className={`rounded-xl border p-4 flex flex-col gap-3 relative ${
                  plan.highlight
                    ? "border-primary bg-card shadow-sm"
                    : "border-border bg-card"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    ⭐ {plan.badge}
                  </span>
                )}

                {/* Name + price row */}
                <div className="flex items-start justify-between gap-2 mt-1">
                  <div>
                    <div className="font-bold text-[15px]">{plan.name}</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-[22px] font-bold text-primary">{main}</span>
                      <span className="text-muted-foreground text-xs">/mo</span>
                      <span className="text-muted-foreground text-xs ml-1">{sub}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      3 days free trial
                    </div>
                  </div>

                  {isCurrent ? (
                    <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                      {t("Plan actual")}
                    </span>
                  ) : (
                    <button
                      className="shrink-0 primary text-xs px-4 py-1.5"
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={!!checkingOut}
                    >
                      {isLoading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        t("Iniciar prueba gratuita")
                      )}
                    </button>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[12px] text-muted-foreground">
                      <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-muted-foreground text-center pb-2">
          USD prices are approximate (1 USD ≈ R$5.75). Billing in BRL.
        </div>
      </SectionBody>
    </>
  );
}
