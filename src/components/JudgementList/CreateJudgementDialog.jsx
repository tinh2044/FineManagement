import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function CreateJudgementDialog({ open, onClose, onCreate }) {
    const [judgementId, setJudgementId] = useState('');
    const [judgementDate, setJudgementDate] = useState('');

    const handleSubmit = () => {
        if (!judgementId || !judgementDate) {
            alert('Please fill in all fields');
            return;
        }
        onCreate({ judgementId, judgementDate });
        setJudgementId('');
        setJudgementDate('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm bản án</DialogTitle>
            <DialogContent>
                <TextField
                    label="Mã bản án"
                    value={judgementId}
                    onChange={(e) => setJudgementId(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
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
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateJudgementDialog;