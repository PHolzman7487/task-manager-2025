import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Avatar, Paper, Snackbar, Alert } from "@mui/material";
const defaultTexts = {
  profile: "פרופיל משתמש",
  usernameLabel: "שם משתמש",
  passwordLabel: "סיסמה",
  saveButton: "שמור",
  changePassword: "שנה סיסמה"
};

export default function Profile({ texts = defaultTexts }) {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const name = localStorage.getItem("username") || "";
    setUsername(name);
    setNewUsername(name);
  }, []);

  const handleSave = () => {
    if (!newUsername) {
      setSnackbar({ open: true, message: "שם משתמש לא יכול להיות ריק", severity: "error" });
      return;
    }
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
    setSnackbar({ open: true, message: "שם המשתמש עודכן!", severity: "success" });
    // כאן אפשר להוסיף קריאה ל-API לעדכון סיסמה/שם בשרת
    setPassword("");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "#6a11cb", width: 64, height: 64, mb: 2 }}>
            {username[0]}
          </Avatar>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {texts.profile || "פרופיל משתמש"}
          </Typography>
        </Box>
        <TextField
          fullWidth
          label={texts.username || "שם משתמש"}
          value={newUsername}
          onChange={e => setNewUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label={texts.newPassword || "סיסמה חדשה"}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: "bold", borderRadius: 3, fontSize: 18 }}
          onClick={handleSave}
        >
          {texts.saveChanges || "שמור שינויים"}
        </Button>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ fontWeight: "bold", fontSize: 18 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}