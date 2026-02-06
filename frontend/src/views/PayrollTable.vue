<script setup>
import { computed } from "vue";

const props = defineProps({
  payroll: {
    type: Array,
    default: () => []
  },
  employees: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["view-payslip"]);

// Map employee_id (from backend) to name
const employeeNameById = computed(() => {
  const map = {};
  props.employees.forEach(emp => {
    const id = emp.employeeId ?? emp.employee_id;
    map[id] = emp.name;
  });
  return map;
});
</script>

<template>
  <table class="payroll-table">
    <thead>
      <tr>
        <th>Employee</th>
        <th>Hours</th>
        <th>Leave</th>
        <th>Final Salary</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="!props.payroll || props.payroll.length === 0">
        <td colspan="5" class="text-center">No payroll records</td>
      </tr>

      <tr
        class="info-row"
        v-for="row in props.payroll"
        :key="row.employeeId ?? row.employee_id"
      >
        <td>{{ employeeNameById[row.employeeId ?? row.employee_id] }}</td>
        <td>{{ row.hoursWorked ?? row.hours_worked }} hours</td>
        <td>{{ row.leaveDeductions ?? row.leave_deductions }}</td>
        <td>R{{ row.finalSalary ?? row.final_salary }}</td>
        <td>
          <button
            type="button"
            class="view-btn"
            @click="emit('view-payslip', row)"
          >
            View
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
/* Table styling */
.payroll-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
  color: #333;
  background-color: #f2f4ff;
}

th {
  background-color: #586ed0;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

td {
  padding: 12px;
  border-bottom: 1px solid #e7eaf9;
  color: #333;
}

tr { background-color: #ffffff; }

tr.info-row:hover {
  background-color: rgb(203, 227, 255);
}

/* View button styling */
.view-btn {
  padding: 6px 12px;
  background-color: #586ed0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.view-btn:hover {
  background-color: #4b47bd;
}

/* Center text for "No payroll records" */
.text-center {
  text-align: center;
  color: #333;
  font-style: italic;
}
</style>
