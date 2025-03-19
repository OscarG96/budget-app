import dynamic from "next/dynamic";
import Footer from './footer'

import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";


const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false } // Prevents SSR issues
);
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  )
}