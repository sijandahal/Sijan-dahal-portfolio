import "./global.css";
import { DM_Sans } from 'next/font/google'

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTop";


const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className=" bg-slate-900 text-white">
        <Header/>
        {children}
        <BackToTopButton/>
        <Footer/>
        </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
