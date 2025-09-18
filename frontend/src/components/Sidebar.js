import React, { useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Sidebar({ filters, setFilters, allTags, texts }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // תגיות ייחודיות מכל המשימות
  const tagOptions = useMemo(() => {
    if (!allTags) return [];
    const tagsSet = new Set();
    allTags.forEach(tagsStr => {
      if (tagsStr) tagsStr.split(",").forEach(t => tagsSet.add(t.trim()));
    });
    return Array.from(tagsSet).filter(Boolean);
  }, [allTags]);

  return (
    <aside className="sidebar bg-white shadow-sm rounded-4 p-3 mb-4" style={{ minWidth: 220, maxWidth: 320 }}>
  <h5 className="mb-3" style={{ color: "#1976d2", fontWeight: "bold" }}>{texts.filterTitle || "אפשרויות סינון"}</h5>
      {/* חיפוש חופשי */}
      <div className="mb-3">
        <label className="form-label">{texts.search}</label>
        <input
          type="text"
          className="form-control"
          name="search"
          value={filters.search || ""}
          onChange={handleChange}
          placeholder={texts.search}
          tabindex="0"
        />
      </div>
      {/* תגיות (בחירה מרובה) */}
      <div className="mb-3">
        <label className="form-label">{texts.tags}</label>
        <Autocomplete
          multiple
          options={tagOptions}
          value={filters.tags || []}
          onChange={(_, value) => setFilters(f => ({ ...f, tags: value }))}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder={texts.tags} aria-label={texts.tags} />
          )}
        />
      </div>
      {/* דחיפות */}
      <div className="mb-3">
        <label className="form-label">{texts.priority}</label>
        <select
          className="form-select"
          name="priority"
          value={filters.priority || ""}
          onChange={handleChange}
        >
          <option value="">{texts.allTasks}</option>
          <option value="high">{texts.urgent}</option>
          <option value="medium">{texts.priority + " 2"}</option>
          <option value="low">{texts.priority + " 3"}</option>
        </select>
      </div>
      {/* סטטוס */}
      <div className="mb-3">
        <label className="form-label">{texts.status}</label>
        <select
          className="form-select"
          name="status"
          value={filters.status || ""}
          onChange={handleChange}
        >
          <option value="">{texts.allTasks}</option>
          <option value="completed">{texts.completed}</option>
          <option value="not_completed">{texts.notCompleted}</option>
        </select>
      </div>
      {/* תאריך יעד */}
      <div className="mb-3">
        <label className="form-label">{texts.dueDate}</label>
        <input
          type="date"
          className="form-control"
          name="dueDate"
          value={filters.dueDate || ""}
          onChange={handleChange}
        />
      </div>
    </aside>
  );
}