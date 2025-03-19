import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function EditPrisonerDialog({ open, onClose, prisoner, onEdit }) {
    const [name, setName] = useState(prisoner.prisonerName);
    const [dob, setDob] = useState(prisoner.dob);
    const [pob, setPob] = useState(prisoner.pob);

    useEffect(() => {
        setName(prisoner.prisonerName);
        setDob(prisoner.dob);
        setPob(prisoner.pob);
    }, [prisoner]);

    const handleSubmit = () => {
        if (!name) {
            alert('Tên Phạm nhân không được để trống');
            return;
        }
        onEdit(prisoner.prisonerId, { prisonerName: name, dob, pob });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Chỉnh sửa Phạm nhân</DialogTitle>
            <DialogContent>
                <TextField
                    label="Mã Phạm nhân"
                    value={prisoner.prisonerId}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Tên Phạm nhân"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Ngày sinh"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Nơi sinh"
                    value={pob}
                    onChange={(e) => setPob(e.target.value)}
                    fullWidth
                    margin="normal"
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

export default EditPrisonerDialog;