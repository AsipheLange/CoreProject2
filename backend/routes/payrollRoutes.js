import express from "express";
import {
  getPayrollTableDataCon,
  getPayrollByEmployeeCon,
  addPayrollCon,
  updatePayrollCon,
  deletePayrollCon
} from "../controllers/PayrollTableCon.js";

const router = express.Router();

// TEST route first
router.get("/test", (req, res) => res.send("Payroll route works!"));

// GET all payroll
router.get("/", getPayrollTableDataCon);

// GET payroll by employee ID (dynamic) — must be after static routes
router.get("/:employee_id", getPayrollByEmployeeCon);

// ADD new payroll record
router.post("/", addPayrollCon);

// UPDATE payroll record by employee_id
router.put("/:employee_id", updatePayrollCon);

// DELETE payroll record by employee_id
router.delete("/:employee_id", deletePayrollCon);

export default router;
