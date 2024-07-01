"use client"
import { Form } from "@/components/admin/services-form"
import { useSession } from "next-auth/react"
import { Loading } from "@/components/loading/loading"
import { useState, useEffect } from "react"
export default function Services() {
    const {data, status} = useSession()
    const [branchs,setBranchs] = useState()
    const [isPending, setPending] = useState(false)
    async function fetchBranchs() {
        setPending(true)
        try{
            const res = await fetch('/api/get-branch')
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            setBranchs(data)
        } catch (error) {
            console.error(error)
        } finally {
            setPending(false)
        }
    }
    useEffect(()=>{
        fetchBranchs()
    },[])
    if (status === 'loading' || isPending) {
        return (
            <Loading/>
        )
    } else if (status === 'authenticated' || !isPending) {
        return (
            <Form data={data} branchs={branchs}/>
        )
    }
}