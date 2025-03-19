import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPenaltyTypes, createPenaltyType, updatePenaltyType } from "../../services";

// Async actions
export const fetchPenaltyTypes = createAsyncThunk(
    "penaltyTypes/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return await getPenaltyTypes();
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addPenaltyType = createAsyncThunk(
    "penaltyTypes/add",
    async (penaltyName, { rejectWithValue }) => {
        try {
            return await createPenaltyType(penaltyName);
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const editPenaltyType = createAsyncThunk(
    "penaltyTypes/edit",
    async ({ penaltyId, penaltyName }, { rejectWithValue }) => {
        try {
            return await updatePenaltyType(penaltyId, penaltyName);
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Slice
const penaltyTypesSlice = createSlice({
    name: "penaltyTypes",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {}, // Không cần reducers vì xử lý qua extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchPenaltyTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPenaltyTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchPenaltyTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(addPenaltyType.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })

            .addCase(editPenaltyType.fulfilled, (state, action) => {
                const index = state.list.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export default penaltyTypesSlice.reducer;
