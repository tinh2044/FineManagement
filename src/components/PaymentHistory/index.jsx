import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
} from "@mui/material";
import PaymentModal from "../Modals/PaymentModal";
import UpdatePaymentModal from "../Modals/UpdatePaymentModal";
import { toastMessage } from "../../context/ToastProvider";
import { getLegalCasesByPrisoner, deletePaymentFromLegalCase } from "../../services";
import JudgementGroup from "./JudgementGroup";
import AddJudgementModal from "../Modals/AddJudgementModal";

const groupData = (data, judgements = {}) => {
    const judgementIds = Object.keys(judgements);
    const penaltyNames = judgementIds.reduce((acc, judgementId) => {
        const penaltyName = judgements[judgementId].map((penalty) => penalty.penaltyName);
        if (!acc.includes(penaltyName)) {
            acc.push(penaltyName);
        }
        return acc;
    }, [])[0];
    console.log(penaltyNames);
    const grouped = {};

    data.forEach((caseItem) => {

        const { judgementId, judgementDate, penalties, payments, caseId } = caseItem;
        if (judgementIds.length > 0 && !judgementIds.includes(judgementId)) {
            return;
        }
        if (!grouped[judgementId]) {
            grouped[judgementId] = { caseId, judgementDate, penalties: {} };
        }

        penalties.forEach((penalty) => {
            const { penaltyTypeId, penaltyName, penaltyAmount } = penalty;
            if (penaltyNames.length > 0 && !penaltyNames.includes(penaltyName)) {
                return;
            }
            if (!grouped[judgementId].penalties[penaltyTypeId]) {
                grouped[judgementId].penalties[penaltyTypeId] = {
                    penaltyId: penalty.penaltyId,
                    penaltyTypeId,
                    penaltyName,
                    penaltyAmount: parseFloat(penaltyAmount),
                    payments: [],
                };
            }
        });

        payments.forEach((payment) => {
            const { penaltyTypeId, paymentAmount, ...paymentData } = payment;
            if (grouped[judgementId].penalties[penaltyTypeId]) {
                grouped[judgementId].penalties[penaltyTypeId].payments.push({
                    ...paymentData,
                    paymentAmount: parseFloat(paymentAmount),
                });
            }
        });
    });

    return grouped;
};

const PaymentHistory = ({ open, onClose, prisoner, isDialog = true, setTrigger, trigger }) => {
    const [data, setData] = useState([]);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [openUpdatePayment, setOpenUpdatePayment] = useState(false);
    const [penaltyData, setPenaltyData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);

    const handleOpenAddPaymentModal = (caseId, penalty) => {
        setOpenPaymentModal(true);
        setPenaltyData({ caseId: caseId, prisoner, penalty });
    };

    const handleDeletePayment = async (caseId, paymentId) => {
        try {
            await deletePaymentFromLegalCase(caseId, paymentId);
            toastMessage("Xóa thành công", "success");
            setTrigger(!trigger);
        } catch {
            toastMessage("Đã có lỗi trong quá trình xóa", "error");
            setTrigger(!trigger);
        }
    };

    const handleOpenUpdatePaymentModal = (caseId, payment, penaltyTypeId) => {
        setPaymentData({ caseId, payment, penaltyTypeId, prisoner });
        setOpenUpdatePayment(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getLegalCasesByPrisoner(prisoner.prisonerId);
            console.log(result);
            setData(result);
        };
        fetchData();
    }, [prisoner, trigger]);


    const groupedData = groupData(data, prisoner.judgements || {});
    const [openAddJudgementModal, setOpenAddJudgementModal] = useState(false);
    const renderContent = () => (
        <>
            {Object.entries(groupedData).map(
                ([judgementId, { judgementDate, penalties, caseId }]) => (
                    <JudgementGroup
                        key={judgementId}
                        judgementId={judgementId}
                        judgementDate={judgementDate}
                        penalties={penalties}
                        caseId={caseId}
                        onAddPayment={handleOpenAddPaymentModal}
                        onUpdatePayment={handleOpenUpdatePaymentModal}
                        onDeletePayment={handleDeletePayment}
                        prisoner={prisoner}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                )
            )}
        </>
    );

    return (
        <>
            {isDialog ? (
                <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth disableEnforceFocus>
                    <DialogTitle>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold">Chi tiết án phạt</span>
                            <Button variant="contained" color="success" onClick={() => setOpenAddJudgementModal(true)}>
                                Thêm bản án
                            </Button>
                        </div>
                    </DialogTitle>
                    <DialogContent>{renderContent()}</DialogContent>
                    <div className="p-4 flex justify-end">
                        <Button onClick={onClose} variant="contained" color="primary">
                            Đóng
                        </Button>
                    </div>
                </Dialog>
            ) : (
                <div className="p-4 w-full">
                    <div className="flex justify-start items-center">
                        {/* <Button variant="contained" color="success" onClick={() => setOpenAddJudgementModal(true)}>
                            Thêm bản án
                        </Button> */}
                    </div>
                    {renderContent()}
                </div>
            )}

            <PaymentModal
                open={openPaymentModal}
                handleClose={() => setOpenPaymentModal(false)}
                onAdd={() => setTrigger(!trigger)}
                data={penaltyData}
            />
            {paymentData !== null && (
                <UpdatePaymentModal
                    open={openUpdatePayment}
                    handleClose={() => setOpenUpdatePayment(false)}
                    onUpdate={() => setTrigger(!trigger)}
                    data={paymentData}
                />
            )}
            {prisoner && (
                <AddJudgementModal
                    open={openAddJudgementModal}
                    handleClose={() => setOpenAddJudgementModal(false)}
                    prisoner={prisoner}
                    onAdd={() => setTrigger(!trigger)}
                />
            )}
        </>
    );
};

export default PaymentHistory;