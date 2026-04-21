// ============================================
// Utilitários para CPF
// ============================================

/**
 * Remove caracteres não numéricos
 */
export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Formatar CPF: 000.000.000-00
 */
export function formatCpf(cpf: string): string {
  const digits = stripNonDigits(cpf);
  if (digits.length !== 11) return cpf;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/**
 * Validar CPF com algoritmo oficial
 */
export function isValidCpf(cpf: string): boolean {
  const digits = stripNonDigits(cpf);
  if (digits.length !== 11) return false;

  // Rejeitar CPFs com todos os dígitos iguais
  if (/^(\d)\1+$/.test(digits)) return false;

  // Primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]!) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9]!)) return false;

  // Segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]!) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[10]!)) return false;

  return true;
}

/**
 * Formatar RG (formato genérico)
 */
export function formatRg(rg: string): string {
  const digits = stripNonDigits(rg);
  if (digits.length < 7) return rg;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}-${digits.slice(8)}`;
}
