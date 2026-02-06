import { defineStore } from "pinia";
import {
  getEmployees,
  addEmployee as addEmployeeService,
  deleteEmployee as deleteEmployeeService
} from "../services/employeeService";

import { getAttendance, getLeaveRequests } from "../services/attendanceService";
import { getPayroll } from "../services/payrollService";

export const useEmployeeStore = defineStore("employees", {
  state: () => ({
    employees: [],
    payroll: [],
    attendanceRecords: [],
    leaveRequests: [],
    loading: {
      employees: false,
      payroll: false,
      attendance: false,
      leaveRequests: false
    },
    error: null
  }),

  getters: {
    employeesWithAttendanceAndLeave: (state) => {
      return state.employees.map(emp => ({
        ...emp,
        attendance: state.attendanceRecords
          .filter(a => a.employeeId === emp.employeeId)
          .map(a => ({
            date: a.attendanceDate,
            status: a.status
          })),
        leaveRequests: state.leaveRequests
          .filter(l => l.employeeId === emp.employeeId)
          .map(l => ({
            date: l.leaveDate,
            reason: l.reason,
            status: l.status
          }))
      }));
    }
  },

  actions: {
    async fetchEmployees() {
      this.loading.employees = true;
      this.error = null;

      try {
        const data = await getEmployees();
        this.employees = data.map(emp => ({
          employeeId: emp.employee_id,
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary,
          employmentHistory: emp.employment_history,
          contact: emp.contact
        }));
      } catch (err) {
        console.error(err);
        this.error = "Failed to load employees";
        this.employees = [];
      } finally {
        this.loading.employees = false;
      }
    },

    async addEmployee(newEmployee) {
      try {
        await addEmployeeService(newEmployee);
        // if no error → assume success
        await this.fetchEmployees();
      } catch (err) {
        console.error(err);
        this.error = "Failed to add employee";
      }
    },

    async deleteEmployee(id) {
      try {
        await deleteEmployeeService(id);
        // if no error → assume success
        await this.fetchEmployees();
      } catch (err) {
        console.error(err);
        this.error = "Failed to delete employee";
      }
    },

    async fetchAttendance() {
      this.loading.attendance = true;
      this.error = null;

      try {
        const data = await getAttendance();
        this.attendanceRecords = data.map(a => ({
          attendanceId: a.attendance_id,
          employeeId: a.employee_id,
          attendanceDate: a.attendance_date,
          status: a.status
        }));
      } catch (err) {
        console.error(err);
        this.error = "Failed to load attendance";
        this.attendanceRecords = [];
      } finally {
        this.loading.attendance = false;
      }
    },

    async fetchLeaveRequests() {
      this.loading.leaveRequests = true;
      this.error = null;

      try {
        const data = await getLeaveRequests();
        this.leaveRequests = data.map(l => ({
          leaveId: l.leave_id,
          employeeId: l.employee_id,
          leaveDate: l.leave_date,
          reason: l.reason,
          status: l.status
        }));
      } catch (err) {
        console.error(err);
        this.error = "Failed to load leave requests";
        this.leaveRequests = [];
      } finally {
        this.loading.leaveRequests = false;
      }
    },

    async fetchPayroll() {
      this.loading.payroll = true;
      this.error = null;

      try {
        const data = await getPayroll();
        this.payroll = data.map(p => ({
          employeeId: p.employee_id,
          hoursWorked: p.hoursWorked,
          leaveDeductions: p.leaveDeductions,
          finalSalary: p.finalSalary
        }));
      } catch (err) {
        console.error(err);
        this.error = "Failed to load payroll";
        this.payroll = [];
      } finally {
        this.loading.payroll = false;
      }
    }
  }
});
