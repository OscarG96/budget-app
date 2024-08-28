import Image from "next/image";
import NavLinks from "./nav-links";
import { PowerIcon } from '@heroicons/react/24/outline';


export default function Navbar() {
    return (
        // <div className="flex flex-row px-3 py-4 md:px-2 bg-slate-600">
        //     <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        //         <NavLinks />
        //         <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        //         <form
        //             // action={async () => {
        //             //     'use server';
        //             //     await signOut();
        //             // }}
        //         >
        //             <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        //                 <PowerIcon className="w-6" />
        //                 <div className="hidden md:block">Sign Out</div>
        //             </button>
        //         </form>
        //     </div>
        // </div>
        <nav className="flex flex-row content-center bg-slate-600">
            <Image 
                src="./mark.svg"
                alt="logo"
                width={50}
                height={50}
            >
            </Image>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start space-x-2 space-y-2">
                <NavLinks />
            </div>
            
        </nav>
    )
}