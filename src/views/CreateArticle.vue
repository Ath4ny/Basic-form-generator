<template>
  <FormGenerator
    @submit="saveToStore"
    @cancel="deleteFromStore"
    :config="formConfig"
    :model-value="formData"
  ></FormGenerator>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import FormGenerator from '../components/Form/FormGenerator.vue'
import type { FormConfig, FormData } from '../components/Form/Types'

const formData = reactive<FormData>({
  articleName: '',
  subtitle: '',
  articleText: '',
  isArticlePublic: false,
  type: '',
})

import { useStore } from 'vuex'
const store = useStore()

const formConfig: FormConfig = {
  id: 'create-article-form',
  title: 'Создание статьи',
  description: 'Интересно, что вы сегодня напишите? :)',
  fields: [
    {
      name: 'articleName',
      type: 'input',
      label: 'Название статьи',
      required: true,
      placeholder: 'Введите название статьи',
      validation: {
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: 'subtitle',
      type: 'input',
      label: 'Подзаголовок',
      placeholder: 'Введите подзаголовок статьи',
    },
    {
      name: 'articleText',
      type: 'textarea',
      label: 'Текст статьи',
      placeholder: 'Введите текст статьи',
      validation: {
        minLength: 3,
        maxLength: 1000,
      },
    },
    {
      name: 'isArticlePublic',
      type: 'checkbox',
      label: 'Сделать статью публичной',
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип статьи',
      options: [
        {
          value: 'story',
          label: 'История',
        },
        {
          value: 'article',
          label: 'Статья',
        },
        {
          value: 'news',
          label: 'Новость',
        },
      ],
    },
  ],
  submitButton: {
    text: 'Опубликовать',
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
