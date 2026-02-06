<script setup>
import jsPDF from 'jspdf'

const props = defineProps({
  employee: {
    type: Object,
    default: () => null
  },
  employeeName: {
    type: String,
    default: "—"
  }
})

const emit = defineEmits(['close'])

const downloadPayslip = () => {
  if (!props.employee) return

  const payroll = props.employee

  // Normalize keys if coming from backend
  const employeeId = payroll.employeeId ?? payroll.employee_id
  const hoursWorked = payroll.hoursWorked ?? payroll.hours_worked ?? 0
  const leaveDeductions = payroll.leaveDeductions ?? payroll.leave_deductions ?? 0
  const finalSalary = payroll.finalSalary ?? payroll.final_salary ?? 0

  const doc = new jsPDF()
  let y = 20

  doc.setFontSize(18)
  doc.text("ModernTech Solutions", 105, y, { align: "center" })
  y += 10

  doc.setFontSize(14)
  doc.text("Employee Payslip", 105, y, { align: "center" })
  y += 10

  doc.setFontSize(11)
  doc.text("Employee Name", 20, y)
  doc.text(props.employeeName, 190, y, { align: "right" })
  y += 8

  doc.text("Employee ID", 20, y)
  doc.text(String(employeeId), 190, y, { align: "right" })
  y += 8

  doc.text("Hours Worked", 20, y)
  doc.text(`${hoursWorked} hours`, 190, y, { align: "right" })
  y += 8

  doc.text("Leave Deductions", 20, y)
  doc.text(`${leaveDeductions} hours`, 190, y, { align: "right" })
  y += 10

  doc.text("Final Salary", 20, y)
  doc.text(`R${finalSalary}`, 190, y, { align: "right" })

  doc.save(`Payslip_${props.employeeName}.pdf`)
}
</script>

<template>
  <div class="modal-bg" @click.self="emit('close')">
    <div class="modal">
      <h2>Payslip: {{ employeeName }}</h2>
      <p><strong>ID:</strong> {{ employee?.employeeId ?? employee?.employee_id }}</p>
      <p><strong>Hours Worked:</strong> {{ employee?.hoursWorked ?? employee?.hours_worked ?? 0 }}</p>
      <p><strong>Leave Deductions:</strong> {{ employee?.leaveDeductions ?? employee?.leave_deductions ?? 0 }}</p>
      <p><strong>Final Salary:</strong> R{{ employee?.finalSalary ?? employee?.final_salary ?? 0 }}</p>

      <button class="download-btn" @click="downloadPayslip">Download PDF</button>
      <button class="close-btn" @click="emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
}

.modal {
  background: white;
  padding: 20px;
  width: 320px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

h2 {
  color: #4b47bd;
  margin-bottom: 12px;
  text-align: center;
}

p {
  margin: 6px 0;
}

.close-btn,
.download-btn {
  background: #586ed0;
  color: white;
  padding: 8px;
  border-radius: 6px;
  border: none;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
}

.close-btn:hover,
.download-btn:hover {
  background: #4a5fc4;
}
</style>
