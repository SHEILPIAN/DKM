'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Filter,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  PlusCircle,
  Coins,
  Calendar,
  Wallet,
} from 'lucide-react';
import { KategoriKas, Transaksi } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamKeuanganProps {
  onBack: () => void;
  kategoriKas: KategoriKas[];
  transaksi: Transaksi[];
  onOpenCashier: () => void;
}

export const MaslamKeuangan: React.FC<MaslamKeuanganProps> = ({
  onBack,
  kategoriKas,
  transaksi,
  onOpenCashier,
}) => {
  const [activeTab, setActiveTab] = useState<'total' | 'detail' | 'ringkasan'>('ringkasan');
  const [selectedPos, setSelectedPos] = useState<string>('ALL');
  const [selectedTipe, setSelectedTipe] = useState<string>('ALL');

  // Aggregation
  const totalSaldo = kategoriKas.reduce((acc, curr) => acc + curr.saldo, 0);

  const totalPemasukan = transaksi
    .filter((t) => t.tipe === 'IN' && t.tanggal.startsWith('2026-09'))
    .reduce((acc, curr) => acc + curr.nominal, 0);

  const totalPengeluaran = transaksi
    .filter((t) => t.tipe === 'OUT' && t.tanggal.startsWith('2026-09'))
    .reduce((acc, curr) => acc + curr.nominal, 0);

  // Sub-totals category breakdown
  const pemasukanList = [
    { nama: 'Infaq Tromol Shalat Jumat', nominal: 34200000 },
    { nama: 'Infaq QRIS Digital Jamaah', nominal: 7800000 },
    { nama: 'Donasi Khusus Pembangunan', nominal: 5000000 },
  ];

  const pengeluaranList = [
    { nama: 'Operasional & Kebersihan', nominal: 4650000 },
    { nama: 'Tagihan Listrik PLN & Air PDAM', nominal: 3450000 },
    { nama: 'Kafalah Petugas & Penceramah', nominal: 5050000 },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* 1. Header (Deep Blue with pattern - Screenshot 2) */}
      <div className="maslam-sub-header">
        <div className="maslam-header-nav">
          <button type="button" onClick={onBack} className="maslam-back-btn">
            <ChevronLeft size={22} />
            <span>Laporan Keuangan</span>
          </button>
        </div>

        <div className="maslam-page-title-group">
          <h2>Laporan Keuangan</h2>
          <p>Masjid AL-MUHAJIRIN KAYURINGIN BEKASI</p>
        </div>
      </div>

      {/* 2. Segmented Tabs: Total | Detail | Ringkasan */}
      <div className="maslam-tabs-row">
        <button
          type="button"
          onClick={() => setActiveTab('total')}
          className={`maslam-tab-pill ${activeTab === 'total' ? 'active' : ''}`}
        >
          Total
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('detail')}
          className={`maslam-tab-pill ${activeTab === 'detail' ? 'active' : ''}`}
        >
          Detail
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ringkasan')}
          className={`maslam-tab-pill ${activeTab === 'ringkasan' ? 'active' : ''}`}
        >
          Ringkasan
        </button>
      </div>

      {/* 3. Filter Bar (Filter, (Semua), (Semua), Bulanan) */}
      <div className="maslam-filter-row">
        <button
          type="button"
          className="maslam-filter-btn"
          onClick={() => alert('Filter Pos Anggaran & Periode Transaksi')}
        >
          <Filter size={14} />
          <span>Filter</span>
        </button>
        <button type="button" className="maslam-filter-btn active">
          (Semua)
        </button>
        <button type="button" className="maslam-filter-btn">
          (Semua)
        </button>
        <button type="button" className="maslam-filter-btn">
          Bulanan
        </button>
      </div>

      {activeTab === 'ringkasan' && (
        <>
          {/* 4. Saldo Awal Card */}
          <div className="maslam-saldo-card">
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Saldo Awal</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
              Rp. 0
            </div>
          </div>

          {/* 5. Saldo Akhir Card (Green Patterned - Screenshot 2) */}
          <div className="maslam-saldo-card green-pattern">
            <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700 }}>Saldo Akhir</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#064e3b', marginTop: 4 }}>
              {formatRupiah(totalSaldo)}
            </div>
          </div>

          {/* 6. Dual Metric Cards (Pemasukan & Pengeluaran) */}
          <div className="maslam-dual-metric-grid">
            {/* Total Pemasukan */}
            <div className="maslam-metric-box">
              <div className="maslam-coin-badge">
                Rp
                <span className="maslam-coin-arrow" style={{ background: '#10b981' }}>
                  <ArrowUp size={10} strokeWidth={3} />
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
                Total Pemasukan
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: 3 }}>
                {formatRupiah(totalPemasukan)}
              </div>
            </div>

            {/* Total Pengeluaran */}
            <div className="maslam-metric-box">
              <div className="maslam-coin-badge">
                Rp
                <span className="maslam-coin-arrow" style={{ background: '#ef4444' }}>
                  <ArrowDown size={10} strokeWidth={3} />
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
                Total Pengeluaran
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: 3 }}>
                {formatRupiah(totalPengeluaran)}
              </div>
            </div>
          </div>

          {/* 7. Sub-total Pemasukan Card List */}
          <div
            style={{
              margin: '0 16px 14px',
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div className="maslam-coin-badge" style={{ width: 26, height: 26, fontSize: '0.7rem', margin: 0 }}>
                Rp
                <span className="maslam-coin-arrow" style={{ background: '#10b981', width: 12, height: 12 }}>
                  <ArrowUp size={8} strokeWidth={3} />
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                Sub-total Pemasukan
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pemasukanList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    borderBottom: idx < pemasukanList.length - 1 ? '1px solid #f1f5f9' : 'none',
                    paddingBottom: 8,
                  }}
                >
                  <span style={{ color: '#0369a1', fontWeight: 600 }}>{item.nama}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, color: '#0f172a' }}>
                    <span>{formatRupiah(item.nominal)}</span>
                    <ChevronRight size={15} style={{ color: '#94a3b8' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Sub-total Pengeluaran Card List */}
          <div
            style={{
              margin: '0 16px 14px',
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div className="maslam-coin-badge" style={{ width: 26, height: 26, fontSize: '0.7rem', margin: 0 }}>
                Rp
                <span className="maslam-coin-arrow" style={{ background: '#ef4444', width: 12, height: 12 }}>
                  <ArrowDown size={8} strokeWidth={3} />
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                Sub-total Pengeluaran
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pengeluaranList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    borderBottom: idx < pengeluaranList.length - 1 ? '1px solid #f1f5f9' : 'none',
                    paddingBottom: 8,
                  }}
                >
                  <span style={{ color: '#475569', fontWeight: 600 }}>{item.nama}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, color: '#dc2626' }}>
                    <span>{formatRupiah(item.nominal)}</span>
                    <ChevronRight size={15} style={{ color: '#94a3b8' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Detail Tab */}
      {activeTab === 'detail' && (
        <div style={{ padding: '10px 16px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', marginBottom: 10 }}>
            Daftar Transaksi Terbaru ({transaksi.length} Data)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {transaksi.slice(0, 10).map((trx) => (
              <div
                key={trx.id}
                style={{
                  background: '#ffffff',
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                    {trx.keterangan}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 3 }}>
                    {trx.kategoriNama} • {new Date(trx.tanggal).toLocaleDateString('id-ID')}
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: trx.tipe === 'IN' ? '#059669' : '#dc2626',
                  }}
                >
                  {trx.tipe === 'IN' ? `+ ${formatRupiah(trx.nominal)}` : `- ${formatRupiah(trx.nominal)}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total Tab */}
      {activeTab === 'total' && (
        <div style={{ padding: '16px' }}>
          <div style={{ background: '#ffffff', padding: 18, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 14 }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              Saldo Tiap Pos Anggaran Kas Masjid
            </h4>
            {kategoriKas.map((k) => (
              <div key={k.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>{k.nama}</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>{formatRupiah(k.saldo)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button: + Catat Infaq / Kasir */}
      <div
        style={{
          position: 'fixed',
          bottom: 74,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 410,
          padding: '0 16px',
          zIndex: 35,
        }}
      >
        <button
          type="button"
          onClick={onOpenCashier}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '13px',
            fontSize: '0.92rem',
            boxShadow: '0 8px 20px rgba(5, 150, 105, 0.35)',
          }}
        >
          <PlusCircle size={18} />
          <span>+ Catat Infaq / Pengeluaran Kasir</span>
        </button>
      </div>
    </div>
  );
};
