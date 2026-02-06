import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Nav } from "@/components/layout/nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Q1 Deal Accelerator",
  description: "Data-driven opportunity review system for Q1 2026 deals",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <Nav />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
