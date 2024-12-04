import { Inter } from "next/font/google";
import "@/globals/globals.css";
import stn from "@/globals/settings";
import local from "@/globals/local";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: local.ru.text.APP_NAME,
  description: local.ru.text.APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
