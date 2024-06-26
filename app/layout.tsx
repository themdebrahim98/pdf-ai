import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "./globalRedux/Provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectUserValue } from "./globalRedux/store";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const reduxStateValue = useSelector(selectUserValue);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <StoreProvider>
            <Navbar />
            <div>
              <ToastContainer />
            </div>
            {children}
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
