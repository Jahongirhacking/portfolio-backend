import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, localStorageNames } from "../../utils/storageUtils";

const initialState = {
  isAuthenticated: !!getLocalStorage(localStorageNames.token),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = adminSlice.actions;
export default adminSlice.reducer;
