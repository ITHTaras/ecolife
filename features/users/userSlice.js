import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Register
export const register = createAsyncThunk("user/add", async (data, thunkAPI) => {
  try {
    return await userService.register(data);
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

// Login
export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    return await userService.login(data);
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

// Me
export const getMe = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    const userValue = await AsyncStorage.getItem("user");
    const langValue = await AsyncStorage.getItem("lang");
    return {
      lang: langValue ? langValue : null,
      user: JSON.parse(userValue),
    };
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

// Update User
export const updateUser = createAsyncThunk(
  "user/update",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;

      return await userService.update(data, token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Login Admin
export const adminLogin = createAsyncThunk(
  "user/adminlogin",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;

      return await userService.adminLogin(data, token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Set Lang
export const setLang = createAsyncThunk(
  "user/lang",
  async (_lang, thunkAPI) => {
    try {
      await AsyncStorage.setItem("lang", _lang);
      //console.log(_lang);
      return _lang;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Logout
export const logout = createAsyncThunk("user/logout", async () => {
  try {
    return await AsyncStorage.removeItem("user");
  } catch (error) {}
});

const initialState = {
  lang: "ua",
  user: null,
  adminAuth: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.isError = false;
      state.isSuccess = false;
    },
    resetImage: (state) => {
      state.user.image = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
        //console.log(state);
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.isSuccess = false;
        //console.log(state);
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (!payload.message) {
          state.isSuccess = true;
          state.user = payload;
          state.isError = false;
        } else {
          state.isError = true;
          state.message = payload.message;
        }
        // console.log(JSON.stringify(state) + "SUCCESS" + JSON.stringify(payload));
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.isSuccess = false;
        console.log(state);
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.lang) {
          state.lang = payload.lang;
        }
        state.user = payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(setLang.fulfilled, (state, { payload }) => {
        state.lang = payload;
      })
      .addCase(updateUser.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        //console.log(payload);
        state.isLoading = false;
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        state.adminAuth = payload.password;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
export const { resetErrors, resetImage } = userSlice.actions;
