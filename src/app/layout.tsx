import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });


export const metadata= {
  title: "Himanshu Rai",
  description: "Personal website of Himanshu Rai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="bg-black min-h-screen flex flex-col items-center ">
      <div className="w-full max-w-4xl pl-3 pr-3 sm:pl-6 sm:pr-6 md:pl-10 md:pr-10" >
        <NavBar />
        {children}
        <Analytics/>
        </div>
        </div>
      </body>
    </html>
  );
}
