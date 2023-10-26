import React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
   subsets: ["latin"],
   variable: "--font-inter",
});

const spaceGrotesk = SpaceGrotesk({
   weight: ["300", "400", "500", "600", "700"],
   subsets: ["latin"],
   variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
   title: "devOverflow",
   description: "a community for ask and answer programming questions",
   icons: "/assets/images/site-logo.svg",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <ClerkProvider
               appearance={{
                  elements: {
                     formButtonPrimary: "primary-gradient",
                     footerActionLink:
                        "primary-text-gradient hover:text-primary-500",
                  },
               }}
            >
               <ThemeProvider>{children}</ThemeProvider>
            </ClerkProvider>
         </body>
      </html>
   );
}
