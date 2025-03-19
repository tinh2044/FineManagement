import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { updatePaymentInLegalCase } from "../../services"; // Import API gọi backend
import CloseIcon from "@mui/icons-material/Close";
const UpdatePaymentModal = ({ open, handleClose, data, onUpdate }) => {

    const [paymentData, setPaymentData] = useState({
        paymentAmount: data.payment.paymentAmount,
        paymentLocation: data.payment.paymentLocation,
        paymentDate: data.payment.paymentDate,
    });
    const [loading, setLoading] = useState(false);
    const { caseId, payment, penaltyTypeId, prisoner } = data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updatePaymentInLegalCase(caseId, payment.paymentId, {
                penaltyTypeId: Number(penaltyTypeId),
                paymentAmount: Number(paymentData.paymentAmount),
                paymentLocation: paymentData.paymentLocation,
                paymentDate: paymentData.paymentDate,
            });

        } catch {

            setLoading(false);
        }
        setPaymentData({
            paymentAmount: "",
            paymentLocation: "",
            paymentDate: "",
        })
        setLoading(false);
        onUpdate()
    };

    useEffect(() => {
        setPaymentData({
            paymentAmount: payment.paymentAmount,
            paymentLocation: payment.paymentLocation,
            paymentDate: payment.paymentDate,
        })
    }, [payment])


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="flex justify-between items-center">
                <span className="text-xl font-semibold">Sửa Thanh Toán</span>
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

export default UpdatePaymentModal;
