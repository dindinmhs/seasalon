import { Home } from "@/components/home";
import { Service } from "@/components/services";
import Image from "next/image";

export default function Homepage() {
  return (
    <main className="">
      <Home/>
      <Service/>
    </main>
  );
}
