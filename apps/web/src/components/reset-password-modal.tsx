"use client";
// ============================================
// Modal de Redefinição de Senha (Admin → Cobrador)
// ============================================

import { useState } from "react";

interface ResetPasswordModalProps {
  userId: string;
  userName: string;
  open: boolean;
  onClose: () => void;
}

export function ResetPasswordModal({ userId, userName, open, onClose }: ResetPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setPassword(""); setError(""); setSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) { setError("A senha deve ter pelo menos 6 caracteres."); return; }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${userId}/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erro ao redefinir senha."); return; }
      setSuccess(true);
      setTimeout(handleClose, 1500);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface border border-white/[0.08] rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h3 className="font-semibold">🔑 Redefinir Senha</h3>
            <p className="text-xs text-muted mt-0.5">{userName}</p>
          </div>
          <button onClick={handleClose} className="text-muted hover:text-white text-xl leading-none">×</button>
        </div>

        {success ? (
          <div className="px-6 py-10 text-center">
            <p className="text-success text-4xl mb-3">✅</p>
            <p className="font-medium">Senha redefinida com sucesso!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {error && (
              <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 text-sm text-danger">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm text-muted mb-1">Nova Senha</label>
              <input
                type="password"
                className="input w-full"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                autoFocus
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={handleClose} className="btn-secondary flex-1">
                Cancelar
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
                {loading ? "Salvando..." : "Redefinir"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
