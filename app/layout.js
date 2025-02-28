import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/useLanguage";
import { Toaster } from 'react-hot-toast';
import ClientLayout from '@/components/ClientLayout';

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Animadom",
  description: "Animadom - Your Ultimate Destination for Anime and Animation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}poppins.className bg-[#121212] overflow-x-hidden`}>
        <LanguageProvider>
          <ClientLayout>
            <div className="min-h-screen text-white">
              <Navbar />
              {children}
              <Toaster />
            </div>
            <Footer />
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
