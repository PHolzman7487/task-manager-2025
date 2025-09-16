
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
    <div className="card shadow-sm" style={{ marginBottom: 32, position: "relative", maxWidth: 500, marginRight: "auto", marginLeft: "auto" }}>
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
        aria-label={texts.cancel}
      >×</button>
      <h2 style={{ color: "#1976d2", fontWeight: "bold", marginBottom: 24, marginTop: 24, textAlign: "center" }}>{texts.addTask}</h2>
      <form onSubmit={handleSubmit} className="px-3 pb-3">
        <div className="mb-3">
          <label className="form-label">{texts.title} <span style={{ color: "red" }}>*</span></label>
          <input
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={texts.title}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{texts.tags} (מופרדות בפסיק)</label>
          <input
            className="form-control"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder={texts.tags}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{texts.description || "תיאור"}</label>
          <input
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={texts.description || "תיאור"}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{texts.priority}</label>
          <select
            className="form-select"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">{texts.priority + " 3"}</option>
            <option value="medium">{texts.priority + " 2"}</option>
            <option value="high">{texts.urgent}</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{texts.recurrence || "חזרתיות"}</label>
          <select
            className="form-select"
            value={recurrence}
            onChange={e => setRecurrence(e.target.value)}
          >
            <option value="none">{texts.none || "ללא"}</option>
            <option value="daily">{texts.daily || "יומי"}</option>
            <option value="weekly">{texts.weekly || "שבועי"}</option>
            <option value="monthly">{texts.monthly || "חודשי"}</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{texts.dueDate}</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">{texts.file || "קובץ מצורף"}</label>
          <input
            type="file"
            className="form-control"
            onChange={e => setFile(e.target.files[0])}
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="add-task-btn w-50">
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
          >
            {texts.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}