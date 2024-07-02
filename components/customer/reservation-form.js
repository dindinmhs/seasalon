"use client"
import { Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Submit } from "../sign/button";
import { HiOfficeBuilding } from "react-icons/hi"
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md"
import { IoMdTime } from "react-icons/io"
export function Form({data, branchs}) {
    const [today, setToday] = useState("");
    const [book,setBook] = useState()
    const [info, setInfo] = useState('')
    const [services,setServices] = useState()
    const [isPending, setPending] = useState(false)
    const [loadService,setLoadService] = useState(false)
    const [selectBranch, setSelectBranch] = useState()
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
        const list = !services?"":services.filter(list=>list.service.includes(book?.type))
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
        const filter = branchs.filter(list=>list.branch.includes(event.target.value))
        setBook(values => ({...values, location : filter[0]?.location}))
        setSelectBranch(filter[0])
        try {
            setLoadService(true)
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
            setBook(values => ({...values, branch:event.target.value, duration : null}))
        } catch (error) {
            console.error('Form submission error:', error)
        } finally {
            setLoadService(false)
        }
    }
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
            className={`${loadService?'mb-4':'mb-10'} w-full block border-2 border-slate-900 rounded-full`}
            aria-label="Branch"
            radius="full"
            labelPlacement="outside"
            name="type"
            startContent={<HiOfficeBuilding/>} 
            onChange={fetchServices}
            >
            {branchs?.map((list) => (
                <SelectItem key={list.branch} textValue={list.branch}>
                    <div className="flex flex-col gap-1">
                        <span className="text-small">{list.branch}</span>
                        <div className="flex gap-1">
                            <FaLocationDot/>
                            <span className="text-tiny text-default-400">{list.location}</span>
                        </div>
                    </div>
                </SelectItem>
            ))}
            </Select>
            {loadService?(
                <div className={`block loader animate-spin bg-slate-900 w-10 m-auto`}></div>
            ):(
                <Select 
                placeholder={!services?"Please select a branch first.":services?.length === 0?"There are currently no services":"Type of Service"}
                isRequired
                label="Type of Service"
                className="w-full block border-2 border-slate-900 rounded-full"
                aria-label="Type of Service"
                radius="full"
                labelPlacement="outside"
                name="type"
                startContent={<MdOutlineWorkHistory/>} 
                onChange={handleChange}
                >
                {!services?null:services.map((list) => (
                    <SelectItem key={list.service} textValue={list.service}>
                        <div className="flex flex-col gap-1">
                            <span className="text-small">{list.service}</span>
                            <div className="flex gap-1">
                                <IoMdTime/>
                                <span className="text-tiny text-default-400">{`${list.duration} hour`}</span>
                            </div>
                        </div>
                    </SelectItem>
                ))}
                </Select>
            )}
            <label htmlFor="time" className="mt-2 block">Duration</label>
            <div className="px-4 border-solid border-black rounded-full py-1 border-2 text-lg font-bold w-full bg-gray-100 flex justify-between">
                <p>{book?.duration?`${book.duration} hour`:"-"}</p>
            </div>
            <label htmlFor="date" className="mt-2 block">Reservation Date</label>
            <input required onChange={handleChange} name="date" id="date" type="date" min={today} aria-label="Reservation Date" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block  mt-1 font-bold w-full"/>
            <label htmlFor="time" className="mt-2 block">Reservation Time</label>
            <input required onChange={handleChange} name="time" id="time" type="time" min={selectBranch?.open} max={selectBranch?.close} aria-label="Reservation Time" className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block  mt-1 font-bold w-full"/>
            <div className="mt-1">
                <small className="ml-4 block">{selectBranch?`open from ${selectBranch.open} - ${selectBranch.close}`:'-'}</small>
            </div>
            <p className="text-sm mb-4 font-bold mt-2">{info}</p>
            <Submit name="Book Now" disable={loadService} isPending={isPending}/>
            <div className={`${isPending?'block':'hidden'} loader animate-spin bg-slate-900 w-12 m-auto`}></div>
        </form>
    )
}