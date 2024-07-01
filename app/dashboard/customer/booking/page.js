"use client"
import { Form } from "@/components/customer/reservation-form"
import { useSession } from "next-auth/react"
import { Loading } from "@/components/loading/loading"
import { useState, useEffect } from "react"
export default function Booking() {
    const {data, status} = useSession()
    const [services,setServices] = useState()
    const [isPending, setPending] = useState(false)
    async function fetchServices() {
        setPending(true)
        try{
            const res = await fetch('/api/get-services')
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            setServices(data)
        } catch (error) {
            console.error(error)
        } finally {
            setPending(false)
        }
    }
    useEffect(()=>{
        fetchServices()
    },[])
    if (status === 'loading' || isPending) {
        return (
            <Loading/>
        )
    } else if (status === 'authenticated' || !isPending) {
        return (
            <Form data={data} services={services}/>
        )
    }
}