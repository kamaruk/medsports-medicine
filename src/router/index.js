import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import CasesListPage from '../pages/CasesListPage.vue'
import CaseDetailPage from '../pages/CaseDetailPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import CaseStepView from '../components/cases/CaseStepView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/cases', name: 'CasesList', component: CasesListPage },
  { path: '/cases/:id', name: 'CaseDetail', component: CaseDetailPage },
  { path: '/profile', name: 'Profile', component: ProfilePage, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/cases/:id/steps', name: 'CaseSteps', component: CaseStepView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  }
  
  else if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'Home' }) 
  }
  else {
    next()
  }
})

export default router
