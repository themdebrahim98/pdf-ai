import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import pdfReducer from "./features/user/pdfSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pdf: pdfReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const selectUserValue = (state: RootState) => state.user.value;
export const selectPdfValue = (state: RootState) => state.pdf;

export default store;
