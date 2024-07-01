"use client"
import { Submit } from "@/components/sign/button";
import { useEffect, useState } from "react";
import { RiScissors2Fill } from "react-icons/ri"
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Form() {
    const [isPending, setPending] = useState(false)
    const [info, setInfo] = useState('')
    const [data, setData] = useState()
    const router = useRouter()
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setData(values => ({...values, [name] : value, role : 'Customer'}))
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setPending(true)
        try {
            // cek user exist
            const res =  await fetch('/api/user-exist', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(data)
                })
            const user = await res.json()
            // jika user exist
            if (user.exist) {
                setInfo('Email already in use')
                return
            } else {
                const res = await fetch('/api/sign-up', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(data)
                })
                if (res.ok) {
                    router.push('/sign-in')
                } else {
                    setInfo('failed to sign up')
                }
            }
        } catch (error) {
            console.error('Sign up failed', error)
        } finally {
            setPending(false)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Link href="/">
                <RiScissors2Fill size={50} className="m-auto"/>
            </Link>
            <h2 className="text-3xl my-10 text-center font-bold">Sign Up</h2>
            <input required disabled={isPending} className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full" name="name" onChange={handleChange} placeholder="Name" type="text"/>
            <input required disabled={isPending} className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full" name="email" onChange={handleChange} placeholder="Email" type="email"/>
            <input required disabled={isPending} className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block mt-4 font-bold w-full" maxLength="12" pattern="^0[0-9]{9,14}$" name="tel" onChange={handleChange} placeholder="Phone Number" type="tel"/>
            <div className="font-bold mt-1">
                <small className="ml-4 block">example : 085771722157</small>
            </div>
            <input required disabled={isPending} className="border-2 py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 text-lg font-bold w-full" name="password" onChange={handleChange} placeholder="Password" type="password"/>
            <p className="text-sm mb-4 font-bold">{info}</p>
            <Submit isPending={isPending} name="Sign Up"/>
            <div className={`${isPending?'block':'hidden'} loader animate-spin bg-slate-900 w-12 m-auto`}></div>
            <p className="text-sm mt-6 text-center">already have an account? <Link className="text-blue-700 font-black" href="sign-in">Sign In</Link>
            </p>
        </form>
    )
}