import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function WhatsAppsManagement() {
  const { translate: t } = useTranslation();

  const [whatsApps] = useState([
    {
      id: "wa-001",
      organization: "TechCorp",
      phoneNumber: "+5511912345678",
      status: "connected",
      wabaId: "123456789012345",
      webhookUrl: "https://api.example.com/webhooks/whatsapp",
      verifiedName: "TechCorp Official",
      orgAddressId: "addr-001",
    },
    {
      id: "wa-002",
      organization: "Startup Solutions",
      phoneNumber: "+5511987654321",
      status: "pending",
      wabaId: null,
      webhookUrl: null,
      verifiedName: null,
      orgAddressId: "addr-002",
    },
    {
      id: "wa-003",
      organization: "Digital Agency",
      phoneNumber: "+5511555555555",
      status: "connected",
      wabaId: "987654321098765",
      webhookUrl: "https://api.example.com/webhooks/whatsapp2",
      verifiedName: "Digital Agency",
      orgAddressId: "addr-003",
    },
    {
      id: "wa-004",
      organization: "Innovate Labs",
      phoneNumber: "+5511777777777",
      status: "disconnected",
      wabaId: "555555555555555",
      webhookUrl: "https://api.example.com/webhooks/whatsapp3",
      verifiedName: "Innovate Labs",
      orgAddressId: "addr-005",
    },
    {
      id: "wa-005",
      organization: "Consulting Partners",
      phoneNumber: "+5511888888888",
      status: "revoked",
      wabaId: null,
      webhookUrl: null,
      verifiedName: null,
      orgAddressId: "addr-004",
    },
  ]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "disconnected":
        return "bg-red-100 text-red-800 border-red-300";
      case "revoked":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "connected":
        return t("Conectado");
      case "pending":
        return t("Pendente");
      case "disconnected":
        return t("Desconectado");
      case "revoked":
        return t("Revogado");
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("Gestão de WhatsApps")}</h1>
        <button className="primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t("Conectar WhatsApp")}
        </button>
      </div>

      <div className="mb-4 p-4 bg-card rounded-xl border border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-muted-foreground">{t("Conectados")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-muted-foreground">{t("Pendentes")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-muted-foreground">{t("Desconectados")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">5</div>
            <div className="text-sm text-muted-foreground">{t("Total de números")}</div>
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
                  {t("Número")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("WABA ID")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Nome Verificado")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Ações")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {whatsApps.map((wa) => (
                <tr
                  key={wa.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-foreground">
                      {wa.organization}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {wa.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(wa.status)}`}
                    >
                      {getStatusLabel(wa.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {wa.wabaId || t("N/A")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {wa.verifiedName || t("N/A")}
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
                      {wa.status === "connected" ? (
                        <button
                          className="p-1 text-muted-foreground hover:text-red-600 transition-colors"
                          title={t("Desconectar")}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17l5-5m0 0l-5-5m5 5H6" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7l5 5m0 0l-5 5" />
                          </svg>
                        </button>
                      ) : wa.status === "pending" ? (
                        <button
                          className="p-1 text-muted-foreground hover:text-green-600 transition-colors"
                          title={t("Conectar")}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m0 0a8.001 8.001 0 001 13.924m1.59-1.317L21 21l-3.5-1M3 9h18M15 21V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m6-3v3m0 0v-3m0 0h-6" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className="p-1 text-muted-foreground hover:text-blue-600 transition-colors"
                          title={t("Reconectar")}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m0 0a8.001 8.001 0 001 13.924m1.59-1.317L21 21l-3.5-1M3 9h18M15 21V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m6-3v3m0 0v-3m0 0h-6" />
                          </svg>
                        </button>
                      )}
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