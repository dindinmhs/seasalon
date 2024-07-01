"use client"
import { useSession } from "next-auth/react"
import { Loading } from "@/components/loading/loading"
import { Profile } from "@/components/customer/profile"
export default function History() {
    const {data, status} = useSession()
    if (status === 'loading') {
        return (
            <Loading/>
        )
    } else if (status === 'authenticated') {
        return (
            <Profile data={data}/>
        )
    }
}