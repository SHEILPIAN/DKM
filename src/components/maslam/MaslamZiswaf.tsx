'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  HeartHandshake,
  PlusCircle,
  PackageCheck,
  CheckCircle2,
  Phone,
  QrCode,
  Share2,
} from 'lucide-react';
import { Mustahiq } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamZiswafProps {
  onBack: () => void;
  onOpenZakatModal: () => void;
  mustahiqList: Mustahiq[];
  onToggleDistribute: (id: number) => void;
  stokBerasKg: number;
  danaZakatRp: number;
}

export const MaslamZiswaf: React.FC<MaslamZiswafProps> = ({
  onBack,
  onOpenZakatModal,
  mustahiqList,
  onToggleDistribute,
  stokBerasKg,
  danaZakatRp,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'stok' | 'distribusi'>('stok');

  const sudahDistribusiCount = mustahiqList.filter((m) => m.statusDistribusi === 'SUDAH').length;

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
          color: 'white',
          padding: '16px 18px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
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
            }}
          >
            <ChevronLeft size={22} />
            <span>ZISWAF DKM</span>
          </button>
        </div>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Zakat, Infaq & Waqaf
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            Masjid AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Stock Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: '16px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #bbf7d0',
            padding: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>
            🌾 Stok Beras Zakat
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#064e3b', marginTop: 4 }}>
            {stokBerasKg.toFixed(1)} <span style={{ fontSize: '0.85rem' }}>Kg</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
            Tersedia untuk disalurkan
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #fed7aa',
            padding: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9a3412' }}>
            💰 Dana Zakat Tunai
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#c2410c', marginTop: 4 }}>
            {formatRupiah(danaZakatRp)}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
            Kas Khusus 8 Asnaf
          </div>
        </div>
      </div>

      {/* Action Button: Input Penerimaan Zakat */}
      <div style={{ padding: '0 16px 14px' }}>
        <button
          type="button"
          onClick={onOpenZakatModal}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '12px',
            fontSize: '0.88rem',
            background: '#059669',
          }}
        >
          <PlusCircle size={18} />
          <span>+ Input Penerimaan Zakat & Kupon Digital</span>
        </button>
      </div>

      {/* Sub tabs: Distribusi Mustahiq */}
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
            Daftar Mustahiq & Status Penyaluran
          </span>
          <span
            style={{
              background: '#ecfdf5',
              color: '#059669',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 999,
              border: '1px solid #a7f3d0',
            }}
          >
            {sudahDistribusiCount}/{mustahiqList.length} Diterima
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mustahiqList.map((m) => {
            const isSudah = m.statusDistribusi === 'SUDAH';
            return (
              <div
                key={m.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  border: isSudah ? '1px solid #86efac' : '1px solid #e2e8f0',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: isSudah ? '#f0fdf4' : '#ffffff',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                      {m.nama}
                    </span>
                    <span
                      style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: 999,
                      }}
                    >
                      {m.kategori}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                    {m.alamat} • {m.jumlahTanggungan} Jiwa
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600, marginTop: 2 }}>
                    Hak Paket: 5.0 Kg Beras Zakat Fitrah
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleDistribute(m.id)}
                  style={{
                    background: isSudah ? '#10b981' : '#f1f5f9',
                    color: isSudah ? '#ffffff' : '#64748b',
                    border: isSudah ? 'none' : '1px solid #cbd5e1',
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {isSudah ? (
                    <>
                      <CheckCircle2 size={13} />
                      <span>Tersalurkan</span>
                    </>
                  ) : (
                    <span>Serahkan</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
