import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function DashboardStats() {
  const { translate: t } = useTranslation();

  const [stats] = useState([
    {
      icon: "🏢",
      label: t("Total de Organizaciones"),
      value: "48",
      change: "+12% este mês",
    },
    {
      icon: "👥",
      label: t("Total de Usuários"),
      value: "156",
      change: "+24 hoje",
    },
    {
      icon: "💳",
      label: t("Assinaturas Ativas"),
      value: "42",
      change: "+3 este mês",
    },
    {
      icon: "📱",
      label: t("Números WhatsApp"),
      value: "87",
      change: "+5 esta semana",
    },
    {
      icon: "🤖",
      label: t("Agentes de IA"),
      value: "23",
      change: "+8 este mês",
    },
    {
      icon: "📊",
      label: t("Mensagens do Mês"),
      value: "12,456",
      change: "+18% este mês",
    },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("Painel de Administración")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl"> {stat.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}