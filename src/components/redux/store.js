import { configureStore } from "@reduxjs/toolkit";
import penaltyTypesReducer from "./penaltyTypesSlice";

const store = configureStore({
    reducer: {
        penaltyTypes: penaltyTypesReducer,
    },
});

export default store;
