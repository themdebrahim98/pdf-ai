import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceType {
  value: {
    user: User; // Adjust 'any' to match your user object type
    isLoading: boolean;
    isError: boolean;
  };
}
export interface User {
  userName: string | null;
  email: string | null;
  uid: string | null;
}
const initialState: UserSliceType = {
  value: {
    isLoading: false,
    isError: false,
    user: {
      userName: null,
      email: null,
      uid: null,
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value.isLoading = true;
      state.value.isError = false;
    },
    signUp: (state) => {
      state.value.isLoading = true;
      state.value.isError = false;
    },
    logOut: (state) => {
      state.value.user = { userName: null, email: null, uid: null };
      state.value.isLoading = false;
      state.value.isError = false;
    },
    loginSuccessWithGoogle: (state, action: PayloadAction<any>) => {
      const { email, uid, displayName } = action.payload;
      state.value.user = {
        email,
        uid,
        userName: displayName,
      };
      // state.value.user.userName = action.payload.displayName;
      // state.value.user.uid = action.payload.uid;
      // state.value.user.email = action.payload.email;
      state.value.isLoading = false;
      state.value.isError = false;
    },
    loginSuccessWithFb: (state, action: PayloadAction<any>) => {
      const { email, uid, displayName } = action.payload;
      state.value.user = {
        email,
        uid,
        userName: displayName,
      };
      // state.value.user.userName = action.payload.displayName;
      // state.value.user.uid = action.payload.uid;
      // state.value.user.email = action.payload.email;
      state.value.isLoading = false;
      state.value.isError = false;
    },
    loginFailure: (state) => {
      state.value.isLoading = false;
      state.value.isError = true;
    },
    signUpSuccess: (state, action: PayloadAction<any>) => {
      // state.value.user = action.payload.uid; // Update user data on successful signup
      state.value.isLoading = false;
      state.value.isError = false;
    },
    signUpFailure: (state) => {
      state.value.isLoading = false;
      state.value.isError = true; // Set error state to true on signup failure
    },
  },
});

export const {
  login,
  signUp,
  logOut,
  loginSuccessWithGoogle,
  loginFailure,
  signUpSuccess,
  signUpFailure,
  loginSuccessWithFb,
} = userSlice.actions;
export default userSlice.reducer;
