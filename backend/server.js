import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Employee routes
app.use("/employees", employeeRoutes);
// Payroll routes
app.use("/payroll", payrollRoutes);
// Attendance routes
app.use("/attendance", attendanceRoutes);
// Leave routes


app.get("/", (req, res) => res.send("API is running"));

const PORT = 1111;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
