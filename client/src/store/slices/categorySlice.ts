import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_MAIN_URL } from "../../utils/config";
import { ICategory } from "../../types";

// Create an async thunk for fetching data
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories", // A unique action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_MAIN_URL}/categories`);
      return response.data; // Return the fetched data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Use rejectWithValue to send a custom error payload
      return rejectWithValue("Something went wrong");
    }
  }
);

interface IState {
  categories: ICategory[];
  isLoading: boolean;
  error: unknown;
}
// Define the initial state
const initialState: IState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Create a slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {}, // No reducers here; only extraReducers for handling async logic
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error payload
      });
  },
});

export default categoriesSlice.reducer;
