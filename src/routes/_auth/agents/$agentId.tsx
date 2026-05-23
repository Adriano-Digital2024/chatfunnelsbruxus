import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import { useTranslation } from "@/hooks/useTranslation";
import { useAgent, useDeleteAgent, useUpdateAgent, useCurrentAgent } from "@/queries/useAgents";
import { useForm, useWatch } from "react-hook-form";
import SectionBody from "@/components/SectionBody";
import useBoundStore from "@/stores/useBoundStore";
import { type AIAgentRow, type AIAgentUpdate } from "@/supabase/client";
import { startConversation } from "@/utils/ConversationUtils";
import { useOrganizationsAddresses } from "@/queries/useOrganizationsAddresses";
import SectionFooter from "@/components/SectionFooter";
import Button from "@/components/Button";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import SectionField from "@/components/SectionField";
import ToolsSection from "@/components/ToolsSection";
import { useSubscription } from "@/queries/useBilling";
import { getPlanTier, getModelsForTier } from "@/utils/modelsCatalog";

export const Route = createFileRoute("/_auth/agents/$agentId")({
  component: AgentDetail,
});

function AgentDetail() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const { agentId } = Route.useParams();
  const { data: agent } = useAgent<AIAgentRow>(agentId);
  const { data: currentAgent } = useCurrentAgent();
  const isAdmin = ["admin", "owner"].includes(currentAgent?.extra?.role || "");
  const deleteAgent = useDeleteAgent();
  const updateAgent = useUpdateAgent();
  const activeOrgId = useBoundStore((state) => state.ui.activeOrgId);

  const { data: subscription } = useSubscription();
  const planName = (subscription as any)?.plans?.name ?? null;
  const tier = getPlanTier(planName);
  const availableModels = getModelsForTier(tier);

  const localAddress = useOrganizationsAddresses().data?.find(
    (address) => address.service === "local",
  );

  const normalizedAgent = useMemo(() => {
    if (!agent) return undefined;
    return {
      ...agent,
      extra: {
        ...agent.extra,
        tools: agent.extra?.tools ?? [],
        api_url: "openrouter",
        protocol: "chat_completions" as const,
      },
    };
  }, [agent]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isDirty, isValid },
  } = useForm<AIAgentUpdate>({ values: normalizedAgent });

  const model = useWatch({ control, name: "extra.model" });

  useEffect(() => {
    setValue("extra.api_url", "openrouter");
    setValue("extra.protocol", "chat_completions");
  }, [setValue]);

  const handleChat = () => {
    if (!activeOrgId || !localAddress) return;

    const convId = startConversation({
      organization_id: activeOrgId,
      organization_address: localAddress.address,
      service: "local",
      extra: { default_agent_id: agentId },
      name: agent?.name,
    });

    navigate({ hash: convId });
  };

  const currentModel = availableModels.find((m) => m.id === model);

  return agent && (
    <>
      <SectionHeader
        title={agent.name}
        onDelete={() => {
          deleteAgent.mutate(agentId, {
            onSuccess: () => navigate({ to: "..", hash: (prevHash) => prevHash! })
          });
        }}
        deleteDisabled={!isAdmin}
        deleteDisabledReason={t("Requiere permisos de administrador")}
        deleteLoading={deleteAgent.isPending}
      />

      <SectionBody>
        <form
          id="agent-form"
          onSubmit={handleSubmit((data) => updateAgent.mutate({
            ...data,
            extra: {
              ...data.extra,
              api_url: "openrouter",
              protocol: "chat_completions",
              api_key: undefined,
            },
          }))}
        >
          <label>
            <div className="label">{t("Nombre")}</div>
            <input
              type="text"
              className="text"
              placeholder={t("Nombre del agente")}
              {...register("name", { required: true })}
            />
          </label>

          <SelectField
            name="extra.mode"
            control={control}
            label={t("Estado")}
            options={[
              { value: "active", label: t("Activo") },
              { value: "draft", label: t("Borrador") },
              { value: "inactive", label: t("Inactivo") },
            ]}
          />

          <div className="border-t border-border" />

          <TextAreaField
            name="extra.instructions"
            control={control}
            label={t("Instrucciones")}
            placeholder={t("Eres un asistente útil...")}
          />

          <ToolsSection control={control} register={register} setValue={setValue} />

          {/* AI Model Section */}
          <SectionField
            label={t("Modelo de IA")}
            description={currentModel ? `${currentModel.label} · ${currentModel.provider}` : model || t("Ninguno")}
          >
            <SelectField
              name="extra.model"
              control={control}
              modalClassName="bottom-0"
              label={t("Modelos disponibles")}
              options={availableModels.map((m) => ({
                value: m.id,
                label: `${m.label} — ${m.provider}`,
              }))}
            />

            <div className="instructions">
              <p>
                {t("Los modelos disponibles dependen de tu plan. El consumo es gestionado por la plataforma.")}
              </p>
            </div>

            <label>
              <div className="label">{t("Mensajes máximos")}</div>
              <input
                type="number"
                className="text"
                min={1}
                placeholder="50"
                {...register("extra.max_messages", { valueAsNumber: true })}
              />
            </label>

            <label>
              <div className="label">{t("Temperatura")}</div>
              <input
                type="number"
                className="text"
                min={0}
                max={2}
                step={0.1}
                placeholder="1.0"
                {...register("extra.temperature", { valueAsNumber: true })}
              />
            </label>
          </SectionField>
        </form>
      </SectionBody>

      <SectionFooter>
        {!isDirty ? (
          <button
            type="button"
            className="primary"
            onClick={handleChat}
          >
            {t("Chatea con este agente")}
          </button>
        ) : (
          <Button
            form="agent-form"
            type="submit"
            disabled={!isAdmin}
            invalid={!isValid}
            loading={updateAgent.isPending}
            disabledReason={t("Requiere permisos de administrador")}
            className="primary"
          >
            {t("Actualizar")}
          </Button>
        )}
      </SectionFooter>
    </>
  );
}
