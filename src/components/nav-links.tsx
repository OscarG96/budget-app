import { usePathname } from "next/navigation";
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
    },
    { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];
export default function NavLinks() {
    const pathname = usePathname();
   
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white',
                {
                  'bg-slate-400 text-blue-600': pathname === link.href,
                },
              )}
            >
              
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }