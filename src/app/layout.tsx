import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/Animation";
import Nav from "@/components/UI/Nav";

export const metadata: Metadata = {
  title: "Atlantis Immobilier",
  description: "Atlantis Immobilier",
};

const georgia = localFont({
  src: [
    {
      path: "../../public/fonts/georgia-2/georgia.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/georgia-2/georgiab.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/georgia-2/georgiai.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/georgia-2/georgiaz.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--georgia",
});

const calibri = localFont({
  src: [
    {
      path: "../../public/fonts/calibri-font-family/calibri-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/calibri-font-family/calibri-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/calibri-font-family/calibri-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/calibri-font-family/calibri-bold-italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--calibri",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${georgia.variable} ${calibri.variable} antialiased`}
    >
      <body className=" bg-[#060606] text-white">
        <SmoothScroll />
        <Nav />
        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
