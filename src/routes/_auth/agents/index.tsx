import SectionBody from "@/components/SectionBody";
import SectionHeader from "@/components/SectionHeader";
import { useTranslation } from "@/hooks/useTranslation";
import { useCurrentAgents, useCurrentAgent } from "@/queries/useAgents";
import SectionItem from "@/components/SectionItem";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Bot } from "lucide-react";
import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import type { JSX } from "react";

export const Route = createFileRoute("/_auth/agents/")({
  component: ListAgents,
});

function ListAgents() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const { data: agents, isLoading } = useCurrentAgents();
  const { data: currentAgent } = useCurrentAgent();
  const isAdmin = ["admin", "owner"].includes(currentAgent?.extra?.role || "");

  const modeLabels: Record<string, string | JSX.Element> = {
    active: <span className="text-primary">{t("Activo")}</span>,
    draft: t("Borrador"),
    inactive: t("Inactivo"),
  };

  return (
    <>
      <SectionHeader title={t("Agentes")} />

      <SectionBody>
        <SectionItem
          title={t("Agregar agente")}
          aside={
            <div className="p-[8px] bg-primary/10 rounded-full">
              <Plus className="w-[24px] h-[24px] text-primary" />
            </div>
          }
          onClick={() =>
            navigate({
              to: "/agents/new",
              hash: (prevHash) => prevHash!,
            })
          }
          disabled={!isAdmin}
          disabledReason={t("Requiere permisos de administrador")}
        />
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm p-6">
            <Spinner size={16} />
            {t("Cargando...")}
          </div>
        ) : agents?.filter(a => a.ai).length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-[32px] text-center">
            <Bot className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-[14px]">
              {t("No hay agentes aún. Creá tu primer agente para empezar.")}
            </p>
          </div>
        ) : (
          agents?.filter(a => a.ai).map((agent) => (
            <SectionItem
              key={agent.id}
              title={agent.name}
              description={modeLabels[agent.extra?.mode || ""]}
              aside={
                <Avatar
                  src={agent.picture}
                  fallback={agent.name?.substring(0, 2).toUpperCase()}
                  size={40}
                  className="bg-muted text-muted-foreground"
                />
              }
              onClick={() =>
                navigate({
                  to: `/agents/${agent.id}`,
                  hash: (prevHash) => prevHash!,
                })
              }
            />
          ))
        )}
      </SectionBody>
    </>
  );
}
