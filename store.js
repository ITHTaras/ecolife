import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categories/categorySlice";
import userSlice from "./features/users/userSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    user: userSlice,
  },
});

export default store;
