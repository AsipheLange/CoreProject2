<script setup>
import { ref, computed, onMounted } from "vue";
import { useEmployeeStore } from "@/store/index.js";

const employeeStore = useEmployeeStore();

// Sorting options for leave requests
const sortOption = ref("pending-first");
const sortOrders = {
  "pending-first": { Pending: 1, Approved: 2, Denied: 3 },
  "approved-first": { Approved: 1, Pending: 2, Denied: 3 },
  "denied-first": { Denied: 1, Pending: 2, Approved: 3 }
};

// Fetch employees, attendance, and leave requests
onMounted(async () => {
  if (!employeeStore.employees.length) {
    await employeeStore.fetchEmployees();
  }
  await employeeStore.fetchAttendance();
  await employeeStore.fetchLeaveRequests();
});

// Computed combined data
const employees = computed(() => {
  return employeeStore.employeesWithAttendanceAndLeave.map(emp => {
    const sortedLeaves = [...emp.leaveRequests].sort(
      (a, b) => (sortOrders[sortOption.value][a.status] || 99) - (sortOrders[sortOption.value][b.status] || 99)
    );
    return { ...emp, leaveRequests: sortedLeaves };
  });
});

// ✅ Approve / Decline — update the store directly
function approveLeave(employeeId, index) {
  const emp = employeeStore.employeesWithAttendanceAndLeave.find(
    e => e.employee_id === employeeId
  );
  if (emp && emp.leaveRequests[index]) {
    emp.leaveRequests[index].status = "Approved";
  }
}

function declineLeave(employeeId, index) {
  const emp = employeeStore.employeesWithAttendanceAndLeave.find(
    e => e.employee_id === employeeId
  );
  if (emp && emp.leaveRequests[index]) {
    emp.leaveRequests[index].status = "Denied";
  }
}
</script>

<template>
  <div class="page">
    <h1 class="main-title">Attendance & Leave Management</h1>

    <!-- Sort -->
    <div class="sort-box">
      <label>Sort Leave Requests</label>
      <select class="select-bar" v-model="sortOption">
        <option value="pending-first">Pending → Approved → Denied</option>
        <option value="approved-first">Approved → Pending → Denied</option>
        <option value="denied-first">Denied → Pending → Approved</option>
      </select>
    </div>

    <!-- Employee Cards -->
    <div class="cards-container">
      <div v-for="emp in employees" :key="emp.employeeId" class="employee-card">
        <div class="emp-header">
          <h2>{{ emp.name }}</h2>
          <span class="subtle">Employee #{{ emp.employeeId }}</span>
        </div>

        <!-- Attendance -->
        <div class="section">
          <h3>Attendance</h3>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(att, i) in emp.attendance" :key="i">
                <td data-label="Date">{{ att.date }}</td>
                <td data-label="Status">
                  <span :class="['tag', att.status.toLowerCase()]">{{ att.status }}</span>
                </td>
              </tr>
              <tr v-if="emp.attendance.length === 0">
                <td colspan="2" class="no-data">No attendance records</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Leave Requests -->
        <div class="section">
          <h3>Leave Requests</h3>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(leave, index) in emp.leaveRequests" :key="index">
                <td data-label="Date">{{ leave.date }}</td>
                <td data-label="Reason">{{ leave.reason }}</td>
                <td data-label="Status">
                  <span :class="['tag', leave.status.toLowerCase()]">{{ leave.status }}</span>
                </td>
                <td data-label="Action">
                  <div v-if="leave.status === 'Pending'" class="btn-group">
                    <button class="approve-btn" @click="approveLeave(emp.employee_id, index)">Approve</button>
                    <button class="decline-btn" @click="declineLeave(emp.employee_id, index)">Decline</button>
                  </div>
                  <span v-else class="no-action">—</span>
                </td>
              </tr>
              <tr v-if="emp.leaveRequests.length === 0">
                <td colspan="4" class="no-data">No leave requests</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
}

.main-title {
  color: #4b47bd;
  margin-bottom: 20px;
}

/* Sorting */
.sort-box {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 24px;
}

.select-bar {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #d0d4f7;
}

/* Cards */
.cards-container {
  display: grid;
  gap: 20px;
}

.employee-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(88, 110, 208, 0.12);
}

.emp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}

.subtle {
  font-size: 0.85rem;
  color: #777;
}

/* Sections */
.section {
  margin-top: 14px;
}

.section h3 {
  margin-bottom: 8px;
  color: #586ed0;
}

/* Tables */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  background: #f2f4ff;
  border-radius: 8px;
  overflow: hidden;
}

.styled-table th {
  background: #586ed0;
  color: white;
  padding: 10px;
  text-align: left;
}

.styled-table td {
  padding: 10px;
  border-bottom: 1px solid #e7eaf9;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #777;
}

/* Tags */
.tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.tag.present,
.tag.approved {
  background: #d4f8e8;
  color: #1a7f5a;
}

.tag.absent,
.tag.denied {
  background: #ffe1e1;
  color: #b00020;
}

.tag.pending {
  background: #fff3cd;
  color: #8a6d3b;
}

/* Buttons */
.btn-group {
  display: flex;
  gap: 6px;
}

.approve-btn,
.decline-btn {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.approve-btn {
  background: #4caf50;
}

.decline-btn {
  background: #e53935;
}

.no-action {
  color: #999;
}
</style>
