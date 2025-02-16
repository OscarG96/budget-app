import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";


export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <small>
          {session?.user?.email} <br />
          <button className="text-white" onClick={() => signOut()}>Sign out</button>
        </small>
      </>
    )
  }
  return (
    <>
      <small>
        <button className="text-white" onClick={() => signIn()}>Sign in</button> <br />
        <Link className="text-white" href="/login/register">Register</Link>
      </small>
    </>
  )
}