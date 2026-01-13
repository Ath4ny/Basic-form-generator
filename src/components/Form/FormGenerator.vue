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
        <template v-if="hasSlot(field.name)" #[field.name]="slotProps">
          <slot
            :name="field.name"
            :field="slotProps.field"
            :value="slotProps.value"
            :updateValue="slotProps.updateValue"
          ></slot>
        </template>
      </FormField>

      <slot v-if="$slots['form-actions']" name="form-actions" />
      <div v-else class="form-actions">
        <button
          v-if="config.cancelButton"
          type="button"
          @click="handleCancel"
          :class="['btn', 'btn-cancel']"
        >
          {{ config.cancelButton.text }}
        </button>

        <button v-if="config.submitButton" type="submit" :class="['btn', 'btn-submit']">
          <span>{{ config.submitButton.text }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, useSlots } from 'vue'
import FormField from './FormField.vue'
import type { FormConfig, FormData } from './Types'

interface Props {
  config: FormConfig
  modelValue: FormData
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

const initializeFormData = () => {
  props.config.fields.forEach((field) => {
    if (formData[field.name] === undefined && field.value !== undefined) {
      formData[field.name] = field.value
    }
  })
}

initializeFormData()

const slots = useSlots()
const hasSlot = (slotName: string) => {
  return !!slots[slotName]
}

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
</script>

<style scoped lang="scss">
.form-generator {
  background: var(--app-white-50);
  border-radius: 0.75rem;
  padding: 2rem;

  .form-title {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--app-dark-blue-100);
      margin-bottom: 0.5rem;
    }

    .form-description {
      color: var(--app-gray-300);
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
      border-top: 1px solid var(--app-white-100);

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
          box-shadow: 0 0 0 3px var(--app-shadow-100);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .btn-cancel {
        background-color: var(--app-gray-200);
        color: #374151;

        &:hover:not(:disabled) {
          background-color: var(--app-white-100);
        }
      }

      .btn-submit {
        background-color: var(--app-blue-100);
        color: var(--app-white-50);

        &:hover:not(:disabled) {
          background-color: var(--app-blue-200);
        }
      }
    }
  }
}
</style>
