import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

function CreatePenaltyDialog({ open, onClose, onCreate }) {
    const [penaltyName, setPenaltyName] = useState("");

    const handleSubmit = () => {
        if (penaltyName.trim()) {
            onCreate({ penaltyName });
            setPenaltyName("");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm loại phạt</DialogTitle>
            <DialogContent>
                <TextField
                    label="Tên loại phạt"
                    fullWidth
                    value={penaltyName}
                    onChange={(e) => setPenaltyName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSubmit} color="primary">
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreatePenaltyDialog;
