import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "DKM Masjid Al-Muhajirin - Sistem Manajemen Terpadu",
  description:
    "Sistem manajemen DKM terpadu Masjid Al-Muhajirin - Jl. Maskoki Raya Perumnas 2 Kayuringin Jaya Bekasi. Mencakup Analitik Keuangan, Kasir Infaq, Reservasi Fasilitas, ZISWAF, Qurban, dan HR Kafalah.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DKM Al-Muhajirin",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#059669" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
