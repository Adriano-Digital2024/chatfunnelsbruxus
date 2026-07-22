import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function UsersManagement() {
  const { translate: t } = useTranslation();

  const [users] = useState([
    {
      id: "user-001",
      name: "María García",
      email: "maria@techcorp.com",
      organization: "TechCorp",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15",
      lastLogin: "2024-12-20",
    },
    {
      id: "user-002",
      name: "Juan Pérez",
      email: "juan@startup.io",
      organization: "Startup Solutions",
      role: "member",
      status: "active",
      createdAt: "2024-02-20",
      lastLogin: "2024-12-19",
    },
    {
      id: "user-003",
      name: "Ana Silva",
      email: "ana@digital.com",
      organization: "Digital Agency",
      role: "owner",
      status: "active",
      createdAt: "2024-01-10",
      lastLogin: "2024-12-18",
    },
    {
      id: "user-004",
      name: "Luis Rodríguez",
      email: "luis@consulting.com",
      organization: "Consulting Partners",
      role: "admin",
      status: "inactive",
      createdAt: "2024-03-05",
      lastLogin: "2024-11-30",
    },
    {
      id: "user-005",
      name: "Sofia Martínez",
      email: "sofia@innovate.com",
      organization: "Innovate Labs",
      role: "member",
      status: "pending",
      createdAt: "2024-12-10",
      lastLogin: "Nunca",
    },
  ]);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "member":
        return "bg-green-100 text-green-800 border-green-300";
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
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("Gestão de Usuários")}</h1>
        <button className="primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t("Adicionar Usuário")}
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
                  {t("Email")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Organização")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Papel")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Criado em")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Último login")}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Ações")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-foreground">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">
                      {user.organization}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(user.role)}`}
                    >
                      {t(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(user.status)}`}
                    >
                      {t(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title={t("Editar")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5m-1.5-1L11 9l4 4L21 9" />
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