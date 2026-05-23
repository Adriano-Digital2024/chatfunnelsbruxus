import { createFileRoute, useNavigate } from "@tanstack/react-router";
import SectionHeader from "@/components/SectionHeader";
import SectionFooter from "@/components/SectionFooter";
import { useTranslation } from "@/hooks/useTranslation";
import { useCreateAgent, useCurrentAgent } from "@/queries/useAgents";
import { useForm, useWatch } from "react-hook-form";
import SectionBody from "@/components/SectionBody";
import { type AIAgentInsert } from "@/supabase/client";
import Button from "@/components/Button";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import SectionField from "@/components/SectionField";
import ToolsSection from "@/components/ToolsSection";
import { useSubscription } from "@/queries/useBilling";
import { getPlanTier, getModelsForTier } from "@/utils/modelsCatalog";

export const Route = createFileRoute("/_auth/agents/new")({
  component: AddAgent,
});

function AddAgent() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const createAgent = useCreateAgent();
  const { data: currentAgent } = useCurrentAgent();
  const isAdmin = ["admin", "owner"].includes(currentAgent?.extra?.role || "");

  const { data: subscription } = useSubscription();
  const planName = (subscription as any)?.plans?.name ?? null;
  const tier = getPlanTier(planName);
  const availableModels = getModelsForTier(tier);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isValid, isDirty },
  } = useForm<AIAgentInsert>({
    defaultValues: {
      extra: {
        mode: "active",
        api_url: "openrouter",
        protocol: "chat_completions",
        model: availableModels[0]?.id ?? "google/gemini-2.0-flash-001",
        tools: [],
      }
    },
  });

  const model = useWatch({ control, name: "extra.model" });

  const onSubmit = (data: AIAgentInsert) => {
    createAgent.mutate(
      {
        ...data,
        ai: true,
        extra: {
          ...data.extra,
          api_url: "openrouter",
          protocol: "chat_completions",
          api_key: undefined,
        },
      },
      {
        onSuccess: (agent) =>
          navigate({
            to: `/agents/${agent.id}`,
            hash: (prevHash) => prevHash!,
          }),
      }
    );
  };

  const currentModel = availableModels.find((m) => m.id === model);

  return (
    <>
      <SectionHeader title={t("Agregar agente")} />

      <SectionBody>
        <form
          id="create-agent-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset disabled={!isAdmin} className="contents">
            <p>
              {t("Configura un agente de IA que responderá automáticamente a tus conversaciones.")}
            </p>

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
          </fieldset>
        </form>
      </SectionBody>

      <SectionFooter>
        <Button
          form="create-agent-form"
          type="submit"
          disabled={!isAdmin}
          invalid={!isValid || !isDirty}
          loading={createAgent.isPending}
          disabledReason={t("Requiere permisos de administrador")}
          className="primary"
        >
          {t("Crear")}
        </Button>
      </SectionFooter>
    </>
  );
}
