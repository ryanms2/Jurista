import { useAuthStore } from "../auth.store";
import * as authService from "../../services/auth";

jest.mock("../../services/auth", () => ({
  login: jest.fn(),
  logout: jest.fn(),
  getStoredUser: jest.fn(),
  isAuthenticated: jest.fn(),
}));

describe("Auth Store", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
    });
  });

  it("should initialize as authenticated if token and user exist", async () => {
    const mockUser = {
      id: "1",
      name: "Test User",
      email: "test@test.com",
      role: "MASTER" as const,
      phone: null,
      commissionPct: null,
    };

    (authService.isAuthenticated as jest.Mock).mockResolvedValue(true);
    (authService.getStoredUser as jest.Mock).mockResolvedValue(mockUser);

    await useAuthStore.getState().initialize();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it("should initialize as not authenticated if token is missing", async () => {
    (authService.isAuthenticated as jest.Mock).mockResolvedValue(false);
    (authService.getStoredUser as jest.Mock).mockResolvedValue(null);

    await useAuthStore.getState().initialize();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it("should login successfully and update state", async () => {
    const mockUser = {
      id: "1",
      name: "Test User",
      email: "test@test.com",
      role: "MASTER" as const,
      phone: null,
      commissionPct: null,
    };

    (authService.login as jest.Mock).mockResolvedValue({
      success: true,
      user: mockUser,
    });

    const success = await useAuthStore.getState().login("test@test.com", "password", "http://localhost:3000");

    expect(success).toBe(true);
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it("should fail login and set error", async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      success: false,
      error: "Credenciais inválidas",
    });

    const success = await useAuthStore.getState().login("test@test.com", "wrong", "http://localhost:3000");

    expect(success).toBe(false);
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe("Credenciais inválidas");
    expect(state.isLoading).toBe(false);
  });

  it("should clear error", () => {
    useAuthStore.setState({ error: "Some error" });
    useAuthStore.getState().clearError();
    expect(useAuthStore.getState().error).toBeNull();
  });

  it("should logout and reset state", async () => {
    useAuthStore.setState({
      user: { id: "1" } as any,
      isAuthenticated: true,
    });

    (authService.logout as jest.Mock).mockResolvedValue(undefined);

    await useAuthStore.getState().logout();

    expect(authService.logout).toHaveBeenCalled();
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
