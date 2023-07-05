import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import PromptPage from '../views/PromptPage.vue'
import PromptCustomPage from '../views/PromptCustomPage.vue'
import PromptRecommendedPage from '../views/PromptRecommendedPage.vue'
import DetailPage from '../views/DetailPage.vue'
import QuizPage from '../views/QuizPage.vue'
import Home from '../components/Home.vue'
import Schedule from '../components/Schedule.vue'


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
      path: '/',
      name: 'home',
      component: HomePage,
      children:[
        {
          path : '/',
          name : 'Homepagehome',
          component:Home
        },
        {
          path : 'schedule/:id',
          name : 'SchedulePage',
          component:Schedule
        },
        {
          path: 'detail/:sc_id/:ts_id',
          name: 'detail',
          component: DetailPage
        },
        {
          path: '/quiz/:sc_id/:ts_id',
          name: 'quiz',
          component: QuizPage
        }
      ]
    },
    {
      path: '/prompt',
      name: 'prompt',
      component: PromptPage
    },
    {
      path: '/prompt/custom',
      name: 'promptCustom',
      component: PromptCustomPage
    },
    {
      path: '/prompt/recommended',
      name: 'promptRecommended',
      component: PromptRecommendedPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('access_token')
  if (!isAuthenticated && to.name == 'home') next('/login')
  if (!isAuthenticated && to.name == 'detail') next('/login')
  if (!isAuthenticated && to.name == 'quiz') next('/login')
  if (!isAuthenticated && to.name == 'Homepagehome') next('/login')

  if (isAuthenticated && to.name == 'login') next('/')
  if (isAuthenticated && to.name == 'register') next('/')

  if (to.matched.length === 0) next(from.path)
  
  next()
})

export default router
