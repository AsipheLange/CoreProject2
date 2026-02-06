import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../models/EmployeeDataDb.js";

// GET all employees
export const getEmployeesCon = async (req, res) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    console.error("GET employees error:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// ADD employee
export const addEmployeeCon = async (req, res) => {
  try {
    console.log("Add employee payload:", req.body);
    const { name, position, department, salary, contact } = req.body;

    // Validate required fields
    if (!name || !position || !department || !salary || !contact) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await addEmployee({ name, position, department, salary, contact });
    console.log("Add result:", result);
    res.json({ success: true, insertId: result.insertId });
  } catch (err) {
    console.error("ADD employee error:", err);
    res.status(500).json({ error: "Failed to add employee" });
  }
};

// UPDATE employee
export const updateEmployeeCon = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, salary, contact } = req.body;

    if (!id) return res.status(400).json({ error: "Employee ID required" });

    const result = await updateEmployee(id, { name, position, department, salary, contact });
    console.log("Update result:", result);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("UPDATE employee error:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// DELETE employee
export const deleteEmployeeCon = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete request ID:", id);

    if (!id) return res.status(400).json({ error: "Employee ID required" });

    const result = await deleteEmployee(id);
    console.log("Delete result:", result);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("DELETE employee error:", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
