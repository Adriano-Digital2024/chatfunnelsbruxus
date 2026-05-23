export interface ModelOption {
  id: string;
  label: string;
  provider: string;
}

export type PlanTier = "pro" | "business" | "enterprise";

export const PLAN_MODELS: Record<PlanTier, ModelOption[]> = {
  pro: [
    { id: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash", provider: "Google" },
    { id: "openai/gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI" },
    { id: "meta-llama/llama-3.2-11b-vision-instruct:free", label: "Llama 3.2 11B", provider: "Meta" },
  ],
  business: [
    { id: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash", provider: "Google" },
    { id: "openai/gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI" },
    { id: "meta-llama/llama-3.2-11b-vision-instruct:free", label: "Llama 3.2 11B", provider: "Meta" },
    { id: "anthropic/claude-3.5-haiku", label: "Claude 3.5 Haiku", provider: "Anthropic" },
    { id: "openai/gpt-4o", label: "GPT-4o", provider: "OpenAI" },
    { id: "google/gemini-1.5-pro", label: "Gemini 1.5 Pro", provider: "Google" },
  ],
  enterprise: [
    { id: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash", provider: "Google" },
    { id: "openai/gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI" },
    { id: "meta-llama/llama-3.2-11b-vision-instruct:free", label: "Llama 3.2 11B", provider: "Meta" },
    { id: "anthropic/claude-3.5-haiku", label: "Claude 3.5 Haiku", provider: "Anthropic" },
    { id: "openai/gpt-4o", label: "GPT-4o", provider: "OpenAI" },
    { id: "google/gemini-1.5-pro", label: "Gemini 1.5 Pro", provider: "Google" },
    { id: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic" },
    { id: "anthropic/claude-3.7-sonnet", label: "Claude 3.7 Sonnet", provider: "Anthropic" },
    { id: "openai/gpt-4.1", label: "GPT-4.1", provider: "OpenAI" },
    { id: "openai/o3-mini", label: "o3 Mini", provider: "OpenAI" },
  ],
};

export function getPlanTier(planName?: string | null): PlanTier {
  const name = (planName || "").toLowerCase();
  if (name.includes("enterprise")) return "enterprise";
  if (name.includes("business")) return "business";
  return "pro";
}

export function getModelsForTier(tier: PlanTier): ModelOption[] {
  return PLAN_MODELS[tier] ?? PLAN_MODELS.pro;
}
