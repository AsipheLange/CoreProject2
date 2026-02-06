import express from "express";
import { getEmployeesCon, addEmployeeCon, updateEmployeeCon, deleteEmployeeCon } from "../controllers/EmployeeDataCon.js";

const router = express.Router();

// GET all employees
router.get("/", getEmployeesCon);

// ADD new employee
router.post("/", addEmployeeCon);

// UPDATE employee
router.put("/:id", updateEmployeeCon);

// DELETE employee
router.delete("/:id", deleteEmployeeCon);

export default router;
