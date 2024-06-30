import { Submit } from "@/components/sign/button";
import { useState } from "react";
import { RiScissors2Fill } from "react-icons/ri"
import Link from "next/link";

export function Form() {
    const [isPending, setPending] = useState(false)
    const [data, setData] = useState({})
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setData(values => ({...values, [name] : value, provider : 'credentials'}))
    }
    return (
        <form className="">
            <RiScissors2Fill size={50} className="m-auto"/>
            <h2 className="text-3xl my-10 text-center font-bold">Sign In</h2>
            <input required disabled={isPending} className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full" name="email" onChange={handleChange} placeholder="Email" type="email"/>
            <input required disabled={isPending} className="border-2 py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 text-lg font-bold w-full" name="email" onChange={handleChange} placeholder="Password" type="password"/>
            <Submit name="Sign In"/>
            <p className="text-sm mt-6 text-center">don't have an account? <Link className="text-blue-700 font-black" href="sign-up">Sign Up</Link>
            </p>
        </form>
    )
}