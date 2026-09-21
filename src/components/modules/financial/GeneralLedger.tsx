'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { Transaksi, KategoriKas } from '@/types/dkm';
import { formatRupiah } from './AnalyticsCards';

interface GeneralLedgerProps {
  transaksi: Transaksi[];
  kategoriKas: KategoriKas[];
}

export const GeneralLedger: React.FC<GeneralLedgerProps> = ({
  transaksi,
  kategoriKas,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'IN' | 'OUT'>('ALL');
  const [filterKategori, setFilterKategori] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredData = transaksi.filter((trx) => {
    const matchType = filterType === 'ALL' ? true : trx.tipe === filterType;
    const matchKategori =
      filterKategori === 'ALL' ? true : trx.kategoriId === Number(filterKategori);
    const matchSearch =
      trx.keterangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trx.userNama && trx.userNama.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchType && matchKategori && matchSearch;
  });

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div style={{ marginTop: 28 }}>
      {/* Header & Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Buku Kas Umum (General Ledger)
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Daftar mutasi keuangan transparan tercatat secara real-time
          </p>
        </div>

        {/* Filter Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              placeholder="Cari transaksi / nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 14px 8px 36px',
                borderRadius: 10,
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none',
                background: '#ffffff',
                width: 220,
              }}
            />
          </div>

          {/* Type Filter Buttons */}
          <div
            style={{
              display: 'flex',
              background: '#f1f5f9',
              padding: 3,
              borderRadius: 10,
            }}
          >
            {(['ALL', 'IN', 'OUT'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: filterType === t ? '#ffffff' : 'transparent',
                  color:
                    filterType === t
                      ? t === 'IN'
                        ? '#059669'
                        : t === 'OUT'
                        ? '#dc2626'
                        : '#0f172a'
                      : '#64748b',
                  boxShadow: filterType === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {t === 'ALL' ? 'Semua' : t === 'IN' ? 'Pemasukan' : 'Pengeluaran'}
              </button>
            ))}
          </div>

          {/* Kategori Filter Dropdown */}
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: '#ffffff',
              outline: 'none',
            }}
          >
            <option value="ALL">Semua Pos Kas</option>
            {kategoriKas.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table with Framer Motion Fade-In Transition */}
      <motion.div
        className="table-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <table className="dkm-table">
          <thead>
            <tr>
              <th style={{ width: 120 }}>Tanggal</th>
              <th style={{ width: 130 }}>Tipe Transaksi</th>
              <th>Pos Anggaran / Kategori</th>
              <th>Keterangan Transaksi</th>
              <th style={{ width: 150 }}>Petugas Input</th>
              <th style={{ width: 160, textAlign: 'right' }}>Nominal</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                  Tidak ada transaksi yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              filteredData.map((trx, idx) => {
                const isIncome = trx.tipe === 'IN';
                return (
                  <motion.tr
                    key={trx.id || idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02, duration: 0.2 }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b' }}>
                        <Calendar size={13} />
                        {formatDate(trx.tanggal)}
                      </div>
                    </td>
                    <td>
                      <span
                        className="badge-status"
                        style={{
                          background: isIncome ? '#ecfdf5' : '#fef2f2',
                          color: isIncome ? '#059669' : '#dc2626',
                          border: `1px solid ${isIncome ? '#a7f3d0' : '#fecaca'}`,
                        }}
                      >
                        {isIncome ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}
                        {isIncome ? 'MASUK (IN)' : 'KELUAR (OUT)'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#334155' }}>
                        {trx.kategoriNama || 'Kas Operasional'}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: '#0f172a', fontWeight: 500 }}>{trx.keterangan}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#475569' }}>
                        <UserCheck size={13} style={{ color: '#059669' }} />
                        {trx.userNama || 'Petugas DKM'}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '0.92rem',
                          color: isIncome ? '#059669' : '#dc2626',
                        }}
                      >
                        {isIncome ? `+ ${formatRupiah(trx.nominal)}` : `- ${formatRupiah(trx.nominal)}`}
                      </span>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};
