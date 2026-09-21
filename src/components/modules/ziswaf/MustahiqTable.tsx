'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  PackageCheck,
  Search,
  Check,
  MapPin,
} from 'lucide-react';
import { Mustahiq, KategoriAsnaf } from '@/types/dkm';

interface MustahiqTableProps {
  mustahiq: Mustahiq[];
  onToggleDistribute: (id: number) => void;
  stokBerasTersediaKg: number;
  danaZakatTersediaRp: number;
}

export const MustahiqTable: React.FC<MustahiqTableProps> = ({
  mustahiq,
  onToggleDistribute,
  stokBerasTersediaKg,
  danaZakatTersediaRp,
}) => {
  const [selectedAsnaf, setSelectedAsnaf] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const asnafList: KategoriAsnaf[] = [
    'FAKIR',
    'MISKIN',
    'AMIL',
    'MUALAF',
    'GHARIM',
    'FISABILILLAH',
    'IBNUSABIL',
  ];

  const filtered = mustahiq.filter((m) => {
    const matchAsnaf = selectedAsnaf === 'ALL' ? true : m.kategori === selectedAsnaf;
    const matchSearch =
      m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.alamat.toLowerCase().includes(search.toLowerCase());
    return matchAsnaf && matchSearch;
  });

  const totalMustahiq = mustahiq.length;
  const sudahDistribusi = mustahiq.filter((m) => m.statusDistribusi === 'SUDAH').length;

  return (
    <div style={{ marginTop: 24 }}>
      {/* Real-time Zakat Stock Status Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '16px 20px',
            borderRadius: 16,
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
            STOK BERAS ZAKAT TERSEDIA
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)', marginTop: 4 }}>
            {stokBerasTersediaKg.toFixed(1)} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Kg</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: 4 }}>
            ● Berkurang otomatis saat disalurkan
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '16px 20px',
            borderRadius: 16,
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
            STATUS PENYALURAN MUSTAHIQ
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
            {sudahDistribusi} / {totalMustahiq}{' '}
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Warga</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: 4 }}>
            {Math.round((sudahDistribusi / (totalMustahiq || 1)) * 100)}% Tersalurkan
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Database Mustahiq (8 Asnaf) & Distribusi
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Data terkunci dan terverifikasi sah oleh RT / RW setempat
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            />
            <input
              type="text"
              placeholder="Cari mustahiq / alamat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '8px 12px 8px 32px',
                borderRadius: 10,
                border: '1px solid #cbd5e1',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
          </div>

          <select
            value={selectedAsnaf}
            onChange={(e) => setSelectedAsnaf(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: '#ffffff',
            }}
          >
            <option value="ALL">Semua Kategori Asnaf</option>
            {asnafList.map((a) => (
              <option key={a} value={a}>
                Asnaf: {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mustahiq Table */}
      <div className="table-container">
        <table className="dkm-table">
          <thead>
            <tr>
              <th>Nama Mustahiq</th>
              <th>Alamat / Domisili</th>
              <th>Golongan Asnaf</th>
              <th>Validasi RT/RW</th>
              <th>Hak Penyaluran</th>
              <th style={{ textAlign: 'center' }}>Aksi Distribusi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const isDistributed = item.statusDistribusi === 'SUDAH';
              return (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.nama}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {item.jumlahTanggungan} Tanggungan Keluarga
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: '#334155' }}>
                      <MapPin size={13} style={{ color: '#059669' }} />
                      {item.alamat}
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: '#f1f5f9',
                        color: '#334155',
                      }}
                    >
                      {item.kategori}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge-status badge-approved"
                      style={{ fontSize: '0.72rem' }}
                    >
                      <ShieldCheck size={13} />
                      VALID RT/RW
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#059669', fontSize: '0.85rem' }}>
                      5.0 Kg Beras + Paket Sembako
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => onToggleDistribute(item.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: isDistributed ? '#ecfdf5' : 'var(--primary)',
                        color: isDistributed ? '#059669' : '#ffffff',
                        boxShadow: isDistributed ? 'none' : 'var(--shadow-sm)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {isDistributed ? (
                        <>
                          <Check size={14} />
                          Sudah Diterima
                        </>
                      ) : (
                        <>
                          <PackageCheck size={14} />
                          Salurkan Zakat
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
