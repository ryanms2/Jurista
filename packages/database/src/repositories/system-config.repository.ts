import { prisma } from "../client";
import type { SystemConfig } from "@prisma/client";

/** Chaves de configuração do sistema */
export type SystemConfigKey =
  | "default_daily_credit"
  | "default_interest_rate"
  | "default_daily_installments"
  | "late_fee_amount"
  | "late_fee_interval_days"
  | "default_commission_pct"
  | "renewal_min_score"
  | "exclude_sundays";

/** Valores padrão das configurações */
const DEFAULT_VALUES: Record<SystemConfigKey, { value: string; description: string }> = {
  default_daily_credit: { value: "500", description: "Crédito inicial por dia (R$)" },
  default_interest_rate: { value: "20", description: "Taxa de juros padrão (%)" },
  default_daily_installments: { value: "20", description: "Nº de parcelas diárias padrão" },
  late_fee_amount: { value: "10", description: "Multa por intervalo de atraso (R$)" },
  late_fee_interval_days: { value: "5", description: "Intervalo em dias para aplicação de multa" },
  default_commission_pct: { value: "30", description: "Comissão padrão do cobrador (%)" },
  renewal_min_score: { value: "40", description: "Score mínimo para renovação" },
  exclude_sundays: { value: "true", description: "Excluir domingos das parcelas diárias" },
};

export class SystemConfigRepository {
  /**
   * Buscar configuração por chave
   */
  async get(key: SystemConfigKey): Promise<string> {
    const config = await prisma.systemConfig.findUnique({
      where: { key },
    });
    return config?.value ?? DEFAULT_VALUES[key]?.value ?? "";
  }

  /**
   * Buscar configuração como número
   */
  async getNumber(key: SystemConfigKey): Promise<number> {
    const value = await this.get(key);
    return Number(value);
  }

  /**
   * Buscar configuração como boolean
   */
  async getBoolean(key: SystemConfigKey): Promise<boolean> {
    const value = await this.get(key);
    return value === "true";
  }

  /**
   * Atualizar ou criar configuração
   */
  async set(key: SystemConfigKey, value: string): Promise<SystemConfig> {
    return prisma.systemConfig.upsert({
      where: { key },
      update: { value },
      create: {
        key,
        value,
        description: DEFAULT_VALUES[key]?.description,
      },
    });
  }

  /**
   * Buscar todas as configurações
   */
  async getAll(): Promise<Record<SystemConfigKey, string>> {
    const configs = await prisma.systemConfig.findMany();
    const result = { ...Object.fromEntries(
      Object.entries(DEFAULT_VALUES).map(([k, v]) => [k, v.value])
    ) } as Record<SystemConfigKey, string>;

    for (const config of configs) {
      result[config.key as SystemConfigKey] = config.value;
    }

    return result;
  }

  /**
   * Inicializar todas as configurações com valores padrão
   */
  async seedDefaults(): Promise<void> {
    for (const [key, { value, description }] of Object.entries(DEFAULT_VALUES)) {
      await prisma.systemConfig.upsert({
        where: { key },
        update: {},
        create: { key, value, description },
      });
    }
  }
}
