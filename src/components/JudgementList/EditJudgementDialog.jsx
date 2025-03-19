import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

function EditJudgementDialog({ open, onClose, judgement, onEdit }) {
    const [judgementDate, setJudgementDate] = useState(judgement.judgement_date);

    useEffect(() => {
        setJudgementDate(judgement.judgement_date);
    }, [judgement]);

    const handleSubmit = () => {
        if (!judgementDate) {
            alert('Vui lòng nhập ngày bản án');
            return;
        }
        onEdit(judgement.judgementId, { judgementDate });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Chỉnh sửa Bản án</DialogTitle>
            <DialogContent>
                <TextField
                    label="Mã Bản án"
                    value={judgement.judgementId}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Ngày bản án"
                    type="date"
                    value={judgementDate}
                    onChange={(e) => setJudgementDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditJudgementDialog;