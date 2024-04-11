import { Tilt_Neon,Belanosima } from "next/font/google";
// import local from "next/font/local";
import "./globals.css";

const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  variable: "--font-tiltNeon",
  weight : "400"
});

const belanosima = Belanosima({
  subsets: ["latin"],
  variable: "--font-belanosima",
  weight : "400"
});

export const metadata = {
  title: "TIG concept",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${tiltNeon.variable}${belanosima.variable}`}>
        {children}
      </body>
    </html>
  );
}
