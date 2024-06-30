import Link from "next/link"
import { FaPhoneAlt } from "react-icons/fa"

export function Footer() {
    const links = [
        {
            title : 'Home',
            href : "/#home"
        },
        {
            title : 'About',
            href : "/#about"
        },
        {
            title : 'Services',
            href : "/#services"
        },
        {
            title : 'Contact',
            href : "/#contact"
        },
        {
            title : 'Reviews',
            href : "/#reviews"
        },
        {
            title : 'Book Now',
            href : "/sign-in"
        },
    ]
    return (
        <footer>
            <div className="flex justify-around flex-wrap px-2 py-6 bg-red-400">
                <div>
                    <Link href="/"><h1 className="font-black md:text-4xl">SEA Salon</h1></Link>
                </div>
                <div>
                    <h2 className="font-black text-lg">Links</h2>
                    {links.map(link => (
                        <Link key={link.title} className="block hover:underline" href={link.href}>{link.title}</Link>
                    ))}
                </div>
                <div>
                    <h3 className="font-bold">Thomas</h3>
                    <div>
                        <FaPhoneAlt className="inline"/>
                        <p className="inline ml-4">08123456789</p>
                    </div>
                    <h3 className="font-bold mt-6">Sekar</h3>
                    <div>
                        <FaPhoneAlt className="inline"/>
                        <p className="inline ml-4">08164829372</p>
                    </div>
                </div>
            </div>
            <div className="bg-slate-900 text-center text-white text-[0.85rem] py-4">
                <p>Copyright © 2024 <b>Dindin Imanudin</b></p>
                <p>Made with ❤️ using <b>Next.js</b></p>
            </div>
        </footer>
    )
}