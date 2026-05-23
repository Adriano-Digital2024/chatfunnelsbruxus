import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const { translate: t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    setLoading(false);

    if (error) {
      setMessage(t("Error al enviar el correo. Verificá la dirección."));
    } else {
      setSent(true);
    }
  }

  return (
    <div className="flex flex-col gap-9 justify-center items-center bg-background text-foreground h-dvh w-screen">
      <img src="/logo.png" alt="FlowAction" className="h-20 w-auto mb-4" />

      <div className="flex flex-col gap-2 w-[250px] text-center">
        <div className="text-[20px] font-medium">{t("Recuperar contraseña")}</div>
        <div className="text-muted-foreground text-sm">
          {t("Ingresá tu correo y te enviaremos un enlace para restablecer tu contraseña.")}
        </div>
      </div>

      {sent ? (
        <div className="flex flex-col gap-4 w-[280px] text-center">
          <div className="text-[16px]">
            {t("¡Correo enviado! Revisá tu bandeja de entrada.")}
          </div>
          <a href="/login" className="underline text-primary text-sm">
            {t("Volver al inicio de sesión")}
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-[250px]">
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <div className="label">{t("Correo electrónico")}</div>
              <input
                className="text"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {message && (
              <div className="text-destructive text-sm">{message}</div>
            )}

            <button
              type="submit"
              className="primary w-full mt-[16px]"
              disabled={loading}
            >
              {loading ? t("Cargando...") : t("Enviar enlace")}
            </button>
          </form>

          <div className="border-b border-border w-full" />

          <div className="text-center text-sm">
            <a href="/login" className="underline text-muted-foreground">
              {t("Volver al inicio de sesión")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
