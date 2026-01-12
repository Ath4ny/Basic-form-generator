<template>
  <FormGenerator
    @submit="saveToStore"
    @cancel="deleteFromStore"
    :config="formConfig"
    :model-value="formData"
  ></FormGenerator>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FormGenerator from '../components/Form/FormGenerator.vue'
import type { FormConfig, FormData } from '../components/Form/Types'

import { useStore } from 'vuex'
const store = useStore()

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

const saveToStore = async (data: FormData) => {
  await store.commit('saveFormData', {
    formId: formConfig.id,
    data: data,
    isValid: true,
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
<style lang="scss" scoped></style>
