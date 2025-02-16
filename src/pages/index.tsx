import Image from "next/image";
import { Inter } from "next/font/google";
import Expenses from "../../components/Expenses";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      {/* metrics */}
      <Expenses />
      </>
    );
  } else {
    return (
      <section className="bg-blue-50 px-4 py-10">
        <div className="container m-auto max-w-2xl py-24">
          <h1 className="text-3xl text-center font-semibold mb-6">Welcome to budget app, please login or register to start</h1>
          {/* <Link
            href="/register"
            className="bg-gray-600 text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
            Register
          </Link> */}
        </div>
      </section>
    )
    
  }
      
}
