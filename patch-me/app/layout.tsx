import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { Providers } from "./Providers"
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PatchMe",
  description: "Répare tes fringues, gagne des skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={inter.className}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
