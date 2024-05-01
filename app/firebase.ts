import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyChP5EaHBVh5EKSpgG6MirbMCKPuYjxtCM",
  authDomain: "pdfai-6ea4c.firebaseapp.com",
  projectId: "pdfai-6ea4c",
  storageBucket: "pdfai-6ea4c.appspot.com",
  messagingSenderId: "494568828432",
  appId: "1:494568828432:web:78edb13a1c50de2dde6495",
  measurementId: "G-7F120N40FF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
export { app, storage };
