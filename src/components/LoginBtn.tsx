import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LoginBtn() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (session) {
    return (
      // <>
      //   <small>
      //     {session?.user?.email} <br />
      //     {/* Sign Out Button styled as an anchor link */}
      //     <button
      //       className="text-blue-500 hover:text-blue-700 focus:outline-none"
      //       onClick={() => signOut()}
      //     >
      //       Sign out
      //     </button>
      //   </small>
      // </>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Hello, {session.user?.name} ⏷
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-2 text-gray-800">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => signOut()}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <small>
        <Link href="/auth/signin">
          Sign in
        </Link>
        <br />
        <Link href="/auth/register">
          Register
        </Link>
      </small>
    </>
  );
}
