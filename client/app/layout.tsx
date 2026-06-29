import type { Metadata } from "next";
import {Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import Chatbot from "./components/chatbot";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Brand",
  description: "",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <TooltipProvider>
        <body className="flex flex-col">
          {children}
          <Chatbot />
        </body>
      </TooltipProvider>
    </html>
  );
}
