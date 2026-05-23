import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      setMessage(t("Las contraseñas no coinciden."));
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setMessage(
        t("Error al actualizar la contraseña. El enlace puede haber expirado.")
      );
    } else {
      navigate({ to: "/" });
    }
  }

  return (
    <div className="flex flex-col gap-9 justify-center items-center bg-background text-foreground h-dvh w-screen">
      <img src="/logo.png" alt="FlowAction" className="h-20 w-auto mb-4" />

      <div className="flex flex-col gap-2 w-[250px] text-center">
        <div className="text-[20px] font-medium">{t("Nueva contraseña")}</div>
      </div>

      <div className="flex flex-col gap-3 w-[250px]">
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <div className="label">{t("Nueva contraseña")}</div>
            <input
              className="text"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>

          <label>
            <div className="label">{t("Confirmar contraseña")}</div>
            <input
              className="text"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
            />
          </label>

          {message && (
            <div className="text-destructive text-sm text-center">{message}</div>
          )}

          <button
            type="submit"
            className="primary w-full mt-[16px]"
            disabled={loading}
          >
            {loading ? t("Actualizando...") : t("Actualizar contraseña")}
          </button>
        </form>
      </div>
    </div>
  );
}
