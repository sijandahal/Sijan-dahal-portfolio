import "./global.css";
import { DM_Sans } from 'next/font/google'

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTop";
import Script from "next/script";


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
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QTVB72VF2E"></Script>
        <Script id="google-analytics">
          { `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QTVB72VF2E');
          `}
        </Script>
      </head>
      <body className=" bg-slate-900 text-white overflow-x-hidden">
        <Header />
        {children}
        <BackToTopButton />
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
