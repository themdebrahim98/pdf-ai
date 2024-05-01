import { app } from "@/app/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  FacebookAuthProvider,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { use, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/globalRedux/store";
import {
  login,
  loginFailure,
  loginSuccessWithFb,
  loginSuccessWithGoogle,
  signUp,
  signUpFailure,
  signUpSuccess,
} from "@/app/globalRedux/features/user/userSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppRouterState } from "next/dist/client/components/router-reducer/router-reducer-types";

export function useUser() {
  const auth = getAuth(app);
  const [user, setUser] = useState<any | null | boolean>(null);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);
  return user;
}

export const loginWithGoogle = async (
  router: AppRouterInstance,
  dispatch: AppDispatch
) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      dispatch(loginSuccessWithGoogle(user));
      toast.success("Login succsessfuly!");
      router.push("/dashboard");

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
      // ...
    });
};
export const loginWithFacebook = async (
  router: AppRouterInstance,
  dispatch: AppDispatch
) => {
  const provider = new FacebookAuthProvider();
  const auth = getAuth(app);
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      dispatch(loginSuccessWithFb(user));
      console.log(user);
      toast.success("Login succsessfuly!");
      router.push("/dashboard");
      console.log(user);

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);

      // ...
    });
};
export const signOutAcc = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
  } catch (error: any) {
    console.log(error);
    toast.error("Something went wrong!");
    console.log(error);
  }
};

export const signupWithEmilandPassword = async (
  email: any,
  password: any,
  username: string,
  dispatch: AppDispatch,
  router: AppRouterInstance
) => {
  try {
    const auth = getAuth(app);
    dispatch(signUp());
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credential.user;

    await updateProfile(user, {
      displayName: username,
    });
    await sendEmailVerification(auth.currentUser as User);
    dispatch(signUpSuccess(user));
    toast.success("Signup succsessfully and Email send!", {
      position: "top-center",
    });

    // router.push('/dash')
  } catch (err: any) {
    console.log(err);
    toast.error(err.message, { position: "top-center" });
    dispatch(signUpFailure());
  }
};
