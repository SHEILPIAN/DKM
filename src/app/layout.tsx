import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "DKM Masjid Jami' Al-Ikhlas - Sistem Manajemen Terpadu",
  description:
    'Sistem manajemen DKM terpadu mencakup Analitik Keuangan Kasir Infaq, Reservasi Fasilitas Anti-Bentrok, ZISWAF & Qurban Patungan Sapi, serta Absensi & Kafalah Petugas Masjid.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
