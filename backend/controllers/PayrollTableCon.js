import {
  getPayrollTableData,
  getPayrollByEmployee,
  addPayroll,
  updatePayroll,
  deletePayroll
} from "../models/PayrollTableDb.js";


  // GET all payroll records

export const getPayrollTableDataCon = async (req, res) => {
  try {
    const data = await getPayrollTableData();
    res.json(data); // always array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch payroll data" });
  }
};


  // GET payroll by employee ID

export const getPayrollByEmployeeCon = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const data = await getPayrollByEmployee(employee_id);
    if (data.length === 0) return res.status(404).json({ error: "Employee payroll not found" });
    res.json(data[0]); // return single object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee payroll" });
  }
};

  // ADD payroll record

export const addPayrollCon = async (req, res) => {
  try {
    const payrollData = req.body;
    const result = await addPayroll(payrollData);
    res.json({ success: true, insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add payroll record" });
  }
};


  // UPDATE payroll record

export const updatePayrollCon = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const payrollData = req.body;
    const result = await updatePayroll(employee_id, payrollData);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update payroll record" });
  }
};

  // DELETE payroll record

export const deletePayrollCon = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const result = await deletePayroll(employee_id);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete payroll record" });
  }
};
