"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  logOut,
  loginSuccessWithGoogle,
} from "../globalRedux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectUserValue } from "../globalRedux/store";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const auth = getAuth();
  const user = useSelector(selectUserValue);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        if (!user.user?.uid) {
          // Redirect to login if not logged in
          router.push("/");
        } else {
          dispatch(logOut());
        }
      } else {
        // Update user state if logged in
        console.log("call");
        dispatch(loginSuccessWithGoogle(currentUser));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!user.user?.uid) {
    // If authentication information is not available, don't render children
    return null;
  }

  return <>{children}</>;
}
