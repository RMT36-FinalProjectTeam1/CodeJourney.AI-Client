import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import QuesionerPage from '../views/QuesionerPage.vue'
import HomePage from '../views/HomePage.vue'
import DetailPage from '../views/DetailPage.vue'
import QuizPage from '../views/QuizPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/quesioner',
      name: 'quesioner',
      component: QuesionerPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: QuizPage
    },
  ]
})

export default router
