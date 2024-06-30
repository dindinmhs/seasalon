import { Poppins } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react"
import { Providers } from "@/provider";

const poppins = Poppins({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "SEA Salon | Dindin Imanudin",
  description: "Beauty and Elegance Redefined",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <Providers>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
