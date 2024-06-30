import { Hero } from "@/components/sign/hero"
import { Form } from "@/components/sign/form-signup"
export default function SignUp() {
    return (
        <div className="lg:grid lg:grid-cols-2 flex py-4 lc:py-0 lc:h-screen justify-center lg:justify-items-center items-center">
            <Hero/>
            <Form/>
        </div>
    )
}