import "./global.css";
import { DM_Sans } from 'next/font/google'

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTop";
import Script from "next/script";
import LoaderComponent from "@/components/Loader/LoaderComponent";


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
      {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" /> */}
        {/* Google Analytics Scripts */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-2EEFGD3PN4`} // Replace with your Measurement ID
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2EEFGD3PN4');
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className=" bg-slate-900 text-white overflow-x-hidden">
        <LoaderComponent>
        <Header />
        {children}
        <BackToTopButton />
        <Footer />
        </LoaderComponent>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
