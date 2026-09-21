import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Data Aggregation Backend dengan Prisma
    // Agregasi total pemasukan dan pengeluaran per kategori kas
    /*
    const aggregation = await prisma.transaksi.groupBy({
      by: ['tipe', 'kategoriId'],
      _sum: {
        nominal: true,
      },
      where: {
        tanggal: {
          gte: new Date('2026-09-01T00:00:00Z'),
          lte: new Date('2026-09-30T23:59:59Z'),
        },
      },
    });
    */

    // Sample aggregated payload
    const responsePayload = {
      status: 'success',
      periode: 'September 2026',
      totalKasSaatIni: 186750000,
      ringkasanBulanIni: {
        pemasukan: 47000000,
        pengeluaran: 13150000,
        pertumbuhanPemasukanPersen: 19, // +19% vs Agustus
        pertumbuhanPengeluaranPersen: -14, // -14% vs Agustus
      },
      alokasiKas: [
        { kategori: 'Kas Operasional & Kebersihan', saldo: 48500000, persen: 35 },
        { kategori: 'Kas Dakwah & Pengajian', saldo: 24750000, persen: 30 },
        { kategori: 'Kas Pembangunan & Infrastruktur', saldo: 82300000, persen: 20 },
        { kategori: 'Kas Sosial & Santunan Yatim', saldo: 31200000, persen: 15 },
      ],
    };

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
