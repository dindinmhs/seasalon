import { About } from "@/components/homepage/about";
import { Contact } from "@/components/homepage/contact";
import { Footer } from "@/components/homepage/footer";
import { Home } from "@/components/homepage/home";
import { Review } from "@/components/homepage/reviews";
import { Service } from "@/components/homepage/services";

export default function Homepage() {
  return (
    <main className="">
      <Home/>
      <About/>
      <Service/>
      <Contact/>
      <Review/>
      <Footer/>
    </main>
  );
}
