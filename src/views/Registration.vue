<template>
  <FormGenerator
    :config="formConfig"
    :model-value="formData"
    @submit="saveToStore"
    @cancel="deleteFromStore"
    @update:model-value="(value) => (formData = value)"
  >
    <template #password="slotProps">
      <div class="password-field">
        <div class="input-group">
          <input
            :id="slotProps.field.name"
            :type="showPassword ? 'text' : 'password'"
            :value="slotProps.value"
            autocomplete="new-password"
            @input="slotProps.updateValue($event)"
            class="password-input"
            placeholder="Введите пароль"
          />
          <button type="button" @click="showPassword = !showPassword" class="password-toggle">
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
        <div class="password-strength">
          <div class="strength-bar">
            <div class="strength-fill" :class="passwordStrengthClass"></div>
          </div>
          <span class="strength-text">{{ passwordStrengthText }}</span>
        </div>
      </div>
    </template>
  </FormGenerator>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import FormGenerator from '../components/Form/FormGenerator.vue'
import type { FormConfig, FormData } from '../components/Form/Types'

import { useStore } from 'vuex'
const store = useStore()
const showPassword = ref(false)

const formData = ref<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
})
const formConfig: FormConfig = {
  id: 'home-form',
  title: 'Регистрация',
  description: 'Создайте новый аккаунт',
  fields: [
    {
      name: 'username',
      type: 'input',
      label: 'Имя пользователя',
      required: true,
      placeholder: 'Введите имя пользователя',
      attributes: { autocomplete: 'username' },
      validation: {
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: 'email',
      type: 'input',
      label: 'Email',
      required: true,
      placeholder: 'example@email.com',
      attributes: { autocomplete: 'email' },
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
    {
      name: 'password',
      type: 'input',
      label: 'Пароль',
      required: true,
      placeholder: 'Введите пароль',
    },
    {
      name: 'confirmPassword',
      type: 'input',
      label: 'Подтверждение пароля',
      required: true,
      placeholder: 'Повторите пароль',
      attributes: { type: 'password', autocomplete: 'new-password' },
      validation: {
        custom: () => {
          return formData.value.password === formData.value.confirmPassword
            ? true
            : 'Пароли не совпадают'
        },
      },
    },
    {
      name: 'agreeToTerms',
      type: 'checkbox',
      label: 'Я согласен с условиями использования',
      required: true,
    },
  ],
  submitButton: {
    text: 'Зарегистрироваться',
  },
  cancelButton: {
    text: 'Сбросить',
  },
}

const passwordStrength = computed(() => {
  const password = formData.value.password || ''
  let strength = 0

  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  return strength
})

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  if (strength <= 2) return 'weak'
  if (strength <= 3) return 'medium'
  return 'strong'
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength <= 2) return 'Слабый'
  if (strength <= 3) return 'Средний'
  return 'Сильный'
})

const saveToStore = async (data: FormData) => {
  formData.value = data
  await store.commit('saveFormData', {
    formId: formConfig.id,
    data: data,
  })
}

const deleteFromStore = async () => {
  await store.commit('clearForm', formConfig.id)
}

onMounted(() => {
  if (store.getters.getFormData(formConfig.id)) {
    formData.value = store.getters.getFormData(formConfig.id)
  }
})
</script>
<style lang="scss" scoped>
.password-field {
  .input-group {
    display: flex;
    gap: 0.5rem;
  }

  .password-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--app-white-100);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--app-blue-100);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }
  }

  .password-toggle {
    padding: 0.75rem 1rem;
    background: #f1f5f9;
    border: 2px solid var(--app-white-100);
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.25rem;
    transition: all 0.2s;

    &:hover {
      background: var(--app-white-100);
    }
  }

  .password-strength {
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .strength-bar {
    flex: 1;
    height: 4px;
    background: var(--app-white-100);
    border-radius: 2px;
    overflow: hidden;
  }

  .strength-fill {
    height: 100%;
    transition: width 0.3s ease;

    &.weak {
      background: var(--app-red-100);
      width: 33%;
    }

    &.medium {
      background: #f59e0b;
      width: 66%;
    }

    &.strong {
      background: #10b981;
      width: 100%;
    }
  }

  .strength-text {
    font-size: 0.875rem;
    font-weight: 500;

    .weak & {
      color: var(--app-red-100);
    }

    .medium & {
      color: #f59e0b;
    }

    .strong & {
      color: #10b981;
    }
  }
}
</style>
