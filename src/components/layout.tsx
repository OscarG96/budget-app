import dynamic from "next/dynamic";
import Footer from './footer'
import Navbar from "./navbar";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false } // Prevents SSR issues
);
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}