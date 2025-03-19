import React, { useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    Alert,
    Snackbar,
} from "@mui/material";
import { createPayment } from "../../services";
import CloseIcon from "@mui/icons-material/Close";
import { toastMessage } from "../../context/ToastProvider";
const PaymentModal = ({ open, handleClose, data, onAdd }) => {
    const [paymentData, setPaymentData] = useState("");
    const [loading, setLoading] = useState(false);

    if (!data) return null;
    const { prisoner, penalty, caseId } = data;
    console.log({ prisoner, penalty, caseId })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createPayment(caseId, {
                penaltyTypeId: Number(penalty.penaltyTypeId),
                paymentAmount: Number(paymentData.paymentAmount),
                paymentLocation: paymentData.paymentLocation,
                paymentDate: paymentData.paymentDate,
            });
            toastMessage("Thanh toán thành công!", "success");
            handleClose();
        } catch {
            toastMessage("Lỗi khi thêm thanh toán.", "error");
            setLoading(false);
        }
        setPaymentData({
            paymentAmount: "",
            paymentLocation: "",
            paymentDate: "",
        })
        setLoading(false);
        onAdd()
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="flex justify-between items-center">
                <span className="text-xl font-semibold">Thêm Thanh Toán</span>
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
                        label="Số tiền thanh toán"
                        type="number"
                        value={paymentData.paymentAmount}
                        onChange={(e) => setPaymentData({ ...paymentData, paymentAmount: e.target.value })}
                        required
                    />
                    <TextField
                        label="Địa điểm thanh toán"
                        type="text"
                        value={paymentData.paymentLocation}
                        onChange={(e) => setPaymentData({ ...paymentData, paymentLocation: e.target.value })}
                        required
                    />
                    <TextField
                        label="Ngày thanh toán"
                        type="date"
                        value={paymentData.paymentDate}
                        onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                        required
                        InputLabelProps={{ shrink: true }}
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

export default PaymentModal;
