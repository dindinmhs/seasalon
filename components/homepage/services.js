import Image from "next/image"
export function Service() {
    const services = [
        {
            url : 'style.jpg',
            title : 'Haircuts and Styling',
        },
        {
            url : 'manicure.jpg',
            title : 'Manicure and Pedicure',
        },
        {
            url : 'facial.jpg',
            title : 'Facial Treatments',
        }
    ]
    return (
        <section id="services" className="py-6">
            <h2 className="font-black text-4xl text-center">Our Services</h2>
            <div className="flex my-8 justify-around flex-wrap gap-4">
                {services.map(service => (
                    <div key={service.url} className={`w-[15rem] bg-cover h-[25rem] rounded-xl relative overflow-hidden`}>
                        <Image
                        src={`/services/${service.url}`}
                        fill
                        alt="service"
                        priority={true}
                        className={`absolute`}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="w-full h-full bg-gradient-to-b from-transparent to-black p-4 rounded-xl flex items-end justify-center relative z-1">
                            <h2 className="text-white text-2xl text-center font-black">{service.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )    
}