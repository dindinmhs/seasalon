"use client"
import { Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export function Form({loading,isLoading}) {
    const animals = ['Haircuts and styling','manicure and pedicure','facial treatments']
    const [today, setToday] = useState("");
    const [book,setBook] = useState()
    const session = useSession()
    useEffect(()=>{
        console.log(session)
    },[session])

    useEffect(() => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0"); // Januari adalah 0!
        const dd = String(now.getDate()).padStart(2, "0");

        const formattedToday = `${yyyy}-${mm}-${dd}`;
        setToday(formattedToday);
    }, [])

    function handleChange(event) {
        const name = event?.target.name
        const value = event?.target.value
        setBook(values => ({...values, [name] : value, duration : "1 hour"}))
    }
    async function handleSubmit(e) {
        try {
            isLoading(true)
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
            // const data = await res.json();
            isLoading(false)
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }
    return (     
        <form onSubmit={handleSubmit}>
            <h2>Reservation Form</h2>
            <input required onChange={handleChange} name="name" type="text" placeholder="Name" className="block my-2"/>
            <input required onChange={handleChange} name="telp" type="tel" maxLength="12" placeholder="Phone Number" className="my-2"/>
            <Select 
            placeholder="Select Type of Service"
            isRequired
            label="Type of Service"
            className="w-fit my-2 block"
            aria-label="Type of Service"
            name="type" 
            onChange={handleChange}
            >
            {animals.map((animal) => (
                <SelectItem key={animal} value={animal}>
                {animal}
                </SelectItem>
            ))}
            </Select>
            <label htmlFor="date" className="mt-2 block">Reservation Date</label>
            <input required onChange={handleChange} name="date" id="date" type="date" min={today} aria-label="Reservation Date" className="block"/>
            <label htmlFor="time" className="mt-2 block">Reservation Time</label>
            <input required onChange={handleChange} name="time" id="time" type="time" placeholder="Time" min="09:00" max="21:00" aria-label="Reservation Time" className="block"/>
            <label htmlFor="time" className="mt-2 block">Duration</label>
            <input required name="duration" disabled id="time" type="text" placeholder="Duration" aria-label="Reservation Time" className="block" defaultValue="1 hour"/>
            <button type="submit">Submit</button>
        </form>
    )
}