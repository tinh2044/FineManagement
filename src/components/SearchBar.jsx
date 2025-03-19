import React from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";

const SearchBar = ({ searchParams, onSearchChange, onSearch, penaltyTypeWidth = "w-3/12" }) => {
    const penaltyTypes = useSelector((state) => state.penaltyTypes.list);

    return (
        <div className="mb-6 flex flex-wrap gap-4 p-4 border rounded-lg bg-gray-100 shadow-md items-center">
            <TextField
                label="Tên Phạm nhân"
                name="prisonerName"
                value={searchParams.prisonerName}
                onChange={onSearchChange}
                size="small"
                className="w-3/12"
            />
            <TextField
                label="Ngày sinh"
                name="dob"
                type="date"
                value={searchParams.dob}
                onChange={onSearchChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                className="w-3/12"
            />
            <TextField
                label="Nơi sinh"
                name="pob"
                value={searchParams.pob}
                onChange={onSearchChange}
                size="small"
                className="w-3/12"
            />
            <TextField
                label="Bản án"
                name="judgement"
                value={searchParams.judgement}
                onChange={onSearchChange}
                size="small"
                className="w-3/12"
            />
            <FormControl size="small" className={penaltyTypeWidth}>
                <InputLabel>Loại hình phạt</InputLabel>
                <Select
                    name="penaltyType"
                    value={searchParams.penaltyType || ""}
                    onChange={onSearchChange}
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {penaltyTypes.map((type) => (
                        <MenuItem key={type.penaltyId} value={type.penaltyName}>
                            {type.penaltyName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={onSearch}>
                Tìm kiếm
            </Button>
        </div>
    );
};

export default SearchBar;