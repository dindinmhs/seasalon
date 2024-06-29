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
                    <div key={service.url} className={`w-[15rem] bg-cover h-[25rem] rounded-xl`} style={{ backgroundImage: `url(/services/${service.url})` }}>
                        <div className="w-full h-full bg-gradient-to-b from-transparent to-black p-4 rounded-xl flex items-end justify-center">
                            <h2 className="text-white text-2xl text-center font-black">{service.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )    
}