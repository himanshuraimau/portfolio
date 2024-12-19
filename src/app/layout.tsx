import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ThemeProvider } from 'next-themes';
import { DotPatternLinearGradient } from "@/components/DotPattern";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Himanshu Rai",
  description: "Personal website of Himanshu Rai",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="relative min-h-screen flex flex-col items-center bg-background text-foreground dark:bg-dark-background dark:text-dark-foreground">
            <DotPatternLinearGradient />
            <div className="relative z-10 w-full max-w-4xl px-3 sm:px-6 md:px-10">
              <NavBar />
              {children}
              <Footer/>
              <Analytics />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}