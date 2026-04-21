import { z } from "zod";

// ============================================
// Helpers de validação
// ============================================

/** Remove caracteres não numéricos */
const stripNonDigits = (value: string) => value.replace(/\D/g, "");

/** Valida CPF (algoritmo oficial) */
function isValidCpf(cpf: string): boolean {
  const digits = stripNonDigits(cpf);
  if (digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]!) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9]!)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]!) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[10]!)) return false;

  return true;
}

/** Schema para CPF com validação */
const cpfSchema = z
  .string()
  .min(11, "CPF deve ter 11 dígitos")
  .max(14, "CPF inválido")
  .transform(stripNonDigits)
  .refine(isValidCpf, "CPF inválido");

/** Schema para telefone brasileiro */
const phoneSchema = z
  .string()
  .min(10, "Telefone deve ter pelo menos 10 dígitos")
  .max(15, "Telefone inválido")
  .transform(stripNonDigits)
  .refine((v) => v.length >= 10 && v.length <= 11, "Telefone inválido");

// ============================================
// Schema: Criar Cliente
// ============================================
export const createClientSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  cpf: cpfSchema,
  rg: z
    .string()
    .min(5, "RG deve ter pelo menos 5 caracteres")
    .max(20, "RG muito longo"),
  address: z
    .string()
    .min(10, "Endereço deve ter pelo menos 10 caracteres")
    .max(255, "Endereço muito longo"),
  phone1: phoneSchema,
  phone2: phoneSchema.optional().or(z.literal("")),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;

// ============================================
// Schema: Atualizar Cliente
// ============================================
export const updateClientSchema = createClientSchema.partial();

export type UpdateClientInput = z.infer<typeof updateClientSchema>;

// ============================================
// Schema: Buscar Clientes
// ============================================
export const searchClientsSchema = z.object({
  search: z.string().optional(),
  active: z.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type SearchClientsInput = z.infer<typeof searchClientsSchema>;

export { cpfSchema, phoneSchema };
