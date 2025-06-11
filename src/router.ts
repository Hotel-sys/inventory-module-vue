import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import Company from './pages/Company.vue'
import Stocks from './pages/Stocks.vue'
import Users from './pages/Users.vue'
import Expenses from './pages/Expenses.vue'
import Departments from './pages/Departments.vue'
import Login from './pages/auth/Login.vue'
import Example from './pages/Example.vue'
import Error404 from './pages/errors/error404.vue'
import StorageManager from './lib/storage'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          component: Login,
          name: 'login'
        }
      ]
    },
    {
      path: '/error',
      name: 'error',
      children: [
        {
          path: 'resource-not-found',
          component: Error404,
          name: 'resource-not-found'
        }
      ]
    },
    
    {
      path: '/',
      component: Dashboard,
      children: [
        {
      path: '/example',
      component: Example,
      name: 'example'
    },
        {
          path: '/dashboard',
          name: 'home',
          component: Example
        },
        {
          path: '/company',
          component: Company,
          name: 'companies',
        },
        {
          path: '/stocks',
          component: Stocks,
          name: 'stocks'
        },
        {
          path: '/users',
          component: Users,
          name: 'users'
        },
        {
          path: '/expenses',
          component: Expenses,
          name: 'expenses'
        },
        {
          path: '/departments',
          component: Departments,
          name: 'departments'
        }
      ]
    },
  ]
})

router.beforeEach((to, from) => {
  console.log(to.path);

  if (to.name === 'login' && StorageManager.accessTokenExists()) {
    return {
      replace: true,
      name: 'home'
    }
  } else if (to.name !== 'login' && !StorageManager.accessTokenExists()) {
    console.log('not exists')
    return {
      replace: true,
      name: 'login'
    }
  }

  return true;

})

export default router
