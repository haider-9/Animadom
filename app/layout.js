import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ["latin"],weight:"400" });

export const metadata = {
  title: "Animadom",
  description: "Animadom - Your Ultimate Destination for Anime and Animation",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
  
      <body className={`${poppins.className}poppins.className bg-[#121212]  overflow-x-hidden `}>
        <div className=" min-h-screen text-white">
        <Navbar className='absolute'/>
        {children}
        </div>
        <Footer/>
        </body>

    </html>
  );
}
