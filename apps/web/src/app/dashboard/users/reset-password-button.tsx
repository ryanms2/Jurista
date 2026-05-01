"use client";
// Botão de redefinir senha isolado como Client Component

import { useState } from "react";
import { ResetPasswordModal } from "@/components/reset-password-modal";

export function ResetPasswordButton({ userId, userName }: { userId: string; userName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full text-xs text-muted hover:text-white border border-white/[0.06] hover:border-white/20 rounded-xl py-2 transition-all"
      >
        🔑 Redefinir Senha
      </button>
      <ResetPasswordModal
        userId={userId}
        userName={userName}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
