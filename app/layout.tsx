import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";
import Header from "./components/Header";
import AnimatedBG from "./components/AnimatedBG";
import { AnimationContextProvider } from "./context/AnimationContext";
import VerticalAnimatedBar from "./components/VerticalAnimatedBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DWP Crystals",
  description: "DWP Crystals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedBG />
        <AnimationContextProvider>
          <Header />
          {children}
          <VerticalAnimatedBar />
        </AnimationContextProvider>
      </body>
    </html>
  );
}
