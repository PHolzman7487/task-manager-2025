import React from "react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "../App.css";

const FILE_BASE_URL = "http://127.0.0.1:8000/";

export default function TaskItem({ task, onEdit, onDelete, onToggle, texts }) {
  let borderColor = "#e0e0e0";
  let statusIcon = "";
  if (task.completed) {
    borderColor = "#388e3c";
    statusIcon = texts.completedIcon || "✔️";
  } else if (task.priority === "high") {
    borderColor = "#d32f2f";
    statusIcon = texts.urgentIcon || "⏰";
  } else if (task.due_date && (new Date(task.due_date) - new Date() < 3 * 24 * 60 * 60 * 1000)) {
    borderColor = "#fbc02d";
    statusIcon = texts.dueSoonIcon || "🔔";
  } else {
    borderColor = "#1976d2";
    statusIcon = texts.defaultIcon || "📝";
  }

  // ייצוא משימה ל-Excel
  const exportTaskToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        [texts.titleLabel || "כותרת"]: task.title,
        [texts.descriptionLabel || "תיאור"]: task.description,
        [texts.priority || "דחיפות"]: texts[task.priority] || task.priority,
        [texts.dueDate || "תאריך יעד"]: task.due_date,
        [texts.status || "הושלמה"]: task.completed ? texts.completed : texts.notCompleted,
        [texts.attachedFile || "קובץ מצורף"]: task.file || ""
  
      }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, texts.taskSheetName || texts.task || "משימה");
    XLSX.writeFile(wb, `task_${task.id}.xlsx`);
  };

  // הורדת קובץ מצורף
  const handleDownloadFile = () => {
    if (task.file) {
      const url = task.file.startsWith("http") ? task.file : `${FILE_BASE_URL}${task.file}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = task.file.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // ייצוא משימה ל-PDF
  const exportTaskToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text(texts.taskDetails || "פרטי משימה", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`${texts.titleLabel || "כותרת"}: ${task.title || ""}`, 15, 35);
    doc.text(`${texts.descriptionLabel || "תיאור"}: ${task.description || ""}`, 15, 45);
    doc.text(`${texts.priority || "דחיפות"}: ${texts[task.priority] || task.priority}`, 15, 55);
    doc.text(`${texts.dueDate || "תאריך יעד"}: ${task.due_date || ""}`, 15, 65);
    doc.text(`${texts.status || "הושלמה"}: ${task.completed ? texts.completed : texts.notCompleted}`, 15, 75);
    if (task.file) {
      doc.text(`${texts.attachedFile || "קובץ מצורף"}: ${task.file}`, 15, 85);
    }
    doc.save(`task_${task.id}.pdf`);
  };

  // צפיה בקובץ
  const handleViewFile = () => {
    if (task.file) {
      const url = task.file.startsWith("http") ? task.file : `${FILE_BASE_URL}${task.file}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div
      className={`task-item${task.completed ? " completed" : ""}`}
      role="listitem"
      tabIndex={0}
      aria-label={`משימה: ${task.title}`}
      data-priority={task.priority}
      style={{
        background: "#fff",
        boxShadow: "0 2px 8px 0 #e0e0e0",
        borderRadius: 18,
        padding: "18px 18px 12px 18px",
        marginBottom: 18,
        border: `1.2px solid ${borderColor}`,
        transition: "border 0.2s"
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28, marginLeft: 2 }} aria-hidden="true">{statusIcon}</span>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            style={{ width: 20, height: 20 }}
            aria-label={task.completed ? texts.completed : texts.notCompleted}
          />
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{task.title}</span>
        </div>
        <div className="task-actions" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {task.file && (
            <>
              <button
                style={{
                  background: "#fff",
                  color: "#1976d2",
                  border: "1.5px solid #1976d2",
                  width: 40,
                  padding: 0,
                  marginLeft: 4
                }}
                onClick={handleViewFile}
                title={texts.viewFile || "צפיה בקובץ המצורף"}
                aria-label={texts.viewFile || "צפיה בקובץ המצורף"}
                tabIndex={0}>
                {texts.fileIcon || "📄"}
              </button>
              <button
                style={{
                  background: "#fff",
                  color: "#388e3c",
                  border: "1.5px solid #388e3c",
                  width: 40,
                  padding: 0,
                  marginLeft: 4
                }}
                onClick={handleDownloadFile}
                title={texts.downloadFile || "הורדת קובץ מצורף"}
                aria-label={texts.downloadFile || "הורדת קובץ מצורף"}
                tabIndex={0}>
                {texts.downloadIcon || "⬇️"}
              </button>
            </>
          )}
          <button
            style={{
              background: "#fff",
              color: "#1976d2",
              border: "1.5px solid #1976d2",
              width: 40,
              padding: 0,
              marginLeft: 4
            }}
            onClick={exportTaskToPDF}
            title={texts.exportPDF || "ייצוא המשימה ל-PDF"}
            aria-label={texts.exportPDF || "ייצוא המשימה ל-PDF"}
            tabIndex={0}>
            {texts.pdfIcon || "🖨️"}
          </button>
          <button
            style={{
              background: "#fff",
              color: "#388e3c",
              border: "1.5px solid #388e3c",
              width: 40,
              padding: 0,
              marginLeft: 4
            }}
            onClick={exportTaskToExcel}
            title={texts.exportExcel || "ייצוא המשימה ל-Excel"}
            aria-label={texts.exportExcel || "ייצוא המשימה ל-Excel"}
            tabIndex={0}>
            {texts.excelIcon || "📊"}
          </button>
          <button
            style={{
              background: "#fff",
              color: "#1976d2",
              border: "1.5px solid #1976d2",
              width: 40,
              padding: 0,
              marginLeft: 4
            }}
            onClick={() => onEdit(task)}
            title={texts.edit || "עריכת משימה"}
            aria-label={texts.edit || "עריכת משימה"}
            tabIndex={0}>
            {texts.editIcon || "✏️"}
          </button>
          <button
            style={{
              background: "#fff",
              color: "#d32f2f",
              border: "1.5px solid #d32f2f",
              width: 40,
              padding: 0
            }}
            onClick={() => onDelete(task.id)}
            title={texts.delete || "מחיקת משימה"}
            aria-label={texts.delete || "מחיקת משימה"}
            tabIndex={0}>
            {texts.deleteIcon || "🗑️"}
          </button>
        </div>
      </div>
      {/* תצוגת תגיות */}
      {task && task.tags && (
        <div style={{ margin: "6px 0 0 0", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {(Array.isArray(task.tags) ? task.tags : typeof task.tags === "string" ? task.tags.split(",") : []).filter(tag => tag && tag.trim() !== "").map((tag, idx) => (
            <span key={idx} tabIndex={0} aria-label={`תגית: ${tag.trim()}`}
              style={{
                background: "#e3f2fd",
                color: "#1976d2",
                borderRadius: 12,
                padding: "2px 10px",
                fontSize: 13,
                fontWeight: 500,
                border: "1px solid #90caf9"
              }}>{tag.trim()}</span>
          ))}
        </div>
      )}
      <div style={{ color: "#555", fontSize: "0.95rem", marginRight: 32, marginTop: 6 }}>
        {task.description && <span>{task.description}</span>}
        {task.due_date && (
          <span style={{ color: "#888", fontSize: "0.95rem" }}>
            {task.due_date && ` | ${texts.dueDate || "תאריך יעד"}: ${new Date(task.due_date).toLocaleDateString(texts.dateLocale || 'he-IL')}`}
          </span>
        )}
        {task.recurrence && task.recurrence !== "none" && (
          <span style={{ color: "#1976d2", fontWeight: 500, marginRight: 8 }}>
            {` | ${texts.recurrence || "חזרתיות"}: ${texts[task.recurrence] || task.recurrence}`}
          </span>
        )}
      </div>
    </div>
  );
}