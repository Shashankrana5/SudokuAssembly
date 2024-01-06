import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sudoku Assembly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel='icon' href='/logo.png' />
      </head>
      <body className={inter.className}>

          <UserContextProvider>
          {children}
          </UserContextProvider>

        </body>
    </html>
  );
}
