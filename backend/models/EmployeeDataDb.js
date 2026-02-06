import { pool } from "../db.js";

/* =========================
   GET all employees
========================= */
export const getEmployees = async () => {
  const [data] = await pool.query("SELECT * FROM employees;");
  return data;
};

/* =========================
   ADD a new employee
   emp = { name, position, department, salary, contact, employmentHistory }
========================= */
export const addEmployee = async (emp) => {
  const {
    name,
    position,
    department,
    salary,
    contact,
    employmentHistory = "" // default to empty string
  } = emp;

  const [result] = await pool.query(
    "INSERT INTO employees (name, position, department, salary, contact, employmentHistory) VALUES (?, ?, ?, ?, ?, ?)",
    [name, position, department, salary, contact, employmentHistory]
  );

  return result; // returns insertId etc.
};

/* =========================
   UPDATE an existing employee
   emp = { name, position, department, salary, contact, employmentHistory }
========================= */
export const updateEmployee = async (employee_id, emp) => {
  const {
    name,
    position,
    department,
    salary,
    contact,
    employmentHistory = ""
  } = emp;

  const [result] = await pool.query(
    "UPDATE employees SET name = ?, position = ?, department = ?, salary = ?, contact = ?, employmentHistory = ? WHERE employee_id = ?",
    [name, position, department, salary, contact, employmentHistory, employee_id]
  );

  return result; // returns affectedRows
};

/* =========================
   DELETE an employee
   Note: will fail if foreign key constraints exist in attendance or leave tables
========================= */
export const deleteEmployee = async (employee_id) => {
  const [result] = await pool.query(
    "DELETE FROM employees WHERE employee_id = ?",
    [employee_id]
  );

  return result; // returns affectedRows
};
