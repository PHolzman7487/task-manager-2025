
import React, { useState } from "react";
import "../App.css";

export default function TaskForm({ onSubmit, onClose, texts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [recurrence, setRecurrence] = useState("none"); // שדה חזרתיות

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("due_date", dueDate);
    formData.append("completed", "false");
    if (file) formData.append("file", file);
    formData.append("tags", tags);
    formData.append("recurrence", recurrence); // שליחת חזרתיות
    onSubmit(formData);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setFile(null);
    setTags("");
    setRecurrence("none");
  };

  return (
    <div className="card shadow-sm" style={{ marginBottom: 32, position: "relative", maxWidth: 500, marginRight: "auto", marginLeft: "auto" }} role="form" aria-label="טופס יצירת משימה חדשה">
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          left: 16,
          top: 16,
          background: "#eee",
          color: "#1976d2",
          border: "none",
          borderRadius: "50%",
          width: 32,
          height: 32,
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "1.3rem",
          boxShadow: "0 2px 8px #1976d222"
        }}
        title={texts.cancel}
        aria-label={texts.cancel || "ביטול"}
      >×<span className="sr-only">{texts.cancel || "ביטול"}</span></button>
      <h2 style={{ color: "#1976d2", fontWeight: "bold", marginBottom: 24, marginTop: 24, textAlign: "center" }}>{texts.addTask}</h2>
      <form onSubmit={handleSubmit} className="px-3 pb-3" aria-label="טופס משימה">
        <div className="mb-3">
          <label className="form-label" htmlFor="task-title">{texts.title} <span style={{ color: "red" }}>*</span></label>
          <input
            id="task-title"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={texts.title}
            required
            autoFocus
            aria-label={texts.title}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="task-tags">{texts.tags} (מופרדות בפסיק)</label>
          <input
            id="task-tags"
            className="form-control"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder={texts.tags}
            aria-label={texts.tags}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="task-description">{texts.description || "תיאור"}</label>
          <input
            id="task-description"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={texts.description || "תיאור"}
            aria-label={texts.description || "תיאור"}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="task-priority">{texts.priority}</label>
          <select
            id="task-priority"
            className="form-select"
            value={priority}
            onChange={e => setPriority(e.target.value)}
            aria-label={texts.priority}
          >
            <option value="low">{texts.priority + " 3"}</option>
            <option value="medium">{texts.priority + " 2"}</option>
            <option value="high">{texts.urgent}</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="task-recurrence">{texts.recurrence || "חזרתיות"}</label>
          <select
            id="task-recurrence"
            className="form-select"
            value={recurrence}
            onChange={e => setRecurrence(e.target.value)}
            aria-label={texts.recurrence || "חזרתיות"}
          >
            <option value="none">{texts.none || "ללא"}</option>
            <option value="daily">{texts.daily || "יומי"}</option>
            <option value="weekly">{texts.weekly || "שבועי"}</option>
            <option value="monthly">{texts.monthly || "חודשי"}</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="task-due-date">{texts.dueDate}</label>
          <input
            id="task-due-date"
            type="date"
            className="form-control"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            aria-label={texts.dueDate}
          />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="task-file">{texts.file || "קובץ מצורף"}</label>
          <input
            id="task-file"
            type="file"
            className="form-control"
            onChange={e => setFile(e.target.files[0])}
            aria-label={texts.file || "קובץ מצורף"}
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="add-task-btn w-50" aria-label={texts.save || "שמירה"}>
            {texts.save}
          </button>
          <button
            type="button"
            className="btn btn-light w-50"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              border: "1px solid #1976d2",
              background: "#fff"
            }}
            onClick={onClose}
            aria-label={texts.cancel || "ביטול"}
            tabindex="0"
          >
            {texts.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}