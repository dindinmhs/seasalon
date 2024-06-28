"use client"
import Link from "next/link";
import Image from "next/image";

export function Home() {
    return (
        <section id="home" className="grid grid-cols-1 lg:grid-cols-2 h-fit px-2 bg-slate-900 text-white">
            <div className="order-last md:order-1 h-fit md:h-[40rem] flex flex-col md:justify-center items-center">
                <div className="text-xl pb-20 md:pb-0 md:text-4xl">
                    <h1 className="text-5xl md:text-7xl text-red-400 font-serif">SEA Salon</h1>
                    <h2 className="mt-4 mb-8">Beauty and Elegance Redefined</h2>
                    <Link className="px-6 text-black font-bold py-2 bg-red-400 hover:bg-red-500 rounded-full" href="/reserve">Book Now</Link>
                </div>
            </div>
            <div className="order-2 h-[36rem] md:h-[40rem] flex px-10 pt-20 py-10">
                <div className="flex w-full h-full relative">
                    <div className="bg-red-400 w-[10rem] md:w-[20rem] h-[10rem] md:h-[20rem] rounded-full self-start m-auto"></div>
                    <Image
                        src="/home/hero1.jpg"
                        alt="hero1"
                        width={350}
                        height={350}
                        priority={true}
                        className="rounded-3xl absolute top-0 left-0"
                        />
                    <Image
                        src="/home/hero2.jpg"
                        alt="hero2"
                        width={350}
                        height={350}
                        priority={true}
                        className="rounded-3xl absolute right-0 bottom-0"
                        />
                </div>
            </div>
        </section>
    )
}