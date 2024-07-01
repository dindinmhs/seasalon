"use client"
import { Form } from "@/components/customer/reservation-form"
import { useSession } from "next-auth/react"
import { Loading } from "@/components/loading/loading"
export default function Booking() {
    const {data, status} = useSession()
    
    if (status === 'loading') {
        return (
            <Loading/>
        )
    } else if (status === 'authenticated') {
        return (
            <h1>Profile</h1>
        )
    }
}