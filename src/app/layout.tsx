import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { PageTransition } from "@/components/animations/page-transition"
import { FloatingSocial } from "@/components/floating-social"
import { Analytics } from '@vercel/analytics/next';
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Himanshu Rai | Full Stack • DevOps • AI Engineer",
  description: "Portfolio of Himanshu Rai - Combining expertise in Full Stack Development, DevOps practices, and Artificial Intelligence to build innovative solutions. Specializing in React, Node.js, Cloud Architecture, MLOps, and Deep Learning.",
  keywords: ["Full Stack Developer", "DevOps Engineer", "AI Engineer", "React", "Node.js", "Python", "Cloud Computing", "Machine Learning", "Software Engineer", "Himanshu Rai"],
  authors: [{ name: "Himanshu Rai" }],
  creator: "Himanshu Rai",
  metadataBase: new URL('https://enghimanshu.tech'),
  openGraph: {
    type: "website",
    title: "Himanshu Rai - Software Engineer Portfolio",
    description: "Combining expertise in Full Stack Development, DevOps practices, and Artificial Intelligence to build innovative solutions.",
    siteName: "Himanshu Rai Portfolio",
    locale: 'en_US',
    url: 'https://enghimanshu.tech', // Replace with your actual domain
    images: [
      {
        url: '/Cover.jpg', // Add your OG image in the public folder
        width: 1200,
        height: 630,
        alt: 'Himanshu Rai - Software Engineer Portfolio',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Rai - Software Engineer Portfolio",
    description: "Combining expertise in Full Stack Development, DevOps practices, and Artificial Intelligence to build innovative solutions.",
    creator: "@himanshura_i",
    images: ['/Cover.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
            <FloatingSocial />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

import './globals.css'