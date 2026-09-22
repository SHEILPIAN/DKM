'use client';

import React from 'react';
import { ChevronLeft, Package, CheckCircle2 } from 'lucide-react';

interface MaslamInventoryProps {
  onBack: () => void;
}

export const MaslamInventory: React.FC<MaslamInventoryProps> = ({ onBack }) => {
  const items = [
    { nama: 'Genset Silent 5000 Watt', jumlah: '1 Unit', kondisi: 'BAIK', lokasi: 'Gudang Belakang' },
    { nama: 'Karpet Shaf Turkey Tebal 14mm', jumlah: '18 Gulung', kondisi: 'BAIK', lokasi: 'Ruang Utama' },
    { nama: 'Sound System Wireless Mixer 16 Ch', jumlah: '1 Set', kondisi: 'BAIK', lokasi: 'Ruang Sound' },
    { nama: 'Microphone Shure Beta 58A', jumlah: '6 Pcs', kondisi: 'BAIK', lokasi: 'Mimbar & Muadzin' },
    { nama: 'Tenda Sarnafil 4x4 Meter', jumlah: '2 Set', kondisi: 'BAIK', lokasi: 'Gudang Tenda' },
    { nama: 'Kursi Lipat Futura', jumlah: '150 Unit', kondisi: 'BAIK', lokasi: 'Aula Lantai 2' },
    { nama: 'Keranda Jenazah & Kain Penutup', jumlah: '1 Set', kondisi: 'BAIK', lokasi: 'Ruang Jenazah' },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
          color: 'white',
          padding: '16px 18px 20px',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: 0,
            gap: 6,
            fontSize: '1rem',
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          <ChevronLeft size={22} />
          <span>Inventaris Masjid</span>
        </button>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          Inventory & Sarpras
        </h2>
        <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
          Masjid AL-MUHAJIRIN KAYURINGIN BEKASI
        </p>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
          Daftar Sarana & Prasarana DKM
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                  {it.nama}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                  Jumlah: <strong>{it.jumlah}</strong> • Lokasi: {it.lokasi}
                </div>
              </div>
              <span
                style={{
                  background: '#dcfce7',
                  color: '#166534',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 999,
                }}
              >
                {it.kondisi}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
