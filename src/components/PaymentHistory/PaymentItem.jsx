// src/components/Payments/PaymentItem.jsx
import React from "react";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

const PaymentItem = ({ payment, caseId, penaltyTypeId, onUpdatePayment, onDeletePayment }) => {
    return (
        <div className="border-b py-1 h-14 flex items-center justify-between">
            <span>
                💰 {payment.paymentAmount.toLocaleString()} VND, {payment.paymentDate} tại {payment.paymentLocation}
            </span>
            <div className="flex items-center justify-around w-4/12">
                <Button
                    className="hover:bg-green-500"
                    onClick={() => onUpdatePayment(caseId, payment, penaltyTypeId)}
                >
                    <EditIcon fontSize="small" color="success" />
                </Button>
                <Button
                    className="hover:bg-red-500"
                    onClick={() => onDeletePayment(caseId, payment.paymentId)}
                >
                    <Delete fontSize="small" color="error" />
                </Button>
            </div>
        </div>
    );
};

export default PaymentItem;
