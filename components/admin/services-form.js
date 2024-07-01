"use client"
import { useState } from "react";
import { Submit } from "../sign/button";
import { Select, SelectItem } from "@nextui-org/react";
export function Form({branchs}) {
    console.log(branchs)
    const [service,setService] = useState()
    const [info, setInfo] = useState('')
    const [isPending, setPending] = useState(false)

    function handleChange(event) {
        const name = event?.target.name
        const value = event?.target.value
        setService(values => ({...values, [name] : value}))
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setPending(true)
        try {
            const res = await fetch('/api/insert-service', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(service)
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            setInfo("Service has been added!")
        } catch (error) {
            console.error('Form submission error:', error)
        } finally {
            setPending(false)
            e.target.reset()
        }
    }
    return (     
        <form onSubmit={handleSubmit} className="md:w-[20rem] w-full font-bold mb-[6rem] md:mb-0 mx-auto md:m-0">
            <h2 className="text-2xl mb-14">Add New Services</h2>
            <Select 
            placeholder="Select Branch"
            isRequired
            label="Branch"
            className="w-full block"
            aria-label="Type of Service"
            radius="full"
            labelPlacement="outside"
            name="branch" 
            onChange={handleChange}
            >
            {branchs?.map((list) => (
                <SelectItem key={list.branch} value={list.branch}>
                {list.branch}
                </SelectItem>
            ))}
            </Select>
            <input required onChange={handleChange} name="service" type="text" placeholder="Type Of Service" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full"/>
            <div className="px-4 border-solid border-black rounded-full py-1 border-2 text-lg font-bold w-full bg-white flex justify-between">
                <input id="duration" required onChange={handleChange} name="duration" type="number" min="1" max="24" placeholder="Duration" className="placeholder-slate-900 outline-none inline-block grow"/>
                <label htmlFor="duration">Hour</label>
            </div>
            <div className="mb-10 mt-1">
                <small className="ml-4 block">from 1-24 hour</small>
            </div>
            <p className="text-sm mb-4 font-bold">{info}</p>
            <Submit name="Add Service" isPending={isPending}/>
            <div className={`${isPending?'block':'hidden'} loader animate-spin bg-slate-900 w-12 m-auto`}></div>
        </form>
    )
}