
import { useMemo } from 'react';

interface ValidationRule<T> {
  field: keyof T;
  validator: (value: any) => boolean;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const useValidation = <T extends Record<string, any>>(
  data: T,
  rules: ValidationRule<T>[]
): ValidationResult => {
  return useMemo(() => {
    const errors: Record<string, string> = {};

    rules.forEach(rule => {
      const value = data[rule.field];
      if (!rule.validator(value)) {
        errors[rule.field as string] = rule.message;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [data, rules]);
};

// Common validation rules
export const ValidationRules = {
  required: (value: any) => value !== null && value !== undefined && value !== '',
  minLength: (min: number) => (value: string) => value && value.length >= min,
  maxLength: (max: number) => (value: string) => value && value.length <= max,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value: string) => /^\+?[\d\s\-\(\)]+$/.test(value),
  positive: (value: number) => value > 0,
  nonNegative: (value: number) => value >= 0
};
