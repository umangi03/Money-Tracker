import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";

const EditDialogBox = ({ open, data, onClose, onSave }) => {
  const [editData, setEditData] = useState(data);

  useEffect(() => {
    setEditData(data);
  }, [data]);

  const saveEditedTransaction = () => {
    onSave(editData);
    onClose();
  };
console.log(editData);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <Box sx={{display: 'flex', gap: 3}}>
        <TextField
          label="Title"
          value={editData?.title || ""}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Amount"
          value={editData?.amount || ""}
          onChange={(e) =>
            setEditData({ ...editData, amount: Number(e.target.value) })
          }
          fullWidth
          margin="dense"
        />
        </Box>
        <Box sx={{display: 'flex', gap: 3}}>
        <TextField
          label="Date & Time"
          type="datetime-local"
          value={editData?.dateTime? new Date(editData.dateTime).toISOString().slice(0, 16): ""}
          onChange={(e) => setEditData({ ...editData, dateTime: new Date(e.target.value).toISOString()})}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Transaction Type"
          select
          value={editData?.type || ""}
          onChange={(e) => setEditData({ ...editData, type: e.target.value })}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </TextField>
        </Box>
        <TextField
          label="Description"
          value={editData?.description || ""}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          fullWidth
          multiline
          rows={3}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={saveEditedTransaction} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialogBox;
