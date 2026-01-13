import { createRouter, createWebHistory } from 'vue-router'
import Registration from '@/views/Registration.vue'
import About from '@/views/About.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import ErrorPage from '@/views/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/create-article',
      name: 'createArticle',
      component: CreateArticle,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'ErrorPage',
      component: ErrorPage,
    },
  ],
})

const routeNamesMap = {
  registration: 'Регистрация',
  about: 'О вас',
  createArticle: 'Создание статьи',
}

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Test Form Generator'
  const pageName: string = to.name as string
  if (pageName.trim() !== '') {
    document.title = (routeNamesMap as Record<string, string>)[pageName] || pageName
  } else {
    document.title = defaultTitle
  }
  next()
})

export default router
