import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wordle Too",
  description: "Just Like Wordle, But Infinite",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='focus-visible:outline-none'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
