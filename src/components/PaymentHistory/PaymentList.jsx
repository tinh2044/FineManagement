// src/components/Payments/PaymentList.jsx
import React from "react";
import PaymentItem from "./PaymentItem";

const PaymentList = ({ payments, caseId, penaltyTypeId, onUpdatePayment, onDeletePayment }) => {
    return (
        <>
            {payments.length > 0 ? (
                payments.map((payment, idx) => (
                    <PaymentItem
                        key={idx}
                        payment={payment}
                        caseId={caseId}
                        penaltyTypeId={penaltyTypeId}
                        onUpdatePayment={onUpdatePayment}
                        onDeletePayment={onDeletePayment}
                    />
                ))
            ) : (
                <span>Chưa thanh toán</span>
            )}
        </>
    );
};

export default PaymentList;
