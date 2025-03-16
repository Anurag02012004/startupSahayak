// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import { Toaster } from "@/components/ui/toaster"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "StartupSahayak - Validate Your Startup Idea for the Indian Market",
//   description:
//     "Get AI-powered insights on your startup idea's potential, step-by-step guidance, and tailored recommendations for the Indian startup ecosystem.",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light">
//           <Navbar />
//           {children}
//           <Footer />
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }



// import './globals.css'



import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartupSahayak - Validate Your Startup Idea for the Indian Market",
  description:
    "Get AI-powered insights on your startup idea's potential, step-by-step guidance, and tailored recommendations for the Indian startup ecosystem.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="light"> 
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
