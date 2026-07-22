import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function OrganizationsManagement() {
  const { translate: t } = useTranslation();

  const [organizations] = useState([
    {
      id: "org-001",
      name: "TechCorp",
      plan: "PRO",
      status: "active",
      members: 12,
      whatsApps: 3,
      createdAt: "2024-01-15",
      expiresAt: "2025-01-15",
    },
    {
      id: "org-002",
      name: "Startup Solutions",
      plan: "BUSINESS",
      status: "active",
      members: 5,
      whatsApps: 1,
      createdAt: "2024-02-20",
      expiresAt: "2024-12-20",
    },
    {
      id: "org-003",
      name: "Digital Agency",
      plan: "BUSINESS",
      status: "active",
      members: 8,
      whatsApps: 2,
      createdAt: "2024-01-10",
      expiresAt: "2024-12-10",
    },
    {
      id: "org-004",
      name: "Consulting Partners",
      plan: "PRO",
      status: "inactive",
      members: 3,
      whatsApps: 0,
      createdAt: "2024-03-05",
      expiresAt: null,
    },
    {
      id: "org-005",
      name: "Innovate Labs",
      plan: "PRO",
      status: "trialing",
      members: 2,
      whatsApps: 1,
      createdAt: "2024-12-10",
      expiresAt: "2025-03-10",
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
      case "inactive":
        return "bg-red-100 text-red-800 border-red-300";
      case "trialing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("Gestão de Organizações")}</h1>
        <button className="primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t("Nova Organização")}
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Nome")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Plano")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Membros")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("WhatsApps")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Criada em")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Expira em")}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Ações")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {organizations.map((org) => (
                <tr
                  key={org.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-foreground">{org.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPlanBadgeColor(org.plan)}`}
                    >
                      {t(org.plan)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(org.status)}`}
                    >
                      {t(org.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {org.members}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {org.whatsApps}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {org.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {org.expiresAt || t("N/A")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title={t("Ver detalhes")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7.058M12 7v5m0 0 2 2" />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        title={t("Excluir")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5.04 7m5 0V4m0 3v3m0 0h.01" />
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