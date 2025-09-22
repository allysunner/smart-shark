import type { Metadata } from "next";
import "@/app/globals.css";
import { Sidebar } from "@/components/menu/private-sidebar";

export const metadata: Metadata = {
  title: "SmartShark",
  description: "ally gay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`flex bg-retrowhite antialiased`}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
