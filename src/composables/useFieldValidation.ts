import type { FormField } from '@/components/Form/Types'

export default function useValidation(value: unknown, field: FormField) {
  const validationResult = {
    error: '',
    isValid: true,
  }

  if (field.required && (value === undefined || value === null || value === '')) {
    validationResult.error = 'Это поле обязательно для заполнения'
    validationResult.isValid = false
  }

  if (field.validation) {
    const { validation } = field

    if (validation.min !== undefined && Number(value) < validation.min) {
      validationResult.error = `Минимальное значение: ${validation.min}`
      validationResult.isValid = false
    }

    if (validation.max !== undefined && Number(value) > validation.max) {
      validationResult.error = `Максимальное значение: ${validation.max}`
      validationResult.isValid = false
    }

    if (validation.minLength !== undefined && String(value).length < validation.minLength) {
      validationResult.error = `Минимальная длина: ${validation.minLength} символов`
      validationResult.isValid = false
    }

    if (validation.maxLength !== undefined && String(value).length > validation.maxLength) {
      validationResult.error = `Максимальная длина: ${validation.maxLength} символов`
      validationResult.isValid = false
    }

    if (validation.pattern && !validation.pattern.test(String(value))) {
      validationResult.error = 'Неверный формат'
      validationResult.isValid = false
    }

    if (validation.custom) {
      const customValidation = validation.custom(value)
      if (customValidation !== true) {
        validationResult.error =
          typeof customValidation === 'string' ? customValidation : 'Неверное значение'
        validationResult.isValid = false
      }
    }
  }

  return validationResult
}
