import api from "./api";

// Attendance
export const getAttendance = async () => {
  const response = await api.get("/attendance");
  return response.data;
};

export const getAttendanceByEmployee = async (employee_id) => {
  const response = await api.get(`/attendance/employee/${employee_id}`);
  return response.data;
};

export const addAttendance = async (record) => {
  const response = await api.post("/attendance", record);
  return response.data;
};

export const updateAttendance = async (attendance_id, record) => {
  const response = await api.put(`/attendance/${attendance_id}`, record);
  return response.data;
};

export const deleteAttendance = async (attendance_id) => {
  const response = await api.delete(`/attendance/${attendance_id}`);
  return response.data;
};

// Leave requests
export const getLeaveRequests = async () => {
  const response = await api.get("/attendance/leaves");
  return response.data;
};

export const getLeaveRequestsByEmployee = async (employee_id) => {
  const response = await api.get(`/attendance/leaves/employee/${employee_id}`);
  return response.data;
};

export const addLeaveRequest = async (leave) => {
  const response = await api.post("/attendance/leaves", leave);
  return response.data;
};

export const updateLeaveRequest = async (leave_id, leave) => {
  const response = await api.put(`/attendance/leaves/${leave_id}`, leave);
  return response.data;
};

export const deleteLeaveRequest = async (leave_id) => {
  const response = await api.delete(`/attendance/leaves/${leave_id}`);
  return response.data;
};
