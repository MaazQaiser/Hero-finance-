import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hero Car Finance | Get Approved & Reserve Your Car",
  description:
    "Check your eligibility with a soft search. Get approved for car finance and reserve AA-inspected vehicles with one trusted team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${hanken.variable} font-sans`}>{children}</body>
    </html>
  );
}
