"use client"
import { useEffect, useState } from "react"
import { FaStar } from 'react-icons/fa'

export function Form({fetchReviews}) {
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState()
    const [loading, isLoading] = useState(false)
    const [message,setMessage] = useState()
    const handleClick = (value) => {
        setRating(value)
      }
    function handleChange(event) {
        const name = event?.target.name
        const value = event?.target.value
        setReviews(values => ({...values, [name] : value, rating : rating}))
    }
    useEffect(()=>{
        setReviews(values => ({...values, rating : rating}))
    },[rating])

    // insert review
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            isLoading(true)
            const res = await fetch('/api/insert-review', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'aplication/json'
                },
                body : JSON.stringify(reviews)
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            e.target.reset()
            fetchReviews()
            setMessage('Thank you for your review!')
            isLoading(false)
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="bg-slate-900 w-full md:w-1/2 p-6 mx-auto my-6 text-red-400">
            <h2 className="text-xl font-bold mb-4">Share Your Experience</h2>
            <input disabled={loading} required onChange={handleChange} name="name" placeholder="Name" type="text" className="w-full bg-slate-200 text-slate-900 placeholder:text-slate-900 placeholder:font-bold px-4 py-2 outline-none font-bold"/>
            <h3 className="font-bold mt-2">Rating</h3>
            <div className="flex">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                <label key={index}>
                    <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    disabled={loading}
                    onClick={() => handleClick(ratingValue)}
                    className="hidden"
                    />
                    <FaStar
                    className="mx-1 my-1 cursor-pointer"
                    color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                    size={20}
                    />
                </label>
                );
      })}
            </div>
            <textarea disabled={loading} required onChange={handleChange} name="comment" rows="5" placeholder="Comment" className="w-full bg-slate-200 text-slate-900 placeholder:text-slate-900 placeholder:font-bold px-4 py-2 outline-none mt-2 resize-none font-bold"></textarea>
            <p className="font-bold">{message}</p>
            <div className="w-full flex justify-end">
                <button disabled={loading} type="submit" className={`${loading?'hidden':'inline'} px-2 py-1 bg-red-400 text-slate-900 font-black mt-4 hover:bg-red-500`}>Submit</button>
                <div className={`${loading?'block':'hidden'} loader animate-spin bg-red-400 w-12`}></div>
            </div>
        </form>
    )
}