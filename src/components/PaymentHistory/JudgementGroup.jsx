import React, { useState } from "react";
import PenaltySection from "./PenaltySection";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateJudgementModal from "../Modals/UpdateJudgementModal";
import AddPenaltyModal from "../Modals/AddPenaltyModal";


const JudgementGroup = ({
    judgementId,
    judgementDate,
    penalties,
    caseId,
    onAddPayment,
    onUpdatePayment,
    onDeletePayment,
    prisoner,
    setTrigger,

}) => {
    const [openUpdateJudgementModal, setOpenUpdateJudgementModal] = useState(false);
    const [openAddPenaltyModal, setOpenAddPenaltyModal] = useState(false);

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center w-6/12">
                <Typography variant="h6" className="font-semibold">
                    Bản án: {judgementId} - {judgementDate}
                </Typography>
                <Button variant="contained" color="success" onClick={() => setOpenUpdateJudgementModal(true)}>
                    <EditIcon />
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setOpenAddPenaltyModal(true)}>
                    Thêm án phạt
                </Button>

            </div>
            {Object.entries(penalties).map(([penaltyTypeId, penalty]) => (
                <PenaltySection
                    key={penaltyTypeId}
                    penalty={penalty}
                    caseId={caseId}
                    onAddPayment={onAddPayment}
                    onUpdatePayment={onUpdatePayment}
                    onDeletePayment={onDeletePayment}
                    setTrigger={setTrigger}
                    prisoner={prisoner}
                />
            ))}
            <UpdateJudgementModal
                open={openUpdateJudgementModal}
                handleClose={() => setOpenUpdateJudgementModal(false)}
                prisoner={prisoner}
                caseId={caseId}
                judgementId={judgementId}
                onAdd={() => setTrigger((prev) => !prev)}
            />
            <AddPenaltyModal
                open={openAddPenaltyModal}
                handleClose={() => setOpenAddPenaltyModal(false)}
                prisoner={prisoner}
                caseId={caseId}
                onAdd={() => setTrigger((prev) => !prev)}
            />
        </div>
    );
}
export default JudgementGroup;