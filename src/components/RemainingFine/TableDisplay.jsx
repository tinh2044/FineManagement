import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";

const TableDisplay = ({ judgementId, penalties }) => {
    console.log(penalties)
    return (
        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-100">
            <Typography variant="subtitle1" className="mb-2 text-gray-700 font-semibold">
                Bản án: {judgementId}
            </Typography>
            <TableContainer component={Paper} className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-300">
                            <TableCell>Loại phạt</TableCell>
                            <TableCell>Tổng tiền phạt</TableCell>
                            <TableCell>Đã đóng</TableCell>
                            <TableCell>Còn nợ</TableCell>
                            <TableCell>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {penalties.map((penalty, index) => (
                            <TableRow key={index}>
                                <TableCell>{penalty.penaltyName}</TableCell>
                                <TableCell>{parseInt(penalty.totalFine).toLocaleString()} VND</TableCell>
                                <TableCell>{parseInt(penalty.paidAmount).toLocaleString()} VND</TableCell>
                                <TableCell>{parseInt(penalty.remainingAmount).toLocaleString()} VND</TableCell>
                                <TableCell>
                                    <span
                                        className={`${penalty.isPaid ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}`}
                                    >
                                        {penalty.paymentStatus}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableDisplay;
