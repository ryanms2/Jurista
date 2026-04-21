// ============================================
// Login Page — Web
// ============================================
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Credenciais inválidas");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-secondary/10 rounded-full blur-[128px]" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/30 mb-6">
            <span className="text-4xl">⚖️</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Jurista
          </h1>
          <p className="text-muted mt-2">Sistema de Gestão de Empréstimos</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="card border-white/[0.08] backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold mb-6">Entrar na Conta</h2>

          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-3 mb-4">
              <p className="text-danger text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jurista.com"
                className="input-field"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="text-sm text-white/70 mb-1.5 block">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <span className="spinner" aria-hidden="true" />}
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-xs text-muted text-center mt-6">
            Acesso restrito a administradores
          </p>
        </form>
      </div>
    </div>
  );
}
