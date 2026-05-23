import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "@/hooks/useTranslation";
import { Check } from "lucide-react";
import { useState } from "react";
import useBoundStore from "@/stores/useBoundStore";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
});

const BRL_TO_USD = 5.75;

const plans = [
  {
    id: "pro",
    name: "Bruxus PRO",
    priceBRL: 199,
    priceUSD: 35,
    badge: "Más popular",
    badgeColor: "bg-primary text-primary-foreground",
    features: [
      "50,000 messages/month",
      "5 WhatsApps connected",
      "10,000 contacts",
      "3 organizations",
      "5 custom AI agents",
      "Full media processing",
      "REST API + Webhooks",
      "RBAC up to 10 users",
      "WhatsApp support (4h)",
    ],
    trial: 3,
    highlight: true,
  },
  {
    id: "business",
    name: "Bruxus BUSINESS",
    priceBRL: 399,
    priceUSD: 70,
    badge: null,
    badgeColor: "",
    features: [
      "200,000 messages/month",
      "15 WhatsApps connected",
      "50,000 contacts",
      "10 organizations",
      "20 custom AI agents",
      "Media processing + priority",
      "REST API + Webhooks",
      "RBAC up to 50 users",
      "WhatsApp + Telegram support (2h)",
    ],
    trial: 3,
    highlight: false,
  },
  {
    id: "enterprise",
    name: "Bruxus ENTERPRISE",
    priceBRL: 799,
    priceUSD: 139,
    badge: null,
    badgeColor: "",
    features: [
      "1,000,000+ messages/month",
      "Unlimited WhatsApps",
      "Unlimited contacts",
      "Unlimited organizations",
      "Unlimited premium AI agents",
      "Advanced media processing",
      "REST API + Webhooks",
      "Unlimited RBAC",
      "WhatsApp + Telegram (1h SLA 99.9%)",
      "Self-hosting",
      "Onboarding with training",
    ],
    trial: 3,
    highlight: false,
  },
];

export default function Pricing() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const user = useBoundStore((state) => state.ui.user);
  const [currency, setCurrency] = useState<"USD" | "BRL">("USD");

  function handleSelect() {
    if (user) {
      navigate({ to: "/settings/billing" });
    } else {
      navigate({ to: "/register" });
    }
  }

  function formatPrice(plan: (typeof plans)[0]) {
    if (currency === "USD") {
      return { main: `$${plan.priceUSD}`, sub: `≈ R$${plan.priceBRL}` };
    }
    return { main: `R$${plan.priceBRL}`, sub: `≈ $${plan.priceUSD}` };
  }

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <img src="/logo.png" alt="Bruxus" className="h-10 w-auto" />
        <div className="flex gap-3 items-center">
          {user ? (
            <button className="primary" onClick={() => navigate({ to: "/" })}>
              {t("Mensajes")}
            </button>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground underline self-center"
              >
                {t("Iniciar sesión")}
              </a>
              <a href="/register">
                <button className="primary text-sm">{t("Crear cuenta")}</button>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center gap-3 pt-12 pb-6 px-4 text-center">
        <div className="text-[32px] font-bold">Plans</div>
        <div className="text-muted-foreground text-[16px] max-w-[500px]">
          Start with a 3-day free trial. No credit card required.
        </div>

        {/* Currency toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-full p-1 mt-2">
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currency === "USD"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            USD
          </button>
          <button
            onClick={() => setCurrency("BRL")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currency === "BRL"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            BRL
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="flex flex-wrap justify-center gap-6 px-6 pb-16 max-w-[1100px] mx-auto w-full">
        {plans.map((plan) => {
          const { main, sub } = formatPrice(plan);
          return (
            <div
              key={plan.id}
              className={
                "flex flex-col rounded-2xl border p-6 w-full max-w-[320px] relative " +
                (plan.highlight
                  ? "border-primary shadow-lg bg-card"
                  : "border-border bg-card")
              }
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${plan.badgeColor}`}
                >
                  ⭐ Most popular
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-4">
                <div className="text-[18px] font-bold">{plan.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-primary">
                    {main}
                  </span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{sub}/mo</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {plan.trial} days free trial
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={
                  plan.highlight
                    ? "primary w-full"
                    : "w-full border border-border rounded-lg py-[10px] text-sm font-medium hover:bg-accent transition-colors"
                }
                onClick={handleSelect}
              >
                Start free trial
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground pb-8 px-4">
        USD prices are approximate conversions (1 USD ≈ R${BRL_TO_USD}). Billing is processed in BRL.
      </div>
    </div>
  );
}
