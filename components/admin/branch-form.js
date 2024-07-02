"use client"
import { useState } from "react";
import { Submit } from "../sign/button";
export function Form({setOpen}) {
    const [branch,setBranch] = useState()
    const [info, setInfo] = useState('')
    const [isPending, setPending] = useState(false)

    function handleChange(event) {
        const name = event?.target.name
        const value = event?.target.value
        setBranch(values => ({...values, [name] : value}))
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setPending(true)
        try {
            // cek exist
            const res =  await fetch('/api/branch-exist', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(branch)
            })
             const exist = await res.json()
             if (exist.exist) {
                setInfo('Branch name already exists.')
                return
             } else {
                 const res = await fetch('/api/insert-branch', {
                     method : 'POST',
                     headers : {
                         'Content-Type' : 'application/json'
                     },
                     body : JSON.stringify(branch)
                 })
                 if (!res.ok) {
                     throw new Error(`HTTP error! status: ${res.status}`);
                 }
                 setInfo("Branch has been added!")
                 e.target.reset()
             }
            } catch (error) {
                console.error('Form submission error:', error)
            } finally {
                setPending(false)
            }
    }
    return (     
        <form onSubmit={handleSubmit} className="md:w-[20rem] w-full font-bold mx-auto md:m-0 bg-slate-200 overflow-auto">
            <h2 className="text-2xl mb-6">Add New Branch</h2>
            <input required onChange={handleChange} name="branch" type="text" placeholder="Branch Name (Unique)" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full"/>
            <input required onChange={handleChange} name="location" type="text" placeholder="Branch Location" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full"/>
            <label htmlFor="open" className="mt-2 block">Opening Time</label>
            <input required onChange={handleChange} name="open" id="open" max={branch?.close} type="time" aria-label="Opening Time" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block  mt-1 font-bold w-full"/>
            <label htmlFor="close" className="mt-2 block">Closing Time</label>
            <input required onChange={handleChange} min={branch?.open} name="close" id="close" type="time" aria-label="Closing Time" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block  mt-1 font-bold w-full"/>
            <p className="text-sm mb-4 mt-2 font-bold">{info}</p>
            <Submit name="Add Branch" isPending={isPending}/>
            <div className={`${isPending?'block':'hidden'} loader animate-spin bg-slate-900 w-12 m-auto`}></div>
            <button type="button" onClick={()=>setOpen(false)} className={`${isPending?'hidden':'block'} hover:bg-red-600 bg-red-700 px-4 py-2 rounded-full font-bold text-slate-200 text-xl w-full mt-3`}>Cancel</button>
        </form>
    )
}