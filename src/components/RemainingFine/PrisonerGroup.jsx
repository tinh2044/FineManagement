import React from "react";
import { Typography } from "@mui/material";
import TableDisplay from "./TableDisplay";

const PrisonerGroup = ({ prisoners }) => {
    console.log(prisoners)
    return (
        <div>
            {prisoners.map((prisoner) => (
                <div key={prisoner.prisonerId} className="mb-8 p-4 border border-gray-300 rounded-lg shadow-md">
                    <Typography variant="h6" className="mb-2 text-blue-600">
                        Phạm nhân: {prisoner.prisonerName} (ID: {prisoner.prisonerId})
                    </Typography>
                    <Typography variant="body2">
                        Ngày sinh: {new Date(prisoner.dateOfBirth).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" className="mb-4">
                        Nơi sinh: {prisoner.placeOfBirth}
                    </Typography>

                    {Object.entries(prisoner.judgements).map(([judgementId, penalties]) => (
                        <TableDisplay key={judgementId} judgementId={judgementId} penalties={penalties} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PrisonerGroup;
