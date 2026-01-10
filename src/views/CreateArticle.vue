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
  articleName: '',
  subtitle: '',
  articleText: '',
  isArticlePublic: false,
  type: '',
})
const formConfig: FormConfig = {
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
</script>
<style lang="scss" scoped></style>
