<script setup>
import { ref, onMounted } from "vue";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "@/services/employeeService";

/* =====================
   State
===================== */
const employees = ref([]);

const newEmployee = ref({
  name: "",
  position: "",
  department: "",
  salary: "",
  contact: "",
  employmentHistory: "" // added field
});

/* =====================
   Fetch employees
===================== */
const fetchEmployees = async () => {
  try {
    employees.value = await getEmployees();
  } catch (err) {
    console.error("Failed to fetch employees:", err);
    alert("Failed to fetch employees. Check console for details.");
  }
};

onMounted(fetchEmployees);

/* =====================
   Add employee
===================== */
const handleAddEmployee = async () => {
  if (!newEmployee.value.name) return alert("Name is required");

  try {
    const result = await addEmployee(newEmployee.value);
    if (result.success) {
      // Clear form
      newEmployee.value = { name: "", position: "", department: "", salary: "", contact: "", employmentHistory: "" };
      await fetchEmployees();
    } else {
      alert("Failed to add employee");
    }
  } catch (err) {
    console.error("Failed to add employee:", err);
    alert("Failed to add employee. Check console for details.");
  }
};

/* =====================
   Delete employee
===================== */
const handleDeleteEmployee = async (employee_id) => {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  try {
    const result = await deleteEmployee(employee_id);
    if (result.success) {
      employees.value = employees.value.filter(emp => emp.employee_id !== employee_id);
    } else {
      alert("Failed to delete employee");
    }
  } catch (err) {
    console.error("Failed to delete employee:", err);
    alert("Failed to delete employee. Check console for details.");
  }
};
</script>

<template>
  <div class="page">
    <h1 class="main-title">Employees</h1>

    <!-- ADD EMPLOYEE -->
    <div class="card form-card">
      <h3>Add Employee</h3>

      <div class="form-grid">
        <input v-model="newEmployee.name" placeholder="Name" />
        <input v-model="newEmployee.position" placeholder="Position" />
        <input v-model="newEmployee.department" placeholder="Department" />
        <input v-model="newEmployee.salary" type="number" placeholder="Salary" />
        <input v-model="newEmployee.contact" placeholder="Contact" />
        <input v-model="newEmployee.employmentHistory" placeholder="Employment History" /> <!-- new field -->
      </div>

      <button class="primary-btn" @click="handleAddEmployee">
        Add Employee
      </button>
    </div>

    <!-- EMPLOYEE TABLE -->
    <div class="card">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Contact</th>
            <th>Employment History</th> <!-- new column -->
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="emp in employees" :key="emp.employee_id">
            <td>{{ emp.name }}</td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.department }}</td>
            <td>R {{ emp.salary }}</td>
            <td>{{ emp.contact }}</td>
            <td>{{ emp.employmentHistory }}</td> <!-- show employment history -->
            <td>
              <button class="delete-btn" @click="handleDeleteEmployee(emp.employee_id)">
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="employees.length === 0">
            <td colspan="7" class="empty">No employees found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page {
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
  padding: 20px;
}

.main-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0px 6px 10px rgb(203, 227, 255);
  margin-bottom: 20px;
}

.form-card {
  max-width: 700px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 15px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.primary-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: #4f9cff;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.primary-btn:hover {
  background: #3b87e6;
}

.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #ff4d4d;
  color: white;
  cursor: pointer;
}

.delete-btn:hover {
  background: #e63b3b;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  border-bottom: 1px solid #50b6f2;
}

.styled-table th {
  text-align: left;
  background: #6a98e2;
}

.empty {
  text-align: center;
  color: #8d6262;
}
</style>
