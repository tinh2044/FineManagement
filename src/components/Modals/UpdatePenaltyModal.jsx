import React, { useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { updatePenaltyInCase } from "../../services";
import CloseIcon from "@mui/icons-material/Close";
import { toastMessage } from "../../context/ToastProvider";
import { useSelector } from "react-redux";
const UpdatePenaltyModal = ({ open, handleClose, prisoner, caseId, onAdd, initialData }) => {
    const penaltyTypes = useSelector((state) => state.penaltyTypes.list);

    const [penaltyData, setPenaltyData] = useState({
        penaltyTypeId: initialData.penaltyTypeId,
        penaltyAmount: initialData.penaltyAmount,
    });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updatePenaltyInCase(caseId, initialData.penaltyId, {
                penaltyTypeId: penaltyData.penaltyTypeId,
                penaltyAmount: parseInt(penaltyData.penaltyAmount),
            });
            toastMessage(" Sửa án phạt thành công!", "success");
            handleClose();
        } catch (error) {
            console.log(error);
            toastMessage("Lỗi khi sửa án phạt.", "error");
            setLoading(false);
        }
        setPenaltyData({
            penaltyTypeId: "",
            penaltyAmount: "",
        })
        setLoading(false);
        onAdd()
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="flex justify-between items-center">
                <span className="text-xl font-semibold">Sửa án phạt cho {prisoner.prisonerName}</span>
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

                    <InputLabel>Loại hình phạt</InputLabel>
                    <Select
                        name="penaltyType"
                        defaultValue={initialData.penaltyTypeId}
                        value={penaltyData.penaltyTypeId}
                        onChange={(e) => setPenaltyData({ ...penaltyData, penaltyTypeId: e.target.value })}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {penaltyTypes.map((type) => (
                            <MenuItem key={type.penaltyTypeId} value={type.penaltyTypeId}>
                                {type.penaltyName}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="Số tiền phạt"
                        type="number"
                        value={penaltyData.penaltyAmount}
                        onChange={(e) => setPenaltyData({ ...penaltyData, penaltyAmount: e.target.value })}
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

export default UpdatePenaltyModal;
