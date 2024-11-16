import localFont from "next/font/local";
import "./globals.css";
import SessionProvider from "@/components/providers/session-wrapper"
import { getServerSession } from "next-auth";
import Header from "@/components/header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "aidia",
  description: "AI powered chatbot integration.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <NextTopLoader showSpinner={false} color="#6622cc" shadow={"0 0 1px red"}/>
        <Header/>
        {children}
        <Toaster/>
      </body>
      </SessionProvider>
    </html>
  );
}
