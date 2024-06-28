"use client"

import Link from "next/link";
import { useState } from "react";

export function Nav() {
    const [open, isOpen] = useState(false)
    return (
    <header className="fixed left-0 top-0 right-0 bg-slate-900 text-white flex justify-between py-4 md:text-lg items-center px-10 z-40">
        <Link href="/">
            <h1 className="font-black md:text-2xl">SEA Salon</h1>
        </Link>
        <nav className={`${open?'translate-y-0':'-translate-y-full'} border-red-400 fixed md:static md:translate-y-0 bg-slate-900 top-14 right-0 left-0 bottom-0 md:w-fit md:h-fit md:block -z-10 pt-4 md:pt-0 duration-500`}>
            <Link className="mx-10 my-2 md:my-0 md:mx-2 block md:inline" href="/#home">Home</Link>
            <Link className="mx-10 my-2 md:my-0 md:mx-2 block md:inline" href="/#services">Services</Link>
            <Link className="mx-10 my-2 md:my-0 md:mx-2 block md:inline" href="/#reviews">Reviews</Link>
            <Link href="/reserve" className="block my-2 md:my-0 md:inline w-fit bg-red-400 hover:bg-red-500 ml-10 px-4 py-1 font-bold rounded-full text-black self-end">Book Now</Link>
        </nav>
        <button onClick={()=>isOpen(!open)} className="block md:hidden">
            <div className={`${open?'rotate-45 translate-y-2':'rotate-0 translate-y-0'} w-6 h-1 bg-white rounded full my-1 origin-center duration-500`}></div>
            <div className={`${open?'opacity-0':'opacity-1'} w-6 h-1 bg-white rounded full my-1 duration-500`}></div>
            <div className={`${open?'-rotate-45 -translate-y-2':'rotate-0 translate-y-0'} w-6 h-1 bg-white rounded full my-1 origin-center duration-500`}></div>
        </button>
    </header>
    )
}