import React, { useState, useEffect } from "react";
import translations from "./translations";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import EditTaskDialog from "./components/EditTaskDialog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import About from "./components/About";
import Sidebar from "./components/Sidebar";
import ContactModal from "./components/ContactModal";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // סטייטים עיקריים
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    tags: [],
    priority: "",
    status: "",
    dueDate: ""
  });
  const [showContact, setShowContact] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "he");

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.body.dir = "rtl";
  }, [language]);

  // טקסטים לפי שפה
  const texts = translations;

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // טעינת משימות מהשרת
  useEffect(() => {
    if (token) {
      setLoading(true);
      getTasks(token)
        .then(setTasks)
        .finally(() => setLoading(false));
    }
  }, [token]);

  // התראה על משימות דחופות
  useEffect(() => {
    if (!tasks.length) return;
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const urgentTasks = tasks.filter(
      t => t.priority === "high" ||
        (t.due_date && (new Date(t.due_date).toDateString() === today.toDateString() || new Date(t.due_date).toDateString() === tomorrow.toDateString()))
    );
    if (urgentTasks.length) {
      setAlertMsg(`יש לך ${urgentTasks.length} משימות דחופות או עם תאריך יעד קרוב!`);
      setAlertOpen(true);
    }
  }, [tasks]);

  // סינון משימות
  const filteredTasks = tasks.filter(task => {
    // מצב פוקוס: רק דחxxxx או של היום
    if (focusMode) {
      const today = new Date().toDateString();
      const isUrgent = task.priority === "high";
      const isToday = task.due_date && new Date(task.due_date).toDateString() === today;
      if (!isUrgent && !isToday) return false;
    }
    if (filters.search && !(
      (task.title || "").includes(filters.search) ||
      (task.description || "").includes(filters.search)
    )) return false;
    if (filters.tags && filters.tags.length > 0) {
      const taskTags = (task.tags || "").split(",").map(t => t.trim());
      if (!filters.tags.some(tag => taskTags.includes(tag))) return false;
    }
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.status === "completed" && !task.completed) return false;
    if (filters.status === "not_completed" && task.completed) return false;
    if (filters.dueDate && task.due_date > filters.dueDate) return false;
    return true;
  });

  // פונקציות CRUD
  const handleLogin = async ({ username, password }) => {
    const res = await fetch("http://localhost:8000/api-token-auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
    } else {
      alert("שם משתמש או סיסמה שגויים");
    }
  };

  const handleCreate = async (formData) => {
    const newTask = await createTask(formData, token);
    setTasks([...tasks, newTask]);
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (task) => setEditTask(task);

  const handleSaveEdit = async (id, formData) => {
    const updated = await updateTask(id, formData, token);
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    setEditTask(null);
  };

  const handleToggle = async (task) => {
    if (!task) return;
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("priority", task.priority);
    formData.append("due_date", task.due_date || "");
    formData.append("completed", (!task.completed).toString());
    if (task.file && task.file instanceof File) {
      formData.append("file", task.file);
    }
    const updated = await updateTask(task.id, formData, token);
    if (!updated) return;
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  // מסך התחברות
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  // תצוגה ראשית
  return (
    <>
      {/* התראה על משימות דחופות */}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setAlertOpen(false)} severity="warning" sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Router>
        <Header
          onLogout={handleLogout}
          onAddTask={() => setShowAdd(true)}
          search={filters.search}
          setSearch={value => setFilters(f => ({ ...f, search: value }))}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          language={language}
          setLanguage={setLanguage}
          texts={texts[language]}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container" style={{ marginTop: 80 }}>
                <div className="row">
                  {/* Sidebar */}
                  <div className="col-lg-3 col-md-4 mb-4">
                    <Sidebar
                      filters={filters}
                      setFilters={setFilters}
                      allTags={tasks.map(t => t.tags)}
                      texts={texts[language]}
                    />
                  </div>
                  {/* Main Content */}
                  <div className="col-lg-9 col-md-8" style={{ position: "relative" }}>
                    {showAdd && (
                      <TaskForm
                        onSubmit={handleCreate}
                        onClose={() => setShowAdd(false)}
                        texts={texts[language]}
                      />
                    )}
                    {loading ? (
                      <div className="loader"></div>
                    ) : (
                      <>
                        <TaskList
                          tasks={filteredTasks}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onToggle={handleToggle}
                          texts={texts[language]}
                        />
                        <EditTaskDialog
                          open={!!editTask}
                          task={editTask}
                          onSave={handleSaveEdit}
                          onClose={() => setEditTask(null)}
                        />
                        {/* כפתור הוספה צף */}
                        <button
                          className="fab-add-task"
                          title="הוסף משימה חדשה"
                          onClick={() => setShowAdd(true)}
                          style={{
                            position: "fixed",
                            bottom: 38,
                            right: 38,
                            zIndex: 1200,
                            width: 62,
                            height: 62,
                            borderRadius: "50%",
                            background: "linear-gradient(90deg, #512da8 60%, #1976d2 100%)",
                            color: "#fff",
                            fontSize: 34,
                            boxShadow: "0 4px 16px #1976d233",
                            border: "none",
                            transition: "background 0.2s",
                            display: loading ? "none" : "block"
                          }}
                        >
                          ＋
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
  <Footer onContactClick={() => setShowContact(true)} texts={texts[language]} />
        {showContact && (
          <ContactModal
            open={showContact}
            onClose={() => setShowContact(false)}
            onSuccess={() => {
              setShowContact(false);
              alert("הפנייה התקבלה בהצלחה, תשובה תגיע לדוא\"ל תוך 5 ימי עסקים.");
            }}
          />
        )}
      </Router>
    </>
  );
}

export default App;