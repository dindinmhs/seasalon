"use client"
import { Form } from "@/components/admin/branch-form"
import { ShowBranch } from "@/components/admin/showbranch"
import { useState, useEffect } from "react"

export default function Branch() {
    const [branchs,setBranch] = useState()
    const [isPending, setPending] = useState(false)
    const [isOpen,setOpen] = useState(false)
    async function fetchBranchs() {
        setPending(true)
        try{
            const res = await fetch('/api/get-branch')
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            setBranch(data)
        } catch (error) {
            console.error(error)
        } finally {
            setPending(false)
        }
    }
    useEffect(()=>{
        fetchBranchs()
    },[])
    return (
        <>
            <ShowBranch setOpen={setOpen} isPending={isPending} branchs={branchs}/>
            <div className={`${isOpen?'block':'hidden'} fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
                <div className="w-full md:w-[50rem] h-[100vh] lc:h-fit overflow-auto py-8 px-4 bg-slate-200 flex justify-center">
                    <Form fetchBranchs={fetchBranchs} setOpen={setOpen}/>
                </div>
            </div>
        </>
    )
}