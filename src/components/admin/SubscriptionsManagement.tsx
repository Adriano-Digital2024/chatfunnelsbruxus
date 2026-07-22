import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function SubscriptionsManagement() {
  const { translate: t } = useTranslation();

  const [subscriptions] = useState([
    {
      id: "sub-001",
      organization: "TechCorp",
      plan: "PRO",
      status: "active",
      amount: 29.99,
      currency: "USD",
      startDate: "2024-01-15",
      nextBilling: "2024-02-15",
      paymentMethod: "Visa •••• 4567",
    },
    {
      id: "sub-002",
      organization: "Startup Solutions",
      plan: "BUSINESS",
      status: "active",
      amount: 70,
      currency: "USD",
      startDate: "2024-02-20",
      nextBilling: "2024-03-20",
      paymentMethod: "Mastercard •••• 8912",
    },
    {
      id: "sub-003",
      organization: "Digital Agency",
      plan: "BUSINESS",
      status: "trialing",
      amount: 70,
      currency: "USD",
      startDate: "2024-01-10",
      nextBilling: "2024-02-10",
      paymentMethod: "Visa •••• 3456",
    },
    {
      id: "sub-004",
      organization: "Consulting Partners",
      plan: "PRO",
      status: "cancelled",
      amount: 29.99,
      currency: "USD",
      startDate: "2024-03-05",
      nextBilling: null,
      paymentMethod: "PayPal",
    },
    {
      id: "sub-005",
      organization: "Innovate Labs",
      plan: "PRO",
      status: "active",
      amount: 29.99,
      currency: "USD",
      startDate: "2024-12-10",
      nextBilling: "2025-01-10",
      paymentMethod: "Credit Card",
    },
  ]);

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "PRO":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "BUSINESS":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "ENTERPRISE":
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "trialing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return t("Activo");
      case "trialing":
        return t("Período de prueba");
      case "cancelled":
        return t("Cancelado");
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return currency === "USD" ? `$${amount}` : `R$${amount}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("Gestão de Assinaturas")}</h1>
        <div className="flex gap-2">
          <button className="secondary flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v13a2 2 0 01-2 2z" />
            </svg>
            {t("Exportar")}
          </button>
          <button className="primary flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t("Nova Assinatura")}
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-card rounded-xl border border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">42</div>
            <div className="text-sm text-muted-foreground">{t("Assinaturas Ativas")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$2,847</div>
            <div className="text-sm text-muted-foreground">{t("Receita Mensal (MRR)")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-muted-foreground">{t("Em período de teste")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-muted-foreground">{t("Cancelamentos este mês")}</div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Organização")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Plano")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Valor")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Próxima cobrança")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Método de pagamento")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Ações")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-foreground">
                      {sub.organization}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPlanBadgeColor(sub.plan)}`}
                    >
                      {t(sub.plan)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(sub.status)}`}
                    >
                      {getStatusLabel(sub.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {formatCurrency(sub.amount, sub.currency)}/mês
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {sub.nextBilling || t("N/A")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {sub.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title={t("Ver fatura")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7.058M12 7v5m0 0 2 2" />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-muted-foreground hover:text-orange-600 transition-colors"
                        title={t("Cancelar assinatura")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-muted-foreground hover:text-green-600 transition-colors"
                        title={t("Reativar assinatura")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m0 0a8.001 8.001 0 001 13.924m1.59-1.317L21 21l-3.5-1M3 9h18M15 21V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m6-3v3m0 0v-3m0 0h-6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}