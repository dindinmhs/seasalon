"use session"
import Link from "next/link"
import { HiOfficeBuilding } from "react-icons/hi"
import { MdOutlineWorkHistory } from "react-icons/md"
import { FaRightFromBracket } from "react-icons/fa6"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import Image from "next/image"

export function Nav({session}) {
    const pathname = usePathname()
    const [path, setPath] = useState()

    useEffect(()=>{
        setPath(pathname)
    }, [pathname])
    return (
        <nav className="bottom-0 w-screen md:w-fit z-50 bg-slate-900 group/nav md:h-screen fixed md:static justify-around md:justify-start items-center py-2 md:py-4 md:px-8 flex md:flex-col overflow-x-hidden text-4xl font-bold">
            <Link className="hidden md:inline text-red-200 text-xl mb-6 my-4" href="/">
                SEA Salon
            </Link>
            <Link href="/dashboard/admin/branch" className={`${path === '/dashboard/admin/branch'? 'bg-red-200 text-slate-900' : 'bg-inherit text-red-200'} group hover:bg-red-200 hover:text-slate-900 py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <HiOfficeBuilding className="w-8 h-8 inline-block"/>
                    <div className="text-lg hidden md:block w-[10rem] ml-4">Branch</div>
                </div>
            </Link>
            <Link href="/dashboard/admin/services" className={`${path === '/dashboard/admin/services'? 'bg-red-200 text-slate-900' : 'bg-inherit text-red-200'} group hover:bg-red-200 hover:text-slate-900 py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <MdOutlineWorkHistory className="w-8 h-8 inline-block"/>
                    <div className="text-lg hidden md:block w-[10rem] ml-4">Services</div>
                </div>
            </Link>
            <button onClick={()=>signOut({callbackUrl:"/sign-in"})} className={`group hover:bg-red-200 hover:text-slate-900 text-red-200 py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <FaRightFromBracket className="w-8 h-8 inline-block group-hover:text-slate-900"/>
                    <div className="text-lg text-left ml-4 group-hover:text-slate-900 hidden md:block w-[10rem] group-hover/nav:opacity-100">SignOut</div>
                </div>
            </button>
            <Link href="/dashboard/admin/profile" className={`${path === '/dashboard/admin/profile'? 'bg-red-200 text-slate-900' : 'bg-inherit text-red-200'} group hover:bg-red-200 py-2 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <Image
                        src={'/dashboard/profile-default.svg'}
                        width={50}
                        height={50}
                        alt="profile"
                        priority={true}
                        className={`${path === '/dashboard/admin/profile'?'border-slate-900':'border-red-200'} rounded-full border-4 border-solid group-hover:border-slate-900`}
                    />
                    <div className="text-lg group-hover:text-slate-900 hidden md:block w-[11rem] ml-4 truncate">{session?.data?.user?.name}</div>
                </div>
            </Link>
        </nav>
    )
}