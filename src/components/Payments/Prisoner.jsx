import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaymentHistory from "../PaymentHistory";

function Prisoner({ prisoner, setTrigger, trigger }) {
    return (
        <Accordion className="border border-gray-300 rounded-lg shadow-md">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-white">
                <div className="flex items-center gap-6">
                    <Typography variant="h6" className="font-extrabold">
                        {prisoner.prisonerName} (ID: {prisoner.prisonerId})
                    </Typography>
                    <Typography variant="body1">
                        Ngày sinh: {new Date(prisoner.dob).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">Nơi sinh: {prisoner.pob}</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <PaymentHistory prisoner={prisoner} isDialog={false} setTrigger={setTrigger} trigger={trigger} />
            </AccordionDetails>
        </Accordion>
    );
}

export default Prisoner;
