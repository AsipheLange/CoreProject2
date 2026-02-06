// modules/AttendanceDataDb.js
import { pool } from "../db.js";



// Get all attendance records
export const getAttendanceData = async () => {
  const [data] = await pool.query("SELECT * FROM employee_attendance;");
  return data;
};

// Get a single employee's attendance
export const getAttendanceByEmployee = async (employee_id) => {
  const [data] = await pool.query(
    "SELECT * FROM employee_attendance WHERE employee_id = ?",
    [employee_id]
  );
  return data;
};

// Add attendance record
// record = { employee_id, attendance_date, status }
export const addAttendance = async (record) => {
  const { employee_id, attendance_date, status } = record;
  const [result] = await pool.query(
    "INSERT INTO employee_attendance (employee_id, attendance_date, status) VALUES (?, ?, ?)",
    [employee_id, attendance_date, status]
  );
  return result;
};

// Update attendance record
export const updateAttendance = async (attendance_id, record) => {
  const { attendance_date, status } = record;
  const [result] = await pool.query(
    "UPDATE employee_attendance SET attendance_date = ?, status = ? WHERE attendance_id = ?",
    [attendance_date, status, attendance_id]
  );
  return result;
};

// Delete attendance record
export const deleteAttendance = async (attendance_id) => {
  const [result] = await pool.query(
    "DELETE FROM employee_attendance WHERE attendance_id = ?",
    [attendance_id]
  );
  return result;
};


// Get all leave requests
export const getLeaveRequestsData = async () => {
  const [data] = await pool.query("SELECT * FROM leave_request;");
  return data;
};

// Get leave requests by employee
export const getLeaveRequestsByEmployee = async (employee_id) => {
  const [data] = await pool.query(
    "SELECT * FROM leave_request WHERE employee_id = ?",
    [employee_id]
  );
  return data;
};

// Add leave request
// leave = { employee_id, leave_date, reason, status }
export const addLeaveRequest = async (leave) => {
  const { employee_id, leave_date, reason, status } = leave;
  const [result] = await pool.query(
    "INSERT INTO leave_request (employee_id, leave_date, reason, status) VALUES (?, ?, ?, ?)",
    [employee_id, leave_date, reason, status]
  );
  return result;
};

// Update leave request
export const updateLeaveRequest = async (leave_id, leave) => {
  const { leave_date, reason, status } = leave;
  const [result] = await pool.query(
    "UPDATE leave_request SET leave_date = ?, reason = ?, status = ? WHERE leave_id = ?",
    [leave_date, reason, status, leave_id]
  );
  return result;
};

// Delete leave request
export const deleteLeaveRequest = async (leave_id) => {
  const [result] = await pool.query(
    "DELETE FROM leave_request WHERE leave_id = ?",
    [leave_id]
  );
  return result;
};
