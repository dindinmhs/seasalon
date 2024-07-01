'use client'
import { Nav } from "@/components/customer/nav";
import { useSession } from "next-auth/react";

export default function CustomerLayout({children}) {
    const session = useSession()
    return (
      <div className="flex">
        <Nav session={session}/>
        <section className="p-10 w-full">
          {children}
        </section>
      </div>
    )
  }