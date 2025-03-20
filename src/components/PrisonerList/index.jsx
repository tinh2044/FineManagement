import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    IconButton,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CreatePrisonerDialog from "./CreatePrisonerDialog";
import EditPrisonerDialog from "./EditPrisonerDialog";
import { createPrisoner, getPrisoners, updatePrisoner } from "../../services";
import PaymentHistory from "../PaymentHistory";

function PrisonerList() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedPrisoner, setSelectedPrisoner] = useState(null);
    const [prisoners, setPrisoners] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [trigger, setTrigger] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [openPaymentHistory, setOpenPaymentHistory] = useState(false);

    const handleCreate = async (prisoner) => {
        try {
            console.log(prisoner);
            const response = await createPrisoner(prisoner);
            console.log("Phạm nhân được tạo:", response);
            setTrigger((prev) => !prev);
        } catch (error) {
            console.error("Lỗi khi tạo Phạm nhân:", error);
        }
        setOpenCreate(false);
    };

    const handleEdit = async (prisonerId, updatedPrisoner) => {
        try {
            console.log(prisonerId, updatedPrisoner);
            const response = await updatePrisoner(prisonerId, updatedPrisoner);
            console.log("Phạm nhân được cập nhật:", response);
            setTrigger((prev) => !prev);
        } catch (error) {
            console.error("Lỗi khi cập nhật Phạm nhân:", error);
        }
        setOpenEdit(false);
    };

    const handleSearch = async () => {
        console.log(searchTerm);
        const result = await getPrisoners(1, 100, searchTerm);
        setPrisoners(result);
    };

    const loadData = async (currentPage) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            console.log("Đang tải trang:", currentPage);
            const result = await getPrisoners(currentPage, 100);
            if (result.length === 0) {
                setHasMore(false);
            } else {
                setPrisoners((prev) => [...prev, ...result]);
                setPage(currentPage + 1);
            }
        } catch (err) {
            console.error("Không thể tải dữ liệu", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // setPrisoners([]);
        // setPage(1);
        // setHasMore(true);
        loadData(1);
    }, [trigger]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (
    //             window.innerHeight + document.documentElement.scrollTop >=
    //             document.documentElement.offsetHeight - 1 &&
    //             !loading &&
    //             hasMore
    //         ) {
    //             loadData(1);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [loading, hasMore, page]);

    return (
        <div>
            <div className="flex justify-around items-center">
                <Button
                    variant="contained"
                    className="bg-blue-500 hover:bg-blue-600 mb-4 w-2/12 h-10 mx-10"
                    onClick={() => setOpenCreate(true)}
                >
                    Thêm Phạm nhân
                </Button>
                <div className="w-3/12 flex items-center justify-between">
                    <TextField
                        label="Tìm Phạm nhân theo tên"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        className="bg-blue-500 hover:bg-blue-600 mb-4 w-2/12 h-10 mx-10"
                        onClick={() => handleSearch()}
                    >
                        Tìm
                    </Button>
                </div>
            </div>
            <TableContainer component={Paper} className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên Phạm nhân</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Nơi sinh</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prisoners.map((prisoner) => (
                            <TableRow key={prisoner.prisonerId}>
                                <TableCell>{prisoner.prisonerId}</TableCell>
                                <TableCell>{prisoner.prisonerName}</TableCell>
                                <TableCell>{prisoner.dob}</TableCell>
                                <TableCell>{prisoner.pob}</TableCell>
                                <TableCell>
                                    <Button
                                        className="mr-2 bg-blue-500 hover:bg-blue-600 hover:text-white"
                                        onClick={() => {
                                            setSelectedPrisoner(prisoner);
                                            setOpenEdit(true);
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        className="mr-2 bg-blue-500 hover:bg-blue-600 hover:text-white"
                                        onClick={() => {
                                            setSelectedPrisoner(prisoner);
                                            setOpenPaymentHistory(true);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreatePrisonerDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreate}
            />
            {selectedPrisoner && (
                <EditPrisonerDialog
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    prisoner={selectedPrisoner}
                    onEdit={handleEdit}
                />
            )}
            {selectedPrisoner && (
                <PaymentHistory
                    open={openPaymentHistory}
                    onClose={() => setOpenPaymentHistory(false)}
                    prisoner={selectedPrisoner}
                    setTrigger={setTrigger}
                    trigger={trigger}
                />
            )}
        </div>
    );
}

export default PrisonerList;
