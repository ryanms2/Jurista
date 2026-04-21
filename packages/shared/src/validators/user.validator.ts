import { z } from "zod";

const USER_ROLES = ["MASTER", "COLLECTOR"] as const;

// ============================================
// Schema: Login
// ============================================
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha muito longa"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ============================================
// Schema: Criar Usuário (Master/Cobrador)
// ============================================
export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha muito longa"),
  confirmPassword: z.string(),
  role: z.enum(USER_ROLES, {
    errorMap: () => ({ message: "Tipo inválido (Master ou Cobrador)" }),
  }),
  phone: z.string().max(15).optional(),
  commissionPct: z
    .number()
    .min(0, "Comissão não pode ser negativa")
    .max(100, "Comissão máxima é 100%")
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// ============================================
// Schema: Atualizar Usuário
// ============================================
export const updateUserSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(15).optional(),
  commissionPct: z.number().min(0).max(100).optional(),
  active: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// ============================================
// Schema: Alterar Senha
// ============================================
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual obrigatória"),
  newPassword: z
    .string()
    .min(6, "Nova senha deve ter pelo menos 6 caracteres"),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Senhas não conferem",
  path: ["confirmNewPassword"],
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
