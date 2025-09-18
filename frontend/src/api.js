const API_URL = "http://localhost:8000/api/tasks/";

export async function getTasks(token) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function createTask(formData, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  return typeof data === "object" && data !== null ? data : {};
}

export async function updateTask(id, formData, token) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    // טיפול בשגיאה
    const error = await res.text();
    console.error("Update failed:", error);
    return null;
  }
  const data = await res.json();
  return typeof data === "object" && data !== null ? data : {};
}

export async function deleteTask(id, token) {
  await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}