import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

function EditPenaltyDialog({ open, onClose, penalty, onEdit }) {
    const [penaltyName, setPenaltyName] = useState("");

    useEffect(() => {
        if (penalty) {
            setPenaltyName(penalty.penaltyName);
        }
    }, [penalty]);

    const handleSubmit = () => {
        if (penaltyName.trim()) {
            onEdit(penalty.id, { penaltyName });
            setPenaltyName("");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Chỉnh sửa loại phạt</DialogTitle>
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
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditPenaltyDialog;
