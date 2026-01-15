import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "TektonX Labs - Building Africa's Future Tech Leaders",
  description:
    "TektonX Labs equips young Africans with practical tech skills, industry insights, and mentorship to thrive in the digital economy.",
  keywords: [
    "tech education",
    "mentorship",
    "Africa",
    "coding",
    "software development",
    "UI/UX design",
    "data science",
    "cybersecurity",
  ],
  openGraph: {
    title: "TektonX Labs - Building Africa's Future Tech Leaders",
    description:
      "Empowering young Africans with the skills, mentorship, and opportunities to succeed in technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
