import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export default function DeleteTaskDialog({ open, onClose, onDelete, texts }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 4, boxShadow: 8, p: 2 },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "#d32f2f" }}>
        {texts.deleteTaskTitle || "האם למחוק את המשימה"}
      </DialogTitle>
      <DialogActions sx={{ justifyContent: "space-between", px: 2 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          {texts.cancel || "ביטול"}
        </Button>
        <Button variant="contained" color="error" onClick={onDelete} sx={{ borderRadius: 2 }}>
          {texts.delete || "מחק"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}