import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CTF-Cybercup.ai | Master Cybersecurity Through Competition",
  description:
    "Challenge yourself with real-world hacking scenarios on CTF-Cybercup.ai. Compete globally, earn recognition, and level up your security skills with AI-powered guidance. Created by Nish Patel.",
  keywords:
    "CTF, Capture The Flag, cybersecurity, hacking challenges, security training, penetration testing, cybersecurity competition",
  authors: [{ name: "Nish Patel" }],
  creator: "Nish Patel",
  openGraph: {
    title: "CTF-Cybercup.ai | Master Cybersecurity Through Competition",
    description:
      "Challenge yourself with real-world hacking scenarios. Compete globally and level up your security skills.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CTF-Cybercup.ai",
    description: "Master Cybersecurity Through Competition",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
