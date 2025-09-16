const API_URL = "http://localhost:8000/api/tasks/";

export async function getTasks(token) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Token ${token}` }
  });
  return res.json();
}

export async function createTask(formData, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Token ${token}` },
    body: formData,
  });
  return res.json();
}

export async function updateTask(id, formData, token) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { Authorization: `Token ${token}` },
    body: formData,
  });
  if (!res.ok) {
    // טיפול בשגיאה
    const error = await res.text();
    console.error("Update failed:", error);
    return null;
  }
  return res.json();
}

export async function deleteTask(id, token) {
  await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Token ${token}` },
  });
}