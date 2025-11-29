import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google" // Changed Font
import "./globals.css"
import { Navigation } from "@/components/layout/navigation"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { PageTransition } from "@/components/animations/page-transition"
import { FloatingSocial } from "@/components/social/floating-social"
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// Tech/Code font
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})


export const metadata: Metadata = {
  title: "Himanshu Rai | Engineer",
  description: "Full Stack • DevOps • AI Engineer",
  keywords: ["Full Stack Developer", "DevOps Engineer", "AI Engineer", "React", "Node.js", "Python", "Cloud Computing", "Machine Learning", "Software Engineer", "Himanshu Rai"],
  authors: [{ name: "Himanshu Rai" }],
  creator: "Himanshu Rai",
  metadataBase: new URL('https://enghimanshu.space'),
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  openGraph: {
    type: "website",
    title: "Himanshu Rai - Software Engineer Portfolio",
    description: "Combining expertise in Full Stack Development, DevOps practices, and Artificial Intelligence to build innovative solutions.",
    siteName: "Himanshu Rai Portfolio",
    locale: 'en_US',
    url: 'https://enghimanshu.space',
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Rai - Software Engineer Portfolio",
    description: "Combining expertise in Full Stack Development, DevOps practices, and Artificial Intelligence to build innovative solutions.",
    creator: "@himanshura_i",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* Background Grid Mesh */}
          <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none" />
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
          
          <div className="min-h-screen flex flex-col relative">
            <Navigation />
            <PageTransition>
              <main className="flex-grow pt-24">{children}</main>
            </PageTransition>
            <FloatingSocial />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}