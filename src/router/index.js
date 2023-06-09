import { createRouter, createWebHistory } from 'vue-router'

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/sessions/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/sessions/RegisterView.vue')
  },
  {
    path: '/dashboard/admin',
    name: 'adminDashboard',
    component: () => import('../views/dashboard/Admin.vue')
  },
  {
    path: '/patient/medicalassistance',
    name: 'medicalAssistance',
    component: () => import('../views/chat/PatientChat.vue')
  },
  {
    path: '/dashboard/responseteam',
    name: 'responseTeam',
    component: () => import("../views/dashboard/RescuTeam.vue")
  },
  {
    path: '/dashboard/ruralteam',
    name: 'ruralTeam',
    component: () => import("../views/dashboard/Rural.vue")
  },
  {
    path: '/dashboard/hospitalteam',
    name: 'hospitalTeam',
    component: () => import("../views/dashboard/HospitalStaff.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
