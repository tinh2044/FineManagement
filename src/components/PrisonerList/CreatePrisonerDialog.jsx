import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function CreatePrisonerDialog({ open, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [pob, setPob] = useState('');

    const handleSubmit = () => {
        if (!name || !dob || !pob) {
            alert('Không được để trống thông tin');
            return;
        }
        onCreate({ prisonerName: name, dob, pob });
        setName('');
        setDob('');
        setPob('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm Phạm nhân</DialogTitle>
            <DialogContent>
                <TextField
                    label="Tên Phạm nhân"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Ngày sinh"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Nơi sinh"
                    value={pob}
                    onChange={(e) => setPob(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreatePrisonerDialog;