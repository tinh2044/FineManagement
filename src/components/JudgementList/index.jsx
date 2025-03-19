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
import CreateJudgementDialog from "./CreateJudgementDialog";
import EditJudgementDialog from "./EditJudgementDialog";
import { getJudgements, createJudgement, updateJudgement } from "../../services";

function JudgementList() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedJudgement, setSelectedJudgement] = useState(null);
    const [judgements, setJudgements] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refreshData, setRefreshData] = useState(false);

    const loadData = async (currentPage) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            console.log("Đang tải trang:", currentPage);
            const result = await getJudgements(currentPage, 100);
            if (result.length === 0) {
                setHasMore(false);
            } else {
                setJudgements((prev) => [...prev, ...result]);
                setPage(currentPage + 1);
            }
        } catch (err) {
            console.error("Không thể tải dữ liệu", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setJudgements([]);
        loadData();
    }, [refreshData]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 1 &&
                !loading &&
                hasMore
            ) {
                loadData(page);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, page]);

    const handleCreate = async (judgement) => {
        try {
            const response = await createJudgement(judgement);
            console.log("Bản án được tạo:", response);
            setRefreshData(!refreshData); // Trigger refresh
        } catch (error) {
            console.error("Lỗi khi tạo bản án:", error);
        }
        setOpenCreate(false);
    };

    const handleEdit = async (judgementId, updatedJudgement) => {
        try {
            const response = await updateJudgement(judgementId, updatedJudgement);
            console.log("Bản án được cập nhật:", response);
            setRefreshData(!refreshData);
        } catch (error) {
            console.error("Lỗi khi cập nhật bản án:", error);
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
                Thêm bản án
            </Button>
            <TableContainer component={Paper} className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã bản án</TableCell>
                            <TableCell>Ngày bản án</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {judgements.map((judgement) => (
                            <TableRow key={judgement.judgementId}>
                                <TableCell>{judgement.judgementId}</TableCell>
                                <TableCell>{judgement.judgementDate}</TableCell>
                                <TableCell>
                                    <Button
                                        className="mr-2 hover:bg-blue-500 hover:text-white"
                                        onClick={() => {
                                            setSelectedJudgement(judgement);
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
            <CreateJudgementDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreate}
            />
            {selectedJudgement && (
                <EditJudgementDialog
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    judgement={selectedJudgement}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
}

export default JudgementList;