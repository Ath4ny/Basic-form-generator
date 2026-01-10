<template>
  <div class="form-generator">
    <div v-if="config.title" class="form-title">
      <h2>{{ config.title }}</h2>
      <p v-if="config.description" class="form-description">
        {{ config.description }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" ref="form" class="form-content">
      <FormField
        v-for="field in config.fields"
        :key="field.name"
        :field="field"
        :value="formData[field.name]"
        @update:value="updateFieldValue(field.name, $event)"
      >
        <template v-if="$slots[field.name]" #[field.name]="slotProps">
          <slot
            :name="field.name"
            :field="slotProps.field"
            :value="slotProps.value"
            :updateValue="slotProps.updateValue"
          />
        </template>
      </FormField>

      <div class="form-actions">
        <button
          v-if="config.cancelButton"
          type="button"
          @click="handleCancel"
          :class="['btn', 'btn-cancel']"
        >
          {{ config.cancelButton.text }}
        </button>

        <button
          v-if="config.submitButton"
          type="submit"
          :disabled="submitting"
          :class="['btn', 'btn-submit']"
        >
          <span v-if="submitting">Отправка...</span>
          <span v-else>{{ config.submitButton.text }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import FormField from './FormField.vue'
import type { FormConfig, FormData } from './Types'

interface Props {
  config: FormConfig
  modelValue: FormData
  submitting?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: FormData): void
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = ref<HTMLFormElement>()
const formData = reactive<FormData>({ ...props.modelValue })
const submitting = ref(props.submitting || false)

const initializeFormData = () => {
  props.config.fields.forEach((field) => {
    if (formData[field.name] === undefined && field.value !== undefined) {
      formData[field.name] = field.value
    }
  })
}

initializeFormData()

const updateFieldValue = (fieldName: string, value: any) => {
  formData[fieldName] = value
  emit('update:modelValue', { ...formData })
}

const handleSubmit = (event: SubmitEvent) => {
  let isValid = true
  if (form.value) {
    const listInput = form.value.getElementsByTagName('input')
    const listTextarea = form.value.getElementsByTagName('textarea')
    const combinedArray = [...listInput, ...listTextarea]
    for (let index = 0; index < combinedArray.length; index++) {
      const element = combinedArray[index]
      if (element?.onsubmit) {
        const validateItem = element.onsubmit(event)
        if (!validateItem) {
          isValid = validateItem
        }
      }
    }
  }
  if (isValid) {
    emit('submit', { ...formData })
  }
}

const handleCancel = () => {
  Object.keys(formData).forEach((key) => {
    const field = props.config.fields.find((f) => f.name === key)
    if (field && field.value !== undefined) {
      formData[key] = field.value
    } else {
      delete formData[key]
    }
  })
  emit('update:modelValue', { ...formData })
  emit('cancel')
}

watch(
  () => props.modelValue,
  (newValue) => {
    Object.keys(newValue).forEach((key) => {
      formData[key] = newValue[key]
    })
  },
  { deep: true },
)

watch(
  () => props.submitting,
  (newValue) => {
    submitting.value = newValue || false
  },
)
</script>

<style scoped lang="scss">
.form-generator {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;

  .form-title {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .form-description {
      color: #6b7280;
      font-size: 0.875rem;
    }
  }

  .form-content {
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;

      .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        border: none;

        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .btn-cancel {
        background-color: #f3f4f6;
        color: #374151;

        &:hover:not(:disabled) {
          background-color: #e5e7eb;
        }
      }

      .btn-submit {
        background-color: #3b82f6;
        color: white;

        &:hover:not(:disabled) {
          background-color: #2563eb;
        }
      }
    }
  }
}
</style>
