import React, { useState } from "react";

export default function Login({ onLogin, texts }) {
  const [tab, setTab] = useState("login"); // "login" או "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (tab === "login") {
      onLogin({ username, password });
    } else {
      try {
        const res = await fetch("http://localhost:8000/api/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email }),
        });
        if (res.ok) {
          alert("נרשמת בהצלחה! עכשיו התחבר/י");
          setTab("login");
        } else {
          const data = await res.json();
          setError(data.error || "שגיאה בהרשמה");
        }
      } catch {
        setError("שגיאה בהרשמה");
      }
    }
  };

  return (
     <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-4" style={{ minWidth: 340, maxWidth: 370 }}>
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className={`btn btn-link ${tab === "login" ? "fw-bold text-primary" : "text-secondary"}`}
            onClick={() => setTab("login")}
            style={{ textDecoration: "none" }}
          >
            {texts.loginTab || "התחברות"}
          </button>
          <span className="mx-2">|</span>
          <button
            type="button"
            className={`btn btn-link ${tab === "register" ? "fw-bold text-primary" : "text-secondary"}`}
            onClick={() => setTab("register")}
            style={{ textDecoration: "none" }}
          >
            {texts.registerTab || "הרשמה"}
          </button>
        </div>
  <h4 className="text-center mb-4">{tab === "login" ? texts.loginTab || "התחברות" : texts.registerTab || "הרשמה"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder={texts.username || "שם משתמש"}
              required
              autoFocus
            />
          </div>
          {tab === "register" && (
            <div className="mb-3">
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={texts.email || "אימייל"}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={texts.password || "סיסמה"}
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger py-2 text-center mb-3" role="alert" style={{ fontSize: 15 }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            {tab === "login" ? texts.login || "התחבר" : texts.register || "הרשם"}
          </button>
        </form>
      </div>
    </div>
  );
}