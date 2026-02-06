import api from "./api";

export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

export const addEmployee = async (employee) => {
  const res = await api.post("/employees", employee);
  return res.data;
};

export const updateEmployee = async (id, employee) => {
  const res = await api.put(`/employees/${id}`, employee);
  return res.data;
};

export const deleteEmployee = async (id) => {
  console.log("Deleting employee id:", id);
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};
