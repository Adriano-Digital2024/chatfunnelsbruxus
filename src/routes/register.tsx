import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const { translate: t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleOAuth(provider: "google" | "github") {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + "/" },
    });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin + "/",
      },
    });

    setLoading(false);

    if (error) {
      setMessage(t("Error al registrarse. Verificá tus datos."));
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="flex flex-col gap-9 justify-center items-center bg-background text-foreground h-dvh w-screen">
      <img src="/logo.png" alt="Bruxus" className="h-20 w-auto mb-4" />

      {success ? (
        <div className="flex flex-col gap-4 w-[280px] text-center">
          <div className="text-[16px]">
            {t("¡Registro exitoso! Revisá tu correo para confirmar tu cuenta.")}
          </div>
          <a href="/login" className="underline text-primary text-sm">
            {t("Volver al inicio de sesión")}
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-[260px]">
          {/* OAuth buttons */}
          <button
            type="button"
            className="primary bg-blue-500 hover:bg-blue-400 text-white w-full border-none"
            onClick={() => handleOAuth("google")}
          >
            <GoogleOutlined /> Continue with Google
          </button>

          <button
            type="button"
            className="primary bg-gray-900 hover:bg-gray-800 text-white w-full border-none"
            onClick={() => handleOAuth("github")}
          >
            <GithubOutlined /> Continue with GitHub
          </button>

          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <div className="flex-1 border-t border-border" />
            <span>or</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Email / password form */}
          <form onSubmit={handleRegister} className="login-form">
            <label>
              <div className="label">{t("Nombre")}</div>
              <input
                className="text"
                type="text"
                placeholder={t("Tu nombre")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              <div className="label">{t("Correo electrónico")}</div>
              <input
                className="text"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              <div className="label">{t("Contraseña")}</div>
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

            {message && (
              <div className="text-destructive text-sm text-center">{message}</div>
            )}

            <button
              type="submit"
              className="primary w-full mt-[4px]"
              disabled={loading}
            >
              {loading ? t("Cargando...") : t("Crear cuenta")}
            </button>
          </form>

          <div className="border-b border-border w-full" />

          <div className="text-center text-sm text-muted-foreground">
            {t("¿Ya tenés cuenta?")}{" "}
            <a href="/login" className="underline">
              {t("Iniciar sesión")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
