"use client"
import { useSession } from "next-auth/react"
import { Loading } from "@/components/loading/loading"
import { DashboardHistories } from "@/components/customer/histories"
export default function History() {
    const {data, status} = useSession()
    if (status === 'loading') {
        return (
            <Loading/>
        )
    } else if (status === 'authenticated') {
        return (
            <DashboardHistories data={data}/>
        )
    }
}