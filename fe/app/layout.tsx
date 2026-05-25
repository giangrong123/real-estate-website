"use client";

import {
  usePathname,
} from "next/navigation";

import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import "./globals.css";

import Providers from "@/components/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    usePathname();

  // tất cả route admin
  const isAdminPage =
    pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <Providers>
          {!isAdminPage && (
            <Header />
          )}

          {children}

          {!isAdminPage && (
            <Footer />
          )}
        </Providers>
      </body>
    </html>
  );
}