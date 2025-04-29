export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
        <main className="container py-10">{children}</main>
    </body>
  </html>
  );
}
