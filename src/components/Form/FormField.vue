<template>
  <div class="form-field">
    <label :for="field.name" class="field-label" v-if="field.type !== 'checkbox'">
      {{ field.label || '' }}
      <span v-if="field.required" class="required">*</span>
    </label>

    <slot :field="field" :value="value" :updateValue="updateValue">
      <component
        v-if="field.type !== 'checkbox'"
        :is="fieldComponent"
        :id="field.name"
        v-bind="fieldAttributes"
        :value="value"
        @input="updateValue"
        @change="updateValue"
        class="field-input"
      >
        <option v-if="field.type === 'select'" value="" disabled hidden>
          {{ field.placeholder || 'Выберите опцию' }}
        </option>
        <template v-if="field.type === 'select' && field.options">
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </template>
      </component>

      <div v-else class="checkbox">
        <!-- Temporary solution before checkbox component will be implemented 
            to save styling consistency -->

        <input
          :id="field.name"
          type="checkbox"
          v-bind="fieldAttributes"
          :value="value"
          @input="updateValue"
          @change="updateValue"
          class="checkbox-input"
        />
        <label :for="field.name" class="field-label">
          {{ field.label }}
          <span v-if="field.required" class="required">*</span>
        </label>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FormField } from './Types'
import useValidation from '@/composables/useFieldValidation'

interface Props {
  field: FormField
  value: unknown
}

interface Emits {
  (e: 'update:value', value: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const error = ref<string>('')

const fieldTypesMap = {
  select: 'select',
  textarea: 'textarea',
  checkbox: 'input',
  input: 'input',
}
const fieldComponent = computed(() => {
  return fieldTypesMap[props.field.type] || 'input'
})

const fieldAttributes = computed(() => {
  const attrs: Record<string, any> = {
    name: props.field.name,
    disabled: props.field.disabled,
    required: props.field.required,
    placeholder: props.field.placeholder,
  }

  if (props.field.type === 'checkbox') {
    attrs.type = 'checkbox'
    attrs.checked = props.value
  } else if (props.field.type === 'input') {
    attrs.type = props.field.attributes?.type || 'text'
  }

  return attrs
})

const updateValue = (event: Event) => {
  let newValue: any

  if (props.field.type === 'checkbox') {
    newValue = (event.target as HTMLInputElement).checked
  } else if (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLSelectElement ||
    event.target instanceof HTMLTextAreaElement
  ) {
    newValue = event.target.value
  } else {
    return
  }

  validate(newValue)
  emit('update:value', newValue)
}

const validate = (value: unknown) => {
  error.value = ''

  const validation = useValidation(value, props.field)

  error.value = validation.error
  return validation.isValid
}
</script>

<style scoped lang="scss">
.form-field {
  margin-bottom: 1.5rem;

  .field-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;

    .required {
      color: #ef4444;
      margin-left: 0.25rem;
    }
  }

  .checkbox {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .field-input {
    max-width: 100%;
    width: -webkit-fill-available;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }
  }

  textarea.field-input {
    min-height: 100px;
    resize: vertical;
  }

  input[type='checkbox'] {
    width: auto;
    margin-right: 0.5rem;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .radio-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      input[type='radio'] {
        width: auto;
      }
    }
  }

  .field-error {
    margin-top: 0.25rem;
    color: #ef4444;
    font-size: 0.875rem;
  }
}
</style>
