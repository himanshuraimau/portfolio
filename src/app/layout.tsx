import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Himanshu Rai",
  description: "Personal website of Himanshu Rai",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full flex flex-col items-center">
          <div className="w-full max-w-4xl px-3 sm:px-6 md:px-10 bg-black">
            <NavBar />
            {children}
            <Analytics />
          </div>
          <div className="h-20 bg-black"></div> 
        </div>
      </body>
    </html>
  );
}
