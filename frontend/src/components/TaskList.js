import React from "react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onToggle, texts }) {
  if (!tasks.length) return <div>{texts.noTasks || "לא נמצאו משימות."}</div>;

  // ייצוא כל המשימות ל-PDF
  const exportAllTasksToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text(texts.tasksListTitle || texts.tasksTitle || "רשימת משימות", 105, 15, { align: "center" });
    doc.setFontSize(12);
    let y = 30;
    tasks.forEach((task, idx) => {
      doc.text(`${texts.task || "משימה"} #${idx + 1}`, 15, y);
      y += 8;
      doc.text(`${texts.title || "כותרת"}: ${task.title || ""}`, 15, y);
      y += 8;
      doc.text(`${texts.description || "תיאור"}: ${task.description || ""}`, 15, y);
      y += 8;
      doc.text(`${texts.priority || "דחיפות"}: ${texts[task.priority] || task.priority || ""}`, 15, y);
      y += 8;
      doc.text(`${texts.dueDate || "תאריך יעד"}: ${task.due_date || ""}`, 15, y);
      y += 8;
      doc.text(`${texts.status || "סטטוס"}: ${task.completed ? texts.completed || "הושלמה" : texts.notCompleted || "לא הושלמה"}`, 15, y);
      y += 8;
      if (task.file) {
        doc.text(`${texts.file || "קובץ מצורף"}: ${task.file}`, 15, y);
        y += 8;
      }
      y += 4;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save(texts.exportedPDFName || "tasks_list.pdf");
  };

  // ייצוא כל המשימות ל-Excel
  const exportAllTasksToExcel = () => {
    const data = tasks.map(task => ({
      [texts.title || "כותרת"]: task.title,
      [texts.description || "תיאור"]: task.description,
      [texts.priority || "דחיפות"]: texts[task.priority] || task.priority,
      [texts.dueDate || "תאריך יעד"]: task.due_date,
      [texts.status || "סטטוס"]: task.completed ? texts.completed || "הושלמה" : texts.notCompleted || "לא הושלמה",
      [texts.file || "קובץ מצורף"]: task.file || ""
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, texts.tasksListTitle || texts.tasksTitle || "משימות");
    XLSX.writeFile(wb, texts.exportedExcelName || "tasks_list.xlsx");
  };

  return (
    <div>
      <h2 className="mb-4" style={{ color: "#1976d2", fontWeight: "bold" }}>{texts.tasksTitle || texts.tasksListTitle || "המשימות שלך"}</h2>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <button className="btn btn-sm btn-outline-primary" onClick={exportAllTasksToPDF} aria-label={texts.exportPDF || "ייצוא כל המשימות ל-PDF"} tabindex="0">
          {texts.exportPDF || "ייצוא כל המשימות ל-PDF"}
        </button>
        <button className="btn btn-sm btn-outline-success" onClick={exportAllTasksToExcel} aria-label={texts.exportExcel || "ייצוא כל המשימות ל-Excel"} tabindex="0">
          {texts.exportExcel || "ייצוא כל המשימות ל-Excel"}
        </button>
      </div>
      <div role="list" aria-label={texts.tasksTitle || texts.tasksListTitle || "רשימת משימות"}>
        {tasks.map(task => (
          <div key={task.id} className="card mb-3">
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
              texts={texts}
            />
          </div>
        ))}
      </div>
    </div>
  );
}