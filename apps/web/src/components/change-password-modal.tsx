"use client";
// ============================================
// Modal de Alteração de Senha (própria)
// ============================================

import { useState } from "react";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setCurrent(""); setNext(""); setConfirm("");
    setError(""); setSuccess(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (next.length < 6) { setError("A nova senha deve ter pelo menos 6 caracteres."); return; }
    if (next !== confirm) { setError("As senhas não coincidem."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erro ao alterar senha."); return; }
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
      <div className="bg-surface border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h3 className="font-semibold">🔑 Alterar Minha Senha</h3>
          <button onClick={handleClose} className="text-muted hover:text-white text-xl leading-none">×</button>
        </div>

        {success ? (
          <div className="px-6 py-10 text-center">
            <p className="text-success text-4xl mb-3">✅</p>
            <p className="font-medium">Senha alterada com sucesso!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {error && (
              <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 text-sm text-danger">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm text-muted mb-1">Senha Atual</label>
              <input
                type="password"
                className="input w-full"
                value={current}
                onChange={e => setCurrent(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Nova Senha</label>
              <input
                type="password"
                className="input w-full"
                value={next}
                onChange={e => setNext(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                className="input w-full"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={handleClose} className="btn-secondary flex-1">
                Cancelar
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
