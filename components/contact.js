import { FaPhoneAlt } from "react-icons/fa"

export function Contact() {
    return (
        <section id="contact" className="px-2 bg-slate-900 text-white py-6">
            <h2 className="font-black text-4xl text-center">Contact</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-6 mt-6 gap-4">
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9412.02293040306!2d108.34578917645779!3d-7.323745814550921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f5ebe8122900f%3A0xe214dd3cfbb7c9d5!2sAlun-Alun%20Ciamis%20Wetan!5e0!3m2!1sen!2sid!4v1719620839423!5m2!1sen!2sid" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-[20rem] md:h-[30rem]"></iframe>
                </div>
                <div className="text-lg md:text-2xl ml-6">
                    <h3 className="font-bold text-red-400">Thomas</h3>
                    <div>
                        <FaPhoneAlt className="inline"/>
                        <p className="inline ml-4">08123456789</p>
                    </div>
                    <h3 className="font-bold mt-6 text-red-400">Sekar</h3>
                    <div>
                        <FaPhoneAlt className="inline"/>
                        <p className="inline ml-4">08164829372</p>
                    </div>
                </div>
            </div>
        </section>
    )
}