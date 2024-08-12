import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export const metadata: Metadata = {
  title: "Eazy Learn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#67e8f9" showSpinner={false} crawl={false} />
        <div className="flex">
          <div className="w-[22rem] shadow-[0_0_3px_1px_#212121] h-screen">
            <SideBar/>
          </div>
          <div className="w-full flex flex-col gap-10">
            <Header />
            <div className="px-10">
            {children}
            </div>
          </div>
        </div>

      </body>
    </html>
  );
}
