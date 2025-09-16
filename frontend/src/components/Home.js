import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home({ texts }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("משתמש");

  useEffect(() => {
    const name = localStorage.getItem("username") || "משתמש";
    setUsername(name);
  }, []);

  return (
    <Box sx={{ textAlign: "center", mt: 6,       minHeight: "57vh",
 }}>
      <Typography variant="h3" fontWeight="bold" color="primary" mb={4}>
        {texts.welcome || "ברוך הבא"}, {username}!
      </Typography>
      <Button variant="contained" sx={{ m: 1 }} onClick={() => navigate("/tasks/add")}> 
        {texts.addTask || "➕ הוסף משימה"}
      </Button>
      <Button variant="outlined" sx={{ m: 1 }} onClick={() => navigate("/tasks")}> 
        {texts.allTasks || "📋 כל המשימות"}
      </Button>
      <Button variant="outlined" sx={{ m: 1 }} onClick={() => navigate("/tasks/date")}> 
        {texts.byDate || "🗓️ לפי תאריך"}
      </Button>
      <Button variant="outlined" sx={{ m: 1 }} onClick={() => navigate("/tasks/priority")}> 
        {texts.byPriority || "⚡ לפי דחיפות"}
      </Button>
    </Box>
  );
}