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
  firstName: '',
  lastName: '',
  city: '',
  about: '',
  sex: '',
})
const formConfig: FormConfig = {
  title: 'Информация о себе',
  description: 'Напишите побольше о себе',
  fields: [
    {
      name: 'firstName',
      type: 'input',
      label: 'Имя',
      placeholder: 'Имя',
      validation: {
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: 'lastName',
      type: 'input',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      validation: {
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: 'city',
      type: 'input',
      label: 'Город',
      placeholder: 'Город проживания',
    },
    {
      name: 'about',
      type: 'textarea',
      label: 'О себе',
      placeholder: 'Напишите о себе',
    },
    {
      name: 'sex',
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
    text: 'Сохранить',
  },
  cancelButton: {
    text: 'Сбросить',
  },
}
</script>
<style lang="scss" scoped></style>
