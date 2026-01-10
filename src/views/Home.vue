<template>
  <FormGenerator
    @submit="console.log('submit-app')"
    @cancel="console.log('cancel-app')"
    :config="formConfig"
    :model-value="formData"
  ></FormGenerator>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import FormGenerator from '../components/Form/FormGenerator.vue'
import type { FormConfig, FormData } from '../components/Form/Types'

const formData = reactive<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
})
const formConfig: FormConfig = {
  title: 'Регистрация',
  description: 'Создайте новый аккаунт',
  fields: [
    {
      name: 'username',
      type: 'input',
      label: 'Имя пользователя',
      required: true,
      placeholder: 'Введите имя пользователя',
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

      validation: {
        minLength: 6,
      },
    },
    {
      name: 'confirmPassword',
      type: 'input',
      label: 'Подтверждение пароля',
      required: true,
      placeholder: 'Повторите пароль',
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
</script>
<style lang="scss" scoped></style>
