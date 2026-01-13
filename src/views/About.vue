<template>
  <FormGenerator
    v-model="formData"
    :config="formConfig"
    @submit="saveToStore"
    @cancel="deleteFromStore"
  ></FormGenerator>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import FormGenerator from '../components/Form/FormGenerator.vue'
import type { FormConfig, FormData } from '../components/Form/Types'

import { useStore } from 'vuex'
const store = useStore()

const formData = reactive<FormData>({
  firstName: '',
  lastName: '',
  city: '',
  about: '',
  sex: '',
})
const formConfig: FormConfig = {
  id: 'about-form',
  title: 'Информация о себе',
  description: 'Напишите побольше о себе',
  fields: [
    {
      name: 'firstName',
      type: 'input',
      label: 'Имя',
      placeholder: 'Имя',
      attributes: { autocomplete: 'first-name' },
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
      attributes: { autocomplete: 'last-name' },
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
      attributes: { autocomplete: 'city' },
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
<style lang="scss" scoped></style>
