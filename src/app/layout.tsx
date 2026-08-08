import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? 'localhost:3000';
  const protocol = requestHeaders.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = 'SplitBill — Patungan Beres, Teman Tetap Akrab';
  const description = 'Bagi tagihan dengan adil, hitung otomatis, lalu kirim hasilnya ke grup tanpa drama.';

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'SplitBill',
      locale: 'id_ID',
      type: 'website',
      images: [{ url: '/og.png', alt: 'SplitBill — Patungan beres. Teman tetap akrab.' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-[#fffdf8] font-sans antialiased text-stone-900">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
