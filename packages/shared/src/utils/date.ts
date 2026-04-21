// ============================================
// Utilitários de Data
// ============================================

import type { LoanFrequency } from "../types";

/**
 * Verifica se uma data é domingo
 */
export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

/**
 * Adiciona um intervalo à data baseado na frequência do empréstimo
 */
export function addInterval(date: Date, frequency: LoanFrequency): Date {
  const result = new Date(date);

  switch (frequency) {
    case "DAILY":
      result.setDate(result.getDate() + 1);
      break;
    case "WEEKLY":
      result.setDate(result.getDate() + 7);
      break;
    case "BIWEEKLY":
      result.setDate(result.getDate() + 15);
      break;
    case "MONTHLY":
      result.setMonth(result.getMonth() + 1);
      break;
  }

  return result;
}

/**
 * Gera as datas de vencimento das parcelas, pulando domingos quando aplicável
 *
 * @param startDate - Data de início do empréstimo
 * @param count - Número total de parcelas
 * @param frequency - Frequência (dia, semana, quinzena, mês)
 * @param excludeSundays - Se deve pular domingos (padrão: true para DAILY)
 * @returns Array de datas de vencimento
 */
export function generateDueDates(
  startDate: Date,
  count: number,
  frequency: LoanFrequency,
  excludeSundays = true
): Date[] {
  const dates: Date[] = [];
  let current = new Date(startDate);

  while (dates.length < count) {
    current = addInterval(current, frequency);

    // Para empréstimos diários, pular domingos
    if (frequency === "DAILY" && excludeSundays && isSunday(current)) {
      continue;
    }

    dates.push(new Date(current));
  }

  return dates;
}

/**
 * Calcula o número de dias entre duas datas (ignorando horas)
 */
export function daysBetween(dateA: Date, dateB: Date): number {
  const a = new Date(dateA);
  a.setHours(0, 0, 0, 0);
  const b = new Date(dateB);
  b.setHours(0, 0, 0, 0);

  const diffMs = b.getTime() - a.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Calcula os dias de atraso de uma parcela (0 se não está atrasada)
 */
export function calculateDaysOverdue(dueDate: Date, referenceDate?: Date): number {
  const today = referenceDate ?? new Date();
  const days = daysBetween(dueDate, today);
  return Math.max(0, days);
}

/**
 * Retorna a data de início do dia (00:00:00)
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Retorna a data de fim do dia (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Formatar data no padrão brasileiro: DD/MM/AAAA
 */
export function formatDateBR(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

/**
 * Formatar data e hora: DD/MM/AAAA HH:MM
 */
export function formatDateTimeBR(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Verifica se duas datas são o mesmo dia
 */
export function isSameDay(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

/**
 * Retorna o número de parcelas padrão para uma frequência
 */
export function getDefaultInstallments(frequency: LoanFrequency): number {
  switch (frequency) {
    case "DAILY":
      return 20;   // 20 dias (sem domingo)
    case "WEEKLY":
      return 4;    // 4 semanas (1 mês)
    case "BIWEEKLY":
      return 2;    // 2 quinzenas (1 mês)
    case "MONTHLY":
      return 1;    // 1 mês
  }
}

/**
 * Retorna o label da frequência em português
 */
export function getFrequencyLabel(frequency: LoanFrequency): string {
  const labels: Record<LoanFrequency, string> = {
    DAILY: "Diário",
    WEEKLY: "Semanal",
    BIWEEKLY: "Quinzenal",
    MONTHLY: "Mensal",
  };
  return labels[frequency];
}
