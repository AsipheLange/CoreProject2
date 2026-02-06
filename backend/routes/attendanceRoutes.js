import express from "express";
import {
  getAttendanceCon,
  getAttendanceByEmployeeCon,
  addAttendanceCon,
  updateAttendanceCon,
  deleteAttendanceCon,
  getLeaveRequestsCon,
  getLeaveRequestsByEmployeeCon,
  addLeaveRequestCon,
  updateLeaveRequestCon,
  deleteLeaveRequestCon
} from "../controllers/AttendanceDataCon.js";

const router = express.Router();

// TEST route
router.get("/test", (req, res) => res.send("Attendance route works!"));

// Attendance routes
router.get("/", getAttendanceCon);
router.get("/employee/:employee_id", getAttendanceByEmployeeCon);
router.post("/", addAttendanceCon);
router.put("/:attendance_id", updateAttendanceCon);
router.delete("/:attendance_id", deleteAttendanceCon);

// Leave request routes
router.get("/leaves", getLeaveRequestsCon);
router.get("/leaves/employee/:employee_id", getLeaveRequestsByEmployeeCon);
router.post("/leaves", addLeaveRequestCon);
router.put("/leaves/:leave_id", updateLeaveRequestCon);
router.delete("/leaves/:leave_id", deleteLeaveRequestCon);

export default router;
