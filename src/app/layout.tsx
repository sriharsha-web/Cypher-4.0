import type { Metadata } from "next";
import { Archivo, Anton, Martian_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CYPHER 4.0 | Rotaract Club of Atria",
  description: "A 24-hour build-a-thon for ambitious student engineers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${anton.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
