import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

// Get categories
export const getCategories = createAsyncThunk(
  "categories/get",
  async (_, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState().user.user);
      return await categoryService.getCategories();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Add category
export const addCategory = createAsyncThunk(
  "categories/add",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;

      return await categoryService.addCategory(data, token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Add point
export const addPoint = createAsyncThunk(
  "points/add",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;

      return await categoryService.addPoint(data, token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Activate point
export const activatePoint = createAsyncThunk(
  "points/activate",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;

      return await categoryService.activatePoint(data, token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Complain
export const complain = createAsyncThunk(
  "points/complain",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;

      return await categoryService.complain(data, token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  categories: [],
  points: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload.categories;
        state.points = payload.points;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories.push(payload);
        state.points = payload.points;
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      .addCase(addPoint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPoint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.user) {
          state.points.push(payload);
          state.isSuccess = true;
        }
        if (payload.message) {
          state.isError = true;
          state.isSuccess = false;
          state.message = payload;
        }
      })
      .addCase(addPoint.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(complain.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.message) {
          state.isError = true;
          state.isSuccess = false;
          state.message = payload;
        } else {
          state.isSuccess = true;
        }
        console.log(payload.message);
      })
      .addCase(activatePoint.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (!payload.message) {
          state.isSuccess = true;
          return;
        }
      });
  },
});

export default categorySlice.reducer;
export const { resetErrors } = categorySlice.actions;
