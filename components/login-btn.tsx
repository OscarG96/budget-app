import { useSession, signIn, signOut } from "next-auth/react"
import { Session } from "next-auth";


export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <small>
          {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </small>
      </>
    )
  }
  return (
    <>
      <small>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </small>
    </>
  )
}