'use client';

import React from 'react';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KategoriKas, Transaksi } from '@/types/dkm';

interface AnalyticsCardsProps {
  kategoriKas: KategoriKas[];
  transaksi: Transaksi[];
}

export const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
};

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
  kategoriKas,
  transaksi,
}) => {
  // 1. Total Saldo Kas Saat Ini
  const totalSaldo = kategoriKas.reduce((acc, curr) => acc + curr.saldo, 0);

  // 2. Data Bulan Ini (September 2026) vs Bulan Lalu (Agustus 2026)
  const currentMonthIn = transaksi
    .filter((t) => t.tipe === 'IN' && t.tanggal.startsWith('2026-09'))
    .reduce((acc, curr) => acc + curr.nominal, 0);

  const currentMonthOut = transaksi
    .filter((t) => t.tipe === 'OUT' && t.tanggal.startsWith('2026-09'))
    .reduce((acc, curr) => acc + curr.nominal, 0);

  const lastMonthIn = transaksi
    .filter((t) => t.tipe === 'IN' && t.tanggal.startsWith('2026-08'))
    .reduce((acc, curr) => acc + curr.nominal, 0) || 39500000;

  const lastMonthOut = transaksi
    .filter((t) => t.tipe === 'OUT' && t.tanggal.startsWith('2026-08'))
    .reduce((acc, curr) => acc + curr.nominal, 0) || 15400000;

  // Kalkulasi Tren Persentase
  const inGrowth = Math.round(((currentMonthIn - lastMonthIn) / lastMonthIn) * 100);
  const outGrowth = Math.round(((currentMonthOut - lastMonthOut) / lastMonthOut) * 100);

  return (
    <div className="stats-grid">
      {/* Kartu 1: Total Saldo Kas */}
      <div className="stat-card primary-border">
        <div className="stat-header">
          <span className="stat-title">Total Saldo Kas Saat Ini</span>
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Wallet size={20} />
          </div>
        </div>
        <div className="stat-value">{formatRupiah(totalSaldo)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>
            {kategoriKas.length} Pos Kas Terintegrasi
          </span>
          <span>• Kas Bersih Siap Pakai</span>
        </div>
      </div>

      {/* Kartu 2: Pemasukan Bulan Ini */}
      <div className="stat-card gold-border">
        <div className="stat-header">
          <span className="stat-title">Total Pemasukan (September 2026)</span>
          <div className="stat-icon" style={{ background: 'var(--accent-gold-light)', color: 'var(--accent-gold)' }}>
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="stat-value" style={{ color: 'var(--primary-dark)' }}>
          {formatRupiah(currentMonthIn)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={`trend-badge ${inGrowth >= 0 ? 'trend-up' : 'trend-down'}`}>
            {inGrowth >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {inGrowth >= 0 ? `+${inGrowth}%` : `${inGrowth}%`}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            vs Bulan Lalu ({formatRupiah(lastMonthIn)})
          </span>
        </div>
      </div>

      {/* Kartu 3: Pengeluaran Bulan Ini */}
      <div className="stat-card rose-border">
        <div className="stat-header">
          <span className="stat-title">Total Pengeluaran (September 2026)</span>
          <div className="stat-icon" style={{ background: '#ffe4e6', color: '#e11d48' }}>
            <TrendingDown size={20} />
          </div>
        </div>
        <div className="stat-value" style={{ color: '#be123c' }}>
          {formatRupiah(currentMonthOut)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="trend-badge trend-up">
            <ArrowUpRight size={13} />
            {outGrowth >= 0 ? `+${outGrowth}%` : `${outGrowth}%`}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            vs Bulan Lalu ({formatRupiah(lastMonthOut)})
          </span>
        </div>
      </div>
    </div>
  );
};
