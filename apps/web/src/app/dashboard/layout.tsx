"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ChangePasswordModal } from "@/components/change-password-modal";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/dashboard/clients", icon: "👥", label: "Clientes" },
  { href: "/dashboard/loans", icon: "💰", label: "Empréstimos" },
  { href: "/dashboard/cash", icon: "🏦", label: "Caixa" },
  { href: "/dashboard/reports", icon: "📈", label: "Relatórios" },
  { href: "/dashboard/users", icon: "🔑", label: "Cobradores" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/login", { method: "DELETE" });
      document.cookie = "jurista_token=; Max-Age=0; path=/;";
      router.push("/login");
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-64"
        } fixed top-0 left-0 h-full bg-surface/80 backdrop-blur-xl border-r border-white/[0.06]
          flex flex-col transition-all duration-300 z-50`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-xl">⚖️</span>
          </div>
          {!collapsed && (
            <span className="ml-3 font-bold text-lg bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Jurista
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-white font-medium border-l-2 border-primary pl-[10px]"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 w-full transition-all"
          >
            <span className="text-lg">{collapsed ? "▶" : "◀"}</span>
            {!collapsed && <span>Recolher</span>}
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-danger/60 hover:text-danger hover:bg-danger/5 w-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <svg className="animate-spin h-4 w-4 text-danger/60 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <span className="text-lg">🚪</span>
            )}
            {!collapsed && <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-[72px]" : "ml-64"
        }`}
      >
        {/* Topbar */}
        <header className="h-16 flex items-center px-8 border-b border-white/[0.06] bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex-1">
            <h2 className="text-sm text-muted">
              {NAV_ITEMS.find(
                (n) =>
                  pathname === n.href ||
                  (n.href !== "/dashboard" && pathname.startsWith(n.href))
              )?.label || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              title="Alterar minha senha"
              className="text-xs text-muted hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              🔑 Alterar Senha
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
