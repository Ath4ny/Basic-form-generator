export type FormFieldType = 'input' | 'select' | 'checkbox' | 'textarea'

export interface FormField {
  name: string
  type: FormFieldType
  label: string
  value?: unknown
  required?: boolean
  disabled?: boolean
  placeholder?: string
  validation?: {
    pattern?: RegExp
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    custom?: (value: unknown) => boolean | string
  }
  options?: Array<{ label: string; value: PropertyKey }>
  attributes?: { [key: string]: string }
}

export interface FormConfig {
  id: string // Needed for the store
  title?: string
  description?: string
  fields: FormField[]
  submitButton?: {
    text: string
  }
  cancelButton?: {
    text: string
  }
}

export interface FormData {
  [key: string]: any
}
