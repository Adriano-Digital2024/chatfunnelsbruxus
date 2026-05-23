import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "@/hooks/useTranslation";
import { Check } from "lucide-react";
import useBoundStore from "@/stores/useBoundStore";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
});

const plans = [
  {
    id: "pro",
    name: "Bruxus PRO",
    price: "R$ 199",
    badge: "Más popular",
    badgeColor: "bg-primary text-primary-foreground",
    features: [
      { label: "50.000 mensagens/mês" },
      { label: "5 WhatsApps conectados" },
      { label: "10.000 contatos" },
      { label: "3 organizações" },
      { label: "5 agentes IA personalizados" },
      { label: "Processamento de mídia completo" },
      { label: "API REST + Webhooks" },
      { label: "RBAC até 10 usuários" },
      { label: "Suporte WhatsApp (4h)" },
    ],
    trial: "3",
    highlight: true,
  },
  {
    id: "business",
    name: "Bruxus BUSINESS",
    price: "R$ 399",
    badge: null,
    badgeColor: "",
    features: [
      { label: "200.000 mensagens/mês" },
      { label: "15 WhatsApps conectados" },
      { label: "50.000 contatos" },
      { label: "10 organizações" },
      { label: "20 agentes IA personalizados" },
      { label: "Processamento de mídia + prioridade" },
      { label: "API REST + Webhooks" },
      { label: "RBAC até 50 usuários" },
      { label: "Suporte WhatsApp + Telegram (2h)" },
    ],
    trial: "3",
    highlight: false,
  },
  {
    id: "enterprise",
    name: "Bruxus ENTERPRISE",
    price: "R$ 799",
    badge: null,
    badgeColor: "",
    features: [
      { label: "1.000.000+ mensagens/mês" },
      { label: "WhatsApps ilimitados" },
      { label: "Contatos ilimitados" },
      { label: "Organizações ilimitadas" },
      { label: "Agentes IA ilimitados premium" },
      { label: "Processamento de mídia avançado" },
      { label: "API REST + Webhooks" },
      { label: "RBAC ilimitado" },
      { label: "Suporte WhatsApp + Telegram (1h SLA 99.9%)" },
      { label: "Self-hosting" },
      { label: "Onboarding com treinamento" },
    ],
    trial: "3",
    highlight: false,
  },
];

export default function Pricing() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const user = useBoundStore((state) => state.ui.user);

  function handleSelect() {
    if (user) {
      navigate({ to: "/settings/billing" });
    } else {
      navigate({ to: "/register" });
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <img src="/logo.png" alt="FlowAction" className="h-10 w-auto" />
        <div className="flex gap-3">
          {user ? (
            <button
              className="primary"
              onClick={() => navigate({ to: "/" })}
            >
              {t("Mensajes")}
            </button>
          ) : (
            <>
              <a href="/login" className="text-sm text-muted-foreground hover:text-foreground underline self-center">
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
      <div className="flex flex-col items-center gap-3 pt-12 pb-8 px-4 text-center">
        <div className="text-[32px] font-bold">{t("Planes")}</div>
        <div className="text-muted-foreground text-[16px] max-w-[500px]">
          {t("Comece com 3 dias gratuitos. Sem cartão de crédito.")}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="flex flex-wrap justify-center gap-6 px-6 pb-16 max-w-[1100px] mx-auto w-full">
        {plans.map((plan) => (
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
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${plan.badgeColor}`}>
                ⭐ {t(plan.badge)}
              </div>
            )}

            {/* Plan name & price */}
            <div className="mb-4">
              <div className="text-[18px] font-bold">{plan.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-[32px] font-bold text-primary">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{t("por mes")}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {plan.trial} {t("Días de prueba gratuita")}
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2 mb-6 flex-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={plan.highlight ? "primary w-full" : "w-full border border-border rounded-lg py-[10px] text-sm font-medium hover:bg-accent transition-colors"}
              onClick={handleSelect}
            >
              {t("Iniciar prueba gratuita")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
