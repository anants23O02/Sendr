import './globals.css';
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Navbar />
        <div className="flex min-h-screen">
          {/* Sidebar: 40% width */}
          <div className="w-1/5 bg-gray-100">
            <Sidebar />
          </div>

          {/* Main content: 60% width */}
          <div className="w-4/5 p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
