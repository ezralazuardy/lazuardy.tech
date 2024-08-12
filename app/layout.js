import { Analytics } from "@vercel/analytics/react";
import Inter from "@/lib/fonts/inter";
import "./globals.css";

export const metadata = {
  title: "Lazuardy",
  description: "We are a team full of talented engineers.",
};

export const viewport = {
  themeColor: [{ color: "#000000" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
