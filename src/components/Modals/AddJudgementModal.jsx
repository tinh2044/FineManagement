import React, { useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { addJudgementToPrisoner } from "../../services";
import CloseIcon from "@mui/icons-material/Close";
import { toastMessage } from "../../context/ToastProvider";
const AddJudgementModal = ({ open, handleClose, prisoner, onAdd }) => {
    const [judgementData, setJudgementData] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                judgementId: judgementData,
                prisonerId: prisoner.prisonerId,
            }
            await addJudgementToPrisoner(data);
            toastMessage(" Thêm bản án thành công!", "success");
            handleClose();
        } catch (error) {
            console.log(error);
            toastMessage("Lỗi khi thêm bản án.", "error");
            setLoading(false);
        }
        setJudgementData("")
        setLoading(false);
        onAdd()
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="flex justify-between items-center">
                <span className="text-xl font-semibold">Thêm bản án</span>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-lg font-semibold">{prisoner.prisonerName}</p>
                    <p className="text-sm text-gray-600">Ngày sinh: {prisoner.dob}</p>
                    <p className="text-sm text-gray-600">Nơi sinh: {prisoner.pob}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <TextField
                        label="Bản án"
                        type="text"
                        value={judgementData}
                        onChange={(e) => setJudgementData(e.target.value)}
                        required
                    />

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Hủy
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? "Đang lưu..." : "Lưu"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddJudgementModal;
