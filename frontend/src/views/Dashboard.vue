<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";

import { getPayroll } from "@/services/payrollService";
import { getAttendance, getLeaveRequests } from "@/services/attendanceService";
import { getEmployees } from "@/services/employeeService";

/* =====================
   State
===================== */
const payroll = ref([]);
const attendance = ref([]);
const leaveRequests = ref([]);
const employees = ref([]);
const chartRef = ref(null);

/* =====================
   Fetch data
===================== */
onMounted(async () => {
  try {
    const [payrollData, attendanceData, leaveData, employeeData] =
      await Promise.all([
        getPayroll(),
        getAttendance(),
        getLeaveRequests(),
        getEmployees()
      ]);

    payroll.value = payrollData;
    attendance.value = attendanceData;
    leaveRequests.value = leaveData;
    employees.value = employeeData;

    await nextTick();
    renderChart();
  } catch (err) {
    console.error("Failed to load dashboard data", err);
  }
});

/* =====================
   Employee ID → Name
===================== */
const employeeNameById = computed(() => {
  const map = {};
  employees.value.forEach(emp => {
    map[emp.employee_id] = emp.name;
  });
  return map;
});

/* =====================
   Metrics
===================== */
const totalEmployees = computed(() => employees.value.length);

const averageSalary = computed(() => {
  if (!payroll.value.length) return 0;
  return Math.round(
    payroll.value.reduce((sum, emp) => sum + emp.finalSalary, 0) /
      payroll.value.length
  );
});

const totalLeaveRequests = computed(() => leaveRequests.value.length);

const attendancePercentage = computed(() => {
  let total = 0;
  let present = 0;

  attendance.value.forEach(emp =>
    emp.attendance?.forEach(day => {
      total++;
      if (day.status === "Present") present++;
    })
  );

  return total ? Math.round((present / total) * 100) : 0;
});

/* =====================
   Helper: combine leave requests per employee
===================== */
const employeesWithLeave = computed(() => {
  return employees.value.map(emp => ({
    ...emp,
    leaveRequests: leaveRequests.value.filter(lr => lr.employee_id === emp.employee_id)
  }));
});

/* =====================
   Chart
===================== */
const renderChart = () => {
  const canvas = document.getElementById("salaryChart");
  if (!canvas) return;

  if (chartRef.value) chartRef.value.destroy();

  chartRef.value = new Chart(canvas, {
    type: "pie",
    data: {
      labels: payroll.value.map(
        emp => employeeNameById.value[emp.employee_id] || `Employee ${emp.employee_id}`
      ),
      datasets: [
        {
          data: payroll.value.map(emp => emp.finalSalary),
          backgroundColor: payroll.value.map(
            (_, i) => `hsl(${(i * 360) / payroll.value.length}, 70%, 60%)`
          )
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
};

/* =====================
   Approve / Decline (UI only)
===================== */
function approveLeave(empId, index) {
  const emp = employeesWithLeave.value.find(e => e.employee_id === empId);
  if (emp) emp.leaveRequests[index].status = "Approved";
}

function declineLeave(empId, index) {
  const emp = employeesWithLeave.value.find(e => e.employee_id === empId);
  if (emp) emp.leaveRequests[index].status = "Denied";
}
</script>

<template>
  <div class="dashboard_container">
    <!-- SUMMARY CARDS -->
    <div class="cards_container">
      <div class="card">
        <h3>Total Employees</h3>
        <p>{{ totalEmployees }}</p>
      </div>

      <div class="card">
        <h3>Average Salary</h3>
        <p>R {{ averageSalary }}</p>
      </div>

      <div class="card">
        <h3>Total Leave Requests</h3>
        <p>{{ totalLeaveRequests }}</p>
      </div>

      <div class="card">
        <h3>Attendance Rate</h3>
        <p>{{ attendancePercentage }}%</p>
      </div>
    </div>

    <!-- SALARY CHART -->
    <div class="chart_card">
      <h2>Salary Distribution</h2>
      <div class="chart_wrapper">
        <canvas id="salaryChart"></canvas>
      </div>
    </div>

    <!-- LEAVE REQUESTS
    <div class="leave_card">
      <h2>Leave Requests</h2>

      <div class="leave_list">
        <div
          v-for="emp in employeesWithLeave"
          :key="emp.employee_id"
          class="leave_item"
        >
          <h4>{{ employeeNameById[emp.employee_id] || "Unknown Employee" }}</h4>

          <ul v-if="emp.leaveRequests.length">
            <li
              v-for="(leave, index) in emp.leaveRequests"
              :key="leave.leave_id"
              :class="leave.status"
            >
              {{ leave.leave_date }} — {{ leave.reason }} ({{ leave.status }})
              <span v-if="leave.status === 'Pending'" class="btn-group">
                <button @click="approveLeave(emp.employee_id, index)" class="approve-btn">Approve</button>
                <button @click="declineLeave(emp.employee_id, index)" class="decline-btn">Decline</button>
              </span>
            </li>
          </ul>

          <p v-else class="no-leave">No leave requests</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.dashboard_container {
  padding: 20px;
  display: grid;
  gap: 20px;
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
  color: #333;
}

/* Summary cards */
.cards_container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0px 6px 10px rgb(203, 227, 255);
  text-align: center;
}

.card h3 {
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 600;
}

.card p {
  font-size: 26px;
  font-weight: 700;
  color: #586ed0;
}

/* Chart */
.chart_card {
  background: white;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0px 4px 12px rgb(203, 227, 255);
}

.chart_wrapper {
  width: 100%;
  height: 350px;
}

/* Leave requests */
.leave_card {
  background: white;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0px 4px 12px rgb(203, 227, 255);
}

.leave_list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.leave_item {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgb(203, 227, 255);
}

.leave_item h4 {
  margin-bottom: 10px;
  color: #586ed0;
}

/* Leave status */
.Approved { color: #10b981; }
.Pending { color: #f59e0b; }
.Denied  { color: #ef4444; }

.no-leave {
  font-style: italic;
  color: #777;
}

/* Buttons */
.btn-group button {
  margin-left: 6px;
  padding: 2px 6px;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
}

.approve-btn { background: #4caf50; }
.decline-btn { background: #e53935; }

/* Responsive */
@media (max-width: 768px) {
  .cards_container { grid-template-columns: 1fr 1fr; }
  .chart_wrapper { height: 250px; }
  .leave_list { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .cards_container { grid-template-columns: 1fr; }
  .chart_wrapper { height: 200px; }
}
</style>
