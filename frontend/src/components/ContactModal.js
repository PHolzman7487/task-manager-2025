import React, { useState } from "react";
const defaultTexts = {
  contact: "צור קשר",
  name: "שם מלא",
  email: "אימייל",
  phone: "טלפון",
  message: "הודעה",
  sendButton: "שלח",
  cancelButton: "ביטול"
};

export default function ContactModal({ open, onClose, onSuccess, texts = defaultTexts }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSending(false);
        onSuccess();
        onClose();
      } else {
        setSending(false);
        alert("שליחה נכשלה, נסה שוב.");
      }
    } catch {
      setSending(false);
      alert("שליחה נכשלה, נסה שוב.");
    }
  };

 return (
  <div className="modal show d-block" tabIndex="-1" style={{ background: "#0006" }}>
    <form className="modal-dialog" onSubmit={handleSubmit}>
      <div className="modal-content p-4">
  <h5 className="modal-title mb-3">{texts.contact || "צור קשר"}</h5>
  <input className="form-control mb-2" name="name" placeholder={texts.name || "שם מלא"} value={form.name} onChange={handleChange} required />
  <input className="form-control mb-2" name="email" type="email" placeholder={texts.email || "אימייל"} value={form.email} onChange={handleChange} required />
  <input className="form-control mb-2" name="phone" placeholder={texts.phone || "טלפון"} value={form.phone} onChange={handleChange} required />
  <textarea className="form-control mb-2" name="message" placeholder={texts.message || "תיאור הפנייה"} value={form.message} onChange={handleChange} required />
        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="btn btn-secondary" onClick={onClose}>{texts.cancel || "ביטול"}</button>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? texts.sending || "שולח..." : texts.send || "שלח"}
          </button>
        </div>
      </div>
    </form>
  </div>
);
}