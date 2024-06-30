"use client"
import { Form } from "@/components/customer/reservation-form"
import { useState } from "react"
export default function DashboardCustomer() {
    const [loading,isLoading] = useState(false)
    return (
        <Form loading={loading} isLoading={isLoading}/>
    )
}