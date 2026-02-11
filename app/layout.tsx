import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Metzium - Professional Web Development & Services",
  description: "Metzium offers professional web development services, innovative projects, and expert solutions for your business needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <div className="fixed inset-0 -z-10 bg-slate-950">
          <div className="absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-cyan-500/12 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-pink-500/12 blur-3xl" />
          <div className="absolute bottom-[-10%] left-1/4 h-[24rem] w-[24rem] rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px]" />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
