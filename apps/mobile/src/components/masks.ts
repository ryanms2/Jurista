// ============================================
// Componente de Máscara para Inputs
// ============================================

/**
 * Aplicar máscara de CPF: 000.000.000-00
 */
export function maskCpf(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/**
 * Aplicar máscara de telefone: (00) 00000-0000
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/(\d{1,2})/, "($1");
  if (digits.length <= 7) return digits.replace(/(\d{2})(\d{1,5})/, "($1) $2");
  return digits.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
}

/**
 * Aplicar máscara de RG (genérica)
 */
export function maskRg(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return digits.replace(/(\d{2})(\d)/, "$1.$2");
  if (digits.length <= 8) return digits.replace(/(\d{2})(\d{3})(\d)/, "$1.$2.$3");
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
}

/**
 * Aplicar máscara de percentual: 00,00
 */
export function maskPercent(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, -2)},${digits.slice(-2)}`;
}

/**
 * Extrair somente dígitos
 */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}
