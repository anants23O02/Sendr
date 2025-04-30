import './globals.css';
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";


export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  var x=true;
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
        {x===true?null: <Navbar />}
        {children}
        {x===true?null:<Sidebar />}
    </body>
  </html>
  );
}
