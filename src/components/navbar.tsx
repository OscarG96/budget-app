import LoginBtn from '@/components/login-btn';
import Link from 'next/link';


const Navbar = () => {

  // const linkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  return (
    <nav className="bg-gray-700 border-b border-gray-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* Logo */}
            <Link className="flex flex-shrink-0 items-center mr-4" href="/">
              <img
                src="/next.svg"
                alt="Budget App"
                className="dark:invert"
                width={100}
                height={24}
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Budget App
              </span>
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  Home
                </Link>
                <Link
                  href="/expenses"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  Expenses
                </Link>
                <Link
                  href="/expenses/add-expense"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  Add Expense
                </Link>
                <LoginBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar