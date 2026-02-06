// controllers/AttendanceDataCon.js
import {
  getAttendanceData,
  getAttendanceByEmployee,
  addAttendance,
  updateAttendance,
  deleteAttendance,
  getLeaveRequestsData,
  getLeaveRequestsByEmployee,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest
} from "../models/AttendanceDataDb.js";

   // ATTENDANCE CONTROLLERS

export const getAttendanceCon = async (req, res) => {
  try {
    const data = await getAttendanceData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
};

export const getAttendanceByEmployeeCon = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const data = await getAttendanceByEmployee(employee_id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee attendance" });
  }
};

export const addAttendanceCon = async (req, res) => {
  try {
    const record = req.body;
    const result = await addAttendance(record);
    res.json({ success: true, insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add attendance record" });
  }
};

export const updateAttendanceCon = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    const record = req.body;
    const result = await updateAttendance(attendance_id, record);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update attendance record" });
  }
};

export const deleteAttendanceCon = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    const result = await deleteAttendance(attendance_id);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete attendance record" });
  }
};

  // LEAVE REQUEST CONTROLLERS


export const getLeaveRequestsCon = async (req, res) => {
  try {
    const data = await getLeaveRequestsData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leave requests" });
  }
};

export const getLeaveRequestsByEmployeeCon = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const data = await getLeaveRequestsByEmployee(employee_id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leave requests for employee" });
  }
};

export const addLeaveRequestCon = async (req, res) => {
  try {
    const leave = req.body;
    const result = await addLeaveRequest(leave);
    res.json({ success: true, insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add leave request" });
  }
};

export const updateLeaveRequestCon = async (req, res) => {
  try {
    const { leave_id } = req.params;
    const leave = req.body;
    const result = await updateLeaveRequest(leave_id, leave);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update leave request" });
  }
};

export const deleteLeaveRequestCon = async (req, res) => {
  try {
    const { leave_id } = req.params;
    const result = await deleteLeaveRequest(leave_id);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete leave request" });
  }
};
