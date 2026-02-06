import { createRouter, createWebHistory } from 'vue-router'

import Attendance from '@/views/Attendance.vue'
import Employee from '@/views/EmployeeInfo.vue'
import PayrollDashboard from '@/views/PayrollDashboard.vue'
import Home from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/attendance', component: Attendance },
  { path: '/employeeinfo', component: Employee },
  { path: '/payroll', component: PayrollDashboard },
  { path: '/home', component: Home },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
