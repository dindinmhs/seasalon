"use client"
import { Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Submit } from "../sign/button";
export function Form({data, branchs}) {
    const [today, setToday] = useState("");
    const [book,setBook] = useState()
    const [info, setInfo] = useState('')
    const [services,setServices] = useState()
    const [isPending, setPending] = useState(false)
    useEffect(() => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");

        const formattedToday = `${yyyy}-${mm}-${dd}`;
        setToday(formattedToday);
    }, [])

    function handleChange(event) {
        const name = event?.target.name
        const value = event?.target.value
        setBook(values => ({...values, [name] : value, email_id : data.user.email}))
    }
    useEffect(()=>{
        let list = !services?"":services.filter(list=>list.service.includes(book?.type))
        setBook(values => ({...values, duration : list[0]?.duration}))
    }, [book?.type])
    async function handleSubmit(e) {
        e.preventDefault()
        setPending(true)
        try {
            const res = await fetch('/api/insert-reservation', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(book)
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            setInfo("Booking Confirmed!")
        } catch (error) {
            console.error('Form submission error:', error)
        } finally {
            setPending(false)
            e.target.reset()
            setBook({})
        }
    }
    async function fetchServices(event) {
        try {
            const res = await fetch('/api/get-services', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({branch:event.target.value})
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            setServices(data)
            setBook(values => ({...values, branch:event.target.value}))
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }
    useEffect(()=>{
        console.log(book)
    },[book])
    return (     
        <form onSubmit={handleSubmit} className="md:w-[20rem] w-full font-bold mb-[6rem] md:mb-0 mx-auto md:m-0">
            <h2 className="text-2xl mb-6">Reservation Form</h2>
            <input required onChange={handleChange} name="name" type="text" placeholder="Name" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full"/>
            <input required onChange={handleChange} name="telp" type="tel" maxLength="12" placeholder="Phone Number" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block font-bold w-full"/>
            <div className="mb-10 mt-1">
                <small className="ml-4 block">example : 085771722157</small>
            </div>
            <Select 
            placeholder="Select Branch"
            isRequired
            label="Branch"
            className="w-full block mb-10"
            aria-label="Branch"
            radius="full"
            labelPlacement="outside"
            name="type" 
            onChange={fetchServices}
            >
            {branchs?.map((list) => (
                <SelectItem key={list.branch} value={list.branch}>
                {list.branch}
                </SelectItem>
            ))}
            </Select>
            <Select 
            placeholder={!services?"Select Branch First":"Type of Service"}
            isRequired
            label="Type of Service"
            className="w-full block"
            aria-label="Type of Service"
            radius="full"
            labelPlacement="outside"
            name="type" 
            onChange={handleChange}
            >
            {!services?"":services.map((list) => (
                <SelectItem key={list.service} value={list.service}>
                {list.service}
                </SelectItem>
            ))}
            </Select>
            <label htmlFor="date" className="mt-2 block">Reservation Date</label>
            <input required onChange={handleChange} name="date" id="date" type="date" min={today} aria-label="Reservation Date" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block  mt-1 font-bold w-full"/>
            <label htmlFor="time" className="mt-2 block">Reservation Time</label>
            <input required onChange={handleChange} name="time" id="time" type="time" min="09:00" max="20:00" aria-label="Reservation Time" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block  mt-1 font-bold w-full"/>
            <div className="mt-1">
                <small className="ml-4 block">from 09:00 - 20:00</small>
            </div>
            <label htmlFor="time" className="mt-2 block">Duration</label>
            <div className="px-4 border-solid border-black rounded-full py-1 border-2 text-lg font-bold w-full bg-gray-100 flex justify-between">
                <p>{book?.duration?`${book.duration} hour`:"-"}</p>
            </div>
            <p className="text-sm mb-4 font-bold">{info}</p>
            <Submit name="Book Now" isPending={isPending}/>
            <div className={`${isPending?'block':'hidden'} loader animate-spin bg-slate-900 w-12 m-auto`}></div>
        </form>
    )
}