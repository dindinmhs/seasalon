"use client"
import { Form } from "@/components/homepage/form-review";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export function Review() {
    const [reviews,setReviews] = useState()
    async function fetchReviews() {
        try{
            const res = await fetch('/api/get-review')
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            setReviews(data)
        } catch (error) {
            console.error(error)
        }
    }
    // useEffect(()=>{
    //     fetchReviews()
    // },[])
    return (
        <section id="reviews" className="py-6 px-4">
            <h2 className="font-black text-4xl text-center">Reviews</h2>
            <Form fetchReviews={fetchReviews}/>
            <div className="bg-slate-200">
                <h3 className="font-black text-xl text-center my-4">What Our Customers Say</h3>
                <div className="flex flex-wrap gap-10 justify-center">
                    {reviews?reviews.map(review=>(
                        <div key={review._id} className="w-[18rem] h-[20rem] bg-slate-900 text-white p-6 relative">
                            <div className="absolute -top-4 -right-4 text-xl bg-red-400 rounded-full p-4 text-yellow-400">
                                <FaStar className="inline"/>
                                <p className="inline font-black">{review.rating}</p>
                            </div>
                            <h2 className="font-bold text-xl border-white border-b-2 pb-1 truncate">{review.name}</h2>
                            <div className="h-[80%] mt-3">
                                <p className="break-words">{review.comment}</p>
                            </div>
                        </div>
                    )):(<div className={`block loader animate-spin bg-red-400 w-12`}></div>)}
                </div>
            </div>
        </section>
    )
}