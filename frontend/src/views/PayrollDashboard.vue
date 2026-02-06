<script setup>
import { ref, computed, onMounted } from 'vue'

import PayrollTable from '@/views/PayrollTable.vue'
import PayrollModal from '@/views/PayrollModal.vue'

import { getEmployees } from '@/services/employeeService'
import { getPayroll } from '@/services/payrollService'

/* =====================
   State
===================== */
const payroll = ref([])
const employees = ref([])
const search = ref("")
const selectedEmployee = ref(null)

/* =====================
   Fetch data on load
===================== */
onMounted(async () => {
  try {
    const [employeeRes, payrollRes] = await Promise.all([
      getEmployees(),
      getPayroll()
    ])

    employees.value = employeeRes  // already response.data
    payroll.value = payrollRes     // already response.data
  } catch (err) {
    console.error("Failed to load payroll data", err)
  }
})

/* =====================
   Map employee_id → name
===================== */
const employeeNameById = computed(() => {
  const map = {}
  employees.value.forEach(emp => {
    const id = emp.employeeId ?? emp.employee_id
    map[id] = emp.name
  })
  return map
})

/* =====================
   Filter payroll by employee name
===================== */
const filtered = computed(() =>
  payroll.value.filter(p => {
    const id = p.employeeId ?? p.employee_id
    const name = employeeNameById.value[id] || ""
    return name.toLowerCase().includes(search.value.toLowerCase())
  })
)

/* =====================
   Open modal
===================== */
const openPayslip = (employee) => {
  selectedEmployee.value = employee
}
</script>

<template>
  <div class="payroll-dashboard">
    <h1>Payroll Management</h1>

    <!-- Search -->
    <input
      type="text"
      v-model="search"
      placeholder="Search employee payroll..."
    />

    <!-- Payroll table -->
    <PayrollTable
      :payroll="filtered"
      :employees="employees"
      @view-payslip="openPayslip"
    />

    <!-- Payroll modal -->
    <PayrollModal
      v-if="selectedEmployee"
      :employee="selectedEmployee"
      :employeeName="employeeNameById[selectedEmployee.employeeId ?? selectedEmployee.employee_id]"
      @close="selectedEmployee = null"
    />
  </div>
</template>

<style scoped>
.payroll-dashboard {
  padding: 20px;
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
}

input[type="text"] {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #586ed0;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}
</style>
