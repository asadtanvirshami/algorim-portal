import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/redux/store-provider";
import { ReactQueryClientProvider } from "@/provider/react-query-provider";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  weight: "100 900",
  variable: "--font-geist-sans",
});

const revamped = localFont({
  src: "./fonts/Revamped.otf",
  weight: "100 900",
  variable: "--font-revamped",
});

const redhat = localFont({
  src: "./fonts/RedHatDisplay-Regular.ttf",
  weight: "100 900",
  variable: "--font-redhat",
});

export const metadata: Metadata = {
  title: "Algorim - Web Portal",
  description:
    "Web portal only for authorized personal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    
      <body
        className={`${geistSans.variable} ${redhat.variable} ${revamped.variable} antialiased`}
      >
        <ReactQueryClientProvider >
          <StoreProvider>{children}</StoreProvider>
        </ReactQueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}