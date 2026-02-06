// modules/PayrollTableDb.js
import { pool } from "../db.js";

// GET all payroll records
export const getPayrollTableData = async () => {
  const [data] = await pool.query("SELECT * FROM payroll_data;");
  return data;
};

// GET payroll by employee ID
export const getPayrollByEmployee = async (employee_id) => {
  const [data] = await pool.query(
    "SELECT * FROM payroll_data WHERE employee_id = ?",
    [employee_id]
  );
  return data;
};

// ADD payroll record
export const addPayroll = async (payroll) => {
  const { employee_id, hoursWorked, leaveDeductions, finalSalary } = payroll;
  const [result] = await pool.query(
    `INSERT INTO payroll_data (employee_id, hoursWorked, leaveDeductions, finalSalary)
     VALUES (?, ?, ?, ?)`,
    [employee_id, hoursWorked, leaveDeductions, finalSalary]
  );
  return result;
};

// UPDATE payroll record
export const updatePayroll = async (employee_id, payroll) => {
  const { hoursWorked, leaveDeductions, finalSalary } = payroll;
  const [result] = await pool.query(
    `UPDATE payroll_data
     SET hoursWorked = ?, leaveDeductions = ?, finalSalary = ?
     WHERE employee_id = ?`,
    [hoursWorked, leaveDeductions, finalSalary, employee_id]
  );
  return result;
};

// DELETE payroll record
export const deletePayroll = async (employee_id) => {
  const [result] = await pool.query(
    "DELETE FROM payroll_data WHERE employee_id = ?",
    [employee_id]
  );
  return result;
};
