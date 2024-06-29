import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Home } from "@/components/home";
import { Service } from "@/components/services";
import Image from "next/image";

export default function Homepage() {
  return (
    <main className="">
      <Home/>
      <About/>
      <Service/>
      <Contact/>
      <Footer/>
    </main>
  );
}
