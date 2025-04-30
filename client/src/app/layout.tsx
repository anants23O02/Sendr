import './globals.css';
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";


export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
        {children}
    </body>
  </html>
  );
}
