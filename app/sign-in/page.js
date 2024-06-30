"use client"
import { Form } from "@/components/sign/form-signin";
import { Hero } from "@/components/sign/hero";

export default function SignIn() {
    
    return (
        <div className="lg:grid lg:grid-cols-2 flex py-4 lc:py-0 lc:h-screen justify-center lg:justify-items-center items-center">
            <Hero/>
            <Form/>
        </div>
    )
}