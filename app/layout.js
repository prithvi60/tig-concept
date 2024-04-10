import { Space_Grotesk } from "next/font/google";
import local from "next/font/local";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
  weight : "400"
});

// const LSFont = local({
//   src: [
//     {
//       path: "../public/fonts/LSANS.TTF",
//       // weight: "400",
//     },
//   ],
//   variable: "--font-LSFont",
// });
// ${LSFont.variable}

export const metadata = {
  title: "TIG concept",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
