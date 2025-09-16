import React, { useState, useEffect } from "react";

export default function EditTaskDialog({ open, task, onSave, onClose, texts }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    completed: false,
    file: null,
    tags: "",
    recurrence: "none",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        due_date: task.due_date || "",
        priority: task.priority || "medium",
        completed: task.completed || false,
        file: null,
        tags: task.tags || "",
        recurrence: task.recurrence || "none",
      });
    }
  }, [task]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = e => {
    setForm(f => ({ ...f, file: e.target.files[0] }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("due_date", form.due_date);
    formData.append("priority", form.priority);
    formData.append("completed", form.completed ? "true" : "false");
    if (form.file) formData.append("file", form.file);
    formData.append("tags", form.tags);
    formData.append("recurrence", form.recurrence);
    onSave(task.id, formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{
      background: "rgba(0,0,0,0.3)",
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050
    }}>
      <form className="modal-dialog" onSubmit={handleSubmit}>
        <div className="modal-content p-4">
          <h5 className="modal-title mb-3">{texts.editTaskTitle || "עריכת משימה"}</h5>
          <input className="form-control mb-2" name="title" value={form.title} onChange={handleChange} placeholder={texts.title || "כותרת"} required />
          <input className="form-control mb-2" name="description" value={form.description} onChange={handleChange} placeholder={texts.description || "תיאור"} />
          <input className="form-control mb-2" name="due_date" type="date" value={form.due_date} onChange={handleChange} />
          <select className="form-select mb-2" name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">{texts.low || "נמוכה"}</option>
            <option value="medium">{texts.medium || "בינונית"}</option>
            <option value="high">{texts.high || "גבוהה"}</option>
          </select>
          <select className="form-select mb-2" name="recurrence" value={form.recurrence} onChange={handleChange}>
            <option value="none">{texts.none || "ללא"}</option>
            <option value="daily">{texts.daily || "יומי"}</option>
            <option value="weekly">{texts.weekly || "שבועי"}</option>
            <option value="monthly">{texts.monthly || "חודשי"}</option>
          </select>
          <input className="form-control mb-2" name="tags" value={form.tags} onChange={handleChange} placeholder={texts.tags || "תגיות (מופרדות בפסיק)"} />
          <div className="form-check mb-2">
            <input className="form-check-input" id="completed" name="completed" type="checkbox" checked={form.completed} onChange={handleChange} />
            <label className="form-check-label" htmlFor="completed">{texts.completed || "הושלמה"}</label>
          </div>
          <input className="form-control mb-2" type="file" onChange={handleFile} />
          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="btn btn-secondary" onClick={onClose}>{texts.cancel || "ביטול"}</button>
            <button type="submit" className="btn btn-primary">{texts.save || "שמור"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}