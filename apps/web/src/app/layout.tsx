import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jurista — Sistema de Empréstimos",
  description: "Gestão completa de empréstimos, cobradores e clientes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen">
        <NextTopLoader 
          color="#6366f1"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #6366f1,0 0 5px #6366f1"
        />
        {children}
      </body>
    </html>
  );
}
