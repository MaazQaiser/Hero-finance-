import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InformationPanelProvider } from "@/components/information/InformationPanelProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hero Car Finance | Get Approved & Reserve Your Car",
  description:
    "Check your eligibility with a soft search. Get approved for car finance and reserve AA-inspected vehicles with one trusted team.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="font-sans antialiased">
        <InformationPanelProvider>{children}</InformationPanelProvider>
      </body>
    </html>
  );
}
