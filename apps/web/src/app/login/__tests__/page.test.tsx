import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "../page";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Setup global fetch mock
global.fetch = vi.fn();

describe("LoginPage", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
  });

  it("renders the login form correctly", () => {
    render(<LoginPage />);
    
    expect(screen.getByRole("heading", { name: "Entrar na Conta" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin@jurista.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByPlaceholderText("admin@jurista.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("handles successful login", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: true }),
    } as any);

    render(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText("admin@jurista.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), { target: { value: "password123" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByRole("button", { name: "Entrando..." })).toBeDisabled();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/login", expect.any(Object));
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("handles failed login and displays error", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: false, error: "Credenciais inválidas" }),
    } as any);

    render(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText("admin@jurista.com"), { target: { value: "wrong@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), { target: { value: "wrongpass" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(screen.getByText("Credenciais inválidas")).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
    
    expect(screen.getByRole("button", { name: "Entrar" })).not.toBeDisabled();
  });

  it("handles network errors gracefully", async () => {
    vi.mocked(global.fetch).mockRejectedValue(new Error("Network error"));

    render(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText("admin@jurista.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), { target: { value: "password" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(screen.getByText("Erro ao conectar ao servidor")).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
