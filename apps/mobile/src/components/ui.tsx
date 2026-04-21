// ============================================
// Componentes UI Reutilizáveis
// ============================================

import { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  type TextInputProps,
  type TouchableOpacityProps,
} from "react-native";

// ==================== INPUT ====================

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, leftIcon, className, ...props }, ref) => {
    return (
      <View className="mb-3">
        {label && (
          <Text className="text-text-secondary text-sm mb-1.5 ml-1">
            {label}
          </Text>
        )}
        <View className="relative">
          {leftIcon && (
            <Text className="absolute left-4 top-3.5 text-base text-text-muted z-10">
              {leftIcon}
            </Text>
          )}
          <TextInput
            ref={ref}
            placeholderTextColor="#64748b"
            className={`bg-surface border rounded-xl px-4 py-3.5 text-text-primary text-base ${
              error ? "border-danger" : "border-border"
            } ${leftIcon ? "pl-11" : ""} ${className || ""}`}
            {...props}
          />
        </View>
        {error && (
          <Text className="text-danger text-xs mt-1 ml-1">{error}</Text>
        )}
      </View>
    );
  }
);

// ==================== BUTTON ====================

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

const BUTTON_VARIANTS = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  danger: "bg-danger",
  outline: "bg-transparent border border-primary",
  ghost: "bg-transparent",
};

const BUTTON_TEXT_VARIANTS = {
  primary: "text-white",
  secondary: "text-white",
  danger: "text-white",
  outline: "text-primary",
  ghost: "text-primary",
};

const BUTTON_SIZES = {
  sm: "py-2 px-4",
  md: "py-3.5 px-6",
  lg: "py-4 px-8",
};

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading,
  icon,
  fullWidth = true,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      className={`rounded-xl items-center justify-center flex-row ${
        BUTTON_VARIANTS[variant]
      } ${BUTTON_SIZES[size]} ${
        disabled || loading ? "opacity-50" : ""
      } ${fullWidth ? "w-full" : ""}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "ghost" ? "#6366f1" : "#fff"}
          size="small"
        />
      ) : (
        <>
          {icon && <Text className="mr-2 text-base">{icon}</Text>}
          <Text
            className={`font-sans-semibold text-base ${BUTTON_TEXT_VARIANTS[variant]}`}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

// ==================== CARD ====================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export function Card({ children, className, onPress }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`bg-surface border border-border rounded-2xl p-4 ${className || ""}`}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={`bg-surface border border-border rounded-2xl p-4 ${className || ""}`}>
      {children}
    </View>
  );
}

// ==================== BADGE ====================

interface BadgeProps {
  text: string;
  color?: "primary" | "success" | "warning" | "danger" | "muted";
}

const BADGE_COLORS = {
  primary: "bg-primary/20 text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  danger: "bg-danger/20 text-danger",
  muted: "bg-muted/20 text-text-muted",
};

export function Badge({ text, color = "primary" }: BadgeProps) {
  const colorClasses = BADGE_COLORS[color];
  return (
    <View className={`rounded-full px-3 py-1 ${colorClasses.split(" ")[0]}`}>
      <Text className={`text-xs font-sans-medium ${colorClasses.split(" ").slice(1).join(" ")}`}>
        {text}
      </Text>
    </View>
  );
}

// ==================== SEPARATOR ====================

export function Separator({ label }: { label?: string }) {
  if (label) {
    return (
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-border" />
        <Text className="text-text-muted text-xs mx-3">{label}</Text>
        <View className="flex-1 h-px bg-border" />
      </View>
    );
  }
  return <View className="h-px bg-border my-4" />;
}

// ==================== EMPTY STATE ====================

export function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View className="items-center py-12 px-8">
      <Text className="text-5xl mb-4">{icon}</Text>
      <Text className="text-text-primary text-lg font-sans-semibold text-center">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-text-secondary text-sm text-center mt-2">
          {subtitle}
        </Text>
      )}
    </View>
  );
}

// ==================== STAT ROW ====================

export function StatRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View className="flex-row justify-between items-center py-2">
      <Text className="text-text-secondary text-sm">{label}</Text>
      <Text className={`font-sans-semibold text-sm ${valueColor || "text-text-primary"}`}>
        {value}
      </Text>
    </View>
  );
}

// ==================== SELECT ====================

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Select({ label, options, value, onChange, error }: SelectProps) {
  return (
    <View className="mb-3">
      {label && (
        <Text className="text-text-secondary text-sm mb-1.5 ml-1">{label}</Text>
      )}
      <View className="flex-row flex-wrap gap-2">
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`rounded-xl px-4 py-3 border ${
              value === opt.value
                ? "bg-primary/20 border-primary"
                : "bg-surface border-border"
            }`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-sm font-sans-medium ${
                value === opt.value ? "text-primary" : "text-text-secondary"
              }`}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text className="text-danger text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
}

// ==================== CURRENCY INPUT ====================

interface CurrencyInputProps {
  label?: string;
  value: string;
  onChangeValue: (value: string) => void;
  error?: string;
}

export function CurrencyInput({ label, value, onChangeValue, error }: CurrencyInputProps) {
  const handleChange = (text: string) => {
    // Remove tudo que não é dígito
    const digits = text.replace(/\D/g, "");
    // Converte para decimal (últimos 2 dígitos são centavos)
    const number = parseInt(digits || "0", 10);
    const formatted = (number / 100).toFixed(2);
    onChangeValue(formatted);
  };

  const displayValue = value
    ? `R$ ${parseFloat(value).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "R$ 0,00";

  return (
    <View className="mb-3">
      {label && (
        <Text className="text-text-secondary text-sm mb-1.5 ml-1">{label}</Text>
      )}
      <TextInput
        value={displayValue}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder="R$ 0,00"
        placeholderTextColor="#64748b"
        className={`bg-surface border rounded-xl px-4 py-3.5 text-text-primary text-lg font-sans-bold ${
          error ? "border-danger" : "border-border"
        }`}
      />
      {error && <Text className="text-danger text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
}
