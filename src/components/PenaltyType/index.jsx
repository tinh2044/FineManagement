import React, { useEffect, useState } from "react";
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
import CreatePenaltyDialog from "./CreatePenaltyDialog";
import EditPenaltyDialog from "./EditPenaltyDialog";
import { getPenaltyTypes, createPenaltyType, updatePenaltyType } from "../../services";

function PenaltyTypeList() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedPenalty, setSelectedPenalty] = useState(null);
    const [penaltyTypes, setPenaltyTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const result = await getPenaltyTypes();
                setPenaltyTypes(result);
            } catch (error) {
                console.error("Lỗi khi tải danh sách loại phạt:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [refreshData]);

    const handleCreate = async (penalty) => {
        try {
            await createPenaltyType(penalty);
            setRefreshData(!refreshData);
        } catch (error) {
            console.error("Lỗi khi tạo loại phạt:", error);
        }
        setOpenCreate(false);
    };

    const handleEdit = async (penaltyId, updatedPenalty) => {
        try {
            await updatePenaltyType(penaltyId, updatedPenalty);
            setRefreshData(!refreshData);
        } catch (error) {
            console.error("Lỗi khi cập nhật loại phạt:", error);
        }
        setOpenEdit(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                className="bg-blue-500 hover:bg-blue-600 mb-4"
                onClick={() => setOpenCreate(true)}
            >
                Thêm loại phạt
            </Button>
            <TableContainer component={Paper} className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên loại phạt</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {penaltyTypes.map((penalty) => (
                            <TableRow key={penalty.id}>
                                <TableCell>{penalty.id}</TableCell>
                                <TableCell>{penalty.penaltyName}</TableCell>
                                <TableCell>
                                    <Button
                                        className="mr-2 hover:bg-blue-500 hover:text-white"
                                        onClick={() => {
                                            setSelectedPenalty(penalty);
                                            setOpenEdit(true);
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && <div>Đang tải...</div>}

            <CreatePenaltyDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreate}
            />
            {selectedPenalty && (
                <EditPenaltyDialog
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    penalty={selectedPenalty}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
}

export default PenaltyTypeList;
