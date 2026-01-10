<template>
  <FormGenerator
    @submit="console.log('submit-app')"
    @cancel="console.log('cancel-app')"
    :config="registrationFormConfig"
    :fields-values="[]"
    :model-value="registrationFormData"
  ></FormGenerator>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormGenerator from './components/Form/FormGenerator.vue'
import type { FormConfig, FormData } from './components/Form/Types'

const registrationFormData = reactive<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  about: '',
  sex: '',
})
const registrationFormConfig: FormConfig = {
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
    {
      name: 'about',
      type: 'textarea',
      label: 'О себе',
      placeholder: 'Напишите о себе',
    },
    {
      name: 'sex',
      required: true,
      type: 'select',
      label: 'Пол',
      options: [
        {
          value: 'male',
          label: 'Мужской',
        },
        {
          value: 'female',
          label: 'Женский',
        },
      ],
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
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
