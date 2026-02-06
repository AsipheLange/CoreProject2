import api from "./api";

/**
 * Get all payroll records
 */
export const getPayroll = async () => {
  const response = await api.get("/payroll");
  return response.data;
};

/**
 * Add a payroll record
 @param {Object} payrollData
 */
export const addPayroll = async (payrollData) => {
  const response = await api.post("/payroll", payrollData);
  return response.data;
};

/**
 * Update a payroll record for an employee
 * @param {number} employeeId
 * @param {Object} payrollData
 */
export const updatePayroll = async (employeeId, payrollData) => {
  const response = await api.patch(`/payroll/${employeeId}`, payrollData);
  return response.data;
};

/**
 * Delete a payroll record
 * @param {number} employeeId
 */
export const deletePayroll = async (employeeId) => {
  const response = await api.delete(`/payroll/${employeeId}`);
  return response.data;
};
