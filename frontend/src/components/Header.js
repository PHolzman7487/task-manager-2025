import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onLogout, onAddTask, search, setSearch, darkMode, setDarkMode, focusMode, setFocusMode, language, setLanguage, texts }) {
  const location = useLocation();
  const username = localStorage.getItem("username") || "משתמש";
  const firstLetter = username[0] || "מ";

  return (
    <div className="header-bar">
  <div className="header-content" style={{ flexDirection: "row" }}>
        <span className="header-title">{texts.title}</span>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: 320, borderRadius: 18, direction: "rtl" }}
            placeholder={texts.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
  <div className="navbar" style={{ alignItems: "center", gap: 0, flexDirection: "row" }}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>{texts.allTasks}</Link>
          <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>{texts.profile}</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>{texts.about}</Link>
          <button className="add-task-btn ms-2" onClick={onAddTask}>
            {texts.addTask}
          </button>
          <button
            className="btn btn-light ms-2"
            style={{
              borderRadius: 16,
              fontWeight: "bold",
              background: darkMode ? "#222d3b" : "#fff",
              color: darkMode ? "#ffb300" : "#1976d2",
              border: "1px solid #1976d2",
              transition: "background 0.2s, color 0.2s"
            }}
            onClick={() => setDarkMode(d => !d)}
            title={darkMode ? "מצב רגיל" : "מצב כהה"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            className="btn btn-light ms-2"
            style={{
              borderRadius: 16,
              fontWeight: "bold",
              background: focusMode ? "#ffb300" : "#fff",
              color: focusMode ? "#222d3b" : "#1976d2",
              border: "1px solid #1976d2",
              transition: "background 0.2s, color 0.2s"
            }}
            onClick={() => setFocusMode(f => !f)}
            title={focusMode ? "מצב רגיל" : "מצב פוקוס"}
          >
            {focusMode ? "🔎 פוקוס" : "פוקוס"}
          </button>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#6a11cb",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: "0 10px"
            }}
            title={username}
          >
            {firstLetter}
          </div>
          <select
            className="form-select ms-2"
            style={{ width: 70, fontWeight: "bold", borderRadius: 16, background: "#fff", color: "#1976d2", border: "1px solid #1976d2" }}
            value={language}
            onChange={e => setLanguage(e.target.value)}
            title="שנה שפה"
          >
            <option value="he">עברית</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
          <button
            style={{
              background: "#1976d2",
              color: "#fff",
              borderRadius: 16,
              padding: "6px 18px",
              marginRight: 0,
              marginLeft: 0,
              cursor: "pointer",
              border: "none",
              fontWeight: "bold"
            }}
            onClick={onLogout}
          >
            התנתק
          </button>
        </div>
      </div>
    </div>
  );
}