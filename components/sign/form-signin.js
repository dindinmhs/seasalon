import { Submit } from "@/components/sign/button";
import { useState } from "react";
import { RiScissors2Fill } from "react-icons/ri"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'
import Link from "next/link";

export function Form() {
    const [isPending, setPending] = useState(false)
    const [info, setInfo] = useState('')
    const [data, setData] = useState({})
    const router = useRouter()
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setData(values => ({...values, [name] : value}))
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setPending(true)
        try {
            // check benar
            const res = await fetch('/api/sign-in', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
            const user = await res.json()
            // jika benar
            if (user.correct) {
                const res = await signIn('credentials', {
                    redirect : false,
                    email : data.email,
                    password : data.password,
                })
                if (res.ok) {
                    router.replace('/dashboard/customer/booking')
                } else {
                    setInfo('failed to sign in')
                }
            } else {
                setInfo('Email or Password Incorrect')
                e.target.reset()
            }
        } catch (error) {
            console.error('Sign up failed', error)
        } finally {
            setPending(false)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <RiScissors2Fill size={50} className="m-auto"/>
            <h2 className="text-3xl my-10 text-center font-bold">Sign In</h2>
            <input required disabled={isPending} className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full" name="email" onChange={handleChange} placeholder="Email" type="email"/>
            <input required disabled={isPending} className="border-2 py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 text-lg font-bold w-full" name="password" onChange={handleChange} placeholder="Password" type="password"/>
            <p className="text-sm mb-4 font-bold">{info}</p>
            <Submit isPending={isPending} name="Sign In"/>
            <div className={`${isPending?'block':'hidden'} loader animate-spin bg-slate-900 w-12 m-auto`}></div>
            <p className="text-sm mt-6 text-center">don&apos;t have an account? <Link className="text-blue-700 font-black" href="sign-up">Sign Up</Link>
            </p>
        </form>
    )
}