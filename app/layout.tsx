import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
