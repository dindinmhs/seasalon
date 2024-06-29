import Image from "next/image"

export function About() {
    return (
        <section id="about" className="px-2 bg-red-400 text-slate-900 py-6">
            <h2 className="font-black text-4xl text-center">About Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-6 mt-6 gap-4">
                <div>
                <Image
                        src="/about/about.jpg"
                        alt="about"
                        width={500}
                        height={500}
                        priority={true}
                        className="rounded-lg m-auto w-auto h-auto"
                        />
                </div>
                <div className="text-lg md:text-xl ml-6 mt-6 md:mt-0">
                    <p>At SEA Salon, we believe in transforming beauty and elegance into an art form. Located in the heart of Ciamis, SEA Salon has been redefining beauty standards with our exceptional services and unparalleled expertise. Our name, SEA, stands for the serene, elegant, and artistic touch that we bring to every client we serve.</p>
                </div>
            </div>
        </section>
    )
}