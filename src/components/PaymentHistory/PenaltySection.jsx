// src/components/Payments/PenaltySection.jsx
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import PaymentList from "./PaymentList";
import { deletePenaltyInCase } from "../../services";
import UpdatePenaltyModal from "../Modals/UpdatePenaltyModal";

const PenaltySection = ({
    penalty,
    caseId,
    onAddPayment,
    onUpdatePayment,
    onDeletePayment,
    prisoner,
    setTrigger,
}) => {
    const { penaltyTypeId, penaltyName, penaltyAmount, payments } = penalty;
    const totalPaid = payments.reduce((sum, p) => sum + p.paymentAmount, 0);
    const remaining = penaltyAmount - totalPaid;
    const [openUpdatePenalty, setOpenUpdatePenalty] = useState(false);

    const handleDeletePenalty = () => {
        console.log(caseId, penalty.penaltyId);
        deletePenaltyInCase(caseId, penalty.penaltyId)
        setTrigger((prev) => !prev)
    }

    return (
        <div className="ml-4 mb-4">
            <h4 className="text-blue-600 font-semibold">
                {penaltyName} (Loại: {penaltyTypeId})
            </h4>
            <TableContainer component={Paper} className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Số tiền phải trả</TableCell>
                            <TableCell>Lịch sử thanh toán</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{penaltyAmount.toLocaleString()} VND</TableCell>
                            <TableCell>
                                <PaymentList
                                    payments={payments}
                                    caseId={caseId}
                                    penaltyTypeId={penaltyTypeId}
                                    onUpdatePayment={onUpdatePayment}
                                    onDeletePayment={onDeletePayment}
                                />
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} className="font-semibold text-right">
                                <div className="flex justify-between items-center w-8/12">
                                    {remaining > 0 ? (
                                        <>
                                            <span className="text-red-500 mr-20">
                                                ❌ Còn nợ: {remaining.toLocaleString()} VND
                                            </span>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    onAddPayment(caseId, {
                                                        penaltyTypeId,
                                                        penaltyName,
                                                        penaltyAmount,
                                                        payments,
                                                    })
                                                }
                                            >
                                                Thanh toán
                                            </Button>
                                            {/* <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() => setOpenUpdatePenalty(true)}
                                            >
                                                Sửa án phạt
                                            </Button> */}
                                        </>


                                    ) : (
                                        <span className="text-green-600">✅ Đã thanh toán đủ</span>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={handleDeletePenalty}
                                    >
                                        Xóa án phạt
                                    </Button>
                                </div>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdatePenaltyModal
                open={openUpdatePenalty}
                handleClose={() => setOpenUpdatePenalty(false)}
                prisoner={prisoner}
                caseId={caseId}
                onAdd={() => setTrigger((prev) => !prev)}
                initialData={penalty}
            />
        </div>
    );
};

export default PenaltySection;
