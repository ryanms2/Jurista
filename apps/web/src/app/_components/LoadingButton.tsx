// ============================================
// LoadingButton — Botão com estado de loading
// ============================================
// Uso: <LoadingButton loading={isLoading} className="btn-primary">Salvar</LoadingButton>

"use client";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function LoadingButton({
  loading = false,
  loadingText,
  children,
  disabled,
  className = "",
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${className} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="spinner" aria-hidden="true" />
          {loadingText ?? children}
        </span>
      ) : children}
    </button>
  );
}
