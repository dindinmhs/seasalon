import Image from "next/image"
export function Hero() {
    return (
        <section className="w-full h-full lg:flex flex-col justify-center items-center relative hidden bg-cover after:bg-slate-900 after:block after:top-0 after:right-0 after:left-0 after:bottom-0 after:absolute after:opacity-50">
            <Image
                src={'/sign/hero.jpg'}
                fill
                alt="profile"
                priority={true}
                className={`absolute`}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            <h1 className="text-5xl md:text-7xl text-red-400 font-serif z-10 z-1">SEA Salon</h1>
            <h2 className="mt-4 mb-8 text-white font-bold text-2xl z-10 z-1">Beauty and Elegance Redefined</h2>
        </section>
    )
}